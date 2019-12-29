import * as React from 'react';
import { createAppContainer, withOrientation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Intro from './Screens/intro';
import HomeScreen from './Screens/home';
import Icon from './Icons/icon';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Intro: Intro,
  },
  {
    initialRouteName: 'Intro',
    defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1A535C',
      zIndex: 100,
      height: 100,
    },
    // header: null,
    // title: 'musicPlayer',
    headerTitle: <Icon/>,
    headerBackTitle: 'Back',
    headerTintColor: 'white',
    headerTitleStyle: {
    fontSize: 30,
    // fontFamily: 'Cochin',
    color: 'white',
    },
  },
});

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <AppContainer />
  );
}

