import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { 
  View, 
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { locationUpdate, distanceUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import FadeOverlay from './FadeOverlay';
import WindowedModal from './WindowedModal';
import Map from './Map';
import { 
  toggleClueModal, 
  toggleFoundModal,
  toggleSureModal,
  markerIsFound,
  loadNextMarker
} from '../actions/QuestViewActions';

class QuestView extends Component {

  constructor(props) {
    super();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.clueModal = props.toggleClueModal.bind(this);
    this.sureModal = props.toggleSureModal.bind(this);
    this.foundModal = props.toggleFoundModal.bind(this);
    this.giveUp = this.giveUp.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.updateQuestProgress();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateQuestProgress() {
    //Uppdaterar location och distance.
    if (this.mounted) {
      const { markerArray, currentMarker, locationUpdate, distanceUpdate } = this.props;
      locationUpdate();
      distanceUpdate(markerArray[currentMarker].coordinate);
      if (!markerArray[currentMarker].found) {
        this.checkFound();
      }
      setTimeout(() => this.updateQuestProgress(), 300);
    }
  }

  checkFound() {
    let distanceToMarker = this.props.distanceToMarker;
    const currentMarker = this.props.currentMarker;
    if (distanceToMarker <= 15 && distanceToMarker > 0) {
      setTimeout(
        () => {
          if (!this.props.markerArray[currentMarker].found) {
            distanceToMarker = this.props.distanceToMarker;
            if (distanceToMarker <= 15 && distanceToMarker > 0) {
              this.props.markerIsFound();
              if (currentMarker < this.props.markerArray.length - 1) {
                this.props.loadNextMarker();
              }
              this.props.toggleFoundModal();
            }
          }
        },
        5000
      );
    }
  }

  giveUp() {
    this.props.toggleSureModal();
    setTimeout(() => {
      this.props.toggleClueModal();
    }, 1);
    const currentMarker = this.props.currentMarker;
    this.props.markerIsFound();
    if (currentMarker < this.props.markerArray.length - 1) {
      this.props.loadNextMarker();
    }
  }

  renderMarkers() {
    const { markerArray } = this.props;
    return (
      markerArray.filter((marker) => marker.found)
        .map((eachMarker, i) => (
        <Marker coordinate={eachMarker.coordinate} key={i} />
          ))
    );
  }

  render() {
    const { mapWindowStyle, progressStyle, titleStyle, boxStyle } = styles;
    const { 
      clueModalVisible,
      foundModalVisible,
      sureModalVisible,
      currentClue
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FadeOverlay />
        <Card>
            <CardSection style={mapWindowStyle}>
              <Map renderMarkers={this.renderMarkers} />
            </CardSection>
            <CardSection style={progressStyle}>
              {//Här går det att ploppa in progressgrejer istället för viewsen
              }
              <View style={{ width: 80, height: 50, backgroundColor: 'powderblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
              <View>
                <Button onPress={this.clueModal}>
                  Clue
                </Button>
              </View>
            </CardSection>
        </Card>

        {/* Clue Modal */}
        <WindowedModal 
        visible={clueModalVisible} 
        toggleModal={this.clueModal} 
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>Clue</Text>
          <View style={boxStyle}>
            <Text>{currentClue}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button onPress={this.sureModal}>
              Give up?
            </Button>
          </View>

          {/* areYouSure Modal */}
          <WindowedModal 
          visible={sureModalVisible} 
          toggleModal={this.sureModal} 
          modalStyle={styles.sureModalStyle}
          >
            <Text style={titleStyle}>Are you sure?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={this.giveUp}>
                Yes
              </Button>
              <Button onPress={this.sureModal}>
                No
              </Button>
            </View>
          </WindowedModal>

        </WindowedModal>

        {/* Found Modal*/}
        <WindowedModal 
        visible={foundModalVisible} 
        toggleModal={this.foundModal} 
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
  mapWindowStyle: {
    flex: 5
  },
  progressStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
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
    quest,
    progress,
    currentMarker,
    clueModalVisible, 
    foundModalVisible,
    sureModalVisible
  } = ongoingQuest;

  const markerArray = _.map(quest.markers, (val, index) => {
    return { ...val, found: progress[index].found };
  });
  const currentClue = quest.markers[currentMarker].clue;
  
  return { 
    markerArray,
    currentMarker,
    currentClue,
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
  toggleSureModal,
  markerIsFound,
  loadNextMarker
})(QuestView);
