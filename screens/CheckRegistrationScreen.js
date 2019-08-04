import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { Style } from './app/config/styles';

export default function App() {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    fontFamily: Style.presets.fontFamily
  },
});
