import {
  TURN_OFF_LOADING,
  TURN_ON_LOADING } from '../actions/ui_actions';
import merge from 'lodash/merge';

const defaultState = {
  collectionsIndex: true
};

const UiReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case TURN_OFF_LOADING:
      newState = merge({}, state, { [action.loadingComponent]: false });
      return newState;
    case TURN_ON_LOADING:
      newState = merge({}, state, { [action.loadingComponent]: true });
      return newState;
    default:
      return state;
  }
};

export default UiReducer;
