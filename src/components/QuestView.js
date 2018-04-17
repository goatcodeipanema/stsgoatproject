import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import geolib from 'geolib';
import Geolocation from 'react-native-geolocation-service';

class QuestView extends Component {

    //Just nu behöver QuestView en quest som prop när den navigeras till

    state = {
        position: {
            latitude: 0.0,
            longitude: 0.0
        },
        distance: 0
    };

    componentDidMount() {
        this.press();
    }

    press() {
        Geolocation.getCurrentPosition(
          (success) => {
            this.setState({
              position: {
                latitude: success.coords.latitude,
                longitude: success.coords.longitude
              },
              distance: geolib.getDistance(this.state.position, this.props.quest.marker)
            });
          },
          (error) => {
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
    }

    render() {
        const { title, description, clue, marker } = this.props.quest;
        return (
          <View>
              <View stlye={styles.container}>
                <TouchableHighlight
                onPress={this.press.bind(this)}
                >
                  <View>
                    <Text>title: {title}</Text>
                    <Text>description: {description}</Text>
                    <Text>clue: {clue}</Text>
                    <Text>position: 
                    {this.state.position.latitude}, 
                    {this.state.position.longitude}
                    </Text>
                    <Text>distance: {this.state.distance}</Text>
    
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.container}>
                <MapView 
                showsUserLocation
                showsMyLocationButton
                // initialRegion = {this.state.region}
                style={styles.map}
                >
                  <Marker
                    coordinate={marker}
                    draggable={false}
                    pinColor='blue'
                  />
                </MapView>
              </View>
          </View>
        );
      }
}


const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default QuestView;
