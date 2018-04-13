import React from 'react';
import { View } from 'react-native';
import { Header, Button } from './common';

const HelloWorld = () => {
  return (

    <View style={{ flex: 1 }}>
        <Header headerText="Tech Stack" />
        <Button onPress={() => { console.log('knapp'); }}>
          tjaaaa
        </Button>
    </View>
  );
};

export default HelloWorld;
