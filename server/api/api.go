// Copyright 2018 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package api // import "miniflux.app/api"

import (
	"net/http"

	"miniflux.app/s3action"
	"miniflux.app/storage"
	"miniflux.app/worker"

	"github.com/gorilla/mux"
)

type handler struct {
	store    *storage.Storage
	s3action *s3action.S3action
	pool     *worker.Pool
	router   *mux.Router
}

// Serve declares API routes for the application.
func Serve(router *mux.Router, store *storage.Storage, s3action *s3action.S3action, pool *worker.Pool) {
	handler := &handler{store, s3action, pool, router}

	sr := router.PathPrefix("/api").Subrouter()
	middleware := newMiddleware(store)
	sr.Use(middleware.handleCORS)
	sr.Use(middleware.apiKeyAuth)
	sr.Use(middleware.handleStatActive)
	//sr.Use(middleware.basicAuth)
	sr.Methods(http.MethodOptions)
	//sr.HandleFunc("/users", handler.createUser).Methods(http.MethodPost)
	//sr.HandleFunc("/users", handler.users).Methods(http.MethodGet)
	//sr.HandleFunc("/users/{userID:[0-9]+}", handler.userByID).Methods(http.MethodGet)
	//sr.HandleFunc("/users/{userID:[0-9]+}", handler.updateUser).Methods(http.MethodPut)
	//sr.HandleFunc("/users/{userID:[0-9]+}", handler.removeUser).Methods(http.MethodDelete)
	//sr.HandleFunc("/users/{userID:[0-9]+}/mark-all-as-read", handler.markUserAsRead).Methods(http.MethodPut)
	//sr.HandleFunc("/users/{username}", handler.userByUsername).Methods(http.MethodGet)
	//sr.HandleFunc("/me", handler.currentUser).Methods(http.MethodGet)

	sr.HandleFunc("/categories", handler.createCategory).Methods(http.MethodPost)
	sr.HandleFunc("/categories", handler.getCategories).Methods(http.MethodGet)
	sr.HandleFunc("/categories/{categoryID}", handler.updateCategory).Methods(http.MethodPut)
	sr.HandleFunc("/categories/{categoryID}", handler.removeCategory).Methods(http.MethodDelete)

	sr.HandleFunc("/categories/{categoryID}/mark-all-as-read", handler.markCategoryAsRead).Methods(http.MethodPut)
	sr.HandleFunc("/categories/{categoryID}/feeds", handler.getCategoryFeeds).Methods(http.MethodGet)
	sr.HandleFunc("/categories/{categoryID}/refresh", handler.refreshCategory).Methods(http.MethodPut)
	sr.HandleFunc("/categories/{categoryID}/entries", handler.getCategoryEntries).Methods(http.MethodGet)
	sr.HandleFunc("/categories/{categQAoryID}/entries/{entryID}", handler.getCategoryEntry).Methods(http.MethodGet)

	sr.HandleFunc("/discover", handler.discoverSubscriptions).Methods(http.MethodPost)
	sr.HandleFunc("/feeds", handler.createFeed).Methods(http.MethodPost)
	sr.HandleFunc("/feeds", handler.getFeeds).Methods(http.MethodGet)
	sr.HandleFunc("/feeds/counters", handler.fetchCounters).Methods(http.MethodGet)
	sr.HandleFunc("/feeds/refresh", handler.refreshAllFeeds).Methods(http.MethodPut)
	sr.HandleFunc("/feeds/{feedID}/refresh", handler.refreshFeed).Methods(http.MethodPut)
	sr.HandleFunc("/feeds/{feedID}", handler.getFeed).Methods(http.MethodGet)
	sr.HandleFunc("/feeds/{feedID}", handler.updateFeed).Methods(http.MethodPut)
	sr.HandleFunc("/feeds/{feedID}", handler.removeFeed).Methods(http.MethodDelete)
	sr.HandleFunc("/feeds/{feedID}/icon", handler.feedIcon).Methods(http.MethodGet)
	sr.HandleFunc("/feeds/{feedID}/mark-all-as-read", handler.markFeedAsRead).Methods(http.MethodPut)
	sr.HandleFunc("/export", handler.exportFeeds).Methods(http.MethodGet)
	sr.HandleFunc("/import", handler.importFeeds).Methods(http.MethodPost)
	sr.HandleFunc("/feeds/{feedID}/entries", handler.getFeedEntries).Methods(http.MethodGet)
	sr.HandleFunc("/feeds/{feedID}/entries/{entryID}", handler.getFeedEntry).Methods(http.MethodGet)

	sr.HandleFunc("/today", handler.getTodayEntries).Methods(http.MethodGet) //今日entry
	sr.HandleFunc("/today/mark-all-as-read", handler.markTodayAsRead).Methods(http.MethodPut)
	//unreadentry 包括未读数量 调getEntries

	sr.HandleFunc("/unread/mark-all-as-read", handler.markAllAsRead).Methods(http.MethodPut) //unreadentry 设置当前页已读  所有已读

	sr.HandleFunc("/entries", handler.getEntries).Methods(http.MethodGet)
	sr.HandleFunc("/getEntriesByIds", handler.getEntriesByIds).Methods(http.MethodGet)
	sr.HandleFunc("/entries", handler.setEntryStatus).Methods(http.MethodPut)
	sr.HandleFunc("/entries/{entryID}", handler.getEntry).Methods(http.MethodGet)
	sr.HandleFunc("/entries/{entryID}/bookmark", handler.toggleBookmark).Methods(http.MethodPut) //star
	sr.HandleFunc("/entries/{entryID}/fetch-content", handler.fetchContent).Methods(http.MethodGet)

	sr.HandleFunc("/test/fullcontent", handler.getFullContentTest).Methods(http.MethodGet)

	sr.HandleFunc("/entry/status", handler.updateEntriesStatus).Name("updateEntriesStatus").Methods(http.MethodPost) //add 当前页设置已读

	sr.HandleFunc("/boards", handler.createBoard).Methods(http.MethodPost)
	sr.HandleFunc("/boards", handler.getBoards).Methods(http.MethodGet)
	sr.HandleFunc("/boards/{boardID}", handler.updateBoard).Methods(http.MethodPut)
	sr.HandleFunc("/boards/{boardID}", handler.removeBoard).Methods(http.MethodDelete)
	sr.HandleFunc("/entries/addEntryToBoard", handler.addEntryToBoard).Methods(http.MethodPut)
	sr.HandleFunc("/entries/removeEntryFromBoard", handler.removeEntryToBoard).Methods(http.MethodPut)
	sr.HandleFunc("/boards/{boardID}/entries", handler.getBoardEntries).Methods(http.MethodGet)
	sr.HandleFunc("/entries/{entryID}/readlater", handler.readlater).Methods(http.MethodPut)
	sr.HandleFunc("/readlater", handler.getReadLaterEntries).Methods(http.MethodGet)

	sr.HandleFunc("/searchTest", handler.queryTest).Methods(http.MethodGet)

	sr.HandleFunc("/recommendList", handler.getRecommendList).Methods(http.MethodGet)
	sr.HandleFunc("/recommend/{entryID}/readlater", handler.recommendReadLater).Methods(http.MethodPut)
	sr.HandleFunc("/recommend/saveToBoard", handler.recommendSaveToBoard).Methods(http.MethodPut)
	sr.HandleFunc("/recommend/addFeed", handler.recommendAddFeed).Methods(http.MethodPost)
	sr.HandleFunc("/recommend/{entryID}/fetch-content", handler.fetchRecommendContent).Methods(http.MethodGet)
	sr.HandleFunc("/recommend/{entryID}/readComplete", handler.recommendReadCompleteStat).Methods(http.MethodPut)
	sr.HandleFunc("/recommend/readTimeStat", handler.recommendReadTimeStat).Methods(http.MethodPut)

	sr.HandleFunc("/recommend/blacklist", handler.getBlacklist).Methods(http.MethodGet)
	sr.HandleFunc("/recommend/addBlacklist", handler.addBalcklist).Methods(http.MethodPost)
	sr.HandleFunc("/recommend/blacklist/{id}", handler.removeBlacklist).Methods(http.MethodDelete)
	sr.HandleFunc("/recommend/setOption", handler.setRecommendOption).Methods(http.MethodPut)
	sr.HandleFunc("/recommend/getOption", handler.getRecommendOption).Methods(http.MethodGet)

	sr.HandleFunc("/page/addPageToBoard", handler.addPageToBoard).Methods(http.MethodPut)
	sr.HandleFunc("/page/addBatchPageToBoard", handler.addBatchPageToBoard).Methods(http.MethodPut)
	sr.HandleFunc("/rss/contentQuery", handler.contentQuery).Methods(http.MethodGet)

	sr.HandleFunc("/discover/feeds", handler.getDiscoverFeeds).Methods(http.MethodGet)

}
