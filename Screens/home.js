import React, { useEffect, Component } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from "expo-av";
import * as DocumentPicker from 'expo-document-picker';
import LinkedList from './linkList.js';


export default function HomeScreen() {
  let songs = new LinkedList();
  const didMount = async () => {
    try {
      await Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
       playsInSilentModeIOS: true,
       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
       shouldDuckAndroid: true,
       staysActiveInBackground: true,
       playThroughEarpieceAndroid: true,
      })
      this.loadAudio()
     } catch (e) {
      console.log(e)
     }
  }
  
  useEffect(() => {
    didMount();    
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
    songs.add(result);
    console.log(songs.size());
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

  const btnLinkList = () => {
  }

  const btnNextSong = () => {
  }

  const btnPrevSong = () => {
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
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin: 20 }} 
        onPress={ btnNextSong }>
        <Text style = {styles.getStartedButtonText}>Next</Text>
      </Button>
      <Button style={{ backgroundColor: '#1A535C', padding:50, margin: 20 }} 
        onPress={ btnPrevSong }>
        <Text style = {styles.getStartedButtonText}>Prev</Text>
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
