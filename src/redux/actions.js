import { FETCH_RECIPY_BEGIN, FETCH_RECIPY_SUCCESS, FETCH_RECIPY_FAILURE,
RATING_STATE_UPDATE,SEARCH_TEXT_UPDATE,FAVORITE_DATA_UPDATE,
MULTI_SELECT_DATA,MULTI_ALL_SELECT_DATA,MULTI_LABEL_OPEN_DATA,MULTI_FILTER_DATA,FETCH_RECIPY_DATA } from './actionTypes';

export const fetchRecipyData = recipies => ({
  type: FETCH_RECIPY_DATA,
  payload: { recipies }
});

export const fetchRecipyBegin = () => ({
  type: FETCH_RECIPY_BEGIN
});

export const fetchRecipySuccess = recipies => ({
  type: FETCH_RECIPY_SUCCESS,
  payload: { recipies }
});

export const fetchRecipyFailure = error => ({
  type: FETCH_RECIPY_FAILURE,
  payload: { error }
});

export const ratingStateUpdate = data => ({
  type: RATING_STATE_UPDATE,
  payload: { data }
});

export const searchTextValue = data => ({
  type: SEARCH_TEXT_UPDATE,
  payload: { data }
});

export const favoriteDataUpdate = data => ({
  type: FAVORITE_DATA_UPDATE,
  payload: { data }
});

// multi filter start
export const multiSelectData = data => ({
  type: MULTI_SELECT_DATA,
  payload: { data }
});

export const multiFilterData = recipies => ({
  type: MULTI_FILTER_DATA,
  payload: { recipies }
});

export const multiAllSelectData = data => ({
  type: MULTI_ALL_SELECT_DATA,
  payload: { data }
});

export const multiLabelOpenData = data => ({
  type: MULTI_LABEL_OPEN_DATA,
  payload: { data }
});