import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, ImageButton, CardSection } from './common';

const starGif = require('../goatPic/stars.gif');
const blueButton = require('../goatPic/blueButton.png');

const StartScreen = () => {
  return (
    <ImageBackground source={starGif} style={styles.backgroundStyle}>

      <CardSection style={styles.buttonStyle}>
        <ImageButton
          onPress={() => {
            if (Actions.currentScene === 'start') {
              Actions.questCreateName();
            }
          }}
          source={blueButton}
        >
          CREATE QUEST
        </ImageButton>
      </CardSection>

      <CardSection>
          <Text style={styles.textStyle}> OR </Text>
      </CardSection>
      <CardSection style={styles.buttonStyle}>
        <ImageButton
          onPress={() => {
            if (Actions.currentScene === 'start') {
              Actions.questList();
            }
          }}
          source={blueButton}
        >
          JOIN QUEST
        </ImageButton>
      </CardSection>
    </ImageBackground>
  );
};
const styles = {
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },

  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

    textStyle: {
      fontFamily: 'upheavtt',
      fontSize: 40,
      color: 'white'
    }
};

export default StartScreen;
