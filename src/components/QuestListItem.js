import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { selectQuest, questsFetch, deselectQuest } from '../actions';

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
    Actions.questView({ quest: this.props.quest });
  }

  renderDescription() {
    //Samma grej som i techstack
    const { quest, expanded } = this.props;
    //Det här måste stylas ordentligt sen. har bara lagt in nåt nu
    if (expanded) {
      return (
        <CardSection>
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              About quest:
            </Text>
            <Text>
            {quest.description}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              ID:
            </Text>
            <Text>
             {quest.id}
            </Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          <Button onPress={this.goToQuest.bind(this)}>
            Start Quest
          </Button>
        </View>
        </CardSection>
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
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View>
              <Text style={styles.titleStyle}>
                 {title}
              </Text>
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
    fontFamily: 'Cake n Truffles'
  },
};

const mapStateToProps = ({ selected }, ownProps) => {
  const { selectedQuest } = selected;
  const expanded = selectedQuest.id === ownProps.quest.id;
  return { expanded, selectedQuest };
};

export default connect(mapStateToProps, {
  selectQuest, questsFetch, deselectQuest
 })(QuestListItem);
