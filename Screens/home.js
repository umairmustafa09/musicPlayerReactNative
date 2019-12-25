import React, { useEffect, Component } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from "expo-av";


export default function HomeScreen() {

  const onDidMount = async () => {
    playbackObject = new Audio.Sound();
    await playbackObject.loadAsync(require('../assets/wohiKhudaHai.mp3'));
  }
  
  useEffect(() => {
    onDidMount()
    return () => {
      stopMusic();
    }
  }, [])

  const btnPlayClicked = async () => {
    await playbackObject.playAsync();
  }

  const btnStopClicked = async () => {
    await playbackObject.pauseAsync();
  }

  const stopMusic = () => {
    playbackObject.stopAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Stack</Text>
      <Button  style={{ backgroundColor: '#1A535C', padding:50 }} 
        onPress = { btnPlayClicked }>
        <Text style = {styles.getStartedButtonText}>Play</Text>
      </Button>
      <Button  style={{ backgroundColor: '#1A535C', padding:50, margin:20 }} 
        onPress={ btnStopClicked }>
        <Text style = {styles.getStartedButtonText}>Pause</Text>
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
