import { QUEST_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  name: '', //PATRIK använder title
  description: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
