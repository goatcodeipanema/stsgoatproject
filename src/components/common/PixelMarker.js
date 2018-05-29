import React, { Component } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

const pixelMarker = require('../../pictures/marker.png');

class PixelMarker extends Component {
    state = {
        initialRender: true
    }

    render() {
        const { coordinate, index } = this.props;
        return (
            <Marker 
            coordinate={coordinate}
            title={(index + 1).toString()}
            identifier={index.toString()}
            key={index}
            >
                <Image
                source={pixelMarker}
                onLayout={() => this.setState({ initialRender: false })}
                key={this.state.initialRender.toString()}
                style={{ width: 33, height: 60 }}
                />
            </Marker>
        );
    }
}

export { PixelMarker };
