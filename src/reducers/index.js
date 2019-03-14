import { combineReducers } from 'redux';
import { collectionReducer } from './collection';

const rootReducer = combineReducers({
  collectionReducer,
});

export default rootReducer;