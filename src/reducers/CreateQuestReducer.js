import { QUEST_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  name: '', //PATRIK använder title
  description: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(state);
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case QUEST_UPDATE:
      console.log(state);
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
