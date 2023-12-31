// Copyright 2018 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package cli // import "miniflux.app/cli"

import (
	"context"
	"fmt"
	"miniflux.app/service/rpc"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"miniflux.app/config"
	"miniflux.app/logger"
	"miniflux.app/metric"
	"miniflux.app/s3action"
	"miniflux.app/service/httpd"
	"miniflux.app/service/scheduler"
	"miniflux.app/storage"
	"miniflux.app/systemd"
	"miniflux.app/worker"
)

const DefaultPort = "6317"

func startDaemon(store *storage.Storage, s3action *s3action.S3action) {
	logger.Info("Starting Miniflux...")

	// rpcServer for zinc
	zincHost := os.Getenv("ZINC_HOST")
	zincPort := os.Getenv("ZINC_PORT")
	url := "http://" + zincHost + ":" + zincPort
	if zincHost == "" || zincPort == "" {
		url = "http://localhost:4080"
	}
	port := os.Getenv("W_PORT")
	if port == "" {
		port = DefaultPort
	}
	username := os.Getenv("ZINC_USER")
	if username == "" {
		username = "admin"
	}
	password := os.Getenv("ZINC_PASSWORD")
	if password == "" {
		password = "User#123"
	}

	fmt.Println("Init RPCSERVER!")
	rpc.InitRpcService(url, port, username, password, map[string]string{})

	fmt.Println("RPCSERVER to start!")
	contx := context.Background()
	rpcErr := rpc.RpcServer.Start(contx)

	if rpcErr != nil {
		panic(rpcErr)
	}
	// rpc server end

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	signal.Notify(stop, syscall.SIGTERM)

	pool := worker.NewPool(store, config.Opts.WorkerPoolSize())

	if config.Opts.HasSchedulerService() && !config.Opts.HasMaintenanceMode() {
		scheduler.Serve(store, pool)
	}

	var httpServer *http.Server
	if config.Opts.HasHTTPService() {
		httpServer = httpd.Serve(store, s3action, pool)
	}

	if config.Opts.HasMetricsCollector() {
		collector := metric.NewCollector(store, config.Opts.MetricsRefreshInterval())
		go collector.GatherStorageMetrics()
	}

	if systemd.HasNotifySocket() {
		logger.Info("Sending readiness notification to Systemd")

		if err := systemd.SdNotify(systemd.SdNotifyReady); err != nil {
			logger.Error("Unable to send readiness notification to systemd: %v", err)
		}

		if config.Opts.HasWatchdog() && systemd.HasSystemdWatchdog() {
			logger.Info("Activating Systemd watchdog")

			go func() {
				interval, err := systemd.WatchdogInterval()
				if err != nil {
					logger.Error("Unable to parse watchdog interval from systemd: %v", err)
					return
				}

				for {
					err := store.Ping()
					if err != nil {
						logger.Error(`Systemd Watchdog: %v`, err)
					} else {
						systemd.SdNotify(systemd.SdNotifyWatchdog)
					}

					time.Sleep(interval / 3)
				}
			}()
		}
	}

	<-stop
	logger.Info("Shutting down the process...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if httpServer != nil {
		httpServer.Shutdown(ctx)
	}

	logger.Info("Process gracefully stopped")
}
