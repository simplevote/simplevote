import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var FloatingLabel = require('react-native-floating-labels');
import { Style } from '../config/styles';

export default class CheckRegistrationForm extends React.Component {
  constructor(props) {
    super(props)
  }
  // add handlers for each form value to set the user's state
  handleEndFirstName = (value) => {
    let { user } = this.props.container.state
    user.firstName = value
    this.props.container.setState({user})
  }

  handleEndLastName = (value) => {
    let { user } = this.props.container.state
    user.lastName = value
    this.props.container.setState({user})
  }

  handleEndZipcode = (value) => {
    let { user } = this.props.container.state
    user.zipcode = value
    this.props.container.setState({user})
  }

  handleEndBirthyear = (value) => {
    let { user } = this.props.container.state
    user.birthyear = value
    this.props.container.setState({user})
  }

  render() {
    return (
      <KeyboardAwareScrollView
        innerRef={ref => {this.scroll = ref}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'always'}
        keyboardOpeningTime={500}
        extraHeight={0}
        extraScrollHeight={0}
        contentContainerStyle={styles.container}>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          onChangeText={this.handleEndFirstName}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.label}
        >Legal first name</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          onChangeText={this.handleEndLastName}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.label}
        >Legal last name</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          onChangeText={this.handleEndZipcode}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.label}
        >Zipcode</FloatingLabel>
        <FloatingLabel
          style={[Style.forms.container, Style.forms.inputContainer]}
          onChangeText={this.handleEndBirthyear}
          inputStyle={Style.forms.input}
          labelStyle={Style.forms.label}
        >Birthyear</FloatingLabel>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: Style.margins.MEDIUM,
    height: Dimensions.get('window').height * .5,
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    fontSize: Style.fonts.size.LARGE
  }
});
