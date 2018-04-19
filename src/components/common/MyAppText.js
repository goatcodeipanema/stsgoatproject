import React from 'react';
import { Text } from 'react-native';

const MyAppText = ({ children }) => {
  return (
    <Text style={styles.textStyle}>
      {children}
    </Text>
  );
};

const styles = {
  textStyle: {
    color: 'black'
  }
};

export { MyAppText };
