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
    //backgroundColor: '#C1C1C1',
  },
  inputStyle: {
    color: '#000',
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  }
};

export { SearchBar };
