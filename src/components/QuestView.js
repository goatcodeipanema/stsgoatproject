import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { 
  View, 
  StyleSheet, 
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { locationUpdate, distanceUpdate } from '../actions';
import { Card, FadeOverlay } from './common';

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

  constructor() {
    super();
    this.state = {
      containerStyle: {},
      mapStyle: {},
      rule1: {
        found: false,
        style: {
          color: 'black'
        }
      },
      rule2: {
        found: false,
        style: {
          color: 'black'
        }
      }
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.updateQuestProgress();

    //Det är lite oklart men det här funkar alltså för att rendera knappen.
    //Om den inte dyker upp direkt, prova att öka fördröjningen i timern.
    setTimeout(() => this.updateStyle(), 1);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  updateStyle() {
    if (this._mounted) {
      this.setState({ containerStyle: {
          flex: 3,
        },
        mapStyle: {
        ...StyleSheet.absoluteFillObject
        },
        region: {
          latitude: this.props.userLocation.latitude,
          longitude: this.props.userLocation.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        } 
      });
    }
  }

  updateQuestProgress() {
    //Uppdaterar location och distance.
    if (this._mounted) {
      this.props.locationUpdate();
      this.props.distanceUpdate(this.props.quest.marker);
      this.checkRules();
      setTimeout(() => this.updateQuestProgress(), 300);
    }
  }

  checkRules() {
    if (!this.state.rule1.found) {
      this.checkRule1();
    }
    if (!this.state.rule2.found) {
      this.checkRule2();
    }
  }

  checkRule1() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 15 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.rule1.found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 15 && distanceToMarker > 0) {
              this.setState({
                rule1: {
                  found: true,
                  style: {
                    color: 'red'
                  }
                }
              });
            }
          }
        },
        8000
      );
    }
  }

  checkRule2() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 10 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.rule2.found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 10 && distanceToMarker > 0) {
              this.setState({
                rule2: {
                  found: true,
                  style: {
                    color: 'red'
                  }
                }
              });
            }
          }
        },
        5000
      );
    } 
  }

  render() {
    const { marker } = this.props.quest;
    const { rule1, rule2 } = this.state;
    const { textStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <FadeOverlay />
        <Card>
            <View style={this.state.containerStyle}>
              <MapView 
              showsUserLocation
              initialRegion={this.state.region}
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
              <Text style={textStyle}>distance to marker: {this.props.distanceToMarker}</Text>
              <Text style={textStyle}>User found marker?</Text>
              <Text style={rule1.style}>Rule 1: {rule1.found.toString()}</Text>
              <Text style={rule2.style}>Rule 2: {rule2.found.toString()}</Text>
            </View>
        </Card>
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
