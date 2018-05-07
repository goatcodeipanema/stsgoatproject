
import React, { Component } from 'react';
import { PermissionsAndroid, YellowBox } from 'react-native';
import _ from 'lodash';
import firebase from 'firebase';
import { Provider } from 'react-redux';
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
    this.ignoreLongTimerWarnings();
  }

  //Ska lösa problemet med gula varningar om långa timeouts 
  //(som fö beror på ett problem i firebase)  
  ignoreLongTimerWarnings() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const _console = _.clone(console);
    console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
      }
    };
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
    return (
      <Provider store={this.props.store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
