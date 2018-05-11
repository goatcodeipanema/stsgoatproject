import React, { Component } from 'react';
import geolib from 'geolib';
import _ from 'lodash';
import { Keyboard, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { CardSection, Button, Card, TextArea } from './common';
import WindowedModal from './WindowedModal';
import FadeOverlay from './FadeOverlay';
import {
  questUpdate,
  questSave,
  markerCreate,
  markerUpdate,
  markerSelect,
  toggleMarkerModal,
  toggleDeleteModal,
  deleteMarker,
  updateTotalDistance
     } from '../actions';
// Det är ganska mycket i den här filen, möjligt att
//det är snyggare att dela upp det i olika componenter.
class QuestCreateMarker extends Component {

  onButtonPress() {
    const { id, title, description, markers, totalDistance, allMarkers } = this.props;
    this.props.questSave({ id, title, description, markers, totalDistance, allMarkers });
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
/*
  onMarkerDragStart(e) {
   console.log(e.nativeEvent); // här vill vi ev lägga in nåt sen
  }
  onMarkerDragEnd(e) {
    console.log(e.nativeEvent); //här vill vi ev lägga in nåt sen
  }
*/
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
  return (
    <Button onPress={this.onButtonPress.bind(this)} >Submit quest</Button>
  );
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
               //onDragStart={this.onMarkerDragStart.bind(this)}
               //onDragEnd={this.onMarkerDragEnd.bind(this)}
            />

          ))

        );
      }
  }
  renderInfo() {
    return (
      <CardSection>
      <Text> Number of Eggs: {this.props.markerArray.length} </Text>
      <Text> Total Distance: {this.props.totalDistance} </Text>
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
       selectedMarker
     } = this.props;

     const { titleStyle } = styles;
     return (

       <View style={{ flex: 1 }}>
       <FadeOverlay />
       <Card>
         <CardSection>
               <MapView
                 style={styles.map}
                 showsUserLocation
                 showsMyLocationButton
                 onLongPress={this.onMapLongPress.bind(this)}
                 onPress={this.onMapPress.bind(this)}
                 onMarkerPress={this.onMarkerPress.bind(this)}
                 //onMarkerDragEnd={this.onMarkerDragEnd.bind(this)}
                 //onMarkerDragStart={this.onMarkerDragStart.bind(this)}
               >
               {this.renderMarkers()}
               </MapView>
          </CardSection>

          <CardSection>
            {this.renderInfo()}
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>
         </Card>

          <WindowedModal
          visible={markerModalVisible}
          toggleModal={toggleMarkerModal.bind(this)}
          modalStyle={{ marginTop: 100 }}
          >
            <Text style={titleStyle}>Egg No {this.getNumber(allMarkers.indexOf(selectedMarker))} </Text>
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
                <Button onPress={this.onAccept.bind(this)}>
                  Ok
                </Button>

                <Button onPress={toggleDeleteModal.bind(this)}>
                  Delete Egg
                </Button>
            </View>
            {/* areYouSure Modal */}
            <WindowedModal
            visible={deleteModalVisible}
            toggleModal={toggleDeleteModal.bind(this)}
            modalStyle={styles.sureModalStyle}
            >
              <Text style={titleStyle}>Are you sure?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button onPress={this.onDelete.bind(this)}>
                  Yes
                </Button>
                <Button onPress={toggleDeleteModal.bind(this)}>
                  No
                </Button>
              </View>
            </WindowedModal>
          </WindowedModal>
       </View>
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
    titleStyle: {
      fontSize: 45,
      fontFamily: 'Cake n Truffles',
      marginTop: 5,
      marginLeft: 10
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
      allMarkers
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
      totalDistance,
      allMarkers
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
    updateTotalDistance
   })(QuestCreateMarker);
