import * as React from 'react';
import { createAppContainer } from 'react-navigation';
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
      backgroundColor: 'transparent',
      zIndex: 100,
    },
    // headerLeft: null,
    headerTintColor: '#1A535C',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <AppContainer />
  );
}