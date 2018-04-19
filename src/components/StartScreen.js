import React from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, MyAppText } from './common';


const StartScreen = () => {
  return (

    <Card style={styles.cardStyle}>
      <CardSection style={styles.cardStyle}>
        <View>
          <Image
            style={{width: 350, height:350}}
            source={require('../goatPic/bigGoat.png')}
          />
        </View>
      </CardSection>

      <CardSection style={styles.buttonStyle}>
          <Button onPress={() => { Actions.questCreateName(); }}>
            CREATE QUEST
          </Button>
      </CardSection>

      <CardSection>
          <MyAppText>
            OR
          </MyAppText>
      </CardSection>
      <CardSection style={styles.buttonStyle}>
          <Button onPress={() => { Actions.questList(); }}>
            JOIN QUEST
          </Button>
      </CardSection>
    </Card>
  );
};
const styles = {
  buttonStyle: {
    //marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center'
  },
  cardStyle: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default StartScreen;
