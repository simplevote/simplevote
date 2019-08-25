import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'
import { Style } from '../config/styles';
import Lib from '../lib/index'
import BlueHeader from '../components/BlueHeader';
import VotingPlanForm from '../components/VotingPlanForm';
import PollingPlace from '../components/PollingPlacePartial';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  getCalendarPermissionsAsync,
  searchRepresentatives,
  fetchElections,
  fetchElection,
  searchElection
} = Lib;
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

const HOUR_MAP = {
  '6:00 am': '06:00',
  '7:00 am': '07:00',
  '8:00 am': '08:00',
  '9:00 am': '09:00',
  '10:00 am': '10:00',
  '11:00 am': '11:00',
  '12:00 pm': '12:00',
  '1:00 pm': '13:00',
  '2:00 pm': '14:00',
  '3:00 pm': '15:00',
  '4:00 pm': '16:00',
  '5:00 pm': '17:00',
  '6:00 pm': '18:00',
}

export default class VotingPlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
      pollingLocation: null,
      calendars: []
    }
  }

  onOptionSelect = async (calendarId) => {
    let { votingTime } = this.props.container.state.user
    let votingHour = HOUR_MAP[votingTime]
    const time = `2019-11-06T${votingHour}:00.000Z`
    let { user } =  this.props.container.state;
    const details = {
      title: "Time to vote!",
      startDate: time,
      endDate: '2019-11-06T08:00:00.000Z',
      location: user.pollingPlace.formattedLocation.formattedAddress,
      notes: "You'll need your id to vote. If you're in line by 6 pm then you can vote"
    }

    const eventId = await Calendar.createEventAsync(calendarId, details)

    if (eventId) {
      let { user } =  this.props.container.state;
      user.isCalendarEventSet = true;
      user.calendarEventId = eventId;
      this.props.container.setState({user});
      this.setState({opened: false});
      alert("Event created!");
    }
  }

  onTriggerPress() {
    this.setState({ opened: true });
  }

  onBackdropPress() {
    this.setState({ opened: false });
  }

  createMenuItems = () => {
    const { calendars } = this.state;
    return calendars.map((calendar, ix) => {
      return (
        <MenuOption
          key={ix}
          onSelect={this.handleMenuSelection}
          text={calendar.title}
          value={calendar.id}
          />
      );
    })
  }

  myCalendar = async () => {
    const status = await getCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
      this.setState({opened: true, calendars})
    }
  }

  render() {
    const { user } = this.props.container.state
    const disabled = !user.votingTime && !user.isCalendarEventSet
      ? false
      : user.votingTime && !user.isCalendarSet
        ? false
        : true;
    const text = user.isCalendarEventSet
      ? "Calendar invite created"
      : "Create a calendar invite"
    const menuItems = this.createMenuItems();
    const { opened } = this.state;
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
          disabled={disabled}
          text={text}
          onSubmit={this.myCalendar}
          backgroundColor={Style.colors.RED}
          textColor={Style.colors.WHITE}
        />
        <Menu
          opened={opened}
          renderer={SlideInMenu}
          onBackdropPress={() => this.onBackdropPress()}
          onSelect={value => this.onOptionSelect(value)}>
          <MenuTrigger
            onPress={() => this.onTriggerPress()}
            text=''/>
          <MenuOptions customStyles={optionsStyles}>
            {menuItems}
          </MenuOptions>
        </Menu>
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

const optionsStyles = {
  optionsContainer: {
    padding: 5,
  },
  optionsWrapper: {
  },
  optionWrapper: {
    margin: 5,
  },
  optionText: {
    fontFamily: Style.fonts.family.FONT_FAMILY,
    fontSize: 18
  },
};
