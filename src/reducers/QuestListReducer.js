import { SELECT_QUEST } from '../actions/types';

//Initial state här är bara ett förslag på hur en quest kan se ut. 
//Se till att matcha detta utseende med det vi gör i create quest.
const INITIAL_STATE = {
    selectedQuest: {
        id: 1,
        title: '',
        description: '',
        clue: '',
        marker: {
            latitude: null,
            longitude: null
        }
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_QUEST:
            return { ...state, selectedQuest: action.payload };
        default:
            return state;
    }
};
