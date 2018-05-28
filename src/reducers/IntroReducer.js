import {
    SKIP_INTRO,
    SHOW_INTRO
} from '../actions/types';

const INITIAL_STATE = {
    showingIntro: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SKIP_INTRO:
            return { showingIntro: false };
        case SHOW_INTRO:
            return { showingIntro: true };
        default:
            return state;
    }
};
