import {
  SELECT_QUEST,
  QUESTS_FETCH_SUCCESS,
  QUEST_SAVE,
  DESELECT_QUEST,
  SEARCH_CHANGE
 } from '../actions/types';

//Initial state här är bara ett förslag på hur en quest kan se ut.
//Se till att matcha detta utseende med det vi gör i create quest.
const INITIAL_STATE = {
    selectedQuest: {
        id: '',  // typ 7bd5gr4
        title: '',
        description: '',
        clue: '',
        marker: {
            latitude: null,
            longitude: null
        }
    },
    quests: [], // här kommer quests från databasen publicQuests laddas in
    dataLoaded: false, // så att spinner renderas istället för lista när data laddas
    searchResult: [],
    search: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_QUEST:
            return { ...state, selectedQuest: action.payload };
        case DESELECT_QUEST:
            return { ...state, selectedQuest: '' };
        case QUESTS_FETCH_SUCCESS:
          return { ...state, quests: action.payload, searchResult: [], dataLoaded: true };
        case QUEST_SAVE:
          return INITIAL_STATE;
        case SEARCH_CHANGE:
          return {
            ...state,
             searchResult: action.payload.newData,
             search: action.payload.input
           };
        default:
            return state;
    }
};
