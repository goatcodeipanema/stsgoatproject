import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardSection, Button, Input, TextArea, Card } from './common';
import { questUpdate } from '../actions';

class QuestCreateName extends Component {

  onButtonPress() {
    console.log('knapptryck');
  }
  onDescriptionChange(description) {
    this.props.questUpdate({ prop: 'description', value: description });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Quest"
            placeholder="My first goat quest"
            value={this.props.name}
            onChangeText={value => this.props.questUpdate({ prop: 'name', value })}

          />
        </CardSection>

        <CardSection>
          <TextArea
            label="Description"
            placeholder="pelle svanslös blablablabla.."
            numberOfLines={10}
            value={this.props.description}
            onChangeText={value => this.props.questUpdate({ prop: 'description', value })}
          />

        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)} >Press to go to map</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ createQuest }) => {
  console.log(createQuest);
  const { name, description } = createQuest;
  console.log('i mapStateToProps');
  return { name, description };
};

export default connect(mapStateToProps, { questUpdate })(QuestCreateName);
