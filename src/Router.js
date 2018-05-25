import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
//import LoginForm from './components/scenes/LoginForm';
import QuestList from './components/scenes/QuestList';
import QuestCreateName from './components/scenes/QuestCreateName';
import QuestCreateMarker from './components/scenes/QuestCreateMarker';
import QuestView from './components/scenes/QuestView';
import StartScreen from './components/scenes/StartScreen';
import Intro from './components/scenes/Intro';

class RouterComponent extends Component {

  render() {
  return (
    <Router
    navigationBarStyle={{ backgroundColor: 'black' }}
    titleStyle={{ color: 'white', fontWeight: '100', fontFamily: 'upheavtt' }}
    tintColor='white'
    >

      <Scene key="root" initial>
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

          <Scene
          title="Intro"
          key="intro"
          component={Intro}
          rightTitle="  Skip"
          onRight={() => Actions.start()}
          />

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
    </Router>
  );
  }
}

export default RouterComponent;
