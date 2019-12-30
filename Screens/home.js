import React, { useEffect, useState } from 'react';
// import React from 'react'
import { Button, InputGroup } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from "expo-av";
import * as DocumentPicker from 'expo-document-picker';
import LinkedList from './linkList.js';


export default function HomeScreen() {
  const [songs, setSongs] = useState(new LinkedList());
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  let index = currentSongIndex;
  const [isPlaying, setIsPlaying] = useState(false);
  
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
    let NowPlaying = songs.elementAt(index);
    console.log( "currentSongIndex ",currentSongIndex, "NowPlaying ", NowPlaying, "index", index );
    soundObject = new Audio.Sound();
    await soundObject.loadAsync({uri: NowPlaying.uri});
  }

  const btnPlayAndPauseClicked = async () => {
    let NowPlaying = songs.elementAt(index);
    if( NowPlaying != null ){
      isPlaying == false  ? playSong() : pauseSong() ;
      isPlaying == false  ? setIsPlaying(true) : setIsPlaying(false);
      console.log( isPlaying, "songSize ",songs.size(),"currentSongIndex ",currentSongIndex, "index", index);
    }
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

  const btnDeleteSong = () => {
    console.log("index", index);
    let NowPlaying = songs.elementAt(index);
    console.log( "nowPlaying", NowPlaying );
    songs.removeAt(index);
    loadSongfunc();
    stopSong();
    if( 0 < index ){
      console.log("songs Size ", songs.size())
      console.log( "index", index );
      index = songs.size() - 1;
    // index--;
    setCurrentSongIndex( index );
    // stopSong();
    }
    else if(songs.size() == 0){
      alert('you have on song left')
      console.log(songs.size())
      loadSongfunc();
      stopSong();
    }
  }
  
  const btnNextSong = () => {
    ++index;
    setCurrentSongIndex( index );
    if( songs.size() >  index ){
      console.log( "currentSongIndex ",currentSongIndex, "index ", index );
      stopSong();
      loadSongfunc();
    }
    else{
      // setCurrentSongIndex( currentSongIndex - 1 )
      --index;
      setCurrentSongIndex( index );
      alert('No next song avaliable');
    }
  }


  const btnPrevSong = () => {
    --index;
    setCurrentSongIndex( index );
    if( 0 <= index ){
    console.log( "currentSongIndex ",currentSongIndex, "index ", index );
    stopSong();
    loadSongfunc();
    }
    else{
      ++index;
      setCurrentSongIndex( index, songs.elementAt(index) );
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
        <Ionicons name='ios-close-circle' size={48} color='#444' onPress={ btnDeleteSong }/>
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
