// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package storage // import "miniflux.app/storage"

import (
	"database/sql"
	"errors"
	"fmt"

	"miniflux.app/model"
)

// AnotherBoardExists checks if another Board exists with the same title.
func (s *Storage) AnotherBoardExists(userID, BoardID int64, title string) bool {
	var result bool
	query := `SELECT true FROM boards WHERE user_id=$1 AND id != $2 AND lower(title)=lower($3) LIMIT 1`
	s.db.QueryRow(query, userID, BoardID, title).Scan(&result)
	return result
}

// BoardTitleExists checks if the given Board exists into the database.
func (s *Storage) BoardTitleExists(userID int64, title string) bool {
	var result bool
	query := `SELECT true FROM boards WHERE user_id=$1 AND lower(title)=lower($2) LIMIT 1`
	s.db.QueryRow(query, userID, title).Scan(&result)
	return result
}

// BoardIDExists checks if the given Board exists into the database.
func (s *Storage) BoardIDExists(userID, BoardID int64) bool {
	var result bool
	query := `SELECT true FROM boards WHERE user_id=$1 AND id=$2`
	s.db.QueryRow(query, userID, BoardID).Scan(&result)
	return result
}

// Board returns a board from the database.
func (s *Storage) Board(userID, BoardID int64) (*model.Board, error) {
	var board model.Board

	query := `SELECT id, user_id, title, description FROM boards WHERE user_id=$1 AND id=$2`
	err := s.db.QueryRow(query, userID, BoardID).Scan(&board.ID, &board.UserID, &board.Title, &board.Description)

	switch {
	case err == sql.ErrNoRows:
		return nil, nil
	case err != nil:
		return nil, fmt.Errorf(`store: unable to fetch board: %v`, err)
	default:
		return &board, nil
	}
}

// Categories returns all categories that belongs to the given user.
func (s *Storage) Boards(userID int64) (model.Boards, error) {
	query := `SELECT id, user_id, title, description FROM boards WHERE user_id=$1 ORDER BY title ASC`
	rows, err := s.db.Query(query, userID)
	if err != nil {
		return nil, fmt.Errorf(`store: unable to fetch boards: %v`, err)
	}
	defer rows.Close()

	boards := make(model.Boards, 0)
	for rows.Next() {
		var board model.Board
		if err := rows.Scan(&board.ID, &board.UserID, &board.Title, &board.Description); err != nil {
			return nil, fmt.Errorf(`store: unable to fetch board row: %v`, err)
		}

		boards = append(boards, &board)
	}

	return boards, nil
}

// CreateBoard creates a new Board.
func (s *Storage) CreateBoard(userID int64, request *model.BoardRequest) (*model.Board, error) {
	var board model.Board

	query := `
		INSERT INTO boards
			(user_id, title,description)
		VALUES
			($1, $2, $3)
		RETURNING
			id,
			user_id,
			title,
			description
	`
	err := s.db.QueryRow(
		query,
		userID,
		request.Title,
		request.Description,
	).Scan(
		&board.ID,
		&board.UserID,
		&board.Title,
		&board.Description,
	)

	if err != nil {
		return nil, fmt.Errorf(`store: unable to create board %q: %v`, request.Title, err)
	}

	return &board, nil
}

// UpdateBoard updates an existing Board.
func (s *Storage) UpdateBoard(board *model.Board) error {
	query := `UPDATE boards SET title=$1, description = $2 WHERE id=$3 AND user_id=$4`
	_, err := s.db.Exec(
		query,
		board.Title,
		board.Description,
		board.ID,
		board.UserID,
	)

	if err != nil {
		return fmt.Errorf(`store: unable to update board: %v`, err)
	}

	return nil
}

// RemoveBoard deletes a board.
func (s *Storage) RemoveBoard(userID, boardID int64) error {
	tx, err := s.db.Begin()
	if err != nil {
		return errors.New("unable to begin transaction")
	}
	query := `DELETE FROM boards WHERE id = $1 AND user_id = $2`
	result, err := s.db.Exec(query, boardID, userID)
	if err != nil {
		return fmt.Errorf(`store: unable to remove this board: %v`, err)
	}

	count, err := result.RowsAffected()
	if err != nil {
		tx.Rollback()
		return fmt.Errorf(`store: unable to remove this board: %v`, err)
	}

	if count == 0 {
		tx.Rollback()
		return errors.New(`store: no board has been removed`)
	}

	entryBoardSql := `DELETE FROM entry_board WHERE board_id = $1 `
	_, entryErr := s.db.Exec(entryBoardSql, boardID)
	if entryErr != nil {
		tx.Rollback()
		return fmt.Errorf(`store: unable to remove this board: %v`, err)
	}

	tx.Commit()
	return nil
}

func (s *Storage) EntryBoardExists(entryID, boardID int64) bool {
	var result bool
	query := `SELECT true FROM entry_board WHERE entry_id=$1 and board_id= $2 LIMIT 1`
	s.db.QueryRow(query, entryID, boardID).Scan(&result)
	return result
}

func (s *Storage) AddEntryToBoard(entryID, boardID int64) error {
	query := `INSERT INTO entry_board (entry_id, board_id) VALUES ($1, $2) `
	_, err := s.db.Exec(query, entryID, boardID)

	if err != nil {
		return fmt.Errorf(`store: unable to create entryboard icon: %v`, err)
	}
	return nil
}

func (s *Storage) RemoveEntryFromBoard(entryID, boardID int64) error {
	query := `DELETE FROM entry_board WHERE  entry_id=$1 and board_id= $2 `
	_, err := s.db.Exec(query, entryID, boardID)
	if err != nil {
		return fmt.Errorf(`store: unable to remove this entry: %v`, err)
	}
	return nil
}
