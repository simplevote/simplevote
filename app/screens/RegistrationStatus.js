import React, { Component } from 'react';
import { Style } from '../config/styles';
import RegisteredAddressesPartial from '../components/RegisteredAddressesPartial';
import RegistrationNotFoundPartial from '../components/RegistrationNotFoundPartial';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


export default class RegistrationStatusScreen extends Component {
  constructor(props) {
    super(props);
  }

  _createRegisteredView = (results) => {
    return <RegisteredAddressesPartial
      container={this.props.container}
      navigation={this.props.navigation}
      results={results} />
  }

  _createNonregisteredView = (results) => {
    return <RegistrationNotFoundPartial
      container={this.props.container}
      navigation={this.props.navigation}
      result={results} />
  }

  _createView = () => {
    const { user } = this.props.container.state;
    return Object.prototype.hasOwnProperty(user.registration_result, 'result')
      ? this._createRegisteredView(user.registration_result)
      : this._createNonregisteredView(user.registration_result);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._createView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Style.presets.background,
  },
});


