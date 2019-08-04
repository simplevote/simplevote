import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider, Subscribe } from 'unstated';
import { Button } from 'react-native-elements';

import UserContainer from './app/lib/UserContainer';
import HomeScreen from './app/screens/Home';
import CheckRegistrationScreen from './app/screens/CheckRegistration';
import { Style } from './app/config/styles';


const Stack = createStackNavigator({
  Home: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<HomeScreen {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
  CheckRegistration: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<CheckRegistrationScreen {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
});

const AppContainer = createAppContainer(Stack);

const App = () => (
  <Provider>
    <Subscribe to={[UserContainer]}>
      {container => <AppContainer container={container} /> }
    </Subscribe>
  </Provider>
);

export default App
