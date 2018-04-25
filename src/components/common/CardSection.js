import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderBottomWidth: 10,
    padding: 5,
    backgroundColor: '#ADD8E6',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    //borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
