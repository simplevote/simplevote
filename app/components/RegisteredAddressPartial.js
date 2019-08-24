import React, { Component } from 'react';
import _ from 'lodash';
import { Style } from '../config/styles';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Lib from '../lib/index'
const {
  formatUserAddress
} = Lib;


export default class RegisteredAddressPartial extends Component {
  constructor(props) {
    super(props);
  }

  _handlePress = () => {
    const { result, container } = this.props;
    let { user } = container.state;
    user.registered = true
    user.street = _.startCase(_.toLower(result['vb.vf_reg_address_1']));
    user.city = _.startCase(_.toLower(result['vb.vf_reg_city']));
    user.formattedAddress = formatUserAddress(user);
    container.update(user);
    this.props.navigation.navigate("CongratsRegistered");
  }

  render() {
    const { result } = this.props;
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={Style.colors.ghostWhite}
        onPress={this._handlePress}>
        <View style={styles.container}>
          <Text style={[styles.result, {fontWeight: 'bold'}]}>
            {result['vb.vf_reg_address_1']} {"\n"}
          </Text>
          <Text style={styles.result}>
            {result['vb.vf_reg_city']}, {result['vb.vf_reg_state']} {result['vb.vf_reg_zip']}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Style.colors.VERY_LIGHT_GRAY2
  },
  result: {
    flex: 1,
    fontSize: wp('6%'),
    fontFamily: Style.fonts.family.FONT_FAMILY,
    margin: 0,
    padding: 0,
    color: Style.colors.DARK_GRAY2
  }
});
