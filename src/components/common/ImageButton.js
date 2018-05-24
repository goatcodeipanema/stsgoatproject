import React from 'react';
import { Text, TouchableOpacity, ImageBackground } from 'react-native';

const ImageButton = ({ onPress, source, children, customImageStyle, customButtonStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, customButtonStyle]} >
        <ImageBackground
          source={source}
          style={[styles.imageStyle, customImageStyle]}
        >
          <Text style={styles.textStyle}>
            {children}
          </Text>
        </ImageBackground>

    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 24,
    //fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '400',
    fontFamily: 'upheavtt'
  },
  buttonStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  imageStyle: {

    width: 190,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'

  }
};

export { ImageButton };
