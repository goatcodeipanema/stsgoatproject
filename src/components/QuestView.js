import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import geolib from 'geolib';
import Geolocation from 'react-native-geolocation-service';

class QuestView extends Component {

  //Just nu behöver QuestView en quest som prop när den navigeras till
  //Style för kartan lagras i state eftersom vi behöver uppdatera den,
  //visa min plats-knappen på kartan visas inte om vi inte renderar 
  //först en tom karta och sedan en fylld karta efter en kort fördröjning.
  //Ska snygga till här sen /Patrik

  state = {
    position: {
        latitude: 0.0,
        longitude: 0.0
    },
    distance: 0,
    containerStyle: {},
    mapStyle: {}
  };

  componentDidMount() {
    this._mounted = true;
    this.getLocation();

    //Det är lite oklart men det här funkar alltså för att rendera knappen.
    //Om den inte dyker upp direkt, prova att öka fördröjningen i timern.
    setTimeout(() => this.updateStyle(), 1);
  }

  componentWillUnmount() {
    this._mounted = false;
  }


  getLocation() {
    if (this._mounted) {
      console.log('getLocation');
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
      setTimeout(() => this.getLocation(), 1000);
    }
  }

  updateStyle() {
    this.setState({ containerStyle: {
        flex: 3,
      },
      mapStyle: {
      ...StyleSheet.absoluteFillObject
      } 
    });
  }

  render() {
    const { title, description, clue, marker } = this.props.quest;
    return (
      <View style={{ flex: 1 }}>
          <View style={this.state.containerStyle}>
            <MapView 
            showsUserLocation
            showsMyLocationButton
            // initialRegion = {this.state.region}
            style={this.state.mapStyle}
            >
              <Marker
                coordinate={marker}
                draggable={false}
                pinColor='blue'
              />
            </MapView>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={styles.textStyle}>title: {title}</Text>
            <Text style={styles.textStyle}>description: {description}</Text>
            <Text style={styles.textStyle}>clue: {clue}</Text>
            <Text style={styles.textStyle}>distance to marker: {this.state.distance}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 18
    }
});

export default QuestView;
