import React, { Component } from 'react';
import { Text, Keyboard, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { CardSection, Button, Card, InputModal } from './common';
import { questUpdate, questSave, markerCreate } from '../actions';
// Det är ganska mycket i den här filen, möjligt att
//det är snyggare att dela upp det i olika componenter.
class QuestCreateMarker extends Component {

  state = { showModal: false }

  onButtonPress() {
    const { id, title, description, marker, clue } = this.props;
    this.props.questSave({ id, title, description, marker, clue });
  }

  onMarkerPress() {
    this.setState({ showModal: !this.state.showModal });
  }
  onMapLongPress(e) {
    this.props.markerCreate();
    this.props.questUpdate({ prop: 'marker', value: e.nativeEvent.coordinate });
  }
  onMapPress() {
    Keyboard.dismiss();
  }
  onAccept() {
  this.setState({ showModal: false });
  }
  onDecline() {
    this.props.questUpdate({ prop: 'clue', value: '' });
    this.setState({ showModal: false });
  }
  onDragEnd(e) {
    this.props.questUpdate({ prop: 'marker', value: e.nativeEvent.coordinate });
  }

  renderButton() {
    const { clue, marker } = this.props;
    if (clue && marker) {
      //det går inte att skapa en quest utan en clue och att sätta ut markering
      return (
        <View>
        <Text> Clue: {clue} </Text>
        <Text> Longitude: {marker.longitude}</Text>
        <Text> Latitude: {marker.latitude}</Text>
        <Button onPress={this.onButtonPress.bind(this)} >Submit quest</Button>
        </View>
      );
    } else if (marker) {
      return (
        <View>
        <Text> Longitude: {marker.longitude}</Text>
        <Text> Latitude: {marker.latitude}</Text>
        <Text> Press your marker to add a clue </Text>
        </View>
      );
    }

    return (<Text> Place your treasure on the map and add a clue to continue</Text>);
  }

  renderMarkers() {
    const { id, title, marker } = this.props;
    if (marker) {
      return (
            <Marker
               key={id}
               coordinate={marker}
               title={title}
               draggable
               showCallout
            />
          );
    }
  }
   render() {
     return (
       <Card style={styles.cardStyle}>

         <CardSection>
               <MapView
                 style={styles.map}
                 showsUserLocation
                 showsMyLocationButton
                 onLongPress={this.onMapLongPress.bind(this)}
                 onPress={this.onMapPress.bind(this)}
                 onMarkerPress={this.onMarkerPress.bind(this)}
                 onMarkerDragEnd={this.onDragEnd.bind(this)}
               >
               {this.renderMarkers()}
               </MapView>

          </CardSection>

         <CardSection>
           {this.renderButton()}
         </CardSection>

          <InputModal
            label='Clue: '
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
            placeholder='This is Goat McFly:s favourite bar'
            value={this.props.clue}
            onChangeText={value => this.props.questUpdate({ prop: 'clue', value })}
          >
            Bäh! Add a clue to help your friends
          </InputModal>

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
      }
    };

  const mapStateToProps = ({ createQuest }) => {
    const { title, id, description, marker, clue } = createQuest;
    return { title, id, description, marker, clue };
  };

  export default connect(mapStateToProps, {
    questUpdate,
    questSave,
    markerCreate
   })(QuestCreateMarker);
