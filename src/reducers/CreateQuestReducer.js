import { omit } from 'lodash';
import {
  QUEST_UPDATE,
  QUEST_SAVE,
  MARKER_CREATE,
  MARKER_UPDATE,
  MARKER_SELECT,
  TOGGLE_MARKER_MODAL,
  TOGGLE_DELETE_MODAL,
  TOGGLE_DONE_MODAL,
  DELETE_MARKER,
  UPDATE_TOTAL_DISTANCE,
  TOGGLE_SUBMITTED_MODAL,
  SET_TO_INITIAL
 } from '../actions/types';


const INITIAL_STATE = {
    id: '', // type jwsfjyw
    title: '',
    description: '',
    markers: {}, //ska vara objekt med objekt
    allMarkers: [], //array med  markerojektens keys i rätt ordning som de ligger i markers
    selectedMarker: null, //selectedmarker har värdet av markerns objektsnyckel
    markerModalVisible: false,
    deleteModalVisible: false,
    doneModalVisible: false,
    submittedModalVisible: false,
    totalDistance: 0, //totalt avstånd mellan alla markers

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
          [state.selectedMarker]: action.payload
      },
      allMarkers: [...state.allMarkers, state.selectedMarker]
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

      case TOGGLE_MARKER_MODAL:
          return { ...state, markerModalVisible: !state.markerModalVisible };

      case TOGGLE_DONE_MODAL:
          return { ...state, doneModalVisible: !state.doneModalVisible };

      case TOGGLE_SUBMITTED_MODAL:
          return { ...state, submittedModalVisible: !state.submittedModalVisible };
      case TOGGLE_DELETE_MODAL:
          return { ...state, deleteModalVisible: !state.deleteModalVisible };
          //delete_marker tar bort objektet som har key som motsvarar selectedMarker,
          //sätter selectedMarker till null och tar bort objektnyckeln från allMarkers-arrayen
      case DELETE_MARKER:
          return {
            ...state,
            markers: omit(state.markers, state.selectedMarker),
            selectedMarker: null,
            allMarkers: [
              ...state.allMarkers.slice(0, state.allMarkers.indexOf(state.selectedMarker)),
              ...state.allMarkers.slice(state.allMarkers.indexOf(state.selectedMarker) + 1)
            ]
          };
      case UPDATE_TOTAL_DISTANCE:
          return {
              ...state,
              totalDistance: action.payload
          };
      case SET_TO_INITIAL:
        return INITIAL_STATE;
      default:
        return state;
  }
};
