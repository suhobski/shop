import {
  FETCH_CATALOG_ERROR,
  FETCH_CATALOG_START,
  FETCH_CATALOG_SUCCESS,
} from './actionTypes';

export function fetchCatalogStart() {
  return {
    type: FETCH_CATALOG_START,
  };
}

export function fetchCatalogSuccess(catalog) {
  return {
    type: FETCH_CATALOG_SUCCESS,
    catalog,
  };
}

export function fetchCatalogError(e) {
  return {
    type: FETCH_CATALOG_ERROR,
    error: e,
  };
}

export function fetchCatalog() {
  return async (dispatch) => {
    dispatch(fetchCatalogStart());
    try {
      const cachedData = window.localStorage.getItem('catalog');
      if (cachedData) {
        dispatch(fetchCatalogSuccess(JSON.parse(cachedData)));
        return;
      }

      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      window.localStorage.setItem('catalog', JSON.stringify(data));
      dispatch(fetchCatalogSuccess(data));
      return;
    } catch (e) {
      dispatch(fetchCatalogError(e));
    }
  };
}
