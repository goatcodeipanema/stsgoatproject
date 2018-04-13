import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import HelloWorld from './components/HelloWorld';
import LoginForm from './components/LoginForm';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth">
          <Scene
            key="login"
            title="Goat Quest"
            initial
            component={LoginForm}    //LoginForm
          />
        </Scene>
        <Scene key="main">
          <Scene
            key="start"
            component={HelloWorld}    //StartScreen
          />
          <Scene
            key="questList"
            component={HelloWorld}    //QuestList
          />
          <Scene
            key="questView"
            component={HelloWorld}      //QuestView
          />
          <Scene
            key="questCreateName"
            component={HelloWorld}    //QuestCreateName
          />
          <Scene
            key="questCreateMarker"
            component={HelloWorld}    //QuestCreateMarker
          />
        </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;
