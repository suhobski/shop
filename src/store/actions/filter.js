import { ON_CHANGE } from './actionTypes';

export function changeCategory(category) {
  return {
    type: ON_CHANGE,
    category,
  };
}
