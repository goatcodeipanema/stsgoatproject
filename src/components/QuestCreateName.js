import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input, TextArea, Card } from './common';
import { questUpdate } from '../actions';

class QuestCreateName extends Component {

//genererar ett id. Vet ej om detta är ett bra ställe att göra det
  componentDidMount() {
    this.generateId();
  }

  onButtonPress() {
    Actions.questCreateMarker();
  }
  //Det här genererar ett id med 7 tecken, blandade bokstäver & siffror
  generateId() {
    this.props.questUpdate({ prop: 'id', value: Math.random().toString(36).substring(2, 9) });
  }

  renderButton() {
    const { title, description } = this.props;
    if (title && description) {
      //det går inte att gå vidare utan title och description
      return (
        <Button onPress={this.onButtonPress.bind(this)} >Press to go to map</Button>
      );
    }
    return (<Text> Give your quest a name and add a description to continue</Text>);
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
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

const styles = {
  cardStyle: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
  }
};

const mapStateToProps = ({ createQuest }) => {
  const { name, description, id } = createQuest;
  return { name, description, id };
};

export default connect(mapStateToProps, { questUpdate })(QuestCreateName);
