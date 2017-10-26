import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';
import SessionReducer from './session_reducer';
import ModalsReducer from './modals_reducer';
import EntitiesReducer from './entitities_reducer';

const RootReducer = combineReducers({
  entitites: EntitiesReducer,
  session: SessionReducer,
  errors: ErrorsReducer,
  modals: ModalsReducer
});

export default RootReducer;
