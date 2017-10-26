import {
  SHOW_SIGNUP_MODAL,
  SHOW_LOGIN_MODAL,
  HIDE_MODALS } from '../actions/modal_actions';
import merge from 'lodash/merge';

const defaultState = {
  modalType: null
};

const ModalsReducer = (state = defaultState, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case SHOW_SIGNUP_MODAL:
      newState = merge({}, state, { modalType: action.type });
      return newState;
    case SHOW_LOGIN_MODAL:
      newState = merge({}, state, { modalType: action.type });
      return newState;
    case HIDE_MODALS:
      return defaultState;
    default:
      return state;
  }
};

export default ModalsReducer;
