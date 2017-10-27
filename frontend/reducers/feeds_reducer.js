import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION
} from '../actions/collection_actions';
import merge from 'lodash/merge';

const FeedsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState, feeds;
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      newState = merge({}, state, action.collections);
    case RECEIVE_COLLECTION:
      return newState;
    case REMOVE_COLLECTION:

      return newState;
    default:
      return state;
  }
};

export default FeedsReducer;
