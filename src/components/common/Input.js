import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, maxLength, autoFocus }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        selectionColor='limegreen'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    //height: 100,
    color: 'limegreen',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    //flex: 1,
    fontFamily: 'PressStart2P',
    lineHeight: 14,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    height: 40

  },
  labelStyle: {
    fontSize: 36,
    //paddingLeft: 20,
    //flex: 1,
    color: '#FACC2E',
    fontFamily: 'upheavtt',
    marginBottom: 5
  },
  containerStyle: {
    marginLeft: 20,
    marginRight: 20,
    //height: 40,
    flex: 1,
    backgroundColor: 'black'
    //flexDirection: 'row',
    //alignItems: 'center'
  },
};

export { Input };
