import { ON_CHANGE_CATEGORY } from '../actions/actionTypes';

const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE_CATEGORY:
      return {
        ...state,
      };
    default:
      return state;
  }
}
