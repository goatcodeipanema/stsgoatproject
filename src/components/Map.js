import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const customMap = require('./MapStyle.json');

class Map extends Component {

  /*
  -Updates style shortly after mounting to render the showUserLocation button properly.
  -Needs a renderMarkers() as a prop. Have renderMarkers() return an empty [] if no markers wanted.

  */

  constructor(props) {
    super(props);
    if (typeof this.props.onLongPress === 'undefined') {
      this.props.onLongPress = () => {};
    }
    if (typeof this.props.onPress === 'undefined') {
      this.props.onPress = () => {};
    }
    if (typeof this.props.onMarkerPress === 'undefined') {
      this.props.onMarkerPress = () => {};
    }

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
    setTimeout(() => this.updateStyle(), 200);
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
      setTimeout(() => this.animateToPosition(), 1000);
    }
  }

  onRegionChange(region) {
    if (this.mounted) {
      this.setState({ region });
    }
  }

  render() {
    const { containerStyle, mapStyle } = this.state;
    const { onPress, onLongPress, onMarkerPress } = this.props;
    return (
      <View style={containerStyle}>
        <MapView
        ref={(component) => { this.map = component; }}
        showsUserLocation
        onRegionChangeComplete={this.onRegionChange}
        style={mapStyle}
        customMapStyle={customMap}
        onLongPress={onLongPress}
        onPress={onPress}
        onMarkerPress={onMarkerPress}
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
