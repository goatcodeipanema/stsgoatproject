import React, { Component } from 'react';
import { Text, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { ImageButton, CardSection, Input, Spinner } from '../common';

const goatImage = require('../../pictures/goat2.png');
const starGif = require('../../pictures/stars.gif');
const blueButton = require('../../pictures/blueButton.png');

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <ImageButton
        onPress={this.onButtonPress.bind(this)} source={blueButton}
      >
      Start
      </ImageButton>


    );
  }
  renderError() {
    if (this.props.error) {
      return (

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

      );
    }
  }

  render() {
    return (

      <ImageBackground source={starGif} style={styles.backgroundStyle}>

        <CardSection>

            <Image
              style={{ height: 220, width: 220, marginRight: 30 }}
              source={goatImage}
            />
        </CardSection>

        <CardSection>
            <Text style={styles.titleStyle}>
            Goat Quest
            </Text>
        </CardSection>

        <CardSection style={{ backgroundColor: 'black' }}>
          <Text style={{ color: '#FACC2E', fontFamily: 'upheavtt', fontSize: 20 }}> Sign in / sign up: </Text>
        </CardSection>

        <CardSection style={{ backgroundColor: 'black' }}>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection style={{ backgroundColor: 'black' }}>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          {this.renderError()}
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection
        style={{ height: 140 }}
        />


      </ImageBackground>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent'
  },

  cardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  titleStyle: {
    fontFamily: 'upheavtt',
    fontSize: 55,
    color: '#FACC2E'

  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
  };

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
 })(LoginForm);
