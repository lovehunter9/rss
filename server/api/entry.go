// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package api // import "miniflux.app/api"

import (
	json_parser "encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"miniflux.app/config"
	"miniflux.app/http/request"
	"miniflux.app/http/response/json"
	"miniflux.app/model"
	"miniflux.app/proxy"
	"miniflux.app/reader/processor"
	"miniflux.app/reader/sanitizer"
	"miniflux.app/reader/scraper"
	"miniflux.app/service/search"
	"miniflux.app/storage"
	"miniflux.app/url"
	"miniflux.app/validator"
)

func (h *handler) getEntryFromBuilder(w http.ResponseWriter, r *http.Request, b *storage.EntryQueryBuilder) {
	entry, err := b.GetEntry()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	if entry == nil {
		json.NotFound(w, r)
		return
	}

	entry.Content = proxy.AbsoluteImageProxyRewriter(h.router, r.Host, entry.Content)
	proxyImage := config.Opts.ProxyImages()

	for i := range entry.Enclosures {
		if strings.HasPrefix(entry.Enclosures[i].MimeType, "image/") && (proxyImage == "all" || proxyImage != "none" && !url.IsHTTPS(entry.Enclosures[i].URL)) {
			entry.Enclosures[i].URL = proxy.AbsoluteProxifyURL(h.router, r.Host, entry.Enclosures[i].URL)
		}
	}

	json.OK(w, r, entry)
}

func (h *handler) getFeedEntry(w http.ResponseWriter, r *http.Request) {
	feedID := request.RouteInt64Param(r, "feedID")
	entryID := request.RouteInt64Param(r, "entryID")

	builder := h.store.NewEntryQueryBuilder(request.UserID(r))
	builder.WithFeedID(feedID)
	builder.WithEntryID(entryID)

	h.getEntryFromBuilder(w, r, builder)
}

func (h *handler) getCategoryEntry(w http.ResponseWriter, r *http.Request) {
	categoryID := request.RouteInt64Param(r, "categoryID")
	entryID := request.RouteInt64Param(r, "entryID")

	builder := h.store.NewEntryQueryBuilder(request.UserID(r))
	builder.WithCategoryID(categoryID)
	builder.WithEntryID(entryID)

	h.getEntryFromBuilder(w, r, builder)
}

func (h *handler) getEntry(w http.ResponseWriter, r *http.Request) {
	entryID := request.RouteInt64Param(r, "entryID")
	builder := h.store.NewEntryQueryBuilder(request.UserID(r))
	builder.WithEntryID(entryID)

	h.getEntryFromBuilder(w, r, builder)
}

func (h *handler) getFeedEntries(w http.ResponseWriter, r *http.Request) {
	feedID := request.RouteInt64Param(r, "feedID")
	h.findEntries(w, r, feedID, 0, time.Time{})
}

func (h *handler) getCategoryEntries(w http.ResponseWriter, r *http.Request) {
	categoryID := request.RouteInt64Param(r, "categoryID")
	h.findEntries(w, r, 0, categoryID, time.Time{})
}

func (h *handler) getEntries(w http.ResponseWriter, r *http.Request) {
	h.findEntries(w, r, 0, 0, time.Time{})
}

func (h *handler) getTodayEntries(w http.ResponseWriter, r *http.Request) {
	t := time.Now()
	todayTime := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
	h.findEntries(w, r, 0, 0, todayTime)
}

func (h *handler) findEntries(w http.ResponseWriter, r *http.Request, feedID int64, categoryID int64, afterDate time.Time) {
	statuses := request.QueryStringParamList(r, "status")
	for _, status := range statuses {
		if err := validator.ValidateEntryStatus(status); err != nil {
			json.BadRequest(w, r, err)
			return
		}
	}

	order := request.QueryStringParam(r, "order", model.DefaultSortingOrder)
	if err := validator.ValidateEntryOrder(order); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	direction := request.QueryStringParam(r, "direction", model.DefaultSortingDirection)
	if err := validator.ValidateDirection(direction); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	limit := request.QueryIntParam(r, "limit", 100)
	offset := request.QueryIntParam(r, "offset", 0)
	if err := validator.ValidateRange(offset, limit); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	userID := request.UserID(r)
	categoryID = request.QueryInt64Param(r, "category_id", categoryID)
	if categoryID > 0 && !h.store.CategoryIDExists(userID, categoryID) {
		json.BadRequest(w, r, errors.New("invalid category ID"))
		return
	}

	feedID = request.QueryInt64Param(r, "feed_id", feedID)
	if feedID > 0 && !h.store.FeedExists(userID, feedID) {
		json.BadRequest(w, r, errors.New("invalid feed ID"))
		return
	}

	builder := h.store.NewEntryQueryBuilder(userID)
	builder.WithFeedID(feedID)
	builder.WithCategoryID(categoryID)
	builder.WithStatuses(statuses)
	builder.WithOrder(order)
	builder.WithDirection(direction)
	builder.WithOffset(offset)
	builder.WithLimit(limit)
	if !afterDate.IsZero() {
		builder.AfterDate(afterDate)
	}
	configureFilters(builder, r)

	entries, err := builder.GetEntries()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	count, err := builder.CountEntries()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	/*for i := range entries {
		entries[i].Content = proxy.AbsoluteImageProxyRewriter(h.router, r.Host, entries[i].Content)
	}*/

	json.OK(w, r, &entriesResponse{Total: count, Entries: entries})
}

func (h *handler) setEntryStatus(w http.ResponseWriter, r *http.Request) {
	var entriesStatusUpdateRequest model.EntriesStatusUpdateRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&entriesStatusUpdateRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if err := validator.ValidateEntriesStatusUpdateRequest(&entriesStatusUpdateRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if err := h.store.SetEntriesStatus(request.UserID(r), entriesStatusUpdateRequest.EntryIDs, entriesStatusUpdateRequest.Status); err != nil {
		json.ServerError(w, r, err)
		return
	}

	if entriesStatusUpdateRequest.Status == model.EntryStatusRemoved {
		entries, _ := h.store.GetEntryBaseInfoByIds(entriesStatusUpdateRequest.EntryIDs)
		search.DeleteRSS(entries)

	}

	json.NoContent(w, r)
}

func (h *handler) toggleBookmark(w http.ResponseWriter, r *http.Request) {
	entryID := request.RouteInt64Param(r, "entryID")
	if err := h.store.ToggleBookmark(request.UserID(r), entryID); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}

func (h *handler) fetchContent(w http.ResponseWriter, r *http.Request) {
	loggedUserID := request.UserID(r)
	entryID := request.RouteInt64Param(r, "entryID")

	enclosures, enclosureErr := h.store.GetEnclosures(entryID)
	if enclosureErr != nil {
		json.ServerError(w, r, enclosureErr)
		return
	}

	h.store.UpdateEntryLastReadTime(entryID)
	content := h.store.GetFullContent(entryID)
	if content != "" {
		json.OK(w, r, &fullContentResponse{Enclosures: enclosures, Content: content})
		return
	}

	entryBuilder := h.store.NewEntryQueryBuilder(loggedUserID)
	entryBuilder.WithEntryID(entryID)
	entryBuilder.WithoutStatus(model.EntryStatusRemoved)

	entry, err := entryBuilder.GetEntry()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	if entry == nil {
		json.NotFound(w, r)
		return
	}

	user, err := h.store.UserByID(entry.UserID)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	if user == nil {
		json.NotFound(w, r)
		return
	}

	feedBuilder := storage.NewFeedQueryBuilder(h.store, loggedUserID)
	feedBuilder.WithFeedID(entry.FeedID)
	feed, err := feedBuilder.GetFeed()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	if feed == nil {
		json.NotFound(w, r)
		return
	}

	if err := processor.ProcessEntryWebPage(feed, entry, user); err != nil {
		json.ServerError(w, r, err)
		return
	}

	h.store.UpdateEntryFullContent(entryID, entry)
	json.OK(w, r, &fullContentResponse{Enclosures: enclosures, Content: content})
}

func configureFilters(builder *storage.EntryQueryBuilder, r *http.Request) {
	beforeEntryID := request.QueryInt64Param(r, "before_entry_id", 0)
	if beforeEntryID > 0 {
		builder.BeforeEntryID(beforeEntryID)
	}

	afterEntryID := request.QueryInt64Param(r, "after_entry_id", 0)
	if afterEntryID > 0 {
		builder.AfterEntryID(afterEntryID)
	}

	beforeTimestamp := request.QueryInt64Param(r, "before", 0)
	if beforeTimestamp > 0 {
		builder.BeforeDate(time.Unix(beforeTimestamp, 0))
	}

	afterTimestamp := request.QueryInt64Param(r, "after", 0)
	if afterTimestamp > 0 {
		builder.AfterDate(time.Unix(afterTimestamp, 0))
	}

	categoryID := request.QueryInt64Param(r, "category_id", 0)
	if categoryID > 0 {
		builder.WithCategoryID(categoryID)
	}

	if request.HasQueryParam(r, "starred") {
		starred, err := strconv.ParseBool(r.URL.Query().Get("starred"))
		if err == nil {
			builder.WithStarred(starred)
		}
	}

	searchQuery := request.QueryStringParam(r, "search", "")
	if searchQuery != "" {
		builder.WithSearchQuery(searchQuery)
	}
}

func (h *handler) updateEntriesStatus(w http.ResponseWriter, r *http.Request) {
	var entriesStatusUpdateRequest model.EntriesStatusUpdateRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&entriesStatusUpdateRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if err := validator.ValidateEntriesStatusUpdateRequest(&entriesStatusUpdateRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	count, err := h.store.SetEntriesStatusCount(request.UserID(r), entriesStatusUpdateRequest.EntryIDs, entriesStatusUpdateRequest.Status)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.OK(w, r, count)
}

func (h *handler) readlater(w http.ResponseWriter, r *http.Request) {
	entryID := request.RouteInt64Param(r, "entryID")
	if err := h.store.ReadLater(request.UserID(r), entryID); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}

func (h *handler) getReadLaterEntries(w http.ResponseWriter, r *http.Request) {
	order := request.QueryStringParam(r, "order", model.DefaultSortingOrder)
	if err := validator.ValidateEntryOrder(order); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	direction := request.QueryStringParam(r, "direction", model.DefaultSortingDirection)
	if err := validator.ValidateDirection(direction); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	limit := request.QueryIntParam(r, "limit", 100)
	offset := request.QueryIntParam(r, "offset", 0)
	if err := validator.ValidateRange(offset, limit); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	builder := h.store.NewEntryQueryBuilder(request.UserID(r))
	builder.WithReadLater(true)
	builder.WithOrder(order)
	builder.WithDirection(direction)
	builder.WithOffset(offset)
	builder.WithLimit(limit)
	configureFilters(builder, r)

	entries, err := builder.GetEntries()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	count, err := builder.CountEntries()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	for i := range entries {
		entries[i].Content = proxy.AbsoluteImageProxyRewriter(h.router, r.Host, entries[i].Content)
	}

	json.OK(w, r, &entriesResponse{Total: count, Entries: entries})

}

func (h *handler) getBoardEntries(w http.ResponseWriter, r *http.Request) {

	order := request.QueryStringParam(r, "order", model.DefaultSortingOrder)
	if err := validator.ValidateEntryOrder(order); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	direction := request.QueryStringParam(r, "direction", model.DefaultSortingDirection)
	if err := validator.ValidateDirection(direction); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	limit := request.QueryIntParam(r, "limit", 100)
	offset := request.QueryIntParam(r, "offset", 0)
	if err := validator.ValidateRange(offset, limit); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	boardID := request.RouteInt64Param(r, "boardID")

	userID := request.UserID(r)

	builder := h.store.NewEntryQueryBuilder(userID)
	builder.WithBoard(boardID)
	builder.WithOrder(order)
	builder.WithDirection(direction)
	builder.WithOffset(offset)
	builder.WithLimit(limit)

	entries, err := builder.GetBoardEntries()
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	count, err := builder.CountBoardEntries(userID, boardID)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	for i := range entries {
		entries[i].Content = proxy.AbsoluteImageProxyRewriter(h.router, r.Host, entries[i].Content)
	}

	json.OK(w, r, &entriesResponse{Total: count, Entries: entries})
}

func (h *handler) queryTest(w http.ResponseWriter, r *http.Request) {
	queryData := request.QueryStringParam(r, "query", "")
	result := ""
	if queryData != "" {
		result = search.QueryRSS(queryData)
	}

	json.OK(w, r, result)
}

func (h *handler) getFullContentTest(w http.ResponseWriter, r *http.Request) {
	url := request.QueryStringParam(r, "url", "")
	title := request.QueryStringParam(r, "title", "")
	/*res, _ := http.Get(url)

	defer res.Body.Close()

	res_body, _ := ioutil.ReadAll(res.Body)
	content := string(res_body)*/

	content, _ := scraper.Fetch(
		url,
		title,
		"",
		"",
		"",
		false,
		false,
	)

	content = sanitizer.Sanitize(url, content)
	json.OK(w, r, content)

}

func (h *handler) contentQuery(w http.ResponseWriter, r *http.Request) {
	queryData := request.QueryStringParam(r, "query", "")
	result := ""
	if queryData != "" {
		result = search.QueryRSS(queryData)
	}

	json.OK(w, r, result)

}

func (h *handler) getEntriesByIds(w http.ResponseWriter, r *http.Request) {
	ids := request.QueryStringParam(r, "ids", "")
	//var idInts []int64
	idInts := make([]int64, 0)
	strlist := strings.Split(ids, ",")
	for _, item := range strlist {
		if item == "" {
			continue
		}
		val, err := strconv.ParseInt(item, 10, 64)
		if err != nil {
			continue
		}
		idInts = append(idInts, int64(val))
	}

	entries, _ := h.store.GetEntriesByIds(idInts)
	json.OK(w, r, entries)
}
