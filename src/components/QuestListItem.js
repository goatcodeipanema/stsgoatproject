import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Keyboard, ImageBackground, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, ImageButton } from './common';
import { selectQuest, questsFetch, deselectQuest, loadQuest } from '../actions';

const starGif = require('../pictures/space.png');
const blueButton = require('../pictures/blueButton.png');
const pixelMarker = require('../pictures/marker.png');

class QuestListItem extends Component {

  /*
   Om raden redan är expanded fälls den ihop och deselectQuest är en action
   som sätter selectedQuest till en tom sträng. selectQuest är an action som sätter
   selectedQuest till this.props.quest
  */
  onRowPress() {
    Keyboard.dismiss();
    if (this.props.quest.id === this.props.selectedQuest.id) {
      this.props.deselectQuest();
    } else {
      this.props.selectQuest(this.props.quest);
    }
  }

  //Hoppar till questview och ger den questen som prop.
  goToQuest() {
    this.props.loadQuest(this.props.quest);
    Actions.questView();
  }
  renderTitle() {
    const { quest, expanded } = this.props;
    if (!expanded) {
      return (

        <CardSection
        style={{
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
        >
        <ImageBackground source={starGif} style={styles.backgroundStyle}>
        <View style={{ alignSelf: 'center', backgroundColor: 'black' }}>
        <Text style={styles.titleStyle}>
           {quest.title}
        </Text>
        </View>
        </ImageBackground>
        </CardSection>
      );
    }
  }

  renderDescription() {
    const { quest, expanded } = this.props;
    //Det här måste stylas ordentligt sen. har bara lagt in nåt nu
    if (expanded) {
      return (
        <ImageBackground source={starGif} style={styles.backgroundStyle}>
          <View style={{ alignSelf: 'center', backgroundColor: 'black' }}>
            <Text style={styles.titleStyle} >
               {quest.title}
            </Text>
          </View>

          <View style={{ marginLeft: 10, flexDirection: 'row', backgroundColor: 'black' }}>
            <Text style={styles.smallTitleStyle}>
              NO. of stops:
            </Text>
            <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
              <Text style={styles.textStyle}>
                {quest.allMarkers.length}
              </Text>
              <Image source={pixelMarker} style={{ width: 15, height: 28, marginLeft: 5 }} />
            </View>
          </View>

          <View style={{ marginLeft: 10, flexDirection: 'row', backgroundColor: 'black' }}>
            <Text style={styles.smallTitleStyle}>
             Total distance:
            </Text>
            <View style={{ backgroundColor: 'black' }}>
              <Text style={styles.textStyle}>
                {quest.totalDistance} m
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: 10, backgroundColor: 'black' }}>
            <Text style={styles.smallTitleStyle}>
             Description:
            </Text>
            <View style={{ backgroundColor: 'black' }}>
              <Text style={styles.textStyle}>
                {quest.description}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', marginTop: 7 }}>
            <ImageButton onPress={this.goToQuest.bind(this)} source={blueButton}>
              Start Quest
            </ImageButton>
          </View>
      </ImageBackground>
      );
    }
    }

  render() {
    return (

      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)} >
          <View>
              {this.renderTitle()}
              {this.renderDescription()}
          </View>
      </TouchableWithoutFeedback>

    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 45,
    paddingLeft: 20,
    fontFamily: 'upheavtt',
    color: 'white'
  },
  smallTitleStyle: {
      fontSize: 30,
      fontFamily: 'upheavtt',
      color: '#FACC2E',
      marginRight: 3
  },
  textStyle: {
    //fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    fontFamily: 'VCR_OSD_MONO_1.001',
    marginLeft: 5,
    marginTop: 4

  },
  backgroundStyle: {
    flex: 1,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#FACC2E',
    marginLeft: 5,
    marginRight: 6
  },

};

const mapStateToProps = ({ selected }, ownProps) => {
  const { selectedQuest } = selected;
  const expanded = selectedQuest.id === ownProps.quest.id;
  return { expanded, selectedQuest };
};

export default connect(mapStateToProps, {
  selectQuest, questsFetch, deselectQuest, loadQuest
 })(QuestListItem);
