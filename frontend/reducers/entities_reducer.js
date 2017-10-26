import { combineReducers } from 'redux';
import CollectionsReducer from './collections_reducer';

const EntitiesReducer = combineReducers({
  collections: CollectionsReducer
});

export default EntitiesReducer;
