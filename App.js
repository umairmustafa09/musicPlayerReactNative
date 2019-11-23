import React from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  started = () => {
    alert('Lets Go !');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Player</Text>
      <Button  style={{ backgroundColor: '#50394c', padding:50 }} 
        onPress = { () => this.started() }>
        <Text style = {styles.getStartedButtonText}>Start Listing!</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4b7a6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    color: '#50394c',
    fontSize: 50,
    margin: 20,
  },
  getStartedButtonText: {
    color: 'white',
  }
});
