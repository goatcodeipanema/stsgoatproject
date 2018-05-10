import {
  TOGGLE_CLUE_MODAL,
  TOGGLE_FOUND_MODAL,
  TOGGLE_SURE_MODAL,
  MARKER_FOUND
 } from './types';

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

export const markerIsFound = () => {
    return {
        type: MARKER_FOUND
    };
};
