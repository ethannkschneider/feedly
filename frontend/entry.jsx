import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// START TEST //
import { login, logout, signup } from './util/session_api_util';
import {
  fetchCollections, fetchCollection,
  createCollection, deleteCollection } from './util/collection_api_util';
// END TEST //
document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // START TEST //
  // window.login = login;
  // window.logout = logout;
  // window.signup = signup;
  // window.fetchCollections = fetchCollections;
  // window.fetchCollection = fetchCollection;
  // window.createCollection = createCollection;
  // window.deleteCollection = deleteCollection;
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // END TEST //


  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
});
