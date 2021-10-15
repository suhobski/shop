import {
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  createdProducts:
    JSON.parse(window.localStorage.getItem('createdProducts')) || [],
};

export default function createdProductsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_SUCCESS:
      console.log('CREATE_PRODUCT_SUCCESS');
      return {
        ...state,
        createdProducts: [...state.createdProducts, action.product],
      };
    case CREATE_PRODUCT_ERROR:
      console.log(action.error);
      return {
        ...state,
      };
    default:
      return state;
  }
}
