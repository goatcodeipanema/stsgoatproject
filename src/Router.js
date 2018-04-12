import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import HelloWorld from './components/HelloWorld';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="main" component={HelloWorld} title='HelloWorld' />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
