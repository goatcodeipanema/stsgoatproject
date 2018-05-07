import React, { Component } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from './common';

class WindowedModal extends Component {
  /* 
  -Fungerar typ som en modal fast den går att styla mycket mer.
    Tex. går det att ha transparent backdrop och gömma fönstret 
    genom att klicka på backdrop.
  -justifyContent: undefined hittar jag inte ens någon förklaring
    till när jag googlar men fråga Patrik om ni undrar vad den gör.
  */

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
   const { modalStyle, containerStyle } = this.props;
    return (
      <View>
        <Modal
          style={[styles.modalStyle, modalStyle]}
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setModalVisible(false)}
          useNativeDriver
        >
          <View style={[styles.containerStyle, containerStyle]}>
            {this.props.children}
          </View>
        </Modal>

        <Button
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          Clue
        </Button>
      </View>
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
