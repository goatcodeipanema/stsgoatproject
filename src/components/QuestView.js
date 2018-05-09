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
import { 
  toggleClueModal, 
  toggleFoundModal,
  toggleSureModal
} from '../actions/QuestViewActions';

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
      markerFound: false
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
      if (!this.state.markerFound) {
        this.checkFound();
      }
      setTimeout(() => this.updateQuestProgress(), 300);
    }
  }

  checkFound() {
    let distanceToMarker = this.props.distanceToMarker;
    if (distanceToMarker <= 15 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.state.markerFound) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 15 && distanceToMarker > 0) {
              this.setState({
                markerFound: true
              });
              this.props.toggleFoundModal();
            }
          }
        },
        8000
      );
    }
  }

  giveUp() {
    this.props.toggleSureModal();
    /*Väntar lite innan den stänger andra fönstret,
    annars är den för snabb för sitt eget bästa... */
    setTimeout(() => {
      this.props.toggleClueModal();
    }, 10);
    this.setState({
      markerFound: true
    });
  }

  renderMarker() {
    const { marker } = this.props.quest;
    if (this.state.markerFound) {
      return (
        <Marker
        coordinate={marker}
        draggable={false}
        pinColor='blue'
        />
      );
    }
  }

  render() {
    const { progressStyle, titleStyle, boxStyle } = styles;
    const { 
      toggleClueModal,
      toggleFoundModal,
      toggleSureModal,
      clueModalVisible,
      foundModalVisible,
      sureModalVisible,
      quest
    } = this.props;
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
                {this.renderMarker()}
              </MapView>
            </CardSection>
            <CardSection style={progressStyle}>
              {//Här går det att ploppa in progressgrejer istället för viewsen
              }
              <View style={{ width: 80, height: 50, backgroundColor: 'powderblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
              <Button onPress={toggleClueModal.bind(this)}>
                Clue
              </Button>
            </CardSection>
        </Card>

        {/* Clue Modal */}
        <WindowedModal 
        visible={clueModalVisible} 
        toggleModal={toggleClueModal.bind(this)} 
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>Clue</Text>
          <View style={boxStyle}>
            <Text>{quest.clue}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={toggleSureModal.bind(this)}>
              Give up?
            </Button>
          </View>

          {/* areYouSure Modal */}
          <WindowedModal 
          visible={sureModalVisible} 
          toggleModal={toggleSureModal.bind(this)} 
          modalStyle={styles.sureModalStyle}
          >
            <Text style={titleStyle}>Are you sure?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={this.giveUp.bind(this)}>
                Yes
              </Button>
              <Button onPress={toggleSureModal.bind(this)}>
                No
              </Button>
            </View>
          </WindowedModal>

        </WindowedModal>

        {/* Found Modal*/}
        <WindowedModal 
        visible={foundModalVisible} 
        toggleModal={toggleFoundModal.bind(this)} 
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>Found!</Text>
          <View style={boxStyle}>
            <Text>Egg found, gratz</Text>
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
    flexDirection: 'row',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    borderWidth: 8,
    padding: 5,
    margin: 10,
    marginTop: 0
  },
  sureModalStyle: {
    justifyContent: 'center',
    borderRadius: 0,
    borderColor: 'red'
  }
};

const mapStateToProps = ({ location, ongoingQuest }) => {
  const { userLocation, distanceToMarker } = location;
  const { 
    clueModalVisible, 
    foundModalVisible,
    sureModalVisible
  } = ongoingQuest;
  return { 
    userLocation,
    distanceToMarker,
    clueModalVisible, 
    foundModalVisible,
    sureModalVisible
     };
};

export default connect(mapStateToProps, {
  locationUpdate, 
  distanceUpdate,
  toggleClueModal,
  toggleFoundModal,
  toggleSureModal
})(QuestView);
