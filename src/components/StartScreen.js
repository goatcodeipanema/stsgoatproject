import React from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, MyAppText } from './common';


const StartScreen = () => {
  return (

    <Card>
      <CardSection>
          <Text>
            GOAT QUEeeeST
          </Text>
      </CardSection>
      <CardSection>
          <Button onPress={() => { Actions.questCreateName(); }}>
            CREATE QUEST
          </Button>
      </CardSection>

      <CardSection>
          <MyAppText>
            OR
          </MyAppText>
      </CardSection>
      <CardSection>
          <Button onPress={() => { Actions.questList(); }}>
            JOIN QUEST
          </Button>
      </CardSection>
    </Card>
  );
};

export default StartScreen;
