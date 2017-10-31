import * as FeedUtil from '../util/feed_util';
import { receiveErrors } from './collection_actions';

export const RECEIVE_FEED = "REMOVE_FEED";
export const REMOVE_FEED = "REMOVE_FEED";

export const receiveFeed = (feed) => {
  return {
    type: RECEIVE_FEED,
    feed
  };
};

export const removeFeed = (feedId) => {
  return {
    type: REMOVE_FEED,
    feedId
  };
};

export const subscribeToFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.subscribeToFeed(collectionId, feedId)
    .then( (feed) => dispatch(receiveFeed(feed)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const unsubscribeFromFeed = (collectionId, feedId) => (dispatch) => {
  return FeedUtil.unsubscribeFromFeed(collectionId, feedId)
    .then( (id) => dispatch(removeFeed(id)),
      (errors) => dispatch(receiveErrors(errors)));
};



// HOW DEAL W UNSUBSCRIBE?
// 1) EASIEST WAY SEEMS TO BE TO REQUEST ALL COLLECTIONS AGAIN!
// 2) COULD ALSO DEAL WITH SPECIFIC ACTIONS, BUT THIS GETS MORE COMPLICATED
