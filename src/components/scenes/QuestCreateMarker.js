import React, { Component } from 'react';
import geolib from 'geolib';
import _ from 'lodash';
import { Keyboard, Text, View, ImageBackground, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, ImageButton, TextArea, FadeOverlay, WindowedModal } from '../common';
import Map from '../Map';

import {
  questUpdate,
  questSave,
  markerCreate,
  markerUpdate,
  markerSelect,
  toggleMarkerModal,
  toggleDeleteModal,
  toggleDoneModal,
  deleteMarker,
  updateTotalDistance,
  toggleSubmittedModal
     } from '../../actions';

const starGif = require('../../pictures/stars.gif');
const pixelMarker = require('../../pictures/marker.png');
const blueButton = require('../../pictures/blueButton.png');
const mediumButton = require('../../pictures/mediumButton.png');
// Det är ganska mycket i den här filen, möjligt att
//det är snyggare att dela upp det i olika componenter.
class QuestCreateMarker extends Component {

  questSubmitted() {
    this.props.toggleSubmittedModal();
    Actions.start();
  }

  onSubmitButtonPress() {
    const { id, title, description, markers, totalDistance, allMarkers } = this.props;
    this.props.questSave({ id, title, description, markers, totalDistance, allMarkers });
    setTimeout(() => this.props.toggleSubmittedModal(), 100);
  }

  onMarkerPress(e) {
    this.props.markerSelect(Number(e.nativeEvent.id)); //markerns identifier är objektets key
    this.props.toggleMarkerModal();
  }
  onMapLongPress(e) {
    const { markerArray } = this.props;
    if (markerArray.length > 0) {
      this.props.markerSelect(Number(markerArray[markerArray.length - 1].key) + 1); // väljer nya markerns key som selectedMarker
    } else {
      this.props.markerSelect(0); // om det inte finns några markers väljs 0 som selectedMarker
    }

    this.props.markerCreate({
      coordinate: e.nativeEvent.coordinate,
      clue: '',
    });

    setTimeout(() => this.props.toggleMarkerModal(), 100);
    setTimeout(() => this.calculateDistance(), 100); // beräknar total distance
  }

  onMapPress() {
    Keyboard.dismiss();
  }
  onAccept() {
  this.props.toggleMarkerModal();
  }
  onDelete() {
    this.props.deleteMarker();
    this.props.toggleDeleteModal();
    setTimeout(() => this.props.toggleMarkerModal(), 1);
    setTimeout(() => this.calculateDistance(), 1);
  }
  getNumber(index) {
    return Number(index) + 1; // tar ett index och returnerar nummer. Marker med index 0 ger ägg nummer 1 t.ex
  }

  calculateDistance() {
    let totalDist = 0;
    for (let i = 0; i < this.props.markerArray.length - 1; i++) {
      totalDist += geolib.getDistance(
          this.props.markerArray[i].coordinate, this.props.markerArray[i + 1].coordinate
          );
    }
    this.props.updateTotalDistance(totalDist);
    return totalDist;
  }

  clueValue() {
    if (this.props.markers[this.props.selectedMarker]) {
      return (this.props.markers[this.props.selectedMarker].clue);
    }
      return;
}
renderButton() {
  if (this.props.markerArray.length > 0) {
    return (
      <ImageButton onPress={this.props.toggleDoneModal.bind(this)} source={blueButton}> Done </ImageButton>
    );
  }
}

  renderMarkers() {
      if (this.props.markers) {
        return (
          this.props.markerArray.map((eachMarker, i) => (
            <Marker
               coordinate={eachMarker.coordinate}
               //draggable
               identifier={eachMarker.key.toString()}
               key={i}
               title={this.getNumber(i).toString()}
               pinColor='#FACC2E'
               //onDragStart={this.onMarkerDragStart.bind(this)}
               //onDragEnd={this.onMarkerDragEnd.bind(this)}
            >
            <Image source={pixelMarker} style={{ width: 33, height: 60 }} />
            </Marker>

          ))

        );
      }
      return ([]);
  }

  renderInfo() {
    return (
      <CardSection>
      <Text style={{ color: 'yellow' }}> Number of locations: {this.props.markerArray.length} </Text>
      <Text style={{ color: 'yellow' }}> Total Distance: {this.props.totalDistance} m </Text>
      </CardSection>
    );
  }


   render() {
     const {
       toggleMarkerModal,
       markerModalVisible,
       deleteModalVisible,
       toggleDeleteModal,
       allMarkers,
       selectedMarker,
       doneModalVisible,
       toggleDoneModal,
       submittedModalVisible
     } = this.props;

     const { titleStyle } = styles;
     return (

       <ImageBackground source={starGif} style={styles.backgroundStyle}>
       <FadeOverlay />

       <CardSection>
       <Text style={{ color: 'limegreen' }}> Press and hold to place your locations on the map</Text>
       </CardSection>

         <CardSection style={{ height: 400, width: 400 }}>
               <Map
                 onLongPress={this.onMapLongPress.bind(this)}
                 onPress={this.onMapPress.bind(this)}
                 onMarkerPress={this.onMarkerPress.bind(this)}
                 renderMarkers={this.renderMarkers.bind(this)}
               />
          </CardSection>

          <CardSection>
            {this.renderInfo()}
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>


          <WindowedModal
          visible={markerModalVisible}
          toggleModal={toggleMarkerModal.bind(this)}
          modalStyle={{ marginTop: 100 }}
          >
            <Text style={titleStyle}> NO. {this.getNumber(allMarkers.indexOf(selectedMarker))} </Text>
              <View style={{ flexDirection: 'row' }}>
                <TextArea
                label='Clue: '
                placeholder='This is Goat McFly:s favourite bar'
                value={this.clueValue()}
                onChangeText={value => this.props.markerUpdate({
                   prop: 'clue',
                   value
                })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ImageButton onPress={this.onAccept.bind(this)} source={mediumButton} customImageStyle={{ height: 50, width: 150 }}>
                  Ok
                </ImageButton>

                <ImageButton onPress={toggleDeleteModal.bind(this)} source={mediumButton} customImageStyle={{ height: 50, width: 150 }}>
                  Delete
                </ImageButton>
            </View>
            {/* areYouSure you want to delete? Modal */}
            <WindowedModal
            visible={deleteModalVisible}
            toggleModal={toggleDeleteModal.bind(this)}
            modalStyle={styles.sureModalStyle}
            >
              <Text style={titleStyle}>Sure?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <ImageButton onPress={this.onDelete.bind(this)} source={mediumButton} customImageStyle={{ height: 50, width: 150 }}>
                  Yes
                </ImageButton>
                <ImageButton onPress={toggleDeleteModal.bind(this)} source={mediumButton} customImageStyle={{ height: 50, width: 150 }}>
                  No
                </ImageButton>
              </View>
            </WindowedModal>
          </WindowedModal>
          {/*  Do you want to submit quest?-modal (overview)*/}
          <WindowedModal
          visible={doneModalVisible}
          toggleModal={toggleDoneModal.bind(this)}
          modalStyle={{ marginTop: 100 }}
          >
            <Text style={styles.titleStyle}>Overview</Text>


            <View style={{ marginLeft: 10, flexDirection: 'row', backgroundColor: 'black' }}>
              <Text style={styles.smallTitleStyle}>
                Name:
              </Text>
              <View style={{ backgroundColor: 'black' }}>
                <Text style={styles.textStyle}>
                  {this.props.title}
                </Text>
              </View>
            </View>

            <View style={{ marginLeft: 10, flexDirection: 'row', backgroundColor: 'black' }}>
              <Text style={styles.smallTitleStyle}>
                NO. of stops:
              </Text>
              <View style={{ backgroundColor: 'black' }}>
                <Text style={styles.textStyle}>
                  {this.props.allMarkers.length}
                </Text>
              </View>
            </View>

            <View style={{ marginLeft: 10, flexDirection: 'row', backgroundColor: 'black' }}>
              <Text style={styles.smallTitleStyle}>
               Total distance:
              </Text>
              <View style={{ backgroundColor: 'black' }}>
                <Text style={styles.textStyle}>
                  {this.props.totalDistance} m
                </Text>
              </View>
            </View>

            <View style={{ marginLeft: 10, backgroundColor: 'black' }}>
              <Text style={styles.smallTitleStyle}>
               Description:
              </Text>
              <View style={{ backgroundColor: 'black' }}>
                <Text style={styles.descriptionTextStyle}>
                  {this.props.description}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <ImageButton onPress={this.onSubmitButtonPress.bind(this)} source={blueButton}>
                Submit
              </ImageButton>
            </View>
          </WindowedModal>
          {/* Quest succesfully submitted-modal*/}
          <WindowedModal
          visible={submittedModalVisible}
          toggleModal={this.questSubmitted.bind(this)}
          modalStyle={styles.sureModalStyle}
          >
          <Text style={titleStyle}>Your quest has been succesfully submitted!</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <ImageButton onPress={this.questSubmitted.bind(this)} source={blueButton}>
              To startpage
            </ImageButton>
          </View>
          </WindowedModal>
       </ImageBackground>
     );
   }
  }

  const styles = {
    map: {
      height: 400,
      flex: 1
    },
    cardStyle: {
      alignItems: 'center',
    },
    boxStyle: {
      flexDirection: 'row',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 20,
      borderWidth: 8,
      padding: 5,
      margin: 10,
      marginTop: 0

    },
    sureModalStyle: {
      justifyContent: 'center',
      borderRadius: 0,
      borderColor: 'red'
    },

    backgroundStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    titleStyle: {
      fontSize: 45,
      paddingLeft: 20,
      fontFamily: 'upheavtt',
      color: 'white'
    },
    smallTitleStyle: {
        fontSize: 30,
        fontFamily: 'upheavtt',
        color: '#FACC2E',
        marginRight: 3
    },
    textStyle: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'VCR_OSD_MONO_1.001',
      marginLeft: 5,
      marginTop: 4
  },
    descriptionTextStyle: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'VCR_OSD_MONO_1.001',
      marginLeft: 5,
      marginTop: 4
  }
};

  const mapStateToProps = ({ createQuest }) => {
    const {
      title,
      id,
      description,
      markers,
      selectedMarker,
      markerModalVisible,
      deleteModalVisible,
      totalDistance,
      allMarkers,
      doneModalVisible,
      submittedModalVisible
    } = createQuest;
    //markerArray är en array som innehåller alla markerobjekt och deras nyckel,
    //t.ex [{coordinate: {…}, clue: "clue 1", key: "0"}, {coordinate: {…}, clue: "clue 2", key: "1"} ]
    const markerArray = _.map(markers, (val, key) => {
      return { ...val, key };
    });
    return {
      title,
      id,
      description,
      markers,
      markerArray,
      selectedMarker,
      markerModalVisible,
      deleteModalVisible,
      doneModalVisible,
      totalDistance,
      allMarkers,
      submittedModalVisible
     };
  };

  export default connect(mapStateToProps, {
    questUpdate,
    questSave,
    markerCreate,
    markerUpdate,
    markerSelect,
    toggleMarkerModal,
    toggleDeleteModal,
    deleteMarker,
    updateTotalDistance,
    toggleDoneModal,
    toggleSubmittedModal
   })(QuestCreateMarker);
