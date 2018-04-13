
import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import RouterComponent from './Router';

class App extends Component {

  componentWillMount() {
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
