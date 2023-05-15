// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package model // import "miniflux.app/model"

// Category represents a feed category.
type StatEntry struct {
	ID           int64 `json:"id"`
	Batch        int   `json:"batch"`
	EntryID      int64 `json:"entry_id"`
	Rank         int   `json:"rank"`
	ClickNum     int   `json:"click_num"`
	ReadComplete bool  `json:"read_complete"`
	ReadLater    bool  `json:"readlater_tag"`
	Board        bool  `json:"board_tag"`
}

// Categories represents a list of categories.
type StatEntries []*StatEntry
