import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { Style } from '../config/styles';
import RedButton from '../components/RedButton';
import AlreadyRegisteredButton from '../components/AlreadyRegisteredButton';

export default class HomeScreen extends React.Component {
  onSubmit = () => {
    this.props.navigation.navigate("CheckRegistration")
  }

  onSubmitRegister = async () => {
    let { container } = this.props;
    let { user } = container.state;
    user.isRegistering = true;
    user.registrationStep = "RegisterBasicInformation";
    container.update(user);
    this.props.navigation.navigate("RegisterBasicInformation")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}></View>
          <Text style={styles.name}>
             <Text>Simple</Text>
             <Text style={styles.highlight}>Vote</Text>
          </Text>
          <Text style={styles.valueProps}>Registration &#183; Polling locations &#183; Voter guides</Text>
        </View>
        <RedButton
          navigation={this.props.navigation}
          text={"Register to vote"}
          onSubmit={this.onSubmitRegister}
          backgroundColor={Style.colors.RED}
          textColor={Style.colors.WHITE}
        />
        <AlreadyRegisteredButton navigation={this.props.navigation} />
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
