import React, { useEffect, useState } from 'react';
import { Button } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from "expo-av";
import * as DocumentPicker from 'expo-document-picker';
import LinkedList from './linkList.js';


export default function HomeScreen() {
  // let songs = ;
  const [songs, setsongs] = useState(new LinkedList());
  // let currentSongIndex = 0;
  const [currentSongIndex, SetcurrentSongIndex] = useState(0);
  const [isPlaying, SetisPlaying] = useState(false);
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
      pauseSong();
    }
  }, [])

  const gotoPickSongFunc = async () => { 
    pauseSong();
    pickSong();
  }

  const pickSong = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    songs.add(result);
    console.log("songSize ",songs.size());
    loadSongfunc();
  }

  const loadSongfunc = async () => {
    let NowPlaying = songs.elementAt(currentSongIndex);
    console.log( "currentSongIndex ",currentSongIndex, "NowPlaying ", NowPlaying );
    soundObject = new Audio.Sound();
    await soundObject.loadAsync({uri: NowPlaying.uri});
  }

  const btnPlayAndPauseClicked = async () => {
    isPlaying == false  ? playSong() : pauseSong() ;
    isPlaying == false  ? SetisPlaying(true) : SetisPlaying(false);
    console.log( isPlaying, "songSize ",songs.size(),"currentSongIndex ",currentSongIndex);
  }

  const playSong = async () => {
    await soundObject.playAsync()
  }

  const pauseSong = async () => {
    await soundObject.pauseAsync()
  }
  const stopSong = async () => {
    await soundObject.stopAsync();
  }
  
  const btnNextSong = async () => {
    SetcurrentSongIndex( currentSongIndex => ++currentSongIndex  )
    if( songs.size() >  currentSongIndex){
      console.log( "currentSongIndex ",currentSongIndex );
      loadSongfunc();
    }
    else{
      SetcurrentSongIndex( currentSongIndex => --currentSongIndex  )
      alert('No next song avaliable');
    }
  }

  const btnPrevSong = async () => {
    SetcurrentSongIndex( currentSongIndex => --currentSongIndex  )
    if( 0 <= currentSongIndex ){
    console.log( "currentSongIndex ",currentSongIndex );
    loadSongfunc();
    }
    else{
      SetcurrentSongIndex( currentSongIndex => --currentSongIndex  )
      alert('No next song avaliable');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Music Stack</Text>
      <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.control} onPress = { gotoPickSongFunc } >
        <Ionicons name='ios-filing' size={48} color='#444' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} >
        <Ionicons name='ios-skip-backward' size={48} color='#444' onPress={ btnPrevSong } />
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} onPress = { btnPlayAndPauseClicked }>
        {isPlaying == false  ?
        <Ionicons name='ios-play-circle' size={88} color='#444' />
        :
        <Ionicons name='md-pause' size={88} color='#444' />
        } 
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} >
        <Ionicons name='ios-skip-forward' size={48} color='#444' onPress={ btnNextSong }/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.control} >
        <Ionicons name='ios-close-circle' size={48} color='#444' />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
		margin: 20
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
