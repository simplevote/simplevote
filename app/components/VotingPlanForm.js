import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import { Dropdown } from 'react-native-material-dropdown';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
var FloatingLabel = require('react-native-floating-labels');

const timeOptions = [{
    value: '6:00am'
}, {
    value: '7:00'
}, {
    value: '8:00'
}, {
    value: '9:00'
}, {
    value: '10:00'
}, {
    value: '11:00'
}, {
    value: '12:00pm'
}, {
    value: '1:00'
}, {
    value: '2:00'
}, {
    value: '3:00'
}, {
    value: '4:00'
}, {
    value: '5:00'
}, {
    value: '6:00'
}]

export default class VotingPlanForm extends React.Component {

  handleParty = (value) => {
    let { user } = this.props.container.state
    user.party = value
    this.props.container.setState({user})
  }

  render() {
    let { user } = this.props.container.state;
    return (
      <View style={styles.container}>
        <View style={styles.text}>
        <Dropdown
          label='Time you plan on voting'
          data={timeOptions}
          value={user.votingTime}
          onChangeText={() => {}}
          //containerStyle={Style.forms.container}
          inputTextStyle={Style.forms.input}
          fontSize={20}
          fontWeight={'bold'}
          //color={Style.colors.DARKISH_GRAY}
          textColor={Style.colors.VERY_LIGHT_GRAY}
          labelTextStyle={{fontWeight: 'bold'}}
          lineWidth={1}
        />
        <Text style={{color: Style.colors.VERY_LIGHT_GRAY}}>If you're in line by 6pm, you'll be able to vote </Text>
          <View style={styles.pollingPlace}>
            <Text style={styles.pollingPlaceLabel}>Recommended Polling Place</Text>
            <Text style={styles.pollingPlaceAddressStreet}>123 Fake Street</Text>
            <Text style={styles.pollingPlaceAddressStreet}>Anytown, KY 12345</Text>
          </View>
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
  },
  pollingPlace: {
    marginVertical: 20
  },
  pollingPlaceLabel: {
    fontSize: wp('4.5%'),
    color: Style.colors.VERY_LIGHT_GRAY,
    marginBottom: 5
  },
  pollingPlaceAddressStreet: {
    fontSize: wp('7%')
  }
});
