import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { Button } from 'react-native-elements';
import { Style } from '../config/styles';


export default class SecurityNotice extends React.Component {
  render() {
    return (
      <View style={styles.security}>
        <View style={styles.lock}>
          <Image
            source={require('../../assets/padlock.png')}
            style={{
              width: Dimensions.get('window').width * .05,
              height: Dimensions.get('window').width * .05,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.securityText}>
            This data is only stored on your phone. Learn more about our security here.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  security: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .1,
    paddingHorizontal: Style.margins.MEDIUM,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textContainer: {
    width: Dimensions.get('window').width * .8,
  },
  securityText: {
    fontSize: wp('3.5%'),
    fontFamily: Style.fonts.family.fontFamily,
    fontWeight: '100',
    color: Style.colors.DARKER_GRAY
  },
  lock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimensions.get('window').width * .04,
    width: Dimensions.get('window').width * .1,
    height: Dimensions.get('window').width * .1,
    borderRadius: Dimensions.get('window').width * .05,
    backgroundColor: Style.colors.VERY_LIGHT_GRAY2
  },
});
