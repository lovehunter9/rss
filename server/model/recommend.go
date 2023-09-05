// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package model // import "miniflux.app/model"

import "time"

type RecommendBase struct {
	ID       int64     `json:"id"`
	Batch    int       `json:"batch"`
	FetchAt  time.Time `json:"fetch_at"`
	Language string    `json:"language"`
}

type RecommendFeed struct {
	ID              int64   `json:"id"`
	Title           string  `json:"feed_title"`
	Desc            string  `json:"feed_desc"`
	FeedUrl         string  `json:"feed_url"`
	SiteUrl         string  `json:"site_url"`
	IconType        *string `json:"icon_type"`
	IconByteContent []byte  `json:"icon_byte_content"`
	IconContent     string  `json:"icon_content"`
	CategoryID      int64   `json:"category_id"`
	CategoryTitle   string  `json:"category_title"`
}

type RecommendEntry struct {
	ID          int64     `json:"id"`
	FeedId      int64     `json:"feed_id"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	PublishedAt time.Time `json:"published_at"`
	URL         string    `json:"url"`
	Content     string    `json:"content"`
	FullContent string    `json:"full_content"`
	Hash        string    `json:"hash"`
	CloudID     int64     `json:"cloud_id"`
}

type RecommendResult struct {
	Batch   int    `json:"batch"`
	URL     string `json:"url"`
	Score   int    `json:"score"`
	Rank    int    `json:"rank"`
	CloudID int64  `json:"cloud_id"`
}

// Category represents a feed category.
type Recommend struct {
	ID               int64   `json:"id"`
	Batch            int     `json:"batch"`
	EntryID          int64   `json:"entry_id"`
	Title            string  `json:"title"`
	Author           *string `json:"author"`
	ImageUrl         string  `json:"image_url"`
	RecommendKeyword *string `json:"recommend_keyword"`
	Keyword          *string `json:"keyword"`

	PublishedAt time.Time      `json:"published_at"`
	URL         string         `json:"url"`
	Content     *string        `json:"content"`
	FullContent string         `json:"full_content"`
	Feed        *RecommendFeed `json:"feed,omitempty"`
	Score       float32        `json:"score"`
	Rank        int            `json:"rank"`
}

type ReadTimeStatRequest struct {
	EntryID  int64 `json:"entry_id"`
	ReadTime int   `json:"read_time"`
}

// Categories represents a list of categories.
type Recommends []*Recommend

type RecommendFeeds []*RecommendFeed

type OptionSettingRequest struct {
	Language   []string `json:"language"`
	ShowResult bool     `json:"show_recommend_result"`
}

type Blacklist struct {
	ID              int64   `json:"id"`
	FeedID          int64   `json:"feed_id"`
	FeedUrl         string  `json:"feed_url"`
	FeedTitle       string  `json:"feed_title"`
	IconType        *string `json:"icon_type"`
	IconByteContent []byte  `json:"icon_byte_content"`
	IconContent     string  `json:"icon_content"`
	EntryUrl        string  `json:"entry_url"`
	EntryTitle      string  `json:"entry_title"`
	FullContent     *string `json:"full_content"`
	Status          int     `json:"status"`
}

type Blacklists []*Blacklist
