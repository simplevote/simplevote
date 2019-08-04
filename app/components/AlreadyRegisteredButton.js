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

import { Button } from 'react-native-elements';
import { Style } from '../config/styles';

export default class AlreadyRegisteredButton extends React.Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
          <Button
            title="I'm already registered or I'm not sure"
            buttonStyle={styles.unsureButton}
            titleStyle={styles.unsureTitle}
            onPress={() => {this.props.navigation.navigate('CheckRegistration')}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: (Dimensions.get('window').height * .1),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  unsureButton: {
    backgroundColor: Style.colors.LIGHT_GRAY,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .1,
    padding: 0,
  },
  unsureTitle: {
    fontSize: wp('4.5%'),
    fontFamily: Style.presets.fontFamily,
    fontWeight: '100',
    color: Style.colors.DARKER_GRAY
  }
});
