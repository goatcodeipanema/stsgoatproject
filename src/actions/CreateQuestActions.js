import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
   QUEST_UPDATE,
   QUEST_SAVE,
   MARKER_CREATE,
   MARKER_UPDATE,
   MARKER_SELECT
 } from './types';

export const questUpdate = ({ prop, value }) => {
  return {
    type: QUEST_UPDATE,
    payload: { prop, value }
  };
};

export const questSave = ({ id, title, description, markers }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref('/publicQuests')
    .push({ id, title, description, markers });
    firebase.database().ref(`/users/${currentUser.uid}/quests`)
    .push({ id, title, description, markers })
    .then(() => {
        dispatch({ type: QUEST_SAVE });
        Actions.main();
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
