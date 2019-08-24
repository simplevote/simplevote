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
import VoterEligibilityForm from '../components/VoterEligibilityForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  checkRegistrationTargetSmart,
  updateUserRegistration
} = Lib;
import {
  MKProgress
} from 'react-native-material-kit';


export default class RegisterVoterEligibilityScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = async () => {
    let { container } = this.props;
    let { user } = container.state;
    user.registrationStep = "RegisterAdditionalInfo";
    console.log('updateing addtional info');
    container.update(user);
    this.props.navigation.navigate("RegisterAdditionalInfo");
  }

  render() {
    let disabled = !this.props.container.isEligible();
    return (
      <View style={styles.container}>
        <BlueHeaderRegister
          step={2}
          text={"Voter eligibility"}
        />
        <MKProgress
          progress={.66}
        />
        <VoterEligibilityForm
          container={this.props.container}
          navigation={this.props.navigation}
        />
        <RedButton
          navigation={this.props.navigation}
          disabled={disabled}
          text={"Continue"}
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
