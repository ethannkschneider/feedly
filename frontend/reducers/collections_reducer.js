import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION
} from '../actions/collection_actions';
import { REMOVE_FEED_FROM_COLLECTION } from '../actions/feed_actions';
import merge from 'lodash/merge';

const CollectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let newCollection, newCollections;
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      newCollections = merge({}, action.collections);
      Object.keys(newCollections).forEach( (id) => {
        delete newCollections[id].feeds;
      });
      newState = Object.assign({}, state, newCollections);
      return newState;
    case RECEIVE_COLLECTION:
      newCollection = merge({}, action.collection);
      delete newCollection.feeds;
      newState = merge(
        {}, state, { [action.collection.id]: newCollection }
      );
      return newState;
    case REMOVE_COLLECTION:
      newState = merge({}, state);
      delete newState[action.collectionId];
      return newState;
    case REMOVE_FEED_FROM_COLLECTION:
      newState = Object.assign({}, state);
      let collectionId = Object.keys(action.collection)[0];
      newState[collectionId] = action.collection;
      return newState;
    default:
      return state;
  }
};

export default CollectionsReducer;
