import React, { Component } from 'react';
import { Platform } from 'react-native'
import { Asset, AppLoading, SplashScreen } from 'expo';
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
import RedButton from '../components/RedButton';
import { Style } from '../config/styles';
import Lib from '../lib/index';
const {
  fetchElection,
  processPollingPlace
} = Lib;

export default class CongratsRegistered extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let { container } = this.props;
    let { user } = container.state;
    const election = await fetchElection(2000, user);
    const pollingPlace = await processPollingPlace(election.pollingLocations);
    user.pollingPlace = pollingPlace;
    container.update(user);
  }


  onSubmit = async () => {
    this.props.navigation.navigate("VotingPlan");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}></View>
          <Text style={styles.name}>
             <Text style={{fontWeight: 'bold'}}>Congrats!</Text> You're registered to vote.
          </Text>
          <Text style={styles.valueProps}>There's no time like the present to figure out when and where you'll be voting.</Text>
        </View>
        <RedButton
          navigation={this.props.navigation}
          disabled={false}
          text={"Make my voting plan"}
          onSubmit={this.onSubmit}
          backgroundColor={Style.colors.RED}
          textColor={Style.colors.WHITE}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: Dimensions.get('window').width / 4,
    backgroundColor: Style.colors.LIGHT_BLUE,
    marginVertical: 40
  },
  name: {
    fontSize: wp('10%'),
    color: Style.colors.DARK_BLUE,
    fontFamily: Style.presets.fontFamily
  },
  highlight: {
    fontWeight: 'bold',
    color: Style.colors.RED
  },
  valueProps: {
    textAlign: 'center',
    fontSize: wp('4.5%'),
    fontFamily: Style.fonts.family.FONT_FAMILY,
    fontWeight: '100',
    color: Style.colors.DARKER_GRAY,
    marginVertical: 20
  }
});
