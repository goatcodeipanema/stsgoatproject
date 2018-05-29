import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/reducers';
import App from './src/App';

/* To get React Native Inspector working the Redux store is created all the way up here.
The weird syntax with double fat arrows just works and was suggested in this thread:
https://github.com/jhen0409/react-native-debugger/issues/112 */

const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

AppRegistry.registerComponent('stsgoatproject', () => () => <App store={store} />);
