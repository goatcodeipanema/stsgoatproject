import {
  QUEST_UPDATE,
  QUEST_SAVE,
  MARKER_CREATE,
  MARKER_UPDATE,
  MARKER_SELECT
 } from '../actions/types';

const INITIAL_STATE = {
    id: 1, //id används inte än så länge men borde användas i framtiden /A
    title: '',
    description: '',
    markers: {}, //ska vara objekt med objekt
    selectedMarker: 0 //key
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case QUEST_SAVE:
      return INITIAL_STATE;
    case MARKER_CREATE:
      return {
        ...state,
        markers: {
          ...state.markers,
          [Object.keys(state.markers).length]: action.payload
      }
    };
    case MARKER_UPDATE:
        return {
          ...state,
          markers: {
            ...state.markers,
            [state.selectedMarker]: {
              ...state.markers[state.selectedMarker],
              [action.payload.prop]: action.payload.value
            }
          }

        };
      case MARKER_SELECT:
        return { ...state, selectedMarker: action.payload };
    default:
      return state;
  }
};
