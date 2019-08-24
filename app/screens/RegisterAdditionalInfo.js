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
import AdditionalInfoForm from '../components/AdditionalInfoForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  checkRegistrationTargetSmart,
  updateUserRegistration
} = Lib;
import {
  MKProgress
} from 'react-native-material-kit';


export default class RegisterAdditionalInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = async () => {
    let { container } = this.props;
    let { user } = container.state;
    user.registered = true;
    user.isRegistering = false;
    user.registrationStep = "RegisterBasicInformation";
    container.update(user);
    this.props.navigation.navigate("CongratsRegistered");
  }

  render() {
    let disabled = !this.props.container.hasAdditionalInfo();
    return (
      <View style={styles.container}>
        <BlueHeaderRegister
          step={3}
          text={"Additional info"}
        />
        <MKProgress
          progress={1}
        />
        <AdditionalInfoForm
          container={this.props.container}
          navigation={this.props.navigation}
        />
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
