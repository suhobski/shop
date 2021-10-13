import { combineReducers } from 'redux';
import catalogReducer from './catalog';
import filterReducer from './filter';

export default combineReducers({
  catalog: catalogReducer,
  filter: filterReducer,
});
