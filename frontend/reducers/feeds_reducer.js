import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION
} from '../actions/collection_actions';
import merge from 'lodash/merge';

const FeedsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let feeds = {};
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
    // Since we pass up the feed data via the collections partial,
    // we need to do some data massaging to extract the appropriate feeds
    // slice of state, i.e. an object with:
    //{1: {id: 1, title: nytimes, url: hello.com}, 2: {}, etc}:

      // Dup the collections
      const collections = merge({}, action.collections);
      // Get the values from action.collections, i.e. the collections themselves
      // without ids pointing to them, and store the collections in an array.
      const collectionsArr = Object.values(collections);
      // Filter out all information in the collections objects except
      // for 'feeds'.
      const feedsArr = collectionsArr.map( (collection) => {
        return collection.feeds;
      });
      // Now we have an array, each of whose elements is an object containing
      // all of the feeds belonging to a particular collection. These
      // elements have the form {1: {feed info}, 2: {feed info}, etc.}, which
      // exactly how we want the feeds slice of state to look like. However, we
      // need to merge all the groups of feeds together into one object, feeds,
      // which we will then return as the state.
      feedsArr.forEach( (collectionFeeds) => {
        Object.keys(collectionFeeds).forEach( (feedId) => {
          feeds[feedId] = collectionFeeds[feedId];
        });
      });
      // Merge the old state and the new state.
      newState = merge({}, state, feeds);
      return newState;
    case RECEIVE_COLLECTION:
      feeds = action.collection.feeds;
      newState = merge({}, state, feeds);
      return newState;
    case REMOVE_COLLECTION:
      feeds = action.collection.feeds;
      newState = merge({}, state);
      Object.keys(feeds).forEach( (feedId) => {
        delete newState[feedId];
      });
      return newState;
    default:
      return state;
  }
};

export default FeedsReducer;
