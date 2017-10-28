import {
  TURN_OFF_LOADING, TURN_ON_LOADING,
  SHOW_SIDEBAR, HIDE_SIDEBAR} from '../actions/ui_actions';
import merge from 'lodash/merge';

// For now, collectionsIndex is the only key the tells the app if it's loading.

const defaultState = {
  collectionsIndex: true,
  showSidebar: false
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
    case SHOW_SIDEBAR:
      newState = merge({}, state, { showSidebar: true });
      return newState;
    case HIDE_SIDEBAR:
      newState = merge({}, state, { showSidebar: false });
      return newState;
    default:
      return state;
  }
};

export default UiReducer;
