import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import HelloWorld from './components/HelloWorld';
import LoginForm from './components/LoginForm';
import QuestList from './components/QuestList';
import QuestCreateName from './components/QuestCreateName';

//hideNavBar i scene root för att undvika dubbla bars längst upp /A
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key="login"
            title="Goat Quest"
            initial
            component={LoginForm}    //LoginForm
          />
        </Scene>
        <Scene 
        key="main"
        initial
        >
          <Scene
            key="start"
            component={HelloWorld}    //StartScreen
          />
          <Scene
            key="questList"
            component={QuestList}    //QuestList
            initial
          />
          <Scene
            key="questView"
            component={HelloWorld}      //QuestView
          />
          <Scene
            key="questCreateName"
            component={QuestCreateName}    //QuestCreateName
            title="Create Quest"
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
