import React from 'react';
import { View } from 'react-native';

const ControlBoard = (props) => {
  return (
    <View style={styles.boxOneStyle}>
      <View style={styles.boxTwoStyle}>
        <View style={styles.boxThreeStyle}>
          <View style={styles.boxFourStyle}>
            {props.children}
          </View>
        </View>
      </View>
    </View>

  );
};

const styles = {
  boxOneStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxTwoStyle: {
    flex: 1,
    borderWidth: 8,
    borderColor: '#7f7f7f'
  },
  boxThreeStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxFourStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#666666',
    flex: 1,
    borderWidth: 4,
    backgroundColor: '#7f7f7f',
  },
};

export { ControlBoard };
