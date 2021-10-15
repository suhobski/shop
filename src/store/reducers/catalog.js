import {
  FETCH_CATALOG_ERROR,
  FETCH_CATALOG_START,
  FETCH_CATALOG_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
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
    default:
      return state;
  }
}
