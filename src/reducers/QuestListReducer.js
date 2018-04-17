import {
  SELECT_QUEST,
  QUESTS_FETCH_SUCCESS,
  QUEST_SAVE
 } from '../actions/types';

//Initial state här är bara ett förslag på hur en quest kan se ut.
//Se till att matcha detta utseende med det vi gör i create quest.
const INITIAL_STATE = {
    selectedQuest: {
        id: 1,
        title: 'hej',
        description: '',
        clue: '',
        marker: {
            latitude: null,
            longitude: null
        }
    },
    quests: [],
    dataLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_QUEST:
            return { ...state, selectedQuest: action.payload };
//dataLoaded måste kanske sättas till falsk någon gång
        case QUESTS_FETCH_SUCCESS:
          return { ...state, quests: action.payload, dataLoaded: true };
        case QUEST_SAVE:
          return INITIAL_STATE;
        default:
            return state;
    }
};
