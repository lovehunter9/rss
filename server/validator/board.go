// Copyright 2021 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package validator // import "miniflux.app/validator"

import (
	"miniflux.app/model"
	"miniflux.app/storage"
)

// ValidateBoardCreation validates Board creation.
func ValidateBoardCreation(store *storage.Storage, userID int64, request *model.BoardRequest) *ValidationError {
	if request.Title == "" {
		return NewValidationError("error.title_required")
	}

	if store.BoardTitleExists(userID, request.Title) {
		return NewValidationError("error.board_already_exists")
	}

	return nil
}

// ValidateBoardModification validates Board modification.
func ValidateBoardModification(store *storage.Storage, userID, boardID int64, request *model.BoardRequest) *ValidationError {
	if request.Title == "" {
		return NewValidationError("error.title_required")
	}

	if store.AnotherBoardExists(userID, boardID, request.Title) {
		return NewValidationError("error.board_already_exists")
	}

	return nil
}

// ValidateBoardCreation validates Board creation.
func ValidateEntryBoardCreation(store *storage.Storage, request *model.EntryToBoardRequest) *ValidationError {
	if request.BoardID <= 0 || request.EntryID <= 0 {
		return NewValidationError("error.field")
	}

	if store.EntryBoardExists(request.EntryID, request.BoardID) {
		return NewValidationError("error.board_already_exists")
	}

	return nil
}
