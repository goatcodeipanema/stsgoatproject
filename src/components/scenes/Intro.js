import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { showIntro, skipIntro } from '../../actions';

/*
The Intro component renders the intro sequence once and is then navigated away from. 
The current "scene" in the intro is not stopped when the intro is skipped, but the
next scene does not load. So far this has not caused any problems.

The spacewriter is just a typing machine sound that should play when the text renders.
This did not make it in time, but the code remains in place as comments. 
*/

const UFO_GIF = require('../../pictures/ufo.gif');
const SPACE_GIF = require('../../pictures/stars.gif');
const WALK_GOAT = require('../../pictures/walkgoat.gif');
const CLUE_GOAT = require('../../pictures/cluegoat.gif');
const EGG_GOAT = require('../../pictures/layegg.gif');
const GOLDEN_EGG = require('../../pictures/goldenegg.gif');

const FIRST_TEXT = 'No one really knows\n' +
  'when the space goats\n' +
  'first visited our planet';
const SECOND_TEXT = 'Wherever they walk,\n' +
  'they leave a trail\n' +
  'riddled with clues';
const THIRD_TEXT = 'At the end of each trail,\n' +
  'a golden treasure...  ';
const FOURTH_TEXT = 'To save humanity\n' +
  'and all there is,      \n' +
  'YOU    \n' +
  'have to find them all!';

const TEXT_SPEED = {
  toValue: 1,
  duration: 7000,
  easing: Easing.linear
};

const FADE_IN = {
  toValue: 1,
  duration: 1000,
  easing: Easing.square
};

const FADE_OUT = {
  toValue: 0,
  duration: 2000,
  easing: Easing.square
};

const window = Dimensions.get('window');
const HEIGHT = window.height;
const WIDTH = window.width;

class Intro extends Component {
  constructor() {
    super();
    this.state = {
      goatStyle: {
        position: 'absolute',
        height: WIDTH,
        width: WIDTH,
        top: 0,
        opacity: new Animated.Value(1),
        zIndex: 2
      },
      extraGoatStyle: {
        position: 'absolute',
        height: (WIDTH / 2),
        width: (WIDTH / 2),
        top: 50,
        right: 20,
        opacity: new Animated.Value(0),
        zIndex: 2
      },
      backgroundGifStyle: {
        position: 'absolute',
        height: HEIGHT,
        width: HEIGHT,
        left: new Animated.Value(0),
        opacity: new Animated.Value(0),
        zIndex: 1
      },
      textStyle: {
        fontSize: 12,
        fontFamily: 'PressStart2P',
        color: 'limegreen',
        zIndex: 15,
        lineHeight: 18,
        opacity: new Animated.Value(1)
      },
      currentBackground: undefined,
      currentGoat: undefined,
      extraGoat: undefined,
      textAnimation: new Animated.Value(0),
      displayedText: '',
      currentString: '',
      spinValue: new Animated.Value(0),
      zoomValue: new Animated.Value(0),
      animatingText: false,
      spaceWriterPlaying: false,
      balloonViewStyle: {
        flex: 5
      },
      textViewStyle: {
        flex: 1,
        backgroundColor: 'black',
        margin: 10,
        marginBottom: 40,
        padding: 10,
        paddingTop: 15,
        borderColor: 'white',
        borderWidth: 2,
        opacity: new Animated.Value(0),
        zIndex: 10
      },
    };
  }

  componentDidMount() {
    this.props.showIntro();
    setTimeout(() => {
      this.props.music.play();
    }, 1000);
    setTimeout(() => {
      this.startFirstScene();
    }, 2500);
  }


  startFirstScene() {
    const { textAnimation, backgroundGifStyle, textViewStyle } = this.state;
    this.setState({
      animatingText: true,
      currentString: FIRST_TEXT,
      currentBackground: UFO_GIF
    });

    setTimeout(() => { 
      this.updateString(); 
      this.playSpaceWriter();
      Animated.parallel([
        Animated.timing(textViewStyle.opacity, FADE_IN),
        Animated.timing(textAnimation, TEXT_SPEED),
        Animated.timing(backgroundGifStyle.left, {
          toValue: -(HEIGHT - WIDTH),
          duration: TEXT_SPEED.duration,
          easing: Easing.linear
        }),
        Animated.timing(backgroundGifStyle.opacity, FADE_IN)
      ]).start(() => { 
        setTimeout(() => {
          this.setState({ 
            animatingText: false
          });
          Animated.stagger(2000, [
            Animated.timing(backgroundGifStyle.opacity, FADE_OUT),
            Animated.timing(textViewStyle.opacity, FADE_OUT)
          ]).start(() => { if (this.props.showingIntro) { this.startSecondScene(); } });
        }, 100);
      }); 
    }, 100);
  }

  startSecondScene() {
    this.setState({
      currentBackground: SPACE_GIF,
      backgroundGifStyle: {
        ...this.state.backgroundGifStyle,
        opacity: new Animated.Value(0),
        left: -150
      },
      textViewStyle: {
        ...this.state.textViewStyle,
        opacity: new Animated.Value(0)
      },
      goatStyle: {
        ...this.state.goatStyle,
        opacity: new Animated.Value(0)
      },
      animatingText: true,
      currentString: SECOND_TEXT,
      currentGoat: WALK_GOAT,
      extraGoat: CLUE_GOAT,
      textAnimation: new Animated.Value(0)
    });
    setTimeout(() => {
      const { 
        textViewStyle, 
        backgroundGifStyle, 
        textAnimation, 
        extraGoatStyle } 
        = this.state;
      const { goatStyle } = this.state;
      this.updateString();
      this.playSpaceWriter();
      Animated.parallel([
        Animated.timing(textViewStyle.opacity, FADE_IN),
        Animated.timing(backgroundGifStyle.opacity, FADE_IN),
        Animated.timing(goatStyle.opacity, FADE_IN)
      ]).start(() => {
          Animated.timing(extraGoatStyle.opacity, { 
            toValue: 0.5, 
            duration: 2000, 
            easing: Easing.linear 
          }).start(() => {
            Animated.timing(goatStyle.opacity, { toValue: 0, duration: 10 }).start();
            this.setState({
              currentGoat: CLUE_GOAT,
              goatStyle: {
                ...goatStyle,
                height: (WIDTH / 3),
                width: (WIDTH / 3),
                top: 150,
                left: 20,
                transform: [{ scaleX: -1 }]
              }
            });
            setTimeout(() => {
              Animated.stagger(500, [
                Animated.timing(goatStyle.opacity, { toValue: 0.5, duration: 1500, easing: Easing.linear }),
                Animated.timing(extraGoatStyle.opacity, FADE_OUT)
              ]).start(() => {
                Animated.timing(goatStyle.opacity, FADE_OUT).start();
              });
            }, 10);
          });
      });
      Animated.timing(textAnimation, TEXT_SPEED).start(() => {
        this.playSpaceWriter();
        this.setState({ animatingText: false });
        Animated.timing(textViewStyle.opacity, FADE_OUT)
        .start(() => { if (this.props.showingIntro) { this.startThirdScene(); } });
      });
    }, 100);
  }

  startThirdScene() {
    const { spinValue, zoomValue } = this.state;
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '660deg']
    });
    this.setState({
      currentGoat: undefined,
      backgroundGifStyle: {
        ...this.state.backgroundGifStyle,
        opacity: new Animated.Value(1),
        transform: [{ rotate: spin }]
      },
      textViewStyle: {
        ...this.state.textViewStyle,
        opacity: new Animated.Value(0)
      },
      goatStyle: {
        position: 'absolute',
        height: WIDTH * 1.3,
        width: WIDTH * 1.3,
        top: 0,
        left: -(WIDTH * 0.15),
        opacity: new Animated.Value(1),
        zIndex: 2,
        transform: [{ scaleX: zoomValue }, { scaleY: zoomValue }]
      },
      animatingText: true,
      currentString: THIRD_TEXT,
      textAnimation: new Animated.Value(0)
    });

    setTimeout(() => {
      const { spinValue, zoomValue, textAnimation, textViewStyle, backgroundGifStyle, goatStyle } = this.state;
      this.updateString();
      this.playSpaceWriter();
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear
      }).start();
      Animated.timing(textViewStyle.opacity, FADE_IN)
      .start(() => {
        this.setState({ currentGoat: EGG_GOAT });
        Animated.timing(zoomValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear
        }).start();
      });
      Animated.timing(textAnimation, TEXT_SPEED)
      .start(() => {
        this.setState({ animatingText: false });
        Animated.stagger(500, [
          Animated.timing(goatStyle.opacity, FADE_OUT),
          Animated.timing(backgroundGifStyle.opacity, FADE_OUT),
          Animated.timing(textViewStyle.opacity, FADE_OUT)
        ]).start(() => { if (this.props.showingIntro) { this.startFourthScene(); } });
      });
    }, 100);
  }

  startFourthScene() {
    this.setState({
      currentGoat: GOLDEN_EGG,
      goatStyle: {
        position: 'absolute',
        height: WIDTH,
        width: WIDTH * 0.73,
        top: 0,
        left: (WIDTH * 0.15),
        opacity: new Animated.Value(0),
        zIndex: 2
      },
      currentBackground: undefined,
      animatingText: true,
      currentString: FOURTH_TEXT,
      textAnimation: new Animated.Value(0)
    });
    setTimeout(() => {
      const { textAnimation, textViewStyle, goatStyle } = this.state;
      this.playSpaceWriter();
      this.updateString();
      Animated.sequence([
        Animated.timing(textViewStyle.opacity, FADE_IN),
        Animated.timing(goatStyle.opacity, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear
        })
      ]).start();
      Animated.timing(textAnimation, TEXT_SPEED)
      .start(() => {
        this.setState({ animatingText: false });
        Animated.parallel([
          Animated.timing(goatStyle.opacity, FADE_OUT),
          Animated.timing(textViewStyle.opacity, FADE_OUT)
        ])
        .start(() => {
          if (this.props.showingIntro) { 
            this.props.skipIntro();
            this.props.music.release();
            this.props.spaceWriter.release();
            this.props.playBackgroundMusic();
            setTimeout(() => {
              Actions.appStack();
            }, 50);
          }
        });
      });
    }, 100);
  }

  updateString() {
    const { currentString, textAnimation, animatingText, displayedText } = this.state;
    if (currentString == displayedText) {
      this.stopSpaceWriter();
    }
    if (animatingText) {
      this.setState({
        displayedText: currentString.substr(0, 
          ((textAnimation._value * currentString.length) + 1)
        )
      });
      if (displayedText.length > 2) {
        if (displayedText.substr(displayedText.length - 2, displayedText.length) === '  ') {
          this.stopSpaceWriter();
        }
      }
      if ((displayedText === 'and all there is,      ') || (displayedText === 'and all there is,      \nYOU    ')) {
        this.playSpaceWriter();
      }
      setTimeout(() => this.updateString(), 30);
    }
  }

  playSpaceWriter() {
    /*
    console.log('play call');
    if (!this.state.spaceWriterPlaying) {
      console.log('playing it!');
      this.setState({ spaceWriterPlaying: true });
      this.props.spaceWriter.play();
    } */
  }

  stopSpaceWriter() {
    /*
    console.log('stop call');
    if (this.state.spaceWriterPlaying) {
      console.log('stopping it!');
      this.setState({ spaceWriterPlaying: false });
      this.props.spaceWriter.stop(() => {
        this.props.spaceWriter.play();
        this.props.spaceWriter.pause();
      });  
    } */
  }

  render() {
    const { 
      backgroundGifStyle, 
      textStyle,
      goatStyle, 
      extraGoat,
      extraGoatStyle,
      displayedText,
      currentBackground,
      currentGoat,
      balloonViewStyle,
      textViewStyle  
    } = this.state;
    return (
      <View style={styles.backgroundViewStyle}>
      <Animated.Image style={goatStyle} source={currentGoat} />
      <Animated.Image style={extraGoatStyle} source={extraGoat} />
      <Animated.Image style={backgroundGifStyle} source={currentBackground} />
        <View style={balloonViewStyle} />
        <Animated.View style={textViewStyle}>
          <Animated.Text style={textStyle}>
              {displayedText}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  backgroundViewStyle: {
    backgroundColor: 'black', 
    flex: 1, 
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ intro }) => {
 return {
    showingIntro: intro.showingIntro
 };
};

export default connect(mapStateToProps, {
  showIntro,
  skipIntro
})(Intro);
