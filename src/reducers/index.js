import { combineReducers } from 'redux';
import MyReducer from './MyReducer';
import AuthReducer from './AuthReducer';
import CreateQuestReducer from './CreateQuestReducer';

export default combineReducers({
  MyReducer,
  auth: AuthReducer,
  createQuest: CreateQuestReducer
});
