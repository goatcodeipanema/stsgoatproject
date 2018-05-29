import React, { Component } from 'react';
import { Text, Image, ImageBackground } from 'react-native';
import { CardSection } from '../common';

const friendlyGoat = require('../../pictures/friendlyGoat.png');
const starGif = require('../../pictures/stars.gif');

class HelpModal extends Component {

  renderText() {
    if (this.props.scene === 'start') {
      return (
        <Text style={styles.textStyle}>
        Hi there Human! {"\n"}{"\n"}Goat Quest is a treasure hunt app where you interact with a map to find hidden locations. {"\n"}{"\n"}Press JOIN QUEST to see a list of all quests out there. {"\n"}{"\n"}Press CREATE QUEST to create a quest and help the space goats to hide a golden egg.{"\n"}{"\n"}GLHF! Bääääh
        </Text>
      );
  } else if (this.props.scene === 'questCreateName') {
    return (
      <Text style={styles.textStyle}>
      Bääh! {"\n"}{"\n"}Give your quest a name and try to describe what the quest is about.{"\n"}{"\n"}When you have entered a name and a description, a TO MAP-button will pop up. Press TO MAP to continue.{"\n"}{"\n"}You can always go(at) back to this page if you would want to change the name or description later {"\n"}{"\n"}Lots of love,{"\n"}The Space Goat
      </Text>
    );
  } else if (this.props.scene === 'questCreateMarker') {
    return (
      <Text style={styles.textStyle}>
      Aloha! {"\n"}{"\n"}Press and hold on the map to place a hidden location. Describe your location with a clue so that players have a chance to find it. {"\n"}{"\n"}The amount of locations and the total distance of the quest can be seen in your control board below the map.{"\n"}{"\n"}Press DONE to submit your quest.{"\n"}{"\n"}Your help is greatly appreciated, {"\n"}The Space Goat
      </Text>
    );
  } else if (this.props.scene === 'questList') {
    return (
      <Text style={styles.textStyle}>Howdy-do!{"\n"}{"\n"}This is a list of all quests you can play. Looking for something special? Use the search bar to find a specific quest. Press on a quest to view more info about it.{"\n"}{"\n"}Press START QUEST to go(at) to the map.{"\n"}{"\n"}Your goat always,{"\n"}The Space goat </Text>
    );
  } else if (this.props.scene === 'questView') {
    return (
      <Text style={{ ...styles.textStyle, fontSize: 10 }}>Hooman!{"\n"}{"\n"}Get those hooves movin! (Yes, you will have to physically move to find the hidden spots){"\n"}{"\n"}Feeling lost? Press CLUE for some help. The control board below the map shows how many hidden locations you have found and how far away the next location is. You have to find all locations to get to the golden egg.{"\n"}{"\n"}[Cheating is possible but not encouraged] {"\n"}{"\n"}Bäähst wishes,{"\n"} The Space Goat </Text>
    );
  }
}
  render() {
      return (
      <ImageBackground source={starGif} style={styles.backgroundStyle}>
        <CardSection style={styles.speechBubbleStyle}>
          {this.renderText()}
        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          <Image
          source={friendlyGoat}
          style={{ width: 200, height: 200 }}
          />
        </CardSection>
      </ImageBackground>
    );
}
}
export const styles = {
  textStyle: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'PressStart2P',
    lineHeight: 14
  },
  speechBubbleStyle: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'black'
  },
  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

export default HelpModal;
