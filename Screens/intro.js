import React from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default function Intro(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Player</Text>
      <Button  style={{ backgroundColor: '#1A535C', padding:50 }} 
        onPress={() => { props.navigation.navigate('Home') }}>
        <Text style = {styles.getStartedButtonText}>Start Listing!</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    color: '#1A535C',
    fontSize: 50,
    margin: 20,
  },
  getStartedButtonText: {
    color: 'white',
  }
});
