import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { Style } from '../config/styles';
import CheckRegistrationHeader from '../components/CheckRegistrationHeader';
import CheckRegistrationForm from '../components/CheckRegistrationForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';

export default class CheckRegistrationScreen extends React.Component {
  constructor(props) {
    super(props)
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
