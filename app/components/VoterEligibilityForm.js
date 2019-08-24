import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import { Checkbox } from 'react-native-material-ui';
import {
  MKTextField,
  MKColor,
  MKCheckbox,
  mdl
} from 'react-native-material-kit';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
var FloatingLabel = require('react-native-floating-labels');

const textInputStyle = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
});

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Social Security Number')
  .withStyle([textInputStyle.textfieldWithFloatingLabel, Style.forms.input])
  .withTextInputStyle({flex: 1, height: 50})
  .withFloatingLabelFont({
    fontSize: 14,
    fontWeight: '200',
  })
  .build();
// <TextfieldWithFloatingLabel />


export default class VoterEligibilityForm extends React.Component {
  handleSocialSecurityNumber = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.socialSecurityNumber = value
    container.update(user);
    this.props.container.setState({user})
  }

  handleIsNotFelon = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.isNotFelon = value
    container.update(user);
    this.props.container.setState({user})
  }

  handleIsNotMentallyIncompetent = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.isNotMentallyIncompetent = value
    container.update(user);
    this.props.container.setState({user})
  }

  handleIsNotClaimedElsewhere = (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.isNotClaimedElsewhere = value
    container.update(user);
    this.props.container.setState({user});
  }

  render() {
    let { user } = this.props.container.state;

    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <FloatingLabel
            style={[Style.forms.container, Style.forms.inputContainer, {marginBottom: 10}]}
            onChangeText={this.handleSocialSecurityNumber}
            value={user.socialSecurityNumber}
            inputStyle={Style.forms.input}
            labelStyle={Style.forms.label}
          >Social Security Number</FloatingLabel>
        </View>
        <Checkbox
         label={"I am not a convicted fellon, or if I have been convicted of a felony, my civic rights have been restored by executive pardon."}
         checked={user.isNotFelon}
         onCheck={this.handleIsNotFelon}
         value={"Yes"}
         style={checkboxStyle}
        />
        <Checkbox
         label={'I have not been judged "mentally incompetent" in a court of law'}
         checked={user.isNotMentallyIncompetent}
         onCheck={this.handleIsNotMentallyIncompetent}
         value={"Yes"}
         style={checkboxStyle}
        />
        <Checkbox
         label={"I do not clain the right to vote anywhere outside of kentucky"}
         checked={user.isNotClaimedElsewhere}
         onCheck={this.handleIsNotClaimedElsewhere}
         value={"Yes"}
         style={checkboxStyle}
        />
      </View>
    );
  }
}


const checkboxStyle = {
  container: {
    flex: 0,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    paddingRight: Dimensions.get('window').width * .05,
    paddingLeft: Dimensions.get('window').width * .022,
  },
  label: {
    paddingTop: 12,
    fontSize: wp('4%'),
    fontFamily: Style.fonts.family.FONT_FAMILY,
    color: Style.colors.DARKER_GRAY,
    fontWeight: '200'
  },
  icon: {
    color: Style.colors.LIGHT_BLUE,
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: Dimensions.get('window').height * .5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    width: Dimensions.get('window').width * .9,
  }
});
