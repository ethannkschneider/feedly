import {
  RECEIVE_COLLECTIONS,
  RECEIVE_COLLECTION,
  REMOVE_COLLECTION
} from '../actions/collection_actions';
import merge from 'lodash/merge';

const CollectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      newState = merge({}, state, action.collections);
      return newState;
    case RECEIVE_COLLECTION:
      newState = merge(
        {}, state, { [action.collection.id]: action.collection }
      );
      return newState;
    case REMOVE_COLLECTION:
      newState = merge({}, state);
      delete newState[action.collectionId];
      return newState;
    default:
      return state;
  }
};

export default CollectionsReducer;
