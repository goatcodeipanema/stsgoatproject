import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/reducers';
import App from './src/App';

/* Nu skapar vi storen här istället eftersom 
react native inspector inte fungerar om vi gör det i App.js.
Den obegripliga syntaxen med funktion i funktion är hämtat från 
https://github.com/jhen0409/react-native-debugger/issues/112 */

const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

AppRegistry.registerComponent('stsgoatproject', () => () => <App store={store} />);
