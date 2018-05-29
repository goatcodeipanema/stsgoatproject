import React, { Component } from 'react';
import { BackHandler, Keyboard } from 'react-native'; 
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
//import LoginForm from './components/scenes/LoginForm'; Not used in the presentation version. 
import QuestList from './components/scenes/QuestList';
import QuestCreateName from './components/scenes/QuestCreateName';
import QuestCreateMarker from './components/scenes/QuestCreateMarker';
import QuestView from './components/scenes/QuestView';
import StartScreen from './components/scenes/StartScreen';
import Intro from './components/scenes/Intro';
import Help from './components/scenes/Help';
import { skipIntro, setToInitial } from './actions';


/* 
The RouterComponent handles navigation with the help of the <Router /> 
in react-native-router-flux. It also loads and plays the sounds. 
Background music plays when intro is navigated away from.
The LoginForm is not used in this version, 
but the code remains in place as comments.
*/
const Sound = require('react-native-sound');

Sound.setCategory('Playback');
const music = new Sound('spagoat.waw', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  console.log('loaded sound');
});
const spaceWriter = new Sound('spacewriter.waw', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the writer', error);
    return;
  }
  console.log('loaded sound');
});
const backgroundMusic = new Sound('background.waw', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the backgroundmusic', error);
    return;
  }
  console.log('loaded sound');
});

class RouterComponent extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
  }

  handleBackPress() {
    Keyboard.dismiss();
    return true;
  }

  skipIntro() {
    //The props.skipIntro() is from Redux.
    this.props.skipIntro();
    music.stop();
    music.release();
    spaceWriter.stop();
    spaceWriter.release();
    Actions.appStack();
    this.playBackgroundMusic();
  }

  playBackgroundMusic() {
    backgroundMusic.setNumberOfLoops(-1);
    backgroundMusic.play();
  }

  render() {
  return (
    <Router
    navigationBarStyle={{ backgroundColor: 'black' }}
    titleStyle={{ color: 'white', fontWeight: '100', fontFamily: 'upheavtt' }}
    tintColor='white'
    sceneStyle={{ backgroundColor: 'black' }}
    >

      <Scene key="root" initial hideNavBar>
      {/*
        -The scene for the login screen is not used
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
        /> */
      }

          <Scene key='introStack'>
            <Scene
            key="intro"
            component={Intro}
            rightButtonTextStyle={{ color: 'white', fontWeight: '100', fontFamily: 'upheavtt' }}
            rightTitle="  Skip Intro"
            onRight={() => this.skipIntro()}
            music={music}
            spaceWriter={spaceWriter}
            playBackgroundMusic={this.playBackgroundMusic.bind(this)}
            />
          </Scene>
          <Scene key='appStack'>
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              key="start"
              component={StartScreen}    //StartScreen
              rightTitle="?"
              onRight={() => Actions.helpText({ scene: 'start' })}
              onEnter={() => this.props.setToInitial()}
              //onRight={() => { firebase.auth().signOut().then(() => { Actions.auth(); }); }} Logout button
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title="Pick a quest"
              key="questList"
              component={QuestList}    //QuestList
              rightTitle="?"
              onRight={() => Actions.helpText({ scene: 'questList' })}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title='Find the egg!'
              key="questView"
              component={QuestView}      //QuestView
              rightTitle="?"
              onRight={() => Actions.helpText({ scene: 'questView' })}
            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              key="questCreateName"
              component={QuestCreateName}    //QuestCreateName
              title="Create Quest"
              rightTitle="?"
              onRight={() => Actions.helpText({ scene: 'questCreateName' })}

            />
            <Scene
              rightButtonTextStyle={{ color: '#FACC2E', fontSize: 40, fontFamily: 'upheavtt' }}
              title='Choose spots'
              key="questCreateMarker"
              component={QuestCreateMarker}    //QuestCreateMarker
              rightTitle="?"
              onRight={() => Actions.helpText({ scene: 'questCreateMarker' })}
            />
            <Scene
              title='Confused..?'
              key="helpText"
              component={Help}  //The help texts
            />
          </Scene>
      </Scene>
    </Router>
  );
  }
}

const mapStateToProps = () => { return {}; };

export default connect(mapStateToProps, {
  skipIntro,
  setToInitial
})(RouterComponent);
