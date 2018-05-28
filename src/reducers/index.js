import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CreateQuestReducer from './CreateQuestReducer';
import QuestListReducer from './QuestListReducer';
import LocationReducer from './LocationReducer';
import QuestViewReducer from './QuestViewReducer';
import IntroReducer from './IntroReducer';

export default combineReducers({
  auth: AuthReducer,
  createQuest: CreateQuestReducer,
  selected: QuestListReducer,
  location: LocationReducer,
  ongoingQuest: QuestViewReducer,
  intro: IntroReducer
});
