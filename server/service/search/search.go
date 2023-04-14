package search

import (
	"bytes"
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"miniflux.app/config"
	"miniflux.app/logger"
	"miniflux.app/model"
)

type FeedNotification struct {
	FeedId   int64  `json:"feed_id"`
	FeedName string `json:"feed_name"`
	FeedIcon string `json:"feed_icon"`
}

type BoarderNotification struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type NotificationData struct {
	Name      string                `json:"name"`
	EntryId   int64                 `json:"entry_id"`
	Created   int64                 `json:"created"`
	FeedInfos []FeedNotification    `json:"feed_infos"`
	Boarders  []BoarderNotification `json:"boards"`
	Content   string                `json:"content"`
}

type MessageNotificationResponse struct {
	Code int    `json:"code"`
	Data string `json:"data"`
}

type AccessTokenPostRequest struct {
	AppKey    string `json:"app_key"`
	Timestamp int64  `json:"timestamp"`
	Token     string `json:"token"`
	Perm      Perm   `json:"perm"`
}

type DataResponse struct {
	AccessToken string `json:"access_token"`
}

type SystemServerResponse struct {
	Code    int          `json:"code"`
	Message string       `json:"message,omitempty"`
	Data    DataResponse `json:"data"`
}

type Perm struct {
	Group    string   `json:"group"`
	DataType string   `json:"dataType"`
	Version  string   `json:"version"`
	Ops      []string `json:"ops"`
}

func getAccessToken(dataType, group string, ops []string) (string, error) {
	timestamp := time.Now().Unix()
	text := config.Opts.OsAppKey() + strconv.FormatInt(timestamp, 10) + config.Opts.OsAppSecret()
	logger.Info(text)
	token, err := bcrypt.GenerateFromPassword([]byte(text), 10)
	if err != nil {
		return "", err
	}

	logger.Info(string(token))

	accesTokenPostRequest := AccessTokenPostRequest{
		AppKey:    config.Opts.OsAppKey(),
		Timestamp: timestamp,
		Token:     string(token),
		Perm: Perm{
			Group:    group,
			DataType: dataType,
			Version:  "v1",
			Ops:      ops,
		},
	}

	requestBytes, err := json.Marshal(accesTokenPostRequest)
	if err != nil {
		logger.Info("marlshal error %v", err)
		return "", err
	}

	logger.Info("%+v", string(requestBytes))

	bodyReader := bytes.NewReader(requestBytes)
	requestUrl := "http://" + config.Opts.OsSystemServer() + "/permission/v1alpha1/access"
	logger.Info(requestUrl)
	req, err := http.NewRequest(http.MethodPost, requestUrl, bodyReader)
	if err != nil {
		logger.Error("client: could not create request: %s\n", err)
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Access-Control-Allow-Origin", "*")
	req.Header.Set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
	req.Header.Set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")

	logger.Info("%+v", req)

	client := http.Client{
		Timeout: 3 * time.Second,
	}

	resp, err := client.Do(req)
	if err != nil {
		logger.Error("client: error making http request: %s\n", err)
		return "", err
	}
	logger.Info("resp: %+v", resp)

	if resp.StatusCode != http.StatusOK {
		return "", errors.New(resp.Status)
	}
	defer resp.Body.Close()

	logger.Info("resp body: %+v", resp.Body)

	var r SystemServerResponse
	err = json.NewDecoder(resp.Body).Decode(&r)
	if err != nil {
		return "", err
	}

	if r.Code != 0 {
		logger.Info(r.Message)
		return "", errors.New(strconv.Itoa(r.Code) + " " + r.Message)
	}

	return r.Data.AccessToken, nil
}

func IntputRSS(notificationData *NotificationData) string {

	accessToken, err := getAccessToken("search", "service.search", []string{"InputRSS"})
	if err != nil {
		logger.Error("get access token failed: %+v", err)
		return ""
	}

	requestBytes, err := json.Marshal(notificationData)
	if err != nil {
		return ""
	}
	bodyReader := bytes.NewReader(requestBytes)
	requestUrl := "http://" + config.Opts.OsSystemServer() + "/system-server/v1alpha1/message/service.notification/v1"
	logger.Info(requestUrl)
	req, err := http.NewRequest(http.MethodPost, requestUrl, bodyReader)

	if err != nil {
		logger.Error("client: could not create request: %s\n", err)
		return ""
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Access-Control-Allow-Origin", "*")
	req.Header.Set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
	req.Header.Set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
	req.Header.Set("X-Access-Token", accessToken)

	client := http.Client{
		Timeout: 3 * time.Second,
	}

	resp, err := client.Do(req)
	if err != nil {
		logger.Error("client: error making http request: %s\n", err)
		return ""
	}
	logger.Info("%+v", resp)

	if resp.StatusCode != http.StatusOK {
		logger.Error("status code error: %s\n", errors.New(resp.Status))
		return ""
	}
	defer resp.Body.Close()

	body2, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	logger.Info("resp body2: %+v", string(body2))

	var r MessageNotificationResponse
	err = json.NewDecoder(resp.Body).Decode(&r)
	if err != nil {
		logger.Error("response decode error")
		return ""
	}

	if r.Code != 0 {
		logger.Error("response decode error ,code %d:", r.Code)
		return ""
	}

	return r.Data

}

func DeleteRSS(entries model.Entries) {
	accessToken, err := getAccessToken("search", "service.search", []string{"DeleteRSS"})
	if err != nil {
		logger.Error("get access token failed: %+v", err)
		return
	}

	requestUrl := "http://" + config.Opts.OsSystemServer() + "/system-server/v1alpha1/message/service.notification/v1"
	logger.Info(requestUrl)
	for _, entry := range entries {

		req, err := http.NewRequest("POST", requestUrl, strings.NewReader("docId="+entry.DocId))

		if err != nil {
			logger.Error("client: could not create request: %s\n", err)
			return
		}
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		req.Header.Set("Access-Control-Allow-Origin", "*")
		req.Header.Set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
		req.Header.Set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
		req.Header.Set("X-Access-Token", accessToken)

		client := http.Client{
			Timeout: 3 * time.Second,
		}

		resp, err := client.Do(req)
		if err != nil {
			logger.Error("client: error making http request: %s\n", err)
			return
		}
		defer resp.Body.Close()
		logger.Info("%+v", resp)
	}

}
