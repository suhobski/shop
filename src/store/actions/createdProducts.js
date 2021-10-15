import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_SUCCESS } from './actionTypes';

export function createProductSuccess(product) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    product,
  };
}

export function createProductError(e) {
  return {
    type: CREATE_PRODUCT_ERROR,
    error: e,
  };
}
