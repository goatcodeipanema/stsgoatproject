import {
    TOGGLE_CLUE_MODAL,
    TOGGLE_FOUND_MODAL,
    TOGGLE_SURE_MODAL,
    TOGGLE_COMPLETE_MODAL,
    CLOSE_QVIEW_MODALS,
    MARKER_FOUND,
    LOAD_NEXT_MARKER,
    LOAD_QUEST,
    QUEST_COMPLETE
   } from '../actions/types';

const INITIAL_STATE = {
    quest: {
        id: '',
        title: '',
        description: '',
        markers: {}
    },
    progress: {
        complete: false,
        0: {
            found: false,
            cheated: false
        }
    },
    clueModalVisible: false,
    foundModalVisible: false,
    sureModalVisible: false,
    completeModalVisible: false,
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
        case TOGGLE_COMPLETE_MODAL:
            return { ...state, completeModalVisible: !state.completeModalVisible };
        case CLOSE_QVIEW_MODALS:
            return {
                ...state,
                clueModalVisible: false,
                foundModalVisible: false,
                sureModalVisible: false,
                completeModalVisible: false
            };
        case MARKER_FOUND:
            return {
                ...state,
                progress: {
                    ...state.progress,
                    [state.currentMarker]: { found: true, cheated: action.payload }
                }
            };
        case LOAD_NEXT_MARKER:
            return { ...state, currentMarker: parseInt(state.currentMarker) + 1 };
        case LOAD_QUEST:
            return {
                ...INITIAL_STATE,
                quest: action.payload.quest,
                progress: action.payload.progress
            };
        case QUEST_COMPLETE:
            return { ...state, progress: { ...state.progress, complete: true } };
        default:
            return state;
    }
};
