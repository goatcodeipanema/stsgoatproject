import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Animated,
    Easing
  } from 'react-native';

class FadeOverlay extends Component {
    constructor() {
        super();
        this.state = {
          fadeValue: new Animated.Value(1),
          style: {},
          animating: true
        };
    }
    componentDidMount() {
        this.setState({
            style: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#000000',
                zIndex: 15,
                opacity: this.state.fadeValue
            }
        });
        this.fadeIn();
    }

    fadeIn() {
        Animated.timing(
          this.state.fadeValue,
          {
            toValue: 0,
            duration: 1000,
            easing: Easing.cubic
          }
        ).start(() => { this.setState({ animating: false }); });
    }

    render() { 
        const { animating, style } = this.state;
        if (animating) {
            return (
                <Animated.View style={style} />
            );
        }
        return (<View />); 
    }
}
export default FadeOverlay;
