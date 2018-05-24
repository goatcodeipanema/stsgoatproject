import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Text, ImageBackground } from 'react-native';
import { ImageButton } from './';

const starGif = require('../../pictures/stars.gif');
const smallButton = require('../../pictures/smallButton.png');

class WindowedModal extends Component {
  /*
  -Fungerar typ som en modal fast den går att styla mycket mer.
    Tex. går det att ha transparent backdrop och gömma fönstret
    genom att klicka på backdrop.
  -justifyContent: undefined hittar jag inte ens någon förklaring
    till när jag googlar men fråga Patrik om ni undrar vad den gör.
  -toggleModal ska ha funktionen som togglar modalen i parentkomponenten
  -stängningskrysset kan i framtiden se lite roligare ut kanske
  */

  render() {
   const { visible, modalStyle, containerStyle, toggleModal } = this.props;
    return (
      <Modal
        style={[styles.modalStyle, modalStyle]}
        isVisible={visible}
        onBackdropPress={toggleModal}
        useNativeDriver
      >
        <ImageBackground source={starGif} style={[styles.containerStyle, containerStyle]}>
            <ImageButton 
            onPress={toggleModal} 
            source={smallButton} 
            customImageStyle={{ width: 40, height: 40 }}
            customButtonStyle={styles.closeStyle}
            >
                <Text style={styles.xStyle}>X</Text>
            </ImageButton>
            {this.props.children}
        </ImageBackground>
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    justifyContent: undefined
  },
  containerStyle: {
    borderColor: 'white',
    borderWidth: 4,
    padding: 5
  },
  closeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 15,
    padding: 10,
    paddingRight: 8
  },
  xStyle: {
    fontSize: 22,
    fontFamily: 'VCR_OSD_MONO_1.001',
    letterSpacing: 0
  }
};

export { WindowedModal };
