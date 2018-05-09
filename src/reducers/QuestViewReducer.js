import {
    TOGGLE_CLUE_MODAL,
    TOGGLE_FOUND_MODAL,
    TOGGLE_SURE_MODAL,
    MARKER_FOUND
   } from '../actions/types';

const INITIAL_STATE = {
    clueModalVisible: false,
    foundModalVisible: false,
    sureModalVisible: false,
    markerFound: false
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
          return { ...state, markerFound: true };
        default:
            return state;
    }
};
