import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input, TextArea, Card } from './common';
import { questUpdate } from '../actions';

class QuestCreateName extends Component {

  onButtonPress() {
    Actions.questCreateMarker();
  }

  renderButton() {
    const { title, description } = this.props;
    if (title && description) {
      //det går inte att gå vidare utan title och description
      return (
        <Button onPress={this.onButtonPress.bind(this)} >Press to go to map</Button>
      );
    }
    return (<Text> Add a clue and place your treasure on the map to continue</Text>);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Quest"
            placeholder="My first goat quest"
            value={this.props.name}
            onChangeText={value => this.props.questUpdate({ prop: 'title', value })}

          />
        </CardSection>

        <CardSection>
          <TextArea
            label="Description"
            placeholder="pelle svanslös blablablabla.."
            numberOfLines={5}
            value={this.props.description}
            onChangeText={value => this.props.questUpdate({ prop: 'description', value })}
          />

        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ createQuest }) => {
  const { name, description } = createQuest;
  return { name, description };
};

export default connect(mapStateToProps, { questUpdate })(QuestCreateName);
