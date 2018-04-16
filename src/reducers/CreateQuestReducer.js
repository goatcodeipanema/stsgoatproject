import {
  QUEST_UPDATE,
  QUEST_SAVE,
  MARKER_CREATE
 } from '../actions/types';

const INITIAL_STATE = {
    id: 1, //id används inte än så länge men borde användas i framtiden /A
    title: '',
    description: '',
    clue: '',
    marker: null //type: latlng
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case QUEST_SAVE:
      return INITIAL_STATE;
    case MARKER_CREATE:
      return state;
    default:
      return state;
  }
};
