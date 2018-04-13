import { QUEST_UPDATE } from './types';

export const questUpdate = ({ prop, value }) => {
  return {
    type: QUEST_UPDATE,
    payload: { prop, value }
  };
};
