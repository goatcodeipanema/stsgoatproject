import {
    TOGGLE_CLUE_MODAL,
    TOGGLE_FOUND_MODAL,
    TOGGLE_SURE_MODAL,
    MARKER_FOUND,
    LOAD_NEXT_MARKER,
    LOAD_QUEST
   } from '../actions/types';

const INITIAL_STATE = {
    quest: {
        id: '',
        title: '',
        description: '',
        markers: {}
    },
    progress: {
        0: {
            found: false
        }
    },
    clueModalVisible: false,
    foundModalVisible: false,
    sureModalVisible: false,
    currentMarker: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CLUE_MODAL:
            return { ...state, clueModalVisible: !state.clueModalVisible };
        case TOGGLE_FOUND_MODAL:
            return { ...state, foundModalVisible: !state.foundModalVisible };
        case TOGGLE_SURE_MODAL:
          return { ...state, sureModalVisible: !state.sureModalVisible };
        case MARKER_FOUND:
          return { ...state, progress: { ...state.progress, [state.currentMarker]: { found: true } } };
        case LOAD_NEXT_MARKER:
          return { ...state, currentMarker: parseInt(state.currentMarker) + 1 };
        case LOAD_QUEST:
          return { ...state, quest: action.payload.quest, progress: action.payload.progress };
        default:
            return state;
    }
};
