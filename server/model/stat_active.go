// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package model // import "miniflux.app/model"

// Category represents a feed category.
type StatActive struct {
	ID    int64  `json:"id"`
	Day   string `json:"day"`
	Hour  int    `json:"hour"`
	Count int    `json:"count"`
}

// Categories represents a list of categories.
type StatActives []*StatActive
