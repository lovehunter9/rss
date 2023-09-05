package storage // import "miniflux.app/storage"

import (
	"database/sql"
	"fmt" // Categories returns all categories that belongs to the given user.

	"miniflux.app/model"
)

func (s *Storage) StatEntryRead(batch int, entryID int64) (*model.StatEntry, error) {
	var stat model.StatEntry

	query := `SELECT id, batch, entry_id,rank,read_complete,readlater_tag,board_tag,click_num,read_time FROM stat_entry_read WHERE batch=$1 and entry_id=$2 `
	err := s.db.QueryRow(query, batch, entryID).Scan(&stat.ID, &stat.Batch, &stat.EntryID, &stat.Rank, &stat.ReadComplete, &stat.ReadLater, &stat.Board, &stat.ClickNum, &stat.ReadTime)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch recommend: %v`, err)
	default:
		return &stat, nil
	}
}

func (s *Storage) CreateStatEntryRead(request *model.StatEntry) (*model.StatEntry, error) {
	var stat model.StatEntry

	query := `
		INSERT INTO stat_entry_read
			(batch, entry_id,rank,read_complete,readlater_tag,board_tag,click_num,cloud_id)
		VALUES
			($1, $2, $3, $4, $5, $6, $7)
		RETURNING
			id
	`
	err := s.db.QueryRow(
		query,
		request.Batch,
		request.EntryID,
		request.Rank,
		request.ReadComplete,
		request.ReadLater,
		request.Board,
		request.ClickNum,
		request.CloudID,
	).Scan(
		&stat.ID,
	)

	if err != nil {
		return nil, fmt.Errorf(`store: unable to create stat : %v`, err)
	}

	return &stat, nil
}

func (s *Storage) UpdateStatEntryRead(stat *model.StatEntry) error {
	query := `UPDATE stat_entry_read SET batch=$1, entry_id=$2,rank=$3,read_complete=$4,readlater_tag=$5,board_tag=$6,click_num=$7,read_time=$8,vector_data_check=$9 WHERE id=$10 `
	_, err := s.db.Exec(
		query,
		stat.Batch,
		stat.EntryID,
		stat.Rank,
		stat.ReadComplete,
		stat.ReadLater,
		stat.Board,
		stat.ClickNum,
		stat.ReadTime,
		stat.VectorDataCheck,
		stat.ID,
	)

	if err != nil {
		return fmt.Errorf(`store: unable to update stat: %v`, err)
	}

	return nil
}

func (s *Storage) StatActive(day string, hour int) (*model.StatActive, error) {
	var stat model.StatActive

	query := `SELECT id, day, hour,count FROM stat_active where day=$1 and hour=$2 `
	err := s.db.QueryRow(query, day, hour).Scan(&stat.ID, &stat.Day, &stat.Hour, &stat.Count)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch recommend: %v`, err)
	default:
		return &stat, nil
	}
}

func (s *Storage) CreateStatActive(request *model.StatActive) (*model.StatActive, error) {
	var stat model.StatActive

	query := `
		INSERT INTO stat_active
			( day, hour,count )
		VALUES
			($1, $2, $3)
		RETURNING
			id
	`
	err := s.db.QueryRow(
		query,
		request.Day,
		request.Hour,
		request.Count,
	).Scan(
		&stat.ID,
	)

	if err != nil {
		return nil, fmt.Errorf(`store: unable to create stat : %v`, err)
	}

	return &stat, nil
}

func (s *Storage) UpdateStatActive(stat *model.StatActive) error {
	query := `UPDATE stat_active SET count=$1 WHERE day=$2 and hour=$3`
	_, err := s.db.Exec(
		query,
		stat.Count,
		stat.Day,
		stat.Hour,
	)

	if err != nil {
		return fmt.Errorf(`store: unable to update stat: %v`, err)
	}

	return nil
}
