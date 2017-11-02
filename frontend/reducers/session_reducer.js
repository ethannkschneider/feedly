import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_FEED_FROM_COLLECTION } from '../actions/feed_actions';
import { RECEIVE_COLLECTIONS } from '../actions/collection_actions';
import { RECEIVE_READ_IDS } from '../actions/read_actions';
const defaultState = {
  currentUser: null
};

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState, newFeedIds;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({}, state, { currentUser: action.currentUser });
      return newState;
    case RECEIVE_COLLECTIONS:
      let feedIds = [];
      let feedsById = {};
      Object.values(action.collections).forEach( (collection) => {
        collection.feedIds.forEach( (feedId) => {
          feedIds.push(feedId);
          feedsById[feedId] = true;
        });
      });
      let newCurrentUser = Object.assign(
        {},
        state.currentUser,
        { feed_ids: feedIds, feeds_by_id: feedsById }
      );
      newState = Object.assign({}, state, { currentUser: newCurrentUser });
      return newState;
    case RECEIVE_READ_IDS:
      newCurrentUser = Object.assign(
        {},
        state.currentUser,
        { read_article_ids: action.readArticleIds,
          read_articles_by_id:  action.readArticlesById }
      );
      newState = Object.assign({}, state, { currentUser: newCurrentUser });
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
