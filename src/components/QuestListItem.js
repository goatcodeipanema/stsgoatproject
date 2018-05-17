import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Keyboard, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { selectQuest, questsFetch, deselectQuest, loadQuest } from '../actions';

const starGif = require('../goatPic/stars.gif');
const blueButton = require('../goatPic/blueButton.png');

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
          /*borderRadius: 15,
          borderWidth: 3,
          borderColor: 'white'*/
        }}
        >
        <ImageBackground source={starGif} style={styles.backgroundStyle}>
        <Text style={styles.titleStyle}>
           {quest.title}
        </Text>
        </ImageBackground>
        </CardSection>


      );
    }
  }

  renderDescription() {
    //Samma grej som i techstack
    const { quest, expanded } = this.props;
    //Det här måste stylas ordentligt sen. har bara lagt in nåt nu
    if (expanded) {
      return (
        <ImageBackground source={starGif} style={styles.backgroundStyle}>
        <CardSection>
        <Text style={styles.titleStyle}>
           {quest.title}
        </Text>
        </CardSection>
        <CardSection>
        <View style={{ flex: 1 }}>

            <Text style={styles.textStyle}>
              About quest:
            </Text>
            <Text style={styles.textStyle}>
            {quest.description}
            </Text>

            <Text style={styles.textStyle}>
              ID:
            </Text>
            <Text style={styles.textStyle}>
             {quest.id}
            </Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          <Button onPress={this.goToQuest.bind(this)}>
            Start Quest
          </Button>
        </View>
        </CardSection>
      </ImageBackground>
      );
    }
    /*
    return (
      <Button onPress={this.goToQuest.bind(this)}>
          Start Quest
      </Button>
    );*/
    }

  render() {
    //Samma grej som i techstack
    const { title } = this.props.quest;

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
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'limegreen'
  },
  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 6,
    borderColor: '#FACC2E'
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
