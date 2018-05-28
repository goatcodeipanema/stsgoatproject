import React, { Component } from 'react';
import geolib from 'geolib';
import _ from 'lodash';
import { Keyboard, Text, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, ImageButton, TextArea, FadeOverlay, WindowedModal, Card } from '../common';
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
    setTimeout(() => this.props.toggleSubmittedModal(), 500);
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

  renderBoardContent() {
    if (this.props.markerArray.length > 0) {
      return (
        <CardSection>
        <View style={styles.screenStyle}>
          <Text style={styles.screenTextStyle}> {this.props.markerArray.length} </Text>
          <Image source={pixelMarker} style={{ width: 15, height: 28 }} />
        </View>
        <View style={styles.screenStyle}>
        <Text style={styles.screenTextStyle}> {this.props.totalDistance} m </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageButton onPress={this.props.toggleDoneModal.bind(this)} source={mediumButton} customImageStyle={{ height: 30, width: 70 }}> Done </ImageButton>
        </View>
        </CardSection>
      );
    }
    return (

      <View style={styles.screenStyle}>
      <Text style={{ fontSize: 18, color: 'limegreen', fontFamily: 'upheavtt', marginLeft: 10, marginRight: 10 }}>Press and hold on the map to place your first location </Text>
      </View>
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

       <Card>
       <FadeOverlay />
        {/*
       <CardSection>
       <Text style={{ color: 'limegreen' }}> Press and hold to place your locations on the map</Text>
       </CardSection> */}

         <CardSection style={{ flex: 5 }}>
               <Map
                 onLongPress={this.onMapLongPress.bind(this)}
                 onPress={this.onMapPress.bind(this)}
                 onMarkerPress={this.onMarkerPress.bind(this)}
                 renderMarkers={this.renderMarkers.bind(this)}
               />
          </CardSection>
          <View style={styles.boxOneStyle}>
            <View style={styles.boxTwoStyle}>
              <View style={styles.boxThreeStyle}>
                <View style={styles.boxFourStyle}>
                {this.renderBoardContent()}
                </View>
              </View>
            </View>
            </View>
            {/*
          <CardSection>
            {this.renderInfo()}
          </CardSection>
          */}
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <ImageButton onPress={this.onAccept.bind(this)} source={mediumButton} customImageStyle={{ height: 45, width: 120 }}>
                  Ok
                </ImageButton>

                <ImageButton onPress={toggleDeleteModal.bind(this)} source={mediumButton} customImageStyle={{ height: 45, width: 120 }}>
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
               Distance:
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
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
          <CardSection style={{ backgroundColor: 'black', marginTop: 30 }}>
          <Text style={styles.successTitleStyle}>Your quest has been submitted!</Text>
          </CardSection>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <ImageButton onPress={this.questSubmitted.bind(this)} source={blueButton}>
              To startpage
            </ImageButton>
          </View>
          </WindowedModal>
       </Card>
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
      //justifyContent: 'center'
    },

    titleStyle: {
      fontSize: 45,
      paddingLeft: 20,
      fontFamily: 'upheavtt',
      color: 'white',

    },
    successTitleStyle: {
      fontSize: 30,
      paddingLeft: 20,
      fontFamily: 'upheavtt',
      color: 'white',

    },
    smallTitleStyle: {
        fontSize: 28,
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
  },
  boxOneStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxTwoStyle: {
    flex: 1,
    borderWidth: 8,
    borderColor: '#7f7f7f'
  },
  boxThreeStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxFourStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#666666',
    flex: 1,
    borderWidth: 4,
    backgroundColor: '#7f7f7f',
  },
  screenStyle: {
    margin: 5,
    padding: 3,
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#666666',
    flex: 1,
    height: 40
  },
  screenTextStyle: {
    fontSize: 16,
    fontFamily: 'VCR_OSD_MONO_1.001',
    color: 'limegreen'
  },

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
