import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(143, 255, 163, 1)',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'black',
    width: 150,
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
