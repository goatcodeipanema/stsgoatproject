import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import geolib from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import { locationUpdate, distanceUpdate } from '../actions';

class QuestView extends Component {

  /*
  -Just nu behöver QuestView en quest som prop när den navigeras till.
  -Style för kartan lagras i state eftersom vi behöver uppdatera den
    och rendera om den för att visa showUserLocation-knappen. Det finns 
    typ ingen best practice så vi får väl välja själva hur vi vill ha det.
    Nackdelen med state är att this._mounted måste användas för att inte råka
    kalla setState när komponenten är omountad.
  -Understrecket i this._mounted vet jag inte om det betyder något, men det 
    är ju inte lodash och vi kanske ska döpa om det om det blir förvirrande?
  */

  state = {
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
      Geolocation.getCurrentPosition(
        (success) => {
          this.props.locationUpdate({
            latitude: success.coords.latitude,
            longitude: success.coords.longitude
          });
          this.props.distanceUpdate(
            geolib.getDistance(this.props.userLocation, this.props.quest.marker)
          );
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );
      //Location hämtas löpande genom att funktionen körs igen efter 2 sek. 
      //Det ser dumt ut men setTimeout verkar vara rekommenderat för detta. 
      setTimeout(() => this.getLocation(), 2000);
    }
  }

  updateStyle() {
    if (this._mounted) {
      this.setState({ containerStyle: {
          flex: 3,
        },
        mapStyle: {
        ...StyleSheet.absoluteFillObject
        } 
      });
    }
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
            <Text style={styles.textStyle}>distance to marker: {this.props.distanceToMarker}</Text>
          </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18
  }
};

const mapStateToProps = ({ location }) => {
  const { userLocation, distanceToMarker } = location;
  return { userLocation, distanceToMarker };
};

export default connect(mapStateToProps, {
  locationUpdate, distanceUpdate
})(QuestView);
