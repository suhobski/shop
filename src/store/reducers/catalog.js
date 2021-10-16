import {
  FETCH_CATALOG_ERROR,
  FETCH_CATALOG_START,
  FETCH_CATALOG_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from '../actions/actionTypes';

const initialState = {
  catalog: JSON.parse(window.localStorage.getItem('catalog')) || [],
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_START:
      return {
        ...state,
      };
    case FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        catalog: [...action.catalog],
      };
    case FETCH_CATALOG_ERROR:
      return {
        ...state,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        catalog: [...state.catalog, action.product],
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        catalog: [...action.catalog],
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        catalog: [...state.catalog.filter((item) => item.id !== action.id)],
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        catalog: [
          ...state.catalog.filter(
            (item) => String(item.id) !== String(action.id)
          ),
        ],
      };
    default:
      return state;
  }
}
