import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
var FloatingLabel = require('react-native-floating-labels');
import { Style } from '../config/styles';

export default class CheckRegistrationForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.input}
        >Legal first name</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.input}
        >Legal last name</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.input}
        >Zipcode</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.input}
        >Birthyear</FloatingLabel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * .5,
    fontFamily: Style.presets.fontFamily,
    paddingHorizontal:  Style.margins.MEDIUM,
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: Style.fonts.size.LARGE
  }
});
