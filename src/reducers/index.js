import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CreateQuestReducer from './CreateQuestReducer';
import QuestListReducer from './QuestListReducer';

export default combineReducers({
  auth: AuthReducer,
  createQuest: CreateQuestReducer,
  selected: QuestListReducer
});
