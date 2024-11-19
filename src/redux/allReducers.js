import { FETCH_RECIPY_DATA,FETCH_RECIPY_BEGIN, FETCH_RECIPY_SUCCESS, FETCH_RECIPY_FAILURE, RATING_STATE_UPDATE, SEARCH_TEXT_UPDATE, FAVORITE_DATA_UPDATE, MULTI_SELECT_DATA, MULTI_ALL_SELECT_DATA, MULTI_LABEL_OPEN_DATA, MULTI_FILTER_DATA } from "./actionTypes";

const uniqueNameData = {
    Italian: false,
    Asian: false,
    American: false,
    Mexican: false,
    Mediterranean: false,
    Pakistani: false,
    Japanese: false,
    Moroccan: false,
    Korean: false,
    Greek: false,
    Thai: false,
    Indian: false,
    Turkish: false,
    Smoothie: false,
    Russian: false,
    Lebanese: false,
    Brazilian: false,
};

const initialState = {
    recipyData:[],
    items: [],
    loading: false,
    error: null,
    ratingValue: "",
    searchValue: "",
    favoriteDataValue: false,
    //multi start
    multiSelectDataValue: uniqueNameData,
    multiFilterDataValue: [],
    multiAllSelectDataValue: false,
    multiLabelOpenDataValue: false,
    //infinite scroll
    lazyItems:[], 
    hasMore: true
};

export default function allReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECIPY_DATA:
            return {
                ...state,
                loading: false,
                recipyData: action.payload.recipies,
            };
        case FETCH_RECIPY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_RECIPY_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.recipies                
            };

        case FETCH_RECIPY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };

        case RATING_STATE_UPDATE:
            return {
                ...state,
                ratingValue: action.payload,
            };

        case SEARCH_TEXT_UPDATE:
            return {
                ...state,
                searchValue: action.payload,
            };

        case FAVORITE_DATA_UPDATE:
            return {
                ...state,
                favoriteDataValue: action.payload,
            };

        case MULTI_SELECT_DATA:
            return {
                ...state,
                multiSelectDataValue: action.payload.data,
            };
        case MULTI_FILTER_DATA:
            return {
                ...state,
                multiFilterDataValue: action.payload.recipies,
            };
        case MULTI_ALL_SELECT_DATA:
            return {
                ...state,
                multiAllSelectDataValue: action.payload,
            };

        case MULTI_LABEL_OPEN_DATA:
            return {
                ...state,
                multiLabelOpenDataValue: action.payload,
            };

        default:
            return state;
    }
}
