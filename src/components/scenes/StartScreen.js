import React from 'react';
import { Text, ImageBackground, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ImageButton, CardSection } from '../common';

const starGif = require('../../pictures/stars.gif');
const blueButton = require('../../pictures/blueButton.png');
//const blueButton = require('../../pictures/mediumButton.png'); Patriks telefon
const goatImage = require('../../pictures/goat2.png');

const StartScreen = () => {
  return (
    <ImageBackground source={starGif} style={styles.backgroundStyle}>
      <CardSection>

          <Image
            style={{ height: 240, width: 240, marginRight: 34 }}
            source={goatImage}
          />
      </CardSection>

      <View style={{ marginBottom: 35, backgroundColor: 'black' }}>
          <Text style={styles.titleStyle}>
          Goat Quest
          </Text>
      </View>

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

    </ImageBackground>
  );
};
const styles = {
  buttonStyle: {
    marginTop: 5,
    marginBottom: 5,
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
    },
    titleStyle: {
      fontFamily: 'upheavtt',
      fontSize: 65,
      // fontSize: 60, patriks telefon
      color: '#FACC2E',

    }
};

export default StartScreen;
