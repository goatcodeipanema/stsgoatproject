import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ placeholder, onChangeText }) => {
  const { containerStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor='limegreen'
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'transparent'
    //backgroundColor: '#C1C1C1',

  },
  inputStyle: {
    color: 'limegreen',
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 10,
    //backgroundColor: '#FFFFFF',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    fontFamily: 'PressStart2P',
    lineHeight: 14
  }
};

export { SearchBar };
