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
    fontSize: 25,
    //fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '400',
    fontFamily: 'upheavtt'
  },
  buttonStyle: {
    //flex: 1,
    //alignSelf: 'stretch',

    //backgroundColor: 'rgba(143, 255, 163, 1)',
    //backgroundColor: '#139999',
    //borderRadius: 15,
    //borderWidth: 3,
    //borderColor: 'black',
    //width: 160,
    marginLeft: 5,
    marginRight: 5
  },
  imageStyle: {
    width: 200,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center'

  }
};

export { ImageButton };
