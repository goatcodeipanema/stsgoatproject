import firebase from 'firebase';
import {
  SELECT_QUEST,
  QUESTS_FETCH_SUCCESS
 } from './types';

// Här skickas just nu hela questobjectet som payload.
export const selectQuest = (quest) => {
    return {
      type: SELECT_QUEST,
      payload: quest
    };
};

export const questsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/publicQuests')
    .on('value', snapshot => {
      dispatch({ type: QUESTS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
