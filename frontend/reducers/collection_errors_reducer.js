import {
  RECEIVE_COLLECTION_ERRORS,
  CLEAR_COLLECTION_ERRORS } from '../actions/collection_actions';

const CollectionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_COLLECTION_ERRORS:
      newState = action.errors;
      return newState;
    case CLEAR_COLLECTION_ERRORS:
      newState = [];
      return newState;
    default:
      return state;
  }
};

export default CollectionErrorsReducer;
