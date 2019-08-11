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


export default class BlueHeaderPartial extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * .225,
    backgroundColor: Style.colors.LIGHT_BLUE,
    justifyContent: 'flex-end',
    fontFamily: Style.presets.fontFamily,
    padding:  Style.margins.MEDIUM
  },
  text: {
    color: 'white',
    fontSize: wp('8.5%')
  }
});
