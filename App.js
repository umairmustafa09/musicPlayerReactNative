import * as React from 'react';
import { createAppContainer, withOrientation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Intro from './Screens/intro';
import HomeScreen from './Screens/home';

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
      height: 80,
    },
    header: null,
    title: 'MPlayer',
    headerBackTitle: 'Back',
    headerTintColor: 'white',
    headerTitleStyle: {
    fontSize: 30,
    fontFamily: 'Cochin',
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

