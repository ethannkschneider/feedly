import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import CollectionErrorsReducer from './collection_errors_reducer';

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  collection: CollectionErrorsReducer
});

export default ErrorsReducer;
