import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import QuestReducer from './QuestReducer';

export default combineReducers({
  auth: AuthReducer,
  selected: QuestReducer
});
