// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package model // import "miniflux.app/model"

import "fmt"

// Category represents a feed category.
type Board struct {
	ID          int64  `json:"id"`
	UserID      int64  `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (b *Board) String() string {
	return fmt.Sprintf("ID=%d, UserID=%d, Title=%s", b.ID, b.UserID, b.Title)
}

// CategoryRequest represents the request to create or update a category.
type BoardRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type EntryToBoardRequest struct {
	EntryID int64 `json:"entry_id"`
	BoardID int64 `json:"board_id"`
}

type PageToBoardRequest struct {
	Url     string `json:"url"`
	Title   string `json:"title"`
	BoardID int64  `json:"board_id"`
}

// Categories represents a list of categories.
type Boards []*Board

type PageToBoardRequests []*PageToBoardRequest
