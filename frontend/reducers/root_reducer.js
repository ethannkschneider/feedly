import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';
import SessionReducer from './session_reducer';
import ModalsReducer from './modals_reducer';
import EntitiesReducer from './entities_reducer';
import UiReducer from './ui_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
  errors: ErrorsReducer,
  modals: ModalsReducer,
  ui: UiReducer
});

export default RootReducer;
