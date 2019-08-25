import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import PollingPlace from './PollingPlacePartial';
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
  handleTime = async (value) => {
    let { container } = this.props;
    let { user } = container.state;
    user.votingTime = value
    container.update(user);
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
            onChangeText={this.handleTime}
            //containerStyle={Style.forms.container}
            inputTextStyle={Style.forms.input}
            fontSize={20}
            fontWeight={'bold'}
            //color={Style.colors.DARKISH_GRAY}
            textColor={Style.colors.VERY_LIGHT_GRAY}
            labelTextStyle={{fontWeight: 'bold'}}
            lineWidth={1}
          />
         <PollingPlace container={this.props.container} />
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
