import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { selectQuest } from '../actions';

class QuestListItem extends Component {

  //selectQuest är en action, och vi skickar hela questen som payload.
  onRowPress() {
    this.props.selectQuest(this.props.quest);
  }

  //Hoppar till questview och ger den questen som prop.
  goToQuest() {
    Actions.questView({ quest: this.props.quest });
  }

  renderDescription() {
    //Samma grej som i techstack
    const { quest, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {quest.description}
          </Text>
          <Button onPress={this.goToQuest.bind(this)}>
            Start Quest
          </Button>
        </CardSection>
      );
    }
    return (
      <Button onPress={this.goToQuest.bind(this)}>
          Start Quest
      </Button>
    );
    }

  render() {
    //Samma grej som i techstack
    const { title } = this.props.quest;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
               {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = ({ selected }, ownProps) => {
  //Samma som techstack
  const expanded = selected.selectedQuest.id === ownProps.quest.id;
  return { expanded };
};

export default connect(mapStateToProps, {
  selectQuest
 })(QuestListItem);

