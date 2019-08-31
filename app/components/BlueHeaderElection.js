import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Style } from '../config/styles';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';


export default class BlueHeaderElectionPartial extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text2]}>{this.props.text2}</Text>
        <Text style={[styles.text1, this.props.additionalStyle]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * .2,
    backgroundColor: Style.colors.LIGHT_BLUE,
    justifyContent: 'flex-end',
    fontFamily: Style.presets.fontFamily,
    padding: 15 //Style.margins.MEDIUM
  },
  text1: {
    color: 'white',
    fontSize: wp('8.5%')
  },
  text2: {
    //fontWeight: 'bold',
    color: 'white',
    fontSize: wp('4%'),
    marginBottom: 5
  }
});
