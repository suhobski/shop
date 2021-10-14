import { combineReducers } from 'redux';
import catalogReducer from './catalog';
import createdProductsReducer from './createdProducts';
import filterReducer from './filter';

export default combineReducers({
  catalog: catalogReducer,
  filter: filterReducer,
  createdProducts: createdProductsReducer,
});
