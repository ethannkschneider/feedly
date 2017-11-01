import * as FeedUtil from '../util/feed_util';
import { receiveErrors, requestCollections } from './collection_actions';

export const RECEIVE_FEED = "RECEIVE_FEED";
export const REMOVE_FEED_FROM_COLLECTION = "REMOVE_FEED_FROM_COLLECTION";

export const receiveFeed = (feed) => {
  return {
    type: RECEIVE_FEED,
    feed
  };
};

export const removeFeedFromCollection = (feed, collection) => {
  return {
    type: REMOVE_FEED_FROM_COLLECTION,
    feed,
    collection
  };
};

export const subscribeToFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.subscribeToFeed(collectionId, feedId)
    .then( (feed) => dispatch(receiveFeed(feed)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const unsubscribeFromFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.unsubscribeFromFeed(collectionId, feedId)
    .then( (res) => dispatch(removeFeedFromCollection(res.feed, res.collection)),
      (errors) => dispatch(receiveErrors(errors)));
};
