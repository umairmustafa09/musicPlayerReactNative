import React, { useEffect, Component } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from "expo-av";
import * as DocumentPicker from 'expo-document-picker';


export default function HomeScreen() {

  useEffect(() => {
    return () => {
      stopMusic();
    }
  }, [])

  const gotoPickSongFunc = async () => {
    stopMusic();
    pickSong();
  }

  const pickSong = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    soundObject = new Audio.Sound();
    await soundObject.loadAsync({uri: result.uri});
    console.log(soundObject);
  }

  const btnPlayClicked = async () => {
    await soundObject.playAsync();
  }

  const btnStopClicked = async () => {
    await soundObject.pauseAsync();
  }

  const stopMusic = async () => {
    await soundObject.stopAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Stack</Text>
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin: 20 }} 
        onPress = { gotoPickSongFunc }>
        <Text style = {styles.getStartedButtonText}>Choose Song</Text>
      </Button>
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin: 20 }} 
        onPress = { btnPlayClicked }>
        <Text style = {styles.getStartedButtonText}>Play</Text>
      </Button>
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin: 20 }} 
        onPress={ btnStopClicked }>
        <Text style = {styles.getStartedButtonText}>Pause</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
