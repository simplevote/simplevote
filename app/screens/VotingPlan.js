import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import { Permissions } from 'expo';
import * as Calendar from 'expo-calendar'
import { Style } from '../config/styles';
import Lib from '../lib/index'
import BlueHeader from '../components/BlueHeader';
import VotingPlanForm from '../components/VotingPlanForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  getCalendarPermissionsAsync
} = Lib;

export default class VotingPlan extends React.Component {
  constructor(props) {
    super(props)
  }

  myCalendar = async () => {
    const status = await getCalendarPermissionsAsync();
    const { user } = this.props.container.state;
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
      const calendar = _.find(calendars, { 'type': 'local', 'title': 'Calendar' });
      if (calendar) {
        const votingTime = '6:00:00'
        const details = {
          title: "Time to vote!",
          startDate: '2019-11-06T06:00:00.000Z',
          endDate: '2019-11-06T07:00:00.000Z',
          location: "123 Fake Street, Anytown KY",
          notes: "You'll need your id to vote. If you're in line by 6 pm then you can vote"
        }
        const eventId = await Calendar.createEventAsync(calendar.id, details)
        if (eventId) {
          this.props.container.setState({isCalendarEventSet: true, eventId})
        }
      }
    }
  }

  render() {
    let { user } = this.props.container.state;
    return (
      <View style={styles.container}>
        <BlueHeader
          additionalStyle={{fontWeight: 'bold'}}
          text={"My voting plan"}
        />
        <VotingPlanForm
          container={this.props.container}
          navigation={this.props.navigation}
        />
        <RedButton
          navigation={this.props.navigation}
          disabled={false}
          text={"Create a calendar invite"}
          onSubmit={this.myCalendar}
          backgroundColor={Style.colors.RED}
          textColor={Style.colors.WHITE}
        />
        <SecurityNotice />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    fontFamily: Style.presets.fontFamily
  }
});
