import React, { Component } from 'react';
import { Style } from '../config/styles';
import RegisteredAddressPartial from '../components/RegisteredAddressPartial';
import BlueHeaderPartial from '../components/BlueHeader';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Lib from '../lib/index'
const { inWords } = Lib;


export default class RegisteredAddressesPartial extends Component {
  constructor(props) {
    super(props);
  }

  _createResult = (result, ix) => {
    return <RegisteredAddressPartial
      container={this.props.container}
      navigation={this.props.navigation}
      key={ix}
      result={result} />
  }

  _handlePress = () => {
    const { user } = this.props.container.state
    user.registered = false;
    this.props.container.setUser(user);
    this.props.navigation.navigate("Registration");
  }

  render() {
    const { results } = this.props;
    const addresses = results.result_set.map(this._createResult);
    const count = results.result_set.length
    const count_words = inWords(count).trim()
    const records = count > 1 ? 'records' : 'record'
    const text = `We found ${count} existing registration ${records}`


    return (
      <View style={styles.container}>
        <BlueHeaderPartial text={text} />
        <View style={styles.headingContainer}>
          <Text style={styles.h2}>Confirm you're registered at one of the following addresses</Text>
        </View>
        <ScrollView style={styles.results}>
          {addresses}
        </ScrollView>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={Style.colors.ghostWhite}
          onPress={this._handlePress}>
          <View style={styles.notFound}>
            <Text style={styles.notFoundText}>I don't see my address</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Style.presets.background,
  },
  headingContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  h2: {
    fontFamily: Style.fonts.fontFamily,
    fontSize: wp('4%'),
    color: Style.colors.DARK_GRAY2
  },
  results: {
    flex: 1,
    marginVertical: 20
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    padding: 20,
    position: 'absolute',
    bottom: 20
  },
  notFoundText: {
    textDecorationLine: 'underline'
  }
});
