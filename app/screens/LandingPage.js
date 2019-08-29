import React, { Component } from 'react';
import { Platform } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo';
import Lib from '../lib/index';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { Style } from '../config/styles';

const {
  registerForPushNotificationsAsync,
  updateNotificationToken
} = Lib;

export default class LandingPageScreen extends React.Component {
  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide();
  }

  componentDidMount = async () => {
    const { container } = this.props;
    // Cache image resources
    await this._cacheResources();
    // Load the user information
    await container.load();
    // Get the user. Note: this has to be after container load!
    const { user } = container.state;
    const screen = this._checkRegistration(user);
    // Navigate to the screen
    this._navigate(screen);
  }

  _navigate = (screen) => {
    this.props.navigation.navigate(screen);
  }

  _checkRegistration = (user) => {
    return user.registered
      ? "VotingPlan"
      : user.isRegistering
        ? user.registrationStep
        : "CheckRegistration"
  }

  _cacheResources = async () => {
    const images = [
      require('../../assets/tick.png'),
      require('../../assets/logo.png')
    ];
    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
    return Promise.all(cacheImages)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/logo.png')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width * .35,
                height: Dimensions.get('window').width * .35,
              }}
            />
          </View>
          <Text style={styles.name}>
             <Text>Simple</Text>
             <Text style={styles.highlight}>Vote</Text>
          </Text>
          <Text style={styles.valueProps}>Registration &#183; Polling locations &#183; Voter guides</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    fontFamily: Style.presets.fontFamily
  },
  logoContainer: {
    height: Dimensions.get('window').height * .724,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: Dimensions.get('window').width / 4,
    backgroundColor: Style.colors.LIGHT_BLUE,
    marginVertical: 40
  },
  name: {
    fontSize: wp('14%'),
    color: Style.colors.DARK_BLUE,
    fontFamily: Style.presets.fontFamily
  },
  highlight: {
    fontWeight: 'bold',
    color: Style.colors.RED
  },
  valueProps: {
    fontSize: wp('4.5%'),
    fontFamily: Style.fonts.family.FONT_FAMILY,
    fontWeight: '100',
    color: Style.colors.DARKER_GRAY,
    marginVertical: 20
  }
});
