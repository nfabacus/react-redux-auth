import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import messageReducer from './message_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  messanger: messageReducer
});

export default rootReducer;
