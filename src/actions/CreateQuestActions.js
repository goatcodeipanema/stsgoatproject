import firebase from 'firebase';
import {
   QUEST_UPDATE,
   QUEST_SAVE,
   MARKER_CREATE,
   MARKER_UPDATE,
   MARKER_SELECT,
   TOGGLE_MARKER_MODAL,
   TOGGLE_DELETE_MODAL,
   DELETE_MARKER,
   UPDATE_TOTAL_DISTANCE,
   TOGGLE_DONE_MODAL,
   TOGGLE_SUBMITTED_MODAL,
   SET_TO_INITIAL
 } from './types';

export const questUpdate = ({ prop, value }) => {
  return {
    type: QUEST_UPDATE,
    payload: { prop, value }
  };
};

export const questSave = ({ id, title, description, markers, totalDistance, allMarkers }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref('/publicQuests')
    .push({ id, title, description, markers, totalDistance, allMarkers });
    firebase.database().ref(`/users/${currentUser.uid}/quests`)
    .push({ id, title, description, markers })
    .then(() => {
        dispatch({ type: QUEST_SAVE });
    });
  };
};

export const markerCreate = (marker) => {
  return {
    type: MARKER_CREATE,
    payload: marker
  };
};

export const markerUpdate = ({ prop, value }) => {
  return {
    type: MARKER_UPDATE,
    payload: { prop, value }
  };
};

export const markerSelect = (index) => {
  return {
    type: MARKER_SELECT,
    payload: index
  };
};

export const toggleMarkerModal = () => {
    return {
      type: TOGGLE_MARKER_MODAL
    };
};

export const toggleDeleteModal = () => {
    return {
      type: TOGGLE_DELETE_MODAL
    };
};
export const toggleDoneModal = () => {
    return {
      type: TOGGLE_DONE_MODAL
    };
};

export const toggleSubmittedModal = () => {
    return {
      type: TOGGLE_SUBMITTED_MODAL
    };
};
export const deleteMarker = () => {
  return {
    type: DELETE_MARKER
  };
};

export const updateTotalDistance = (distance) => {
  return {
    type: UPDATE_TOTAL_DISTANCE,
    payload: distance
  };
};

export const setToInitial = () => {
  return {
    type: SET_TO_INITIAL
  };
};
