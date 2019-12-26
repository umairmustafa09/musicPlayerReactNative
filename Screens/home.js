import React, { useEffect, Component } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from "expo-av";


export default function HomeScreen() {

  const onDidMount = async () => {
    soundObject = new Audio.Sound();
    await soundObject.loadAsync(require('../assets/wohiKhudaHai.mp3'));
  }
  
  useEffect(() => {
    onDidMount()
    return () => {
      stopMusic();
    }
  }, [])

  const btnPlayClicked = async () => {
    await soundObject.playAsync();
  }

  const btnStopClicked = async () => {
    await soundObject.pauseAsync();
  }

  const stopMusic = () => {
    soundObject.stopAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Stack</Text>
      <Button style={{ backgroundColor: '#1A535C', padding:50 }} 
        onPress = { btnPlayClicked }>
        <Text style = {styles.getStartedButtonText}>Play</Text>
      </Button>
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin:20 }} 
        onPress={ btnStopClicked }>
        <Text style = {styles.getStartedButtonText}>Pause</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
