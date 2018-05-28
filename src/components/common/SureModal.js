import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ImageButton, WindowedModal } from './';

const mediumButton = require('../../pictures/mediumButton.png');


//Very un-reusable component, is just used for the "Really?" modal in the quest view. 
class SureModal extends Component {

    render() {
        if (!this.props.complete) {
            return (
              <WindowedModal
              visible={this.props.visible}
              toggleModal={this.props.toggleModal}
              modalStyle={this.props.modalStyle}
              >
                <Text style={styles.titleStyle}>Really?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 15 }}>
                  <ImageButton onPress={this.props.giveUp} source={mediumButton} customImageStyle={{ height: 40, width: 100 }} >
                    Yes
                  </ImageButton>
                  <ImageButton onPress={this.props.sureModal} source={mediumButton} customImageStyle={{ height: 40, width: 100 }}>
                    No
                  </ImageButton>
                </View>
              </WindowedModal>
            );
          }
          return (
            <WindowedModal
              visible={this.props.visible}
              toggleModal={this.props.toggleModal}
              modalStyle={this.props.modalStyle}
            >
              <Text style={styles.titleStyle}>Why?</Text>
              <View style={styles.boxStyle}>
                <Text style={styles.textStyle}>Who are you trying to fool? You already found the egg...</Text>
              </View>
            </WindowedModal>
          );
        }
    }
    

  const styles = {
    textStyle: {
      fontSize: 18,
      fontFamily: 'VCR_OSD_MONO_1.001',
      color: 'white'
    },
    titleStyle: {
      fontSize: 40,
      fontFamily: 'VCR_OSD_MONO_1.001',
      marginTop: 5,
      marginLeft: 10,
      color: 'white'
    },
    boxStyle: {
      backgroundColor: 'black',
      flexDirection: 'row',
      borderColor: 'white',
      borderRadius: 2,
      borderWidth: 2,
      padding: 5,
      margin: 10,
      marginTop: 5
    }
  };

  export { SureModal }; 
