import Geolocation from 'react-native-geolocation-service';

import {
    LOCATION_UPDATE, 
    DISTANCE_UPDATE,
    LOCATION_FAIL
} from '../actions/types';

export const locationUpdate = () => {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (success) => {
                const { latitude, longitude } = success.coords;
                const userLocation = { latitude, longitude };
                dispatch({
                    type: LOCATION_UPDATE,
                    payload: userLocation
                });
            },
            (error) => {
                console.log(error.code, error.message);
                dispatch({
                    type: LOCATION_FAIL
                });
            },
            //maximumAge seems to cause crashes, removed it.
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };
};

export const distanceUpdate = (marker) => {
    return {
      type: DISTANCE_UPDATE,
      payload: marker
    };
};

