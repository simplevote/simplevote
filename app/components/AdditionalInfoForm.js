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
    let { container } = this.props;
    let { user } = container.state;
    user.homeAddress = value
    container.update(user);
  }

  handleGender = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.gender = value
    container.update(user);
  }

  handleParty = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.party = value
    container.update(user);
  }

  render() {
    let { user } = this.props.container.state;
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <FloatingLabel
            style={[Style.forms.container, Style.forms.inputContainer, {marginBottom: 10}]}
            onChangeText={this.handleAddress}
            inputStyle={Style.forms.input}
            labelStyle={Style.forms.input}
          >Home Address</FloatingLabel>
        <Dropdown
          label='Gender'
          data={genderOptions}
          value={user.gender}
          onChangeText={this.handleGender}
          inputTextStyle={Style.forms.input}
          fontSize={20}
          fontWeight={'bold'}
          textColor={Style.colors.VERY_LIGHT_GRAY}
          labelTextStyle={{fontWeight: 'bold'}}
          lineWidth={1}
        />
        <Dropdown
          label='Party'
          data={partyOptions}
          value={user.party}
          onChangeText={this.handleParty}
          inputTextStyle={Style.forms.input}
          fontSize={20}
          fontWeight={'bold'}
          textColor={Style.colors.VERY_LIGHT_GRAY}
          labelTextStyle={{fontWeight: 'bold'}}
          lineWidth={1}
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
