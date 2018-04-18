import {
    LOCATION_UPDATE, 
    DISTANCE_UPDATE
} from '../actions/types';

export const locationUpdate = (coords) => {
    return {
      type: LOCATION_UPDATE,
      payload: coords
    };
};

export const distanceUpdate = (meters) => {
    return {
      type: DISTANCE_UPDATE,
      payload: meters
    };
};

