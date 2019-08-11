import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import Lib from '../lib/index'
import CheckRegistrationHeader from '../components/CheckRegistrationHeader';
import CheckRegistrationForm from '../components/CheckRegistrationForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  checkRegistrationTargetSmart,
  updateUserRegistration
} = Lib;


export default class CheckRegistrationScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = async () => {
    let { user } = this.props.container.state
    const registration_status = await checkRegistrationTargetSmart(user)
    user = updateUserRegistration(user, registration_status)
    this.props.container.setState({user}, () => {
      this.props.navigation.navigate("RegistrationStatus");
    });
  }

  render() {
    let disabled = !this.props.container.hasBasicInfo();
    return (
      <View style={styles.container}>
        <CheckRegistrationHeader />
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
