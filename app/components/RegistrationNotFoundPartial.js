import React, { Component } from 'react';
import { Style } from '../config/styles';
import RegisteredAddressPartial from '../components/RegisteredAddressPartial';
import BlueHeaderPartial from '../components/BlueHeader';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import RedButton from '../components/RedButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Lib from '../lib/index'
const { inWords } = Lib;


export default class RegistrationNotFoundPartial extends Component {
  constructor(props) {
    super(props);
  }

  onTryAgain = () => {
    this.props.navigation.navigate("CheckRegistration")
  }

  onRegister = () => {
    let { container } = this.props;
    let { user } = container.state;
    user.isRegistering = true;
    user.registrationStep = "RegisterVoterEligibility"
    container.update(user);
    this.props.navigation.navigate("RegisterVoterEligibility")
  }

  render() {
    const text = `Sorry! We couldn't find any matching records`
    return (
      <View style={styles.container}>
        <BlueHeaderPartial text={text} />
        <View style={styles.headingContainer}>
          <Text style={styles.h2}>Feel free to try again or register to vote.</Text>
        </View>
        <View style={styles.results}>
          <RedButton
            navigation={this.props.navigation}
            text={"Register to vote"}
            onSubmit={this.onRegister}
            backgroundColor={Style.colors.RED}
            textColor={Style.colors.WHITE} />
        </View>
        <View style={styles.results}>
          <RedButton
            navigation={this.props.navigation}
            text={"Try again?"}
            onSubmit={this.onTryAgain}
            backgroundColor={Style.colors.LIGHT_GRAY2}
            textColor={Style.colors.DARK_GRAY2} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Style.presets.background,
  },
  headingContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  h2: {
    fontFamily: Style.fonts.fontFamily,
    fontSize: wp('4%'),
    color: Style.colors.DARK_GRAY2
  },
  results: {
    marginBottom: 20,
    height: Dimensions.get('window').height * .09
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    padding: 20,
    position: 'absolute',
    bottom: 20
  },
  notFoundText: {
    textDecorationLine: 'underline'
  }
});
