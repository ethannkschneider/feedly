import { combineReducers } from 'redux';
import CollectionsReducer from './collections_reducer';
import FeedsReducer from './feeds_reducer';

const EntitiesReducer = combineReducers({
  collections: CollectionsReducer,
  feeds: FeedsReducer
});

export default EntitiesReducer;
