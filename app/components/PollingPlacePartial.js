import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { Style } from '../config/styles';


export default class PollingPlace extends React.Component {
  render() {
    const { pollingPlace } = this.props.container.state.user;
    return (
      <View style={styles.container}>
        <Text style={styles.pollingPlaceLabel}>Polling Place</Text>
        <Text style={styles.pollingPlaceAddressStreet}>{pollingPlace.formattedLocation.formattedAddress}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  pollingPlaceLabel: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: Style.colors.DARKISH_GRAY,
    marginBottom: 5
  },
  pollingPlaceAddressStreet: {
    fontSize: wp('6%')
  }
});
