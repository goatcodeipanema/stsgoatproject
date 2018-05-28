import React, { Component } from 'react';
import { Keyboard, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, ImageButton, Input, TextArea } from '../common';
import { questUpdate } from '../../actions';

const starGif = require('../../pictures/stars.gif');
const blueButton = require('../../pictures/blueButton.png');

class QuestCreateName extends Component {

//genererar ett id. Vet ej om detta är ett bra ställe att göra det
  componentDidMount() {
    this.generateId();
  }

  onButtonPress() {
    Keyboard.dismiss();
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
        <ImageButton onPress={this.onButtonPress.bind(this)} source={blueButton} >To map</ImageButton>
      );
    } /*
    return (
      <Text style={{ color: 'yellow' }}>
        Give your quest a name and add a description to continue
      </Text>);*/
  }

  render() {
    return (
      <ImageBackground source={starGif} style={styles.backgroundStyle}>
        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Input
            //autoFocus
            label="Quest Name: "
            //placeholder="My first goat quest"
            value={this.props.title}
            onChangeText={value => this.props.questUpdate({ prop: 'title', value })}
            maxLength={20}

          />
        </CardSection>

        <CardSection style={{ backgroundColor: 'black' }}>
          <TextArea

            label="Description: "
            //placeholder="pelle svanslös blablablabla.."
            numberOfLines={5}
            value={this.props.description}
            onChangeText={value => this.props.questUpdate({ prop: 'description', value })}
          />

        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          {this.renderButton()}
        </CardSection>
      </ImageBackground>
    );
  }
}

const styles = {
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  backgroundStyle: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center'
  },

};

const mapStateToProps = ({ createQuest }) => {
  const { title, description, id } = createQuest;
  return { title, description, id };
};

export default connect(mapStateToProps, { questUpdate })(QuestCreateName);
