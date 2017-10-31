import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_FEED_FROM_COLLECTION } from '../actions/feed_actions';
import { RECEIVE_COLLECTIONS } from '../actions/collection_actions';
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
    // case REMOVE_FEED_FROM_COLLECTION:
      // dup the current user's feed ids:
      // newFeedIds = state.currentUser.feed_ids.slice(0);
      // // find and delete the id of the feed to be removed:
      // if (action.feedId) {
      //   let deletedFeedIndex = newFeedIds.indexOf(action.feedId);
      //   newFeedIds.splice(deletedFeedIndex, 1);
      // }
      //   // do the same for the hash of ids stored in feeds_by_id:
      // let newFeedsById = merge({}, state.currentUser.feeds_by_id);
      // delete newFeedsById[action.feedId];
      // // merge the state back together:
      // let updatedUser = Object.assign(
      //   {},
      //   state.currentUser,
      //   { feed_ids: newFeedIds },
      //   { feeds_by_id: newFeedsById }
      // );
      // newState = Object.assign({}, state, { currentUser: updatedUser });
      // return newState;
    default:
      return state;
  }
};

export default SessionReducer;
