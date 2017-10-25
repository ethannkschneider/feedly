import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';

const configureStore = (preloadedStated = {}) => (
  createStore(
    RootReducer,
    preloadedStated,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
