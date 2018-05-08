import React, { Component } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

class WindowedModal extends Component {
  /* 
  -Fungerar typ som en modal fast den går att styla mycket mer.
    Tex. går det att ha transparent backdrop och gömma fönstret 
    genom att klicka på backdrop.
  -justifyContent: undefined hittar jag inte ens någon förklaring
    till när jag googlar men fråga Patrik om ni undrar vad den gör.
  -toggleModal ska ha funktionen som togglar modalen i parentkomponenten
  */

  state

  render() {
   const { visible, modalStyle, containerStyle, toggleModal } = this.props;
    return (
      <Modal
        style={[styles.modalStyle, modalStyle]}
        isVisible={visible}
        onBackdropPress={toggleModal}
        useNativeDriver
      >
        <View style={[styles.containerStyle, containerStyle]}>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    justifyContent: undefined
  },
  containerStyle: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 4,
    backgroundColor: 'white',
    padding: 5
  }
};

export default WindowedModal;
