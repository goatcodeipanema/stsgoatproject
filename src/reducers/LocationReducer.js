import geolib from 'geolib';
import {
    LOCATION_UPDATE,
    DISTANCE_UPDATE,
    LOCATION_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    //Att vara 0, 0 initialt är kanske dumt, vi kan byta sen.
    userLocation: {
        latitude: 0.0,
        longitude: 0.0
    },
    //Initialt -1 för intervallcheck senare.
    distanceToMarker: -1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_UPDATE:
            return { ...state, userLocation: action.payload };
        case LOCATION_FAIL:
            return state;
        case DISTANCE_UPDATE:
            return { 
                ...state, 
                distanceToMarker: geolib.getDistance(
                    state.userLocation, action.payload
                    )
            };
        default:
            return state;
    }
};
