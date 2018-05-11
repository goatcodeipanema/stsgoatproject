import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Map extends Component {

  /*
  -Updates style shortly after mounting to render the showUserLocation button properly. 
  -Needs a renderMarkers() as a prop. Have renderMarkers() return an empty [] if no markers wanted.

  */

  constructor() {
    super();
    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitudeDelta = 0.0922;
    const longitudeDelta = latitudeDelta * (width / height);
    this.animateToPosition = this.animateToPosition.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      containerStyle: {},
      mapStyle: {},
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta
      } 
    };
  }

  componentDidMount() {
    this.mounted = true;
    //Det är lite oklart men det här funkar alltså för att rendera showuserlocation-knappen.
    //Om den inte dyker upp direkt, prova att öka fördröjningen i timern.
    setTimeout(() => this.updateStyle(), 1);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  animateToPosition = () => {
    this.map.animateToRegion(this.state.region, 1000);
  }

  updateStyle() {
    if (this.mounted) {
      this.setState({ 
        containerStyle: {
          flex: 1
        },
        mapStyle: {
        ...StyleSheet.absoluteFillObject
        },
        region: { ...this.state.region, 
          latitude: this.props.userLocation.latitude,
          longitude: this.props.userLocation.longitude,
        } 
      });
      //setTimeout(() => this.animateToPosition(), 1000);
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    const { containerStyle, mapStyle } = this.state;
    return (
      <View style={containerStyle}>
        <MapView
        ref={(component) => { this.map = component; }}
        showsUserLocation
        onRegionChangeComplete={this.onRegionChange}
        style={mapStyle}
        >
          {this.props.renderMarkers()}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = ({ location }) => {
  const { userLocation } = location;
  return { userLocation };
};

export default connect(mapStateToProps, {})(Map);
