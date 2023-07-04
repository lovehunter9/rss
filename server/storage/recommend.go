package storage // import "miniflux.app/storage"

import (
	"database/sql"
	"encoding/base64"
	"fmt" // Categories returns all categories that belongs to the given user.

	"miniflux.app/model"
)

func (s *Storage) LastRecommendBase() (*model.RecommendBase, error) {
	var base model.RecommendBase

	query := `SELECT id, batch, fetch_at FROM recommend order by id desc limit 1`
	err := s.db.QueryRow(query).Scan(&base.ID, &base.Batch, &base.FetchAt)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch recommend: %v`, err)
	default:
		return &base, nil
	}
}

func (s *Storage) RecommendEntry(entryID int64) (*model.RecommendEntry, error) {
	var entry model.RecommendEntry

	query := `SELECT id,feed_id,title, author,url,content,published_at,full_content,hash FROM recommend_entries where id=$1`
	err := s.db.QueryRow(query, entryID).Scan(&entry.ID, &entry.FeedId, &entry.Title, &entry.Author, &entry.URL, &entry.Content, &entry.PublishedAt, &entry.FullContent, &entry.Hash)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch recommend: %v`, err)
	default:
		return &entry, nil
	}
}

func (s *Storage) RecommendFeed(feedID int64) (*model.RecommendFeed, error) {
	var feed model.RecommendFeed

	query := `SELECT id,title as feed_title,feed_url,site_url, icon_type,icon_content as icon_byte_content,category_id,category_title FROM recommend_feed where id=$1`
	err := s.db.QueryRow(query, feedID).Scan(&feed.ID, &feed.Title, &feed.FeedUrl, &feed.SiteUrl, &feed.IconType, &feed.IconByteContent, &feed.CategoryID, &feed.CategoryTitle)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch recommend: %v`, err)
	default:
		return &feed, nil
	}
}

func (s *Storage) GetRecommendCount(batch int) int {
	query := `select count(*) from recommend_result where batch=$1 `
	var result int
	err := s.db.QueryRow(query, batch).Scan(&result)
	if err != nil {
		return 0
	}
	return result

}
func (s *Storage) RecommendList(batch, offset, limit int) (model.Recommends, error) {
	query := `SELECT r.batch, e.id entry_id, e.title, e.author,e.url,e.content,e.published_at,r.score,r.rank,
	 f.title feed_title,f.feed_url,f.site_url,f.icon_type,f.icon_content icon_byte_content,f.category_id,f.category_title,e.full_content ,e.image_url
	 FROM recommend_result r,recommend_entries e,recommend_feed f 
	 WHERE r.batch=$1 and r.url=e.url and e.feed_id=f.id
	 ORDER BY r.rank  OFFSET $2 limit $3`
	rows, err := s.db.Query(query, batch, offset, limit)
	if err != nil {
		return nil, fmt.Errorf(`store: unable to fetch boards: %v`, err)
	}
	defer rows.Close()

	recommends := make(model.Recommends, 0)
	for rows.Next() {
		var recommend model.Recommend
		recommend.Feed = &model.RecommendFeed{}
		if err := rows.Scan(&recommend.Batch, &recommend.EntryID, &recommend.Title,
			&recommend.Author, &recommend.URL, &recommend.Content, &recommend.PublishedAt, &recommend.Score, &recommend.Rank,
			&recommend.Feed.Title, &recommend.Feed.FeedUrl, &recommend.Feed.SiteUrl,
			&recommend.Feed.IconType, &recommend.Feed.IconByteContent, &recommend.Feed.CategoryID, &recommend.Feed.CategoryTitle, &recommend.FullContent, &recommend.ImageUrl); err != nil {
			return nil, fmt.Errorf(`store: unable to fetch recommends row: %v`, err)
		}
		recommend.Feed.IconContent = fmt.Sprintf("%s;base64,%s", recommend.Feed.IconContent, base64.StdEncoding.EncodeToString(recommend.Feed.IconByteContent))
		recommend.Feed.IconByteContent = nil
		recommends = append(recommends, &recommend)
	}

	return recommends, nil
}

func (s *Storage) GetRecommendResult(batch int, entryId int64) *model.RecommendResult {
	var result model.RecommendResult
	query := `SELECT r.batch,r.url,r.rank,r.score FROM recommend_result r, recommend_entries e WHERE r.url=e.url and r.batch=$1 and e.entry_id=$2`
	s.db.QueryRow(query, batch, entryId).Scan(&result.Batch, &result.URL, &result.Rank, &result.Score)

	return &result

}

func (s *Storage) GetRecommendFullContent(entryId int64) string {
	var content string
	query := `SELECT full_content FROM recommend_entries WHERE id=$1`
	s.db.QueryRow(query, entryId).Scan(&content)
	return content

}

func (s *Storage) RecommendFeedQuery(categoryID, categoryName, name, link string) (model.RecommendFeeds, error) {
	query := `SELECT id,title as feed_title,feed_description as feed_desc,feed_url,site_url, icon_type,icon_content as icon_byte_content,category_id,category_title FROM recommend_feed where 1=1 `
	if categoryID != "" {
		query = query + " and category_id=" + categoryID
	}
	if categoryName != "" {
		query = query + " and category_title='" + categoryName + "'"
	}

	if name != "" {
		query = query + " and title like '%" + name + "%‘"
	}
	if link != "" {
		query = query + " and feed_url like '%" + link + "%‘"
	}

	rows, err := s.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf(`store: unable to fetch feeds: %v`, err)
	}
	defer rows.Close()
	feeds := make(model.RecommendFeeds, 0)
	for rows.Next() {
		var feed model.RecommendFeed
		if err := rows.Scan(&feed.ID, &feed.Title, &feed.Desc, &feed.FeedUrl, &feed.SiteUrl, &feed.IconType, &feed.IconByteContent, &feed.CategoryID, &feed.CategoryTitle); err != nil {
			return nil, fmt.Errorf(`store: unable to fetch recommends row: %v`, err)
		}
		feed.IconContent = fmt.Sprintf("%s;base64,%s", feed.IconContent, base64.StdEncoding.EncodeToString(feed.IconByteContent))
		feed.IconByteContent = nil
		feeds = append(feeds, &feed)
	}

	return feeds, nil

}
