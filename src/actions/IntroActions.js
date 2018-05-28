import {
    SHOW_INTRO,
    SKIP_INTRO
} from '../actions/types';


export const skipIntro = () => {
    return {
      type: SKIP_INTRO,
    };
  };

  export const showIntro = () => {
      return {
          type: SHOW_INTRO
      };
  };
