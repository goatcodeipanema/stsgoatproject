import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

import QuestList from './components/QuestList';
import QuestCreateName from './components/QuestCreateName';
import QuestCreateMarker from './components/QuestCreateMarker';
import QuestView from './components/QuestView';

//hideNavBar i scene root för att undvika dubbla bars längst upp /A

import StartScreen from './components/StartScreen';
 // root ska vara initial
class RouterComponent extends Component {

  render() {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" hideNavBar>
          <Scene
            key="login"
            //title="Goat Quest"
            component={LoginForm}    //LoginForm
          />
        </Scene>
        <Scene key="main" initial>
          <Scene
            key="start"
            component={StartScreen}    //StartScreen
            rightTitle="Log off"
            onRight={() => { firebase.auth().signOut().then(() => { Actions.auth(); }); }}
          />
          <Scene
            title="Pick a quest"
            key="questList"
            component={QuestList}    //QuestList
          />
          <Scene
            key="questView"
            component={QuestView}      //QuestView
          />
          <Scene
            key="questCreateName"
            component={QuestCreateName}    //QuestCreateName
            title="Create Quest"
          />
          <Scene
            title='Press and hold to place marker'
            key="questCreateMarker"
            component={QuestCreateMarker}    //QuestCreateMarker
          />
        </Scene>

      </Scene>
    </Router>
  );
  }
}

export default RouterComponent;
