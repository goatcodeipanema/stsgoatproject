
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers';
import RouterComponent from './Router';

export default class App extends Component {
  render() {
    const store = createStore(Reducers, {});
    return (

    <Provider store={store}>
      <RouterComponent />
    </Provider>
    );
  }
}
