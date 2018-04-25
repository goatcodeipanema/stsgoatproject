import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';


const StartScreen = () => {
  return (
    <Card style={styles.cardStyle}>

      <CardSection style={styles.buttonStyle}>
        <Button 
          onPress={() => { 
            if (Actions.currentScene === 'start') {
              Actions.questCreateName(); 
            }
          }}
        >
          CREATE QUEST
        </Button>
      </CardSection>

      <CardSection>
          <Text style={styles.textStyle}> OR </Text>
      </CardSection>
      <CardSection style={styles.buttonStyle}>
        <Button 
          onPress={() => { 
            if (Actions.currentScene === 'start') {
              Actions.questList(); 
            }
          }}
        >
          JOIN QUEST
        </Button>
      </CardSection>
    </Card>
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

    textStyle: {
      fontFamily: 'Cake n Truffles',
      fontSize: 40
    }
};

export default StartScreen;
