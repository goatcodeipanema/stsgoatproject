import React, { Component } from 'react';
import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { CardSection, Button, Card, Input } from './common';
import { questUpdate, questSave, markerCreate } from '../actions';
// Det är ganska mycket i den här filen, möjligt att
//det är snyggare att dela upp det i olika componenter.
class QuestCreateMarker extends Component {

  onButtonPress() {
    const { id, title, description, marker, clue } = this.props;
    console.log(this.props.id);
    this.props.questSave({ id, title, description, marker, clue });
  }

  onDescriptionChange(description) {
    this.props.questUpdate({ prop: 'description', value: description });
  }
  onMapLongPress(e) {
    this.props.markerCreate();
    this.props.questUpdate({ prop: 'marker', value: e.nativeEvent.coordinate });
  }

renderButton() {
  const { clue, marker } = this.props;
  if (clue && marker) {
    //det går inte att skapa en quest utan en clue och att sätta ut markering
    return (
      <Button onPress={this.onButtonPress.bind(this)} >Done</Button>
    );
  }
  return (<Text> Add a clue and place your treasure on the map to continue</Text>);
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
               onDragEnd={(e) => this.props.questUpdate({
                 prop: marker,
                 value: e.nativeEvent.coordinate
               })}
            />
          );
    }
 }
 render() {
   return (
     <Card>
       <CardSection>
             <MapView
               style={styles.map}
               showsUserLocation
               showsMyLocationButton
               region={{
                 latitude: 59.841411,
                 longitude: 17.647855,
                 latitudeDelta: 0.015,
                 longitudeDelta: 0.0121,
               }}
               onLongPress={this.onMapLongPress.bind(this)}
             >
             {this.renderMarkers()}
             </MapView>
        </CardSection>

         <CardSection>
           <Input
             label="Add clue"
             placeholder="Här brukar Pelle svanslös äta surströmming"
             value={this.props.clue}
             onChangeText={value => this.props.questUpdate({ prop: 'clue', value })}
           />

         </CardSection>

         <CardSection>
           {this.renderButton()}
         </CardSection>
     </Card>
   );
 }
}

const styles = {
  map: {
    height: 400,
    flex: 1
  },
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
