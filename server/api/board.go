// Copyright 2017 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package api // import "miniflux.app/api"

import (
	json_parser "encoding/json"
	"net/http"

	"miniflux.app/http/request"
	"miniflux.app/http/response/json"
	"miniflux.app/model"
	"miniflux.app/validator"
)

func (h *handler) createBoard(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)

	var boardRequest model.BoardRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&boardRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if validationErr := validator.ValidateBoardCreation(h.store, userID, &boardRequest); validationErr != nil {
		json.BadRequest(w, r, validationErr.Error())
		return
	}

	board, err := h.store.CreateBoard(userID, &boardRequest)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.Created(w, r, board)
}

func (h *handler) updateBoard(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	boardID := request.RouteInt64Param(r, "boardID")

	board, err := h.store.Board(userID, boardID)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	if board == nil {
		json.NotFound(w, r)
		return
	}

	var boardRequest model.BoardRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&boardRequest); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if validationErr := validator.ValidateBoardModification(h.store, userID, board.ID, &boardRequest); validationErr != nil {
		json.BadRequest(w, r, validationErr.Error())
		return
	}

	board.Title = boardRequest.Title
	board.Description = boardRequest.Description
	err = h.store.UpdateBoard(board)
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.Created(w, r, board)
}

func (h *handler) getBoards(w http.ResponseWriter, r *http.Request) {
	boards, err := h.store.Boards(request.UserID(r))
	if err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.OK(w, r, boards)
}

func (h *handler) removeBoard(w http.ResponseWriter, r *http.Request) {
	userID := request.UserID(r)
	boardID := request.RouteInt64Param(r, "boardID")

	if !h.store.BoardIDExists(userID, boardID) {
		json.NotFound(w, r)
		return
	}

	if err := h.store.RemoveBoard(userID, boardID); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}

func (h *handler) addEntryToBoard(w http.ResponseWriter, r *http.Request) {

	var request model.EntryToBoardRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&request); err != nil {
		json.BadRequest(w, r, err)
		return
	}
	if validationErr := validator.ValidateEntryBoardCreation(h.store, &request); validationErr != nil {
		json.BadRequest(w, r, validationErr.Error())
		return
	}

	if err := h.store.AddEntryToBoard(request.EntryID, request.BoardID); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}

func (h *handler) removeEntryToBoard(w http.ResponseWriter, r *http.Request) {

	var request model.EntryToBoardRequest
	if err := json_parser.NewDecoder(r.Body).Decode(&request); err != nil {
		json.BadRequest(w, r, err)
		return
	}

	if err := h.store.RemoveEntryFromBoard(request.EntryID, request.BoardID); err != nil {
		json.ServerError(w, r, err)
		return
	}

	json.NoContent(w, r)
}