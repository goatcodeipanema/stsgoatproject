import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { 
  View, 
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { locationUpdate, distanceUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import FadeOverlay from './FadeOverlay';
import WindowedModal from './WindowedModal';

class QuestView extends Component {

  /*
  -Just nu behöver QuestView en quest som prop när den navigeras till.
  -Style för kartan lagras i state eftersom vi behöver uppdatera den
    och rendera om den för att visa showUserLocation-knappen. Det finns 
    typ ingen best practice så vi får väl välja själva hur vi vill ha det.
    Nackdelen med state är att this._mounted måste användas för att inte råka
    kalla setState när komponenten är omountad.
  -...absoluteFillObject är samma som att sätta position: absolute och
    top: 0, bottom: 0, left: 0, right: 0. Alla borders och paddings försvinner alltså.
  -Understrecket i this._mounted vet jag inte om det betyder något, men det 
    är ju inte lodash och vi kanske ska döpa om det om det blir förvirrande?
  */

  constructor() {
    super();
    this.state = {
      containerStyle: {},
      mapStyle: {},
      modalVisible: false,
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
          flex: 1,
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

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  render() {
    const { marker } = this.props.quest;
    const { progressStyle, titleStyle, boxStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <FadeOverlay />
        <Card>
            <CardSection style={this.state.containerStyle}>
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
            </CardSection>
            <CardSection style={progressStyle}>
              {//Här går det att ploppa in progressgrejer istället för viewsen
              }
              <View style={{ width: 80, height: 50, backgroundColor: 'powderblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
              <Button onPress={this.toggleModal.bind(this)}>
                Clue
              </Button>
            </CardSection>
        </Card>
        <WindowedModal 
        visible={this.state.modalVisible} 
        toggleModal={this.toggleModal.bind(this)} 
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>Clue</Text>
          <View style={boxStyle}>
            <Text>{this.props.quest.clue}</Text>
          </View>
        </WindowedModal>
      </View>
      
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18
  },
  progressStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: 45,
    fontFamily: 'Cake n Truffles',
    marginTop: 5,
    marginLeft: 10
  },
  boxStyle: {
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    borderWidth: 8,
    padding: 5,
    margin: 10,
    marginTop: 0
  }
};

const mapStateToProps = ({ location }) => {
  const { userLocation, distanceToMarker } = location;
  return { userLocation, distanceToMarker };
};

export default connect(mapStateToProps, {
  locationUpdate, distanceUpdate
})(QuestView);
