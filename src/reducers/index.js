import { combineReducers } from 'redux';
import MyReducer from './MyReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  MyReducer,
  auth: AuthReducer
});
