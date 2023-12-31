// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package storage // import "miniflux.app/storage"

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"miniflux.app/crypto"
	"miniflux.app/logger"
	"miniflux.app/model"
	"miniflux.app/timezone"

	"github.com/lib/pq"
)

// CountAllEntries returns the number of entries for each status in the database.
func (s *Storage) CountAllEntries() map[string]int64 {
	rows, err := s.db.Query(`SELECT status, count(*) FROM entries GROUP BY status`)
	if err != nil {
		return nil
	}
	defer rows.Close()

	results := make(map[string]int64)
	results[model.EntryStatusUnread] = 0
	results[model.EntryStatusRead] = 0
	results[model.EntryStatusRemoved] = 0

	for rows.Next() {
		var status string
		var count int64

		if err := rows.Scan(&status, &count); err != nil {
			continue
		}

		results[status] = count
	}

	results["total"] = results[model.EntryStatusUnread] + results[model.EntryStatusRead] + results[model.EntryStatusRemoved]
	return results
}

// CountUnreadEntries returns the number of unread entries.
func (s *Storage) CountUnreadEntries(userID int64) int {
	builder := s.NewEntryQueryBuilder(userID)
	builder.WithStatus(model.EntryStatusUnread)
	builder.WithGloballyVisible()

	n, err := builder.CountEntries()
	if err != nil {
		logger.Error(`store: unable to count unread entries for user #%d: %v`, userID, err)
		return 0
	}

	return n
}

// NewEntryQueryBuilder returns a new EntryQueryBuilder
func (s *Storage) NewEntryQueryBuilder(userID int64) *EntryQueryBuilder {
	return NewEntryQueryBuilder(s, userID)
}

// UpdateEntryContent updates entry content.
func (s *Storage) UpdateEntryContent(entry *model.Entry) error {
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}

	query := `
		UPDATE
			entries
		SET
			content=$1, reading_time=$2
		WHERE
			id=$3 AND user_id=$4
	`
	_, err = tx.Exec(query, entry.Content, entry.ReadingTime, entry.ID, entry.UserID)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf(`store: unable to update content of entry #%d: %v`, entry.ID, err)
	}

	/*query = `
		UPDATE
			entries
		SET
			document_vectors = setweight(to_tsvector(left(coalesce(title, ''), 500000)), 'A') || setweight(to_tsvector(left(coalesce(content, ''), 500000)), 'B')
		WHERE
			id=$1 AND user_id=$2
	`
	_, err = tx.Exec(query, entry.ID, entry.UserID)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf(`store: unable to update content of entry #%d: %v`, entry.ID, err)
	}*/

	return tx.Commit()
}

// CreateFeed creates a new feed.
func (s *Storage) CreateEntrySingle(entry *model.Entry) error {
	sql := `
		INSERT INTO entries
			(
				title,
				hash,
				url,
				comments_url,
				published_at,
				content,
				author,
				user_id,
				feed_id,
				reading_time,
				changed_at,
				full_content,
				readlater_tag,
				image_url
			)
		VALUES
			(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				now(),
				$11,
				$12,
				$13
			)
		RETURNING
			id
	`
	err := s.db.QueryRow(
		sql,
		entry.Title,
		entry.Hash,
		entry.URL,
		entry.CommentsURL,
		entry.Date,
		entry.Content,
		entry.Author,
		entry.UserID,
		entry.FeedID,
		entry.ReadingTime,
		entry.FullContent,
		entry.ReadLater,
		entry.ImageUrl,
	).Scan(&entry.ID)
	if err != nil {
		return fmt.Errorf(`store: unable to create entry  %v`, err)
	}
	return nil
}

// createEntry add a new entry.
func (s *Storage) createEntry(tx *sql.Tx, entry *model.Entry) error {
	/*query := `
		INSERT INTO entries
			(
				title,
				hash,
				url,
				comments_url,
				published_at,
				content,
				author,
				user_id,
				feed_id,
				reading_time,
				changed_at,
				document_vectors
			)
		VALUES
			(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				now(),
				setweight(to_tsvector(left(coalesce($1, ''), 500000)), 'A') || setweight(to_tsvector(left(coalesce($6, ''), 500000)), 'B')
			)
		RETURNING
			id, status
	`*/
	if entry.Date.After(time.Now()) {
		entry.Date = time.Now()
	}
	query := `
		INSERT INTO entries
			(
				title,
				hash,
				url,
				comments_url,
				published_at,
				content,
				author,
				user_id,
				feed_id,
				reading_time,
				changed_at,
				image_url
			)
		VALUES
			(
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				now(),
				$11
			)
		RETURNING
			id, status
	`
	err := tx.QueryRow(
		query,
		entry.Title,
		entry.Hash,
		entry.URL,
		entry.CommentsURL,
		entry.Date,
		entry.Content,
		entry.Author,
		entry.UserID,
		entry.FeedID,
		entry.ReadingTime,
		entry.ImageUrl,
	).Scan(&entry.ID, &entry.Status)

	if err != nil {
		return fmt.Errorf(`store: unable to create entry %q (feed #%d): %v`, entry.URL, entry.FeedID, err)
	}

	for i := 0; i < len(entry.Enclosures); i++ {
		entry.Enclosures[i].EntryID = entry.ID
		entry.Enclosures[i].UserID = entry.UserID
		err := s.createEnclosure(tx, entry.Enclosures[i])
		if err != nil {
			return err
		}
	}

	return nil
}

// updateEntry updates an entry when a feed is refreshed.
// Note: we do not update the published date because some feeds do not contains any date,
// it default to time.Now() which could change the order of items on the history page.
func (s *Storage) updateEntry(tx *sql.Tx, entry *model.Entry) error {
	/*query := `
		UPDATE
			entries
		SET
			title=$1,
			url=$2,
			comments_url=$3,
			content=$4,
			author=$5,
			reading_time=$6,
			document_vectors = setweight(to_tsvector(left(coalesce($1, ''), 500000)), 'A') || setweight(to_tsvector(left(coalesce($4, ''), 500000)), 'B')
		WHERE
			user_id=$7 AND feed_id=$8 AND hash=$9
		RETURNING
			id
	`*/
	query := `
		UPDATE
			entries
		SET
			title=$1,
			url=$2,
			comments_url=$3,
			content=$4,
			author=$5,
			reading_time=$6
		WHERE
			user_id=$7 AND feed_id=$8 AND hash=$9
		RETURNING
			id
	`
	err := tx.QueryRow(
		query,
		entry.Title,
		entry.URL,
		entry.CommentsURL,
		entry.Content,
		entry.Author,
		entry.ReadingTime,
		entry.UserID,
		entry.FeedID,
		entry.Hash,
	).Scan(&entry.ID)

	if err != nil {
		return fmt.Errorf(`store: unable to update entry %q: %v`, entry.URL, err)
	}

	for _, enclosure := range entry.Enclosures {
		enclosure.UserID = entry.UserID
		enclosure.EntryID = entry.ID
	}

	return s.updateEnclosures(tx, entry.UserID, entry.ID, entry.Enclosures)
}

// entryExists checks if an entry already exists based on its hash when refreshing a feed.
func (s *Storage) entryExists(tx *sql.Tx, entry *model.Entry) bool {
	var result bool
	tx.QueryRow(
		`SELECT true FROM entries WHERE user_id=$1 AND feed_id=$2 AND hash=$3`,
		entry.UserID,
		entry.FeedID,
		entry.Hash,
	).Scan(&result)
	return result
}

// GetReadTime fetches the read time of an entry based on its hash, and the feed id and user id from the feed.
// It's intended to be used on entries objects created by parsing a feed as they don't contain much information.
// The feed param helps to scope the search to a specific user and feed in order to avoid hash clashes.
func (s *Storage) GetReadTime(entry *model.Entry, feed *model.Feed) int {
	var result int
	s.db.QueryRow(
		`SELECT reading_time FROM entries WHERE user_id=$1 AND feed_id=$2 AND hash=$3`,
		feed.UserID,
		feed.ID,
		entry.Hash,
	).Scan(&result)
	return result
}

// cleanupEntries deletes from the database entries marked as "removed" and not visible anymore in the feed.
func (s *Storage) cleanupEntries(feedID int64, entryHashes []string) error {
	query := `
		DELETE FROM
			entries
		WHERE
			feed_id=$1
		AND
			id IN (SELECT id FROM entries WHERE feed_id=$2 AND status=$3 AND NOT (hash=ANY($4)))
	`
	if _, err := s.db.Exec(query, feedID, feedID, model.EntryStatusRemoved, pq.Array(entryHashes)); err != nil {
		return fmt.Errorf(`store: unable to cleanup entries: %v`, err)
	}

	return nil
}

// RefreshFeedEntries updates feed entries while refreshing a feed.
func (s *Storage) RefreshFeedEntries(userID, feedID int64, entries model.Entries, updateExistingEntries bool) (err error) {
	var entryHashes []string

	feed, err := s.FeedByID(userID, feedID)
	if err != nil {
		return fmt.Errorf(`store: refreshFeedEntries unable to  get feed: %v`, err)
	}
	if len(entries) > 0 {
		last := feed.UpdateTime
		for _, entry := range entries {
			entry.UserID = userID
			entry.FeedID = feedID

			tx, err := s.db.Begin()
			if err != nil {
				return fmt.Errorf(`store: unable to start transaction: %v`, err)
			}

			if last.Before(entry.Date) {
				last = entry.Date
			}
			if s.entryExists(tx, entry) {
				if updateExistingEntries {
					err = s.updateEntry(tx, entry)
				}
			} else {
				err = s.createEntry(tx, entry)
			}

			if err != nil {
				tx.Rollback()
				return err
			}

			if err := tx.Commit(); err != nil {
				return fmt.Errorf(`store: unable to commit transaction: %v`, err)
			}

			entryHashes = append(entryHashes, entry.Hash)
		}
		_, err := s.db.Exec(`UPDATE feeds SET update_time=$1 where id=$2`, last, feedID)
		if err != nil {
			return fmt.Errorf(`store: unable to set update_time: %v`, err)
		}
	}

	go func() {
		if err := s.cleanupEntries(feedID, entryHashes); err != nil {
			logger.Error(`store: feed #%d: %v`, feedID, err)
		}
	}()

	return nil
}

// ArchiveEntries changes the status of entries to "removed" after the given number of days.
func (s *Storage) ArchiveEntries(status string, days, limit int) (int64, error) {
	if days < 0 || limit <= 0 {
		return 0, nil
	}

	query := `
		UPDATE
			entries
		SET
			status='removed'
		WHERE
			id=ANY(SELECT id FROM entries WHERE status=$1 AND starred is false AND share_code='' AND created_at < now () - '%d days'::interval ORDER BY created_at ASC LIMIT %d)
	`

	result, err := s.db.Exec(fmt.Sprintf(query, days, limit), status)
	if err != nil {
		return 0, fmt.Errorf(`store: unable to archive %s entries: %v`, status, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf(`store: unable to get the number of rows affected: %v`, err)
	}

	return count, nil
}

// SetEntriesStatus update the status of the given list of entries.
func (s *Storage) SetEntriesStatus(userID int64, entryIDs []int64, status string) error {
	query := `UPDATE entries SET status=$1, changed_at=now() WHERE user_id=$2 AND id=ANY($3)`
	result, err := s.db.Exec(query, status, userID, pq.Array(entryIDs))
	if err != nil {
		return fmt.Errorf(`store: unable to update entries statuses %v: %v`, entryIDs, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf(`store: unable to update these entries %v: %v`, entryIDs, err)
	}

	if count == 0 {
		return errors.New(`store: nothing has been updated`)
	}

	return nil
}

func (s *Storage) SetEntriesStatusCount(userID int64, entryIDs []int64, status string) (int, error) {
	if err := s.SetEntriesStatus(userID, entryIDs, status); err != nil {
		return 0, err
	}

	query := `
		SELECT count(*)
		FROM entries e
		    JOIN feeds f ON (f.id = e.feed_id)
		    JOIN categories c ON (c.id = f.category_id)
		WHERE e.user_id = $1
			AND e.id = ANY($2)
			AND NOT f.hide_globally
			AND NOT c.hide_globally
	`
	row := s.db.QueryRow(query, userID, pq.Array(entryIDs))
	visible := 0
	if err := row.Scan(&visible); err != nil {
		return 0, fmt.Errorf(`store: unable to query entries visibility %v: %v`, entryIDs, err)
	}

	return visible, nil
}

// SetEntriesBookmarked update the bookmarked state for the given list of entries.
func (s *Storage) SetEntriesBookmarkedState(userID int64, entryIDs []int64, starred bool) error {
	query := `UPDATE entries SET starred=$1, changed_at=now() WHERE user_id=$2 AND id=ANY($3)`
	result, err := s.db.Exec(query, starred, userID, pq.Array(entryIDs))
	if err != nil {
		return fmt.Errorf(`store: unable to update the bookmarked state %v: %v`, entryIDs, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf(`store: unable to update these entries %v: %v`, entryIDs, err)
	}

	if count == 0 {
		return errors.New(`store: nothing has been updated`)
	}

	return nil
}

// ToggleBookmark toggles entry bookmark value.
func (s *Storage) ToggleBookmark(userID int64, entryID int64) error {
	query := `UPDATE entries SET starred = NOT starred, changed_at=now() WHERE user_id=$1 AND id=$2`
	result, err := s.db.Exec(query, userID, entryID)
	if err != nil {
		return fmt.Errorf(`store: unable to toggle bookmark flag for entry #%d: %v`, entryID, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf(`store: unable to toggle bookmark flag for entry #%d: %v`, entryID, err)
	}

	if count == 0 {
		return errors.New(`store: nothing has been updated`)
	}

	return nil
}

// FlushHistory set all entries with the status "read" to "removed".
func (s *Storage) FlushHistory(userID int64) error {
	query := `
		UPDATE
			entries
		SET
			status=$1,
			changed_at=now()
		WHERE
			user_id=$2 AND status=$3 AND starred is false AND share_code=''
	`
	_, err := s.db.Exec(query, model.EntryStatusRemoved, userID, model.EntryStatusRead)
	if err != nil {
		return fmt.Errorf(`store: unable to flush history: %v`, err)
	}

	return nil
}

// MarkAllAsRead updates all user entries to the read status.
func (s *Storage) MarkAllAsRead(userID int64) error {
	query := `UPDATE entries SET status=$1, changed_at=now() WHERE user_id=$2 AND status=$3`
	result, err := s.db.Exec(query, model.EntryStatusRead, userID, model.EntryStatusUnread)
	if err != nil {
		return fmt.Errorf(`store: unable to mark all entries as read: %v`, err)
	}

	count, _ := result.RowsAffected()
	logger.Debug("[Storage:MarkAllAsRead] %d items marked as read", count)

	return nil
}

// MarkFeedAsRead updates all feed entries to the read status.
func (s *Storage) MarkFeedAsRead(userID, feedID int64, before time.Time) error {
	query := `
		UPDATE
			entries
		SET
			status=$1,
			changed_at=now()
		WHERE
			user_id=$2 AND feed_id=$3 AND status=$4 AND published_at < $5
	`
	result, err := s.db.Exec(query, model.EntryStatusRead, userID, feedID, model.EntryStatusUnread, before)
	if err != nil {
		return fmt.Errorf(`store: unable to mark feed entries as read: %v`, err)
	}

	count, _ := result.RowsAffected()
	logger.Debug("[Storage:MarkFeedAsRead] %d items marked as read", count)

	return nil
}

// MarkCategoryAsRead updates all category entries to the read status.
func (s *Storage) MarkCategoryAsRead(userID, categoryID int64, before time.Time) error {
	query := `
		UPDATE
			entries
		SET
			status=$1,
			changed_at=now()
		WHERE
			user_id=$2
		AND
			status=$3
		AND
			published_at < $4
		AND
			feed_id IN (SELECT id FROM feeds WHERE user_id=$2 AND category_id=$5)
	`
	result, err := s.db.Exec(query, model.EntryStatusRead, userID, model.EntryStatusUnread, before, categoryID)
	if err != nil {
		return fmt.Errorf(`store: unable to mark category entries as read: %v`, err)
	}

	count, _ := result.RowsAffected()
	logger.Debug("[Storage:MarkCategoryAsRead] %d items marked as read", count)

	return nil
}

func (s *Storage) MarkTodayAsRead(userID int64, after time.Time) error {
	query := `
		UPDATE
			entries
		SET
			status=$1,
			changed_at=now()
		WHERE
			user_id=$2
		AND
			status=$3
		AND
			published_at > $4
	`
	result, err := s.db.Exec(query, model.EntryStatusRead, userID, model.EntryStatusUnread, after)
	if err != nil {
		return fmt.Errorf(`store: unable to mark category entries as read: %v`, err)
	}

	count, _ := result.RowsAffected()
	logger.Debug("[Storage:MarkCategoryAsRead] %d items marked as read", count)

	return nil
}

// EntryURLExists returns true if an entry with this URL already exists.
func (s *Storage) EntryURLExists(feedID int64, entryURL string) bool {
	var result bool
	query := `SELECT true FROM entries WHERE feed_id=$1 AND url=$2`
	s.db.QueryRow(query, feedID, entryURL).Scan(&result)
	return result
}

func (s *Storage) GetEntryIDByURL(feedID int64, entryURL string) int64 {
	var result int64
	query := `SELECT id FROM entries WHERE feed_id=$1 AND url=$2`
	s.db.QueryRow(query, feedID, entryURL).Scan(&result)
	return result
}

// EntryShareCode returns the share code of the provided entry.
// It generates a new one if not already defined.
func (s *Storage) EntryShareCode(userID int64, entryID int64) (shareCode string, err error) {
	query := `SELECT share_code FROM entries WHERE user_id=$1 AND id=$2`
	err = s.db.QueryRow(query, userID, entryID).Scan(&shareCode)
	if err != nil {
		err = fmt.Errorf(`store: unable to get share code for entry #%d: %v`, entryID, err)
		return
	}

	if shareCode == "" {
		shareCode = crypto.GenerateRandomStringHex(20)

		query = `UPDATE entries SET share_code = $1 WHERE user_id=$2 AND id=$3`
		_, err = s.db.Exec(query, shareCode, userID, entryID)
		if err != nil {
			err = fmt.Errorf(`store: unable to set share code for entry #%d: %v`, entryID, err)
			return
		}
	}

	return
}

// UnshareEntry removes the share code for the given entry.
func (s *Storage) UnshareEntry(userID int64, entryID int64) (err error) {
	query := `UPDATE entries SET share_code='' WHERE user_id=$1 AND id=$2`
	_, err = s.db.Exec(query, userID, entryID)
	if err != nil {
		err = fmt.Errorf(`store: unable to remove share code for entry #%d: %v`, entryID, err)
	}
	return
}

func (s *Storage) EntryURLExistswZ(feedID int64, entryURL string) bool {
	var result bool
	query := `SELECT true FROM entries WHERE feed_id=$1 AND url=$2`
	s.db.QueryRow(query, feedID, entryURL).Scan(&result)
	return result
}

func (s *Storage) EntryForFullContent(entryId int64) (*model.Entry, error) {
	var entry model.Entry

	query := `SELECT id, user_id, feed_id, url,title,published_at,image_url FROM entries WHERE id>$1 and  status <> $2 and full_content is null order by id limit 1`
	err := s.db.QueryRow(query, entryId, model.EntryStatusRemoved).Scan(&entry.ID, &entry.UserID, &entry.FeedID, &entry.URL, &entry.Title, &entry.Date, &entry.ImageUrl)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch entry: %v`, err)
	default:
		return &entry, nil
	}
}

func (s *Storage) GetFullContent(entryId int64) string {
	var content string
	query := `SELECT full_content FROM entries WHERE id=$1`
	s.db.QueryRow(query, entryId).Scan(&content)
	return content

}

func (s *Storage) UpdateEntryFullContent(entryId int64, entry *model.Entry) error {
	query := `UPDATE entries SET full_content=$1,doc_id=$2,image_url=$3 WHERE id=$4 `
	_, err := s.db.Exec(query, entry.Content, entry.DocId, entry.ImageUrl, entryId)
	if err != nil {
		return fmt.Errorf(`store: unable to update full content  %v: %v`, entryId, err)
	}

	return nil
}

func (s *Storage) UpdateEntryLastReadTime(entryId int64) error {
	query := `UPDATE entries SET last_read_at=now() WHERE id=$1 `
	_, err := s.db.Exec(query, entryId)
	if err != nil {
		return fmt.Errorf(`store: unable to update last read time  %v: %v`, entryId, err)
	}

	return nil
}

func (s *Storage) ReadLater(userID int64, entryID int64) error {
	query := `UPDATE entries SET readlater_tag = NOT readlater_tag WHERE user_id=$1 AND id=$2`
	result, err := s.db.Exec(query, userID, entryID)
	if err != nil {
		return fmt.Errorf(`store: unable to toggle bookmark flag for entry #%d: %v`, entryID, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf(`store: unable to toggle bookmark flag for entry #%d: %v`, entryID, err)
	}

	if count == 0 {
		return errors.New(`store: nothing has been updated`)
	}

	return nil
}

func (s *Storage) GetEntryBaseInfoByFeed(feedId int64) (model.Entries, error) {

	query := `SELECT id, doc_id FROM entries WHERE feed_id=$1 `
	rows, err := s.db.Query(query, feedId)
	if err != nil {
		return nil, fmt.Errorf(`store: unable to fetch feeds: %w`, err)
	}
	defer rows.Close()

	entries := make(model.Entries, 0)
	for rows.Next() {
		var entry model.Entry
		err := rows.Scan(
			&entry.ID,
			&entry.DocId,
		)
		if err != nil {
			return nil, fmt.Errorf(`store: unable to fetch feeds row: %w`, err)
		}
		entries = append(entries, &entry)
	}

	return entries, nil

}

func (s *Storage) GetEntryBaseInfoByIds(entryIDs []int64) (model.Entries, error) {

	query := `SELECT id, doc_id FROM entries WHERE id=ANY($1) `
	rows, err := s.db.Query(query, entryIDs)
	if err != nil {
		return nil, fmt.Errorf(`store: unable to fetch feeds: %w`, err)
	}
	defer rows.Close()

	entries := make(model.Entries, 0)
	for rows.Next() {
		var entry model.Entry
		err := rows.Scan(
			&entry.ID,
			&entry.DocId,
		)
		if err != nil {
			return nil, fmt.Errorf(`store: unable to fetch feeds row: %w`, err)
		}
		entries = append(entries, &entry)
	}
	return entries, nil
}

func (s *Storage) GetEntriesByIds(ids []int64) (model.Entries, error) {
	query := `
		SELECT
			e.id,
			e.user_id,
			e.feed_id,
			e.hash,
			e.published_at at time zone u.timezone,
			e.title,
			e.url,
			e.comments_url,
			e.author,
			e.share_code,
			e.status,
			e.starred,
			e.reading_time,
			e.created_at,
			e.changed_at,
			e.readlater_tag,
			f.title as feed_title,
			f.feed_url,
			f.site_url,
			f.checked_at,
			f.category_id, c.title as category_title,
			f.scraper_rules,
			f.rewrite_rules,
			f.crawler,
			f.user_agent,
			f.cookie,
			fi.icon_id,
			u.timezone,
			g.board_ids,
			e.image_url
		FROM
			entries e
		LEFT JOIN
			feeds f ON f.id=e.feed_id
		LEFT JOIN
			categories c ON c.id=f.category_id
		LEFT JOIN
			feed_icons fi ON fi.feed_id=f.id
		LEFT JOIN
			users u ON u.id=e.user_id
		LEFT JOIN
			(SELECT s.entry_id, ARRAY_TO_STRING(ARRAY_AGG(s.board_id),',') as board_ids from entry_board s GROUP BY s.entry_id) g ON e.id=g.entry_id
		WHERE e.id =ANY($1)
	`
	/* WHERE e.id in (%s)"
	inStatus := ""
	params := make([]interface{}, 0)
	for i := 0; i < len(ids); i++ {
		if i == 0 {
			inStatus += "?"
		} else {
			inStatus += ",?"
		}
		params = append(params, ids[i])
	}

	query = fmt.Sprintf(query, inStatus)

	rows, err := e.store.db.Query(query, params...)*/
	rows, err := s.db.Query(query, pq.Array(ids))
	if err != nil {
		return nil, fmt.Errorf("unable to get entries: %v", err)
	}
	defer rows.Close()

	entries := make(model.Entries, 0)
	for rows.Next() {
		var entry model.Entry
		var iconID sql.NullInt64
		var tz string
		var boardIDS sql.NullString

		entry.Feed = &model.Feed{}
		entry.Feed.Category = &model.Category{}
		entry.Feed.Icon = &model.FeedIcon{}

		err := rows.Scan(
			&entry.ID,
			&entry.UserID,
			&entry.FeedID,
			&entry.Hash,
			&entry.Date,
			&entry.Title,
			&entry.URL,
			&entry.CommentsURL,
			&entry.Author,
			&entry.ShareCode,
			&entry.Status,
			&entry.Starred,
			&entry.ReadingTime,
			&entry.CreatedAt,
			&entry.ChangedAt,
			&entry.ReadLater,
			&entry.Feed.Title,
			&entry.Feed.FeedURL,
			&entry.Feed.SiteURL,
			&entry.Feed.CheckedAt,
			&entry.Feed.Category.ID,
			&entry.Feed.Category.Title,
			&entry.Feed.ScraperRules,
			&entry.Feed.RewriteRules,
			&entry.Feed.Crawler,
			&entry.Feed.UserAgent,
			&entry.Feed.Cookie,
			&iconID,
			&tz,
			&boardIDS,
			&entry.ImageUrl,
		)

		if err != nil {
			return nil, fmt.Errorf("unable to fetch entry row: %v", err)
		}

		if iconID.Valid {
			entry.Feed.Icon.IconID = iconID.Int64
		} else {
			entry.Feed.Icon.IconID = 0
		}

		// Make sure that timestamp fields contains timezone information (API)
		entry.Date = timezone.Convert(tz, entry.Date)
		entry.CreatedAt = timezone.Convert(tz, entry.CreatedAt)
		entry.ChangedAt = timezone.Convert(tz, entry.ChangedAt)
		entry.Feed.CheckedAt = timezone.Convert(tz, entry.Feed.CheckedAt)

		entry.Feed.ID = entry.FeedID
		entry.Feed.UserID = entry.UserID
		entry.Feed.Icon.FeedID = entry.FeedID
		entry.Feed.Category.UserID = entry.UserID
		entry.BoardIDS = ""
		if boardIDS.Valid {
			entry.BoardIDS = boardIDS.String
		}

		entries = append(entries, &entry)
	}

	return entries, nil
}
