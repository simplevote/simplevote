import React from 'react';
import {

    StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import Lib from '../lib/index'
import BlueHeaderRegister from '../components/BlueHeaderRegister';
import CheckRegistrationForm from '../components/CheckRegistrationForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  checkRegistrationTargetSmart,
  updateUserRegistration
} = Lib;
import {
  MKTextField,
  MKProgress
} from 'react-native-material-kit';


export default class RegisterBasicInformationScreen extends React.Component {
  constructor(props) {
    super(props)
    console.log(MKProgress)
  }

  onSubmit = async () => {
    let { user } = this.props.container.state
    const registration_status = await checkRegistrationTargetSmart(user)
    user = updateUserRegistration(user, registration_status)

    this.props.container.setState({user}, () => {
      if (registration_status.result) {
        this.props.navigation.navigate("RegistrationStatus");
      } else {
        this.props.navigation.navigate("RegisterVoterEligibility");
      }
    });
  }

  render() {
    let disabled = !this.props.container.hasBasicInfo();
    return (
      <View style={styles.container}>
        <BlueHeaderRegister
          text={"Basic Information"}
        />
        <MKProgress
          progress={.33}
        />
        <CheckRegistrationForm container={this.props.container} />
        <RedButton
          navigation={this.props.navigation}
          disabled={disabled}
          text={"Submit"}
          onSubmit={this.onSubmit}
          backgroundColor={Style.colors.RED}
          textColor={Style.colors.WHITE}
        />
        <SecurityNotice />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    fontFamily: Style.presets.fontFamily
  }
});
