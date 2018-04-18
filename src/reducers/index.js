import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CreateQuestReducer from './CreateQuestReducer';
import QuestListReducer from './QuestListReducer';
import LocationReducer from './LocationReducer';

export default combineReducers({
  auth: AuthReducer,
  createQuest: CreateQuestReducer,
  selected: QuestListReducer,
  location: LocationReducer
});
