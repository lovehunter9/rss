// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package api // import "miniflux.app/api"

import (
	json_parser "encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"miniflux.app/http/request"
	"miniflux.app/http/response/json"
	"miniflux.app/logger"
	"miniflux.app/model"
	feedHandler "miniflux.app/reader/handler"
)

var RecommendCacheBatch int
var RecommendCachePage int

//每天活跃时间
//每天活跃时间段

func (h *handler) getRecommendList(w http.ResponseWriter, r *http.Request) {
	recommendBase, _ := h.store.LastRecommendBase()
	count := h.store.GetRecommendCount(recommendBase.Batch)
	//limit := request.QueryIntParam(r, "limit", 20)
	//offset := request.QueryIntParam(r, "offset", 0)
	limit := 5
	if recommendBase.Batch != RecommendCacheBatch {
		RecommendCacheBatch = recommendBase.Batch
		RecommendCachePage = 0
	} else {
		RecommendCachePage = RecommendCachePage + 1
		if (RecommendCachePage+1)*5 > count {
			RecommendCachePage = 0
		}
	}

	offset := RecommendCachePage * limit
	logger.Info("getRecommendList %d,%d,%d", recommendBase.Batch, RecommendCachePage, offset)
	list, err := h.store.RecommendList(recommendBase.Batch, offset, limit)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}
	/*for _, item := range list {
		if item.FullContent != "" {
			doc, err := goquery.NewDocumentFromReader(strings.NewReader(item.FullContent))
			if err == nil {
				img, _ := doc.Find("img").First().Attr("src")
				item.ImageUrl = img
			}
			item.FullContent = ""
		}
	}*/
	json.OK(w, r, list)
	//json.OK(w, r, &recommendResponse{Total: count, Entries: list})
}

func (h *handler) initEntry(userID, entryID int64, readLater bool) int64 {
	recommendEntry, _ := h.store.RecommendEntry(entryID)
	recommendFeed, _ := h.store.RecommendFeed(recommendEntry.FeedId)
	feedId := h.store.FeedIDByURL(userID, recommendFeed.FeedUrl)
	if feedId == 0 {
		newFeed := model.Feed{
			UserID:   userID,
			Disabled: true,
			FeedURL:  recommendFeed.FeedUrl,
		}
		newFeed.WithCategoryID(1)
		h.store.CreateFeed(&newFeed)
		feedId = newFeed.ID

		feedHandler.CheckFeedIcon(h.store,
			newFeed.ID,
			recommendFeed.SiteUrl,
			"",
			false,
			false)
	}

	existEntryID := h.store.GetEntryIDByURL(feedId, recommendEntry.URL)
	if existEntryID == int64(0) {
		entry := model.Entry{
			UserID:      userID,
			FeedID:      feedId,
			Title:       recommendEntry.Title,
			Author:      recommendEntry.Author,
			Date:        recommendEntry.PublishedAt,
			URL:         recommendEntry.URL,
			Content:     recommendEntry.Content,
			FullContent: recommendEntry.FullContent,
			ReadLater:   readLater,
			Hash:        recommendEntry.Hash,
		}
		if entry.Date.After(time.Now()) {
			entry.Date = time.Now()
		}

		h.store.CreateEntrySingle(&entry)
		return entry.ID
	} else {
		if readLater {
			h.store.ReadLater(userID, existEntryID)
		}
		return existEntryID
	}

}

// recommend to readlater
func (h *handler) recommendReadLater(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	entryID := request.RouteInt64Param(r, "entryID")
	h.initEntry(userID, entryID, true)

	stat := h.initRecommendStat(entryID)
	if stat != nil {
		stat.ReadLater = true
		h.store.UpdateStatEntryRead(stat)
	}
	json.NoContent(w, r)
}

// recommend to board
func (h *handler) recommendSaveToBoard(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	var request model.EntryToBoardRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&request); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	/*if validationErr := validator.ValidateEntryBoardCreation(h.store, &request); validationErr != nil {
		json.BadRequest(w, r, validationErr.Error())
		return
	}*/

	entryId := h.initEntry(userID, request.EntryID, false)

	if err := h.store.AddEntryToBoard(entryId, request.BoardID); err != nil {
		json.ServerError(w, r, err)
		return
	}
	stat := h.initRecommendStat(request.EntryID)
	if stat != nil {
		stat.Board = true
		h.store.UpdateStatEntryRead(stat)
	}
	json.NoContent(w, r)

}

// recommend to add feed
func (h *handler) recommendAddFeed(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)

	var feedCreationRequest model.FeedCreationRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&feedCreationRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if !h.store.CategoryIDExists(userID, feedCreationRequest.CategoryID) {
		json.BadRequest(w, r, errors.New("error.feed_category_not_found"))
		return
	}

	feedId := h.store.FeedIDByURL(userID, feedCreationRequest.FeedURL)
	if feedId > 0 {
		originalFeed, _ := h.store.FeedByID(userID, feedId)
		originalFeed.Disabled = false
		originalFeed.Category.ID = feedCreationRequest.CategoryID
		h.store.UpdateFeed(originalFeed)

		feedHandler.RefreshFeed(h.store, userID, feedId)
		json.Created(w, r, &feedCreationResponse{FeedID: feedId})
	} else {
		feed, err := feedHandler.CreateFeed(h.store, userID, &feedCreationRequest)
		if err != nil {
			json.ServerError(w, r, err)
			return
		}
		json.Created(w, r, &feedCreationResponse{FeedID: feed.ID})
	}

}

func (h *handler) fetchRecommendContent(w http.ResponseWriter, r *http.Request) {
	entryID := request.RouteInt64Param(r, "entryID")

	stat := h.initRecommendStat(entryID)

	if stat != nil {
		stat.ClickNum = stat.ClickNum + 1
		h.store.UpdateStatEntryRead(stat)
	}

	entry, _ := h.store.RecommendEntry(entryID)
	if entry != nil {
		if entry.FullContent == "" && entry.CloudID != 0 {
			fullContent, _ := h.s3action.GetObject(entry.CloudID)
			entry.FullContent = fullContent
			h.store.UpdateRecommendFullContent(entryID, entry)
		}
		json.OK(w, r, map[string]string{"content": entry.FullContent})
	}
	json.OK(w, r, map[string]string{"content": ""})
}

func (h *handler) recommendReadCompleteStat(w http.ResponseWriter, r *http.Request) {
	entryID := request.RouteInt64Param(r, "entryID")
	stat := h.initRecommendStat(entryID)
	if stat == nil {
		json.BadRequest(w, r, errors.New("error.stat deal error"))
		return
	}
	stat.ReadComplete = true
	h.store.UpdateStatEntryRead(stat)
	json.NoContent(w, r)
}

func (h *handler) recommendReadTimeStat(w http.ResponseWriter, r *http.Request) {
	var statRequest model.ReadTimeStatRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&statRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	stat := h.initRecommendStat(statRequest.EntryID)
	if stat == nil {
		json.BadRequest(w, r, errors.New("error.stat deal error"))
		return
	}
	stat.ReadTime = stat.ReadTime + statRequest.ReadTime
	h.store.UpdateStatEntryRead(stat)
	json.NoContent(w, r)
}

func (h *handler) initRecommendStat(entryID int64) *model.StatEntry {
	recommendBase, _ := h.store.LastRecommendBase()
	stat, _ := h.store.StatEntryRead(recommendBase.Batch, entryID)
	if stat == nil {
		result := h.store.GetRecommendResult(recommendBase.Batch, entryID)
		if result == nil {
			return nil
		}
		insertStat := model.StatEntry{
			Batch:   recommendBase.Batch,
			EntryID: entryID,
			Rank:    result.Rank,
		}
		h.store.CreateStatEntryRead(&insertStat)
		return &insertStat
	}
	return stat

}

func (h *handler) getBlacklist(w http.ResponseWriter, r *http.Request) {
	limit := request.QueryIntParam(r, "limit", 20)
	offset := request.QueryIntParam(r, "offset", 0)
	list, err := h.store.GetBlacklist(offset, limit)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.OK(w, r, list)
}

func (h *handler) addBalcklist(w http.ResponseWriter, r *http.Request) {
	var request model.Blacklist
	if err := json_parser.NewDecoder(r.Body).Decode(&request); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	recommendFeed, _ := h.store.RecommendFeed(request.FeedID)
	request.FeedUrl = recommendFeed.FeedUrl
	request.FeedTitle = recommendFeed.Title
	err := h.store.AddBlacklist(&request)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.Created(w, r, request)
}

func (h *handler) removeBlacklist(w http.ResponseWriter, r *http.Request) {
	id := request.RouteInt64Param(r, "id")
	if err := h.store.RemoveBlacklist(id); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}

func (h *handler) setRecommendOption(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	_, err := h.store.UserByID(userID)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}
	var request model.OptionSettingRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&request); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	for _, item := range request.Language {
		if item != "en_US" && item != "zh_CN" {
			json.ServerError(w, r, errors.New("language error"))
			return
		}
	}

	h.store.SetRecommendOpinion(strings.Join(request.Language, ","), request.ShowResult, userID)
	json.NoContent(w, r)

}

func (h *handler) getRecommendOption(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	user, err := h.store.UserByID(userID)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}
	json.OK(w, r, &model.OptionSettingRequest{Language: strings.Split(user.RecommendLanguage, ","), ShowResult: user.ShowRecommendResult})

}
