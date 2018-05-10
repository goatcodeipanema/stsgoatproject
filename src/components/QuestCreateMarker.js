import React, { Component } from 'react';
import _ from 'lodash';
import { Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { CardSection, Button, Card, InputModal } from './common';
import { questUpdate, questSave, markerCreate, markerUpdate, markerSelect } from '../actions';
// Det är ganska mycket i den här filen, möjligt att
//det är snyggare att dela upp det i olika componenter.
class QuestCreateMarker extends Component {

  state = {
    showModal: false,
   }

  onButtonPress() {
    const { id, title, description, markers } = this.props;
    this.props.questSave({ id, title, description, markers });
  }

  onMarkerPress(e) {
    this.props.markerSelect(e.nativeEvent.id);
    this.setState({ showModal: true });
  }
  onMapLongPress(e) {
    this.props.markerCreate({
      coordinate: e.nativeEvent.coordinate,
      clue: '',
    });
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
      return (
        this.props.markerArray.map((eachMarker, i) => (
          <Marker
             coordinate={eachMarker.coordinate}
             //draggable
             showCallout
             identifier={i.toString()}
             key={i}
             title={eachMarker.number.toString()}
          />
        )
      )
    );
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
                 //onMarkerDragEnd={this.onDragEnd.bind(this)}
                 //onMarkerDragStart={this.onDragStart.bind(this)}
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
            value={this.clueValue()}
            onChangeText={value => this.props.markerUpdate({
               prop: 'clue',
               value
            })}
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
    const { title, id, description, markers, selectedMarker } = createQuest;
    const markerArray = _.map(markers, (val, index) => {
      return { ...val, index, number: Number(index) + 1 };
    });
    return { title, id, description, markers, markerArray, selectedMarker };
  };

  export default connect(mapStateToProps, {
    questUpdate,
    questSave,
    markerCreate,
    markerUpdate,
    markerSelect
   })(QuestCreateMarker);
