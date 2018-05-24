import React from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from '../common';

const Intro = () => {
  return (
    <Card>
      <CardSection>
        <Text style={styles.textStyle} >Intro gif here</Text>
      </CardSection>
    </Card>
  );
};

const styles = {
  textStyle: {
    color: 'limegreen'
  }
};
export default Intro;
