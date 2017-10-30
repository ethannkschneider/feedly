import {
  TURN_OFF_LOADING, TURN_ON_LOADING,
  SHOW_SIDEBAR, HIDE_SIDEBAR} from '../actions/ui_actions';
import merge from 'lodash/merge';

// Keys with names of components point to a Boolean specifying if they
// are currently loading; showSidebar is self-explanatory
const defaultState = {
  collectionsIndex: false,
  organizeSources: false,
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
