import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import {
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, ImageButton, FadeOverlay, WindowedModal } from '../common';
import Map from '../Map';
import {
  locationUpdate,
  distanceUpdate,
  toggleClueModal,
  toggleFoundModal,
  toggleSureModal,
  toggleCompleteModal,
  closeQuestViewModals,
  markerIsFound,
  loadNextMarker,
  questComplete
} from '../../actions';

const pixelMarker = require('../../pictures/marker.png');
const eggFoundGif = require('../../pictures/finishgoathappy.gif');
const clueGif = require('../../pictures/cluegoat.gif');
const blueImageButton = require('../../pictures/blueButton.png');
const mediumButton = require('../../pictures/mediumButton.png');

class QuestView extends Component {

  constructor(props) {
    super();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.clueModal = props.toggleClueModal.bind(this);
    this.sureModal = props.toggleSureModal.bind(this);
    this.foundModal = props.toggleFoundModal.bind(this);
    this.completeModal = props.toggleCompleteModal.bind(this);
    this.giveUp = this.giveUp.bind(this);
    this.completeText = {
      title: "Golden egg found!",
      text: "WOW, you found the egg! And it's full of CHEESE!! What a day..."
    };
    this.foundText = {
      title: "",
      text: ""
    };
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
              this.advanceQuest(false);
            }
          }
        }, 5000);
    }
  }

  advanceQuest(cheated) {
    const {
    toggleFoundModal,
    toggleCompleteModal,
    closeQuestViewModals,
    currentMarker,
    markerArray,
    markerIsFound,
    loadNextMarker,
    questComplete
    } = this.props;

    closeQuestViewModals();

    markerIsFound(cheated);
    this.setModalTexts(cheated);
    if (currentMarker < markerArray.length - 1) {
      loadNextMarker();
      toggleFoundModal();
    } else {
      questComplete();
      toggleCompleteModal();
    }
  }

  giveUp() {
    this.props.toggleSureModal();
    setTimeout(() => {
      this.props.toggleClueModal();
    }, 1);
    setTimeout(() => {
      this.advanceQuest(true);
    }, 300);
  }

  setModalTexts(cheated) {
    if (cheated) {
      this.completeText = {
        title: "Golden egg found!",
        text: "WOW, you found the egg! But what's that?" +
          " It's full of HUEL... That's what happens to cheaters."
      };
      this.foundText = {
        title: "Cheated...",
        text: "Too hard?? Ok then, here's your next clue."
      };
    } else {
      this.foundText = {
        title: "Next clue found!",
        text: "You found another clue, keep going!"
      };
    }
  }

  renderMarkers() {
    const { markerArray } = this.props;
    return (
      markerArray.filter((marker) => marker.found)
        .map((eachMarker, i) => (
        <Marker coordinate={eachMarker.coordinate} key={i}>
          <Image source={pixelMarker} style={{ width: 33, height: 60 }} />
        </Marker>
          ))
    );
  }

  render() {
    const { mapWindowStyle, titleStyle, boxStyle } = styles;
    const {
      clueModalVisible,
      foundModalVisible,
      sureModalVisible,
      completeModalVisible,
      currentClue
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FadeOverlay />
        <Card>
            <CardSection style={mapWindowStyle}>
              <Map renderMarkers={this.renderMarkers} />
            </CardSection>
            <View style={styles.boxOneStyle}>
              <View style={styles.boxTwoStyle}>
                <View style={styles.boxThreeStyle}>
                  <View style={styles.boxFourStyle}>
                  <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle}> {this.props.distanceToMarker} m </Text>
                  </View>
                  <View style={styles.screenStyle}>
                    <Text style={styles.screenTextStyle}> {this.props.currentMarker}/{this.props.markerArray.length} </Text>
                    <Image source={pixelMarker} style={{ width: 15, height: 28 }} />
                  </View>


                  <View style={{ justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
                    <ImageButton onPress={this.clueModal} source={mediumButton} customImageStyle={{ height: 30, width: 70 }}>
                      Clue
                    </ImageButton>
                  </View>
                  </View>
                </View>
              </View>
            </View>
            {/*<CardSection style={progressStyle}>
              {//Här går det att ploppa in progressgrejer istället för viewsen
              }
              <View style={{ width: 80, height: 50, backgroundColor: 'powderblue' }} />
              <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
              <View>
                <ImageButton onPress={this.clueModal} source={blueImageButton}>
                  Clue
                </ImageButton>
              </View>
            </CardSection>*/}
        </Card>

        {/* Clue Modal */}
        <WindowedModal
        visible={clueModalVisible}
        toggleModal={this.clueModal}
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>Clue</Text>
          <View style={boxStyle}>
            <Text style={styles.textStyle}>{currentClue}</Text>
          </View>
          <View style={styles.centerContent}>
              <Image source={clueGif} style={{ height: 200, width: 300, marginBottom: 20 }} />
          </View>
          <View style={styles.centerContent}>
            <ImageButton onPress={this.sureModal} source={blueImageButton} customButtonStyle={{ marginBottom: 4 }}>
              Cheat?
            </ImageButton>
          </View>

          {/* areYouSure Modal */}
          <WindowedModal
          visible={sureModalVisible}
          toggleModal={this.sureModal}
          modalStyle={styles.sureModalStyle}
          >
            <Text style={titleStyle}>Really?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 15 }}>
              <ImageButton onPress={this.giveUp} source={mediumButton} customImageStyle={{ height: 40, width: 100 }} >
                Yes
              </ImageButton>
              <ImageButton onPress={this.sureModal} source={mediumButton} customImageStyle={{ height: 40, width: 100 }}>
                No
              </ImageButton>
            </View>
          </WindowedModal>

        </WindowedModal>

        {/* Found Modal */}
        <WindowedModal
        visible={foundModalVisible}
        toggleModal={this.foundModal}
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>{this.foundText.title}</Text>
          <View style={boxStyle}>
            <Text style={styles.textStyle}>{this.foundText.text}</Text>
          </View>
        </WindowedModal>

        {/* Complete Modal */}
        <WindowedModal
        visible={completeModalVisible}
        toggleModal={this.completeModal}
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>{this.completeText.title}</Text>
          <View style={boxStyle}>
            <Text style={styles.textStyle}>{this.completeText.text}</Text>
          </View>
          <View style={styles.centerContent}>
            <Image source={eggFoundGif} style={{ height: 200, width: 200, marginBottom: 20 }} />
          </View>
        </WindowedModal>

      </View>

    );
  }
}

const styles = {
  textStyle: {
    fontSize: 18,
    fontFamily: 'VCR_OSD_MONO_1.001',
    color: 'white'
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
    fontFamily: 'VCR_OSD_MONO_1.001',
    marginTop: 5,
    marginLeft: 10,
    color: 'white'
  },
  boxStyle: {
    backgroundColor: 'black',
    flexDirection: 'row',
    borderColor: 'white',
    borderRadius: 2,
    borderWidth: 2,
    padding: 5,
    margin: 10,
    marginTop: 5
  },
  sureModalStyle: {
    justifyContent: 'center',
    borderRadius: 0,
    borderColor: 'red'
  },
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxOneStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxTwoStyle: {
    flex: 1,
    borderWidth: 8,
    borderColor: '#7f7f7f'
  },
  boxThreeStyle: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'black'
  },
  boxFourStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#666666',
    flex: 1,
    borderWidth: 4,
    backgroundColor: '#7f7f7f',
  },
  screenStyle: {
    margin: 5,
    padding: 3,
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#666666',
    flex: 1,
    height: 40
  },
  screenTextStyle: {
    fontSize: 16,
    fontFamily: 'VCR_OSD_MONO_1.001',
    color: 'limegreen'
  },

};

const mapStateToProps = ({ location, ongoingQuest }) => {
  const { userLocation, distanceToMarker } = location;
  const {
    quest,
    progress,
    currentMarker,
    clueModalVisible,
    foundModalVisible,
    sureModalVisible,
    completeModalVisible
  } = ongoingQuest;

  /*const markerArray = _.map(quest.markers, (val, index) => {
    return { ...val, found: progress[index].found };
  });*/

  const markerArray = _.map(quest.allMarkers, (val, index) => {
    return { ...quest.markers[val], found: progress[index].found };
  });
  const currentClue = markerArray[currentMarker].clue;
  //const currentClue = quest.markers[currentMarker].clue;

  return {
    markerArray,
    currentMarker,
    currentClue,
    userLocation,
    distanceToMarker,
    clueModalVisible,
    foundModalVisible,
    sureModalVisible,
    completeModalVisible
     };
};

export default connect(mapStateToProps, {
  locationUpdate,
  distanceUpdate,
  toggleClueModal,
  toggleFoundModal,
  toggleSureModal,
  toggleCompleteModal,
  closeQuestViewModals,
  markerIsFound,
  loadNextMarker,
  questComplete
})(QuestView);
