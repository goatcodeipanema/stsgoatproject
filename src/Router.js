import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/scenes/LoginForm';
import QuestList from './components/scenes/QuestList';
import QuestCreateName from './components/scenes/QuestCreateName';
import QuestCreateMarker from './components/scenes/QuestCreateMarker';
import QuestView from './components/scenes/QuestView';
import StartScreen from './components/scenes/StartScreen';

class RouterComponent extends Component {

  render() {
  return (
    <Router
    navigationBarStyle={{ backgroundColor: 'black' }}
    titleStyle={{ color: 'limegreen', fontWeight: '100', fontFamily: 'VCR_OSD_MONO_1.001' }}
    barButtonTextStyle={{ color: 'pink' }}
    barButtonIconStyle={{ tintColor: 'pink' }}
    rightButtonTextStyle={{ color: 'white' }}
    tintColor='white'
    >
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
