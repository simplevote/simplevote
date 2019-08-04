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


import { Button } from 'react-native-elements';
import { Style } from '../config/styles';

export default class SecurityNotice extends React.Component {
  render() {
    return (
      <View style={styles.security}>
        <Text style={styles.securityText}>
          This data is only stored on your phone. Learn more about our security here.
        </Text>
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
  },
  securityText: {
    fontSize: wp('4%'),
    fontFamily: Style.fonts.family.fontFamily,
    fontWeight: '100',
    color: Style.colors.DARKER_GRAY
  }
});
