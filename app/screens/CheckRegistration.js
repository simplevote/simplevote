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
    //console.log(props.container);
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckRegistrationHeader />
        <CheckRegistrationForm />
        <RedButton
          navigation={this.props.navigation}
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
