import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import {
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, Button, FadeOverlay, WindowedModal } from '../common';
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

        {/* Found Modal */}
        <WindowedModal
        visible={foundModalVisible}
        toggleModal={this.foundModal}
        modalStyle={{ marginTop: 100 }}
        >
          <Text style={titleStyle}>{this.foundText.title}</Text>
          <View style={boxStyle}>
            <Text>{this.foundText.text}</Text>
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
            <Text>{this.completeText.text}</Text>
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
