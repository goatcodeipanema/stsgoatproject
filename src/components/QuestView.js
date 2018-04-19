import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
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
    },
    rule3: {
      found: false,
      style: {
        color: 'black'
      }
    }
  };

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


  updateQuestProgress() {
    //Uppdaterar location och distance varannan sekund.
    if (this._mounted) {
      this.props.locationUpdate();
      this.props.distanceUpdate(this.props.quest.marker);
      this.checkRules();
      setTimeout(() => this.updateQuestProgress(), 500);
    }
  }

  checkRules() {
    if (!this.state.rule1.found) {
      //25 meter, 5 sek
      this.checkRule1();
    }
    if (!this.state.rule2.found) {
      //15 meter, 3 sek
      this.checkRule2();
    }
    if (!this.state.rule3.found) {
      //5 meter, 1,5 sek
      this.checkRule3();
    }
  }

  checkRule1() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 25 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.rule1.found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 25 && distanceToMarker > 0) {
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
        5000
      );
    }
  }

  checkRule2() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 15 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.rule2.found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 15 && distanceToMarker > 0) {
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
        3000
      );
    } 
  }

  checkRule3() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 5 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.rule3.found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 5 && distanceToMarker > 0) {
              this.setState({
                rule3: {
                  found: true,
                  style: {
                    color: 'red'
                  }
                }
              });
            }
          }
        },
        1500
      );
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
    const { marker } = this.props.quest;
    const { rule1, rule2, rule3 } = this.state;
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
            <Text style={styles.textStyle}>distance to marker: {this.props.distanceToMarker}</Text>
            <Text style={styles.textStyle}>User found marker?</Text>
            <Text style={rule1.style}>Rule 1: {rule1.found.toString()}</Text>
            <Text style={rule2.style}>Rule 2: {rule2.found.toString()}</Text>
            <Text style={rule3.style}>Rule 3: {rule3.found.toString()}</Text>
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
