// Copyright 2018 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package scheduler // import "miniflux.app/service/scheduler"

import (
	"time"

	"miniflux.app/config"
	"miniflux.app/logger"
	"miniflux.app/metric"
	"miniflux.app/model"
	"miniflux.app/reader/processor"
	"miniflux.app/service/search"
	"miniflux.app/storage"
	"miniflux.app/worker"
)

// Serve starts the internal scheduler.
func Serve(store *storage.Storage, pool *worker.Pool) {
	logger.Info(`Starting scheduler...`)

	go feedScheduler(
		store,
		pool,
		config.Opts.PollingFrequency(),
		config.Opts.BatchSize(),
	)

	go fullContentScheduler(
		store,
	)

	go cleanupScheduler(
		store,
		config.Opts.CleanupFrequencyHours(),
		config.Opts.CleanupArchiveReadDays(),
		config.Opts.CleanupArchiveUnreadDays(),
		config.Opts.CleanupArchiveBatchSize(),
		config.Opts.CleanupRemoveSessionsDays(),
	)
}

var fullContentCheckId int64

func fullContentScheduler(store *storage.Storage) {
	for range time.Tick(time.Duration(5) * time.Second) {
		entry, entryerr := store.EntryForFullContent(fullContentCheckId)
		if entryerr != nil {
			logger.Error("[Scheduler:fullContentScheduler get entroy error %d %v]", fullContentCheckId, entryerr)
		}
		if entry != nil {
			fullContentCheckId = entry.ID

			user, err := store.UserByID(entry.UserID)
			if err != nil || user == nil {
				logger.Error("[Scheduler:fullContentScheduler user error %d]", fullContentCheckId)
			}

			feedBuilder := storage.NewFeedQueryBuilder(store, entry.UserID)
			feedBuilder.WithFeedID(entry.FeedID)
			feed, err := feedBuilder.GetFeed()
			if err != nil || feed == nil {
				logger.Error("[Scheduler:fullContentScheduler feed error %d]", fullContentCheckId)
			}

			entry.Feed = &model.Feed{}
			entry.Feed.ScraperRules = feed.ScraperRules
			entry.Feed.UserAgent = feed.UserAgent
			entry.Feed.Cookie = feed.Cookie
			entry.Feed.RewriteRules = feed.RewriteRules
			if err := processor.ProcessEntryWebPage(feed, entry, user); err != nil {
				logger.Error("[Scheduler:fullContentScheduler get webpage error %d]", fullContentCheckId)
			}

			//icon, _ := store.IconByID(feed.Icon.IconID)
			//var iconContent string

			//if icon != nil {
			//	iconContent = icon.DataURL()
			//}
			var feedNoList []search.FeedNotification
			feedNotification := search.FeedNotification{
				FeedId:   feed.ID,
				FeedName: feed.Title,
				FeedIcon: "",
			}
			feedNoList = append(feedNoList, feedNotification)

			var boardNoList []search.BoarderNotification
			boardNotification := search.BoarderNotification{
				Id:   1,
				Name: "ALL",
			}
			boardNoList = append(boardNoList, boardNotification)
			notificationData := search.NotificationData{
				Name:      entry.Title,
				EntryId:   entry.ID,
				Created:   entry.Date.Unix(),
				FeedInfos: feedNoList,
				Boarders:  boardNoList,
				Content:   entry.Content,
			}
			entry.DocId = search.InputRSS(&notificationData)
			store.UpdateEntryFullContent(entry.ID, entry)
		}
		logger.Info("fullContentScheduler ...")
	}
}

func feedScheduler(store *storage.Storage, pool *worker.Pool, frequency, batchSize int) {
	for range time.Tick(time.Duration(frequency) * time.Minute) {
		jobs, err := store.NewBatch(batchSize)
		if err != nil {
			logger.Error("[Scheduler:Feed] %v", err)
		} else {
			logger.Debug("[Scheduler:Feed] Pushing %d jobs", len(jobs))
			pool.Push(jobs)
		}
		logger.Info("feedScheduler ...")
	}
}

func cleanupScheduler(store *storage.Storage, frequency, archiveReadDays, archiveUnreadDays, archiveBatchSize, sessionsDays int) {
	for range time.Tick(time.Duration(frequency) * time.Hour) {
		nbSessions := store.CleanOldSessions(sessionsDays)
		nbUserSessions := store.CleanOldUserSessions(sessionsDays)
		logger.Info("[Scheduler:Cleanup] Cleaned %d sessions and %d user sessions", nbSessions, nbUserSessions)

		startTime := time.Now()
		if rowsAffected, err := store.ArchiveEntries(model.EntryStatusRead, archiveReadDays, archiveBatchSize); err != nil {
			logger.Error("[Scheduler:ArchiveReadEntries] %v", err)
		} else {
			logger.Info("[Scheduler:ArchiveReadEntries] %d entries changed", rowsAffected)

			if config.Opts.HasMetricsCollector() {
				metric.ArchiveEntriesDuration.WithLabelValues(model.EntryStatusRead).Observe(time.Since(startTime).Seconds())
			}
		}

		startTime = time.Now()
		if rowsAffected, err := store.ArchiveEntries(model.EntryStatusUnread, archiveUnreadDays, archiveBatchSize); err != nil {
			logger.Error("[Scheduler:ArchiveUnreadEntries] %v", err)
		} else {
			logger.Info("[Scheduler:ArchiveUnreadEntries] %d entries changed", rowsAffected)

			if config.Opts.HasMetricsCollector() {
				metric.ArchiveEntriesDuration.WithLabelValues(model.EntryStatusUnread).Observe(time.Since(startTime).Seconds())
			}
		}
	}
}
