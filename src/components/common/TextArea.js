import React from 'react';
import { TextInput, View, Text } from 'react-native';

const TextArea = ({ label, value, onChangeText, numberOfLines }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCorrect
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
        placeholderTextColor='white'
        maxLength={500}
        selectionColor='limegreen'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    textAlignVertical: 'top',
    color: 'limegreen',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    //width: 240,
    //flex: 2,
    fontFamily: 'VCR_OSD_MONO_1.001',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    //flex: 1
  },
  labelStyle: {
    fontFamily: 'upheavtt',
    fontSize: 36,
    marginBottom: 10,
    //flex: 1,
    color: '#FACC2E'
  },
  containerStyle: {
    //height: 100,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    backgroundColor: 'black'
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'flex-start'
  }

};

export { TextArea };
