import { combineReducers } from 'redux';
import CollectionsReducer from './collections_reducer';
import FeedsReducer from './feeds_reducer';
import ArticlesReducer from './articles_reducer';

const EntitiesReducer = combineReducers({
  collections: CollectionsReducer,
  feeds: FeedsReducer,
  articles: ArticlesReducer
});

export default EntitiesReducer;
