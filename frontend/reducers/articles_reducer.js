import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION
} from '../actions/collection_actions';
import merge from 'lodash/merge';

const ArticlesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let articles = {};
  // See feeds_reducer for explanation of data massaging. Basically,
  // we are passing up all article data via the collections index.
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      const collections = merge({}, action.collections);
      const collectionsArr = Object.values(collections);
      const articlesArr = collectionsArr.map( (collection) => {
        return collection.articles;
      }).filter(Boolean);

      articlesArr.forEach( (collectionArticles) => {
        Object.keys(collectionArticles).forEach( (articleId) => {
          articles[articleId] = collectionArticles[articleId];
        });
      });

      newState = merge({}, state, articles);
      return newState;
    case RECEIVE_COLLECTION:
      articles = action.collection.articles;
      newState = merge({}, state, articles);
      return newState;
    case REMOVE_COLLECTION:
      articles = action.collection.articles;
      newState = merge({}, state);
      Object.keys(articles).forEach( (articleId) => {
        delete newState[articleId];
      });
      return newState;
    default:
      return state;
  }
};

export default ArticlesReducer;
