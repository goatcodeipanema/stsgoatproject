import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
   QUEST_UPDATE,
   QUEST_SAVE,
   MARKER_CREATE
 } from './types';

export const questUpdate = ({ prop, value }) => {
  return {
    type: QUEST_UPDATE,
    payload: { prop, value }
  };
};

export const questSave = ({ id, title, description, marker, clue }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref('/publicQuests')
    .push({ id, title, description, marker, clue });
    firebase.database().ref(`/users/${currentUser.uid}/quests`)
    .push({ id, title, description, marker, clue })
    .then(() => {
        dispatch({ type: QUEST_SAVE });
        Actions.main({ type: 'reset' });
    });
  };
};

export const markerCreate = (marker) => {
  return {
    type: MARKER_CREATE,
    payload: marker
  };
};
