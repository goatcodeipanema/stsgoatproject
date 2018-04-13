import React from 'react';
import { TextInput, View, Text } from 'react-native';

const TextArea = ({ label, value, onChangeText, placeholder, numberOfLines }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoCorrect
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    textAlignVertical: 'top',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 300,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'flex-start'
  }

};

export { TextArea };
