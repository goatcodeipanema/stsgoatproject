import React from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HelloWorld from './components/HelloWorld';
import LoginForm from './components/LoginForm';

import QuestList from './components/QuestList';
import QuestCreateName from './components/QuestCreateName';

//hideNavBar i scene root för att undvika dubbla bars längst upp /A

import StartScreen from './components/StartScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" initial>
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
            initial
            component={StartScreen}    //StartScreen
            rightTitle="Log off"
            onRight={() => { firebase.auth().signOut().then(() => { Actions.auth(); }); }}
          />
          <Scene
            key="questList"
            component={QuestList}    //QuestList
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
