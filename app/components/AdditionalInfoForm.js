import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import {
  MKTextField,
  mdl
} from 'react-native-material-kit';
import { Dropdown } from 'react-native-material-dropdown';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
var FloatingLabel = require('react-native-floating-labels');

const genderOptions = [{
  value: 'Male'
}, {
  value: 'Female'
}]

const partyOptions = [{
  value: 'Democratic'
}, {
  value: 'Republican'
}, {
  value: 'Other'
}, {
  value: 'Constitution'
}, {
  value: 'Reform'
}, {
  value: 'Independent'
}, {
  value: 'Libertarian'
}, {
  value: 'Socialist Workers'
}, {
  value: 'Green'
}]

export default class AdditionalInfoForm extends React.Component {
  handleAddress = (value) => {
    let { user } = this.props.container.state
    user.socialSecurityNumber = value
    this.props.container.setState({user})
  }

  handleGender = (value) => {
    let { user } = this.props.container.state
    user.isNotFelon = value
    this.props.container.setState({user})
  }

  handleParty = (value) => {
    let { user } = this.props.container.state
    user.isNotMentallyIncompetent = value
    this.props.container.setState({user})
  }

  render() {
    let { user } = this.props.container.state;

    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <FloatingLabel
            style={[Style.forms.container, Style.forms.inputContainer, {marginBottom: 10}]}
            onChangeText={this.handleSocialSecurityNumber}
            inputStyle={Style.forms.input}
            labelStyle={Style.forms.input}
          >Home Address</FloatingLabel>
        <Dropdown
          label='Gender'
          data={genderOptions}
          //containerStyle={Style.forms.container}
          inputTextStyle={Style.forms.input}
          fontSize={20}
          fontWeight={'bold'}
          //color={Style.colors.DARKISH_GRAY}
          textColor={Style.colors.VERY_LIGHT_GRAY}
          labelTextStyle={{fontWeight: 'bold'}}
          lineWidth={1.25}
        />
        <Dropdown
          label='Party'
          data={partyOptions}
          //containerStyle={Style.forms.container}
          inputTextStyle={Style.forms.input}
          fontSize={20}
          fontWeight={'bold'}
          //color={Style.colors.DARKISH_GRAY}
          //titleTextStyle={{fontWeight: 'bold'}}
          labelTextStyle={{fontWeight: 'bold'}}
          lineWidth={1.25}
          textColor={Style.colors.VERY_LIGHT_GRAY}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'column',
    height: Dimensions.get('window').height * .5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    width: Dimensions.get('window').width * .9,
  }
});
