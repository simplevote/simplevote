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
import LandingPageScreen from './app/screens/LandingPage';
import HomeScreen from './app/screens/Home';
import CheckRegistrationScreen from './app/screens/CheckRegistration';
import RegistrationStatusScreen from './app/screens/RegistrationStatus';
import CongratsRegistered from './app/screens/CongratsRegistered';
import RegisterBasicInformation from './app/screens/RegisterBasicInformation';
import RegisterVoterEligibility from './app/screens/RegisterVoterEligibility';
import RegisterAdditionalInfo from './app/screens/RegisterAdditionalInfo';


const Stack = createStackNavigator({
  LandingPage: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<LandingPageScreen {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
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
  RegistrationStatus: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<RegistrationStatusScreen {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
  CongratsRegistered: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<CongratsRegistered {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
  RegisterBasicInformation: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<RegisterBasicInformation {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
  RegisterVoterEligibility: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<RegisterVoterEligibility {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  },
  RegisterAdditionalInfo: {
    screen: (props) => (
      <Subscribe to={[UserContainer]}>
        {container => (<RegisterAdditionalInfo {...props} container={container} />)}
      </Subscribe>
    ),
    navigationOptions: {
      header: null
    }
  }
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
