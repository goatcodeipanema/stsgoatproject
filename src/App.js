
import React, { Component } from 'react';
import { PermissionsAndroid, YellowBox } from 'react-native';
import _ from 'lodash';
import firebase from 'firebase';
import { connect, Provider } from 'react-redux';
import RouterComponent from './Router';
import { locationUpdate, questsFetch } from './actions';

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

  componentDidMount() {
    this.props.questsFetch();
    this.backgroundLocation();
  }

  backgroundLocation() {
    this.props.locationUpdate();
    setTimeout(() => {
      this.backgroundLocation();
    }, 10000
    );
  }

  //Ska lösa problemet med gula varningar om långa timeouts 
  //(som fö beror på ett problem i firebase)  
  ignoreLongTimerWarnings() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    YellowBox.ignoreWarnings(['Remote debugger is in a background tab']);
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

const mapStateToProps = () => { return ({}); };

export default connect(mapStateToProps, { 
  locationUpdate, 
  questsFetch
})(App);
