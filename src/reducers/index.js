import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CreateQuestReducer from './CreateQuestReducer';
import QuestReducer from './QuestReducer';

export default combineReducers({
  auth: AuthReducer,
  createQuest: CreateQuestReducer,
  selected: QuestReducer
});
