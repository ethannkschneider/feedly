import * as FeedUtil from '../util/feed_util';
import { receiveCollections, receiveErrors } from './collection_actions';

export const subscribeToFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.subscribeToFeed(collectionId, feedId)
    .then( (collections) => dispatch(receiveCollections(collections)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const unsubscribeFromFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.unsubscribeFromFeed(collectionId, feedId)
    .then( (collections) => dispatch(receiveCollections(collections)),
      (errors) => dispatch(receiveErrors(errors)));
};

//Maybe refactor later to only modify relevant parts of state?
