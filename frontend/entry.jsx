import React from 'react';
import ReactDOM from 'react-dom';
// import Root from './components/root';
import configureStore from './store/store';

// START TEST //
import { login, logout, signup } from './util/session_api_util';
// END TEST //
document.addEventListener('DOMContentLoaded', () => {

  const root = document.getElementById("root");
  const store = configureStore();
  // START TEST //
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // END TEST //

  ReactDOM.render(<h1>Welcome to Readly</h1>, root);
});
