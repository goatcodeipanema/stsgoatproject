
import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import RouterComponent from './Router';

class App extends Component {

  componentWillMount() {
    this.requestLocationPermission();

    const config = {
    apiKey: 'AIzaSyCTDwncFx89wVwR18wVRW4aO_dLy2olzBM',
    authDomain: 'stsgoatcodeipanema.firebaseapp.com',
    databaseURL: 'https://stsgoatcodeipanema.firebaseio.com',
    projectId: 'stsgoatcodeipanema',
    storageBucket: 'stsgoatcodeipanema.appspot.com',
    messagingSenderId: '917831941462'
    };
    firebase.initializeApp(config);
  }

  async requestLocationPermission() {
    const MY_PERMISSIONS = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ];
    try {
      const granted = await PermissionsAndroid.requestMultiple(MY_PERMISSIONS);
      Object.values(granted).forEach(result => {
        console.log(result);
      });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
