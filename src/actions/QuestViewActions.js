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
 } from './types';

export const closeQuestViewModals = () => {
    return {
        type: CLOSE_QVIEW_MODALS
    };
};

export const toggleClueModal = () => {
    return {
      type: TOGGLE_CLUE_MODAL
    };
};

export const toggleFoundModal = () => {
    return {
        type: TOGGLE_FOUND_MODAL
    };
};

export const toggleSureModal = () => {
    return {
        type: TOGGLE_SURE_MODAL
    };
};

export const toggleCompleteModal = () => {
    return {
        type: TOGGLE_COMPLETE_MODAL
    };
};

export const questComplete = () => {
    return {
        type: QUEST_COMPLETE
    };
};

export const markerIsFound = (cheated) => {
    return {
        type: MARKER_FOUND,
        payload: cheated
    };
};

export const loadNextMarker = () => {
    return {
        type: LOAD_NEXT_MARKER
    };
};

export const loadQuest = (quest) => {
    const progress = {};
    let i = 0;
    for (i; i < Object.keys(quest.markers).length; i++) {
        progress[i] = { found: false };
    }
    return {
        type: LOAD_QUEST,
        payload: {
            quest,
            progress
        }
    };
};
