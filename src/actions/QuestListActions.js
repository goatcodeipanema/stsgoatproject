import { SELECT_QUEST } from './types';

// Här skickas just nu hela questobjectet som payload.
export const selectQuest = (quest) => {
    return {
      type: SELECT_QUEST,
      payload: quest
    };
};
