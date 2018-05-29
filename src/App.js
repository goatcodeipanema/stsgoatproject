
import React, { Component } from 'react';
import { PermissionsAndroid, YellowBox, StatusBar } from 'react-native';
import _ from 'lodash';
import firebase from 'firebase';
import { connect, Provider } from 'react-redux';
import RouterComponent from './RouterComponent';
import { locationUpdate, questsFetch, loginUser } from './actions';

class App extends Component {

  /* The top level React component. 
  Connects with firebase, gets location permission 
  starts reading location and wraps the RouterComponent */

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
    StatusBar.setHidden(true, "fade");
    this.props.questsFetch();
    //Really tries to get an initial background location without spamming later.
    this.props.locationUpdate();
    setTimeout(() => {
      this.props.locationUpdate();
      setTimeout(() => {
        this.props.locationUpdate();
      }, 3000);
    }, 3000);

    this.backgroundLocation();
    this.props.loginUser('test@test.com', 'password');
  }

  backgroundLocation() {
    this.props.locationUpdate();
    setTimeout(() => {
      this.backgroundLocation();
    }, 30000
    );
  }

  //Firebase sets long timers and the warnings are so annoying...
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
  questsFetch,
  loginUser
})(App);
