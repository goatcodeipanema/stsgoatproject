import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
//import LoginForm from './components/scenes/LoginForm';
import QuestList from './components/scenes/QuestList';
import QuestCreateName from './components/scenes/QuestCreateName';
import QuestCreateMarker from './components/scenes/QuestCreateMarker';
import QuestView from './components/scenes/QuestView';
import StartScreen from './components/scenes/StartScreen';
import Intro from './components/scenes/Intro';

const Sound = require('react-native-sound');

Sound.setCategory('Playback');
const music = new Sound('spagoat.waw', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('loaded sound');
});
const spaceWriter = new Sound('spacewriter.waw', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the writer', error);
    return;
  }
  // loaded successfully
  console.log('loaded sound');
});

class RouterComponent extends Component {

  skipIntro() {
    music.stop();
    music.release();
    spaceWriter.stop();
    spaceWriter.release();
    Actions.appStack();
  }

  render() {
  return (
    <Router
    navigationBarStyle={{ backgroundColor: 'black' }}
    titleStyle={{ color: 'white', fontWeight: '100', fontFamily: 'upheavtt' }}
    tintColor='white' //Funkar den här utan måsvingar?
    sceneStyle={{ backgroundColor: 'black' }}
    >

      <Scene key="root" initial hideNavBar>
      {/*
        <Scene key="auth" hideNavBar>
          <Scene
            key="login"
            //title="Goat Quest"
            component={LoginForm}    //LoginForm
          />
        </Scene>
        <Scene
        key="intro"
        component={Intro}
        /> */}

          <Scene key='introStack'>
            <Scene
            key="intro"
            component={Intro}
            rightButtonTextStyle={{ color: 'white', fontWeight: '100', fontFamily: 'upheavtt' }}
            rightTitle="  Skip Intro"
            onRight={() => this.skipIntro()}
            music={music}
            spaceWriter={spaceWriter}
            />
          </Scene>
          <Scene key='appStack'>
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              key="start"
              component={StartScreen}    //StartScreen
              rightTitle="?"
              onRight={() => console.log('help startscreen')}
              //onRight={() => { firebase.auth().signOut().then(() => { Actions.auth(); }); }}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title="Pick a quest"
              key="questList"
              component={QuestList}    //QuestList
              rightTitle="?"
              onRight={() => console.log('help questlist')}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title='Can you find the egg?'
              key="questView"
              component={QuestView}      //QuestView
              rightTitle="?"
              onRight={() => console.log('help questview')}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              key="questCreateName"
              component={QuestCreateName}    //QuestCreateName
              title="Create Quest"
              rightTitle="?"
              onRight={() => console.log('help create name')}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title='Choose spots'
              key="questCreateMarker"
              component={QuestCreateMarker}    //QuestCreateMarker
              rightTitle="?"
              onRight={() => console.log('help create marker')}
            />
          </Scene>
      </Scene>
    </Router>
  );
  }
}

export default RouterComponent;
