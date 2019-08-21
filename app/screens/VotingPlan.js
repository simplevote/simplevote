import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import Lib from '../lib/index'
import BlueHeader from '../components/BlueHeader';
import VotingPlanForm from '../components/VotingPlanForm';
import RedButton from '../components/RedButton';
import SecurityNotice from '../components/SecurityNotice';
const {
  checkRegistrationTargetSmart,
  updateUserRegistration
} = Lib;

export default class VotingPlan extends React.Component {
  constructor(props) {
    super(props)
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
          onSubmit={this.onSubmit}
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
