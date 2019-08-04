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

export default class RedButton extends React.Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={this.props.text}
          buttonStyle={[styles.redButtonExtra, Style.buttons.bigRed]}
          titleStyle={[Style.buttons.redText, styles.redButtonTextExtra]}
          onPress={() => {this.props.navigation.navigate('CheckRegistration')}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: Dimensions.get('window').height * .175,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redButtonExtra: {
    width: Dimensions.get('window').width * (9/10),
    height: Dimensions.get('window').height * .09,
  },
  redButtonTextExtra:{
    fontSize: wp('6%')
  }
});
