import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button } from './common';

class HelloWorld extends Component {
  
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
          <Header headerText="Tech Stack" />
          <Button onPress={() => { console.log('knapp'); }}>
            tjaaaa
          </Button>
      </View>
    );
  }
}

export default HelloWorld;
