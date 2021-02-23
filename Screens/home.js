import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import MarqueeText from "react-native-marquee";

import LinkedList from "../linkList";
import SeekBar from "./seekBar";

export default function HomeScreen() {
  const DEFAULTTEXT = "No songs available";

  const [songs, setSongs] = useState(new LinkedList());
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [songName, setSongName] = React.useState(DEFAULTTEXT);
  const [songStatus, setSongStatus] = React.useState({
    isBuffering: false,
    durationMillis: 0,
    positionMillis: 0
  });
  const [isPlaying, setIsPlaying] = useState(false);
  let index = currentSongIndex;

  const didMount = async () => {
    console.disableYellowBox = true;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      });
      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    didMount();
    return () => {
      pauseSong();
    };
  }, []);

  const gotoPickSongFunc = async () => {
    pauseSong();
    pickSong();
  };

  const pickSong = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.name) {
      if (!songs.checkNode(result.name)) {
        songs.add(result);
        Alert.alert(`${result.name} added successfully.`);
        loadSongfunc();
      } else {
        Alert.alert(`${result.name} already added.`);
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setSongStatus({
      isBuffering: status.isBuffering,
      durationMillis: status.durationMillis,
      positionMillis: status.positionMillis
    });
  };

  const loadSongfunc = async () => {
    let NowPlaying = songs.elementAt(index);
    setSongName(NowPlaying.name);
    soundObject = new Audio.Sound();
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await soundObject.loadAsync({ uri: NowPlaying.uri });
  };

  const btnPlayAndPauseClicked = async () => {
    let NowPlaying = songs.elementAt(index);
    if (NowPlaying != null) {
      isPlaying == false ? playSong() : pauseSong();
      isPlaying == false ? setIsPlaying(true) : setIsPlaying(false);
    }
  };

  const playSong = async () => {
    await soundObject.playAsync();
  };

  const pauseSong = async () => {
    await soundObject.pauseAsync();
  };
  const stopSong = async () => {
    await soundObject.stopAsync();
  };

  const btnDeleteSong = () => {
    songs.removeAt(index);
    setIsPlaying(false);
    if (0 < index) {
      index = songs.size() - 1;
      setCurrentSongIndex(index);
      stopSong();
      loadSongfunc();
    } else if (0 == index) {
      stopSong();
      loadSongfunc();
    }
    if (songs.size() == 0) {
      Alert.alert("you have on song left");
      setSongName(DEFAULTTEXT);
      loadSongfunc();
      stopSong();
    }
  };

  const btnNextSong = () => {
    setIsPlaying(false);
    stopSong();
    ++index;
    setCurrentSongIndex(index);
    if (songs.size() > index) {
      stopSong();
      loadSongfunc();
    } else {
      --index;
      setCurrentSongIndex(index);
      Alert.alert("No next song avaliable");
    }
  };

  const btnPrevSong = () => {
    setIsPlaying(false);
    stopSong();
    --index;
    setCurrentSongIndex(index);
    if (0 <= index) {
      stopSong();
      loadSongfunc();
    } else {
      ++index;
      setCurrentSongIndex(index);
      Alert.alert("No previous song avaliable");
    }
  };

  const handleSeek = async (seekValue) => {
    await soundObject.playFromPositionAsync(seekValue);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Ionicons name="ios-headset" size={300} color="#1A535C" />
      <View style={styles.SongNamecontainer}>
        <MarqueeText
          style={styles.songNameText}
          duration={3000}
          marqueeOnStart
          loop
          marqueeDelay={1000}
          marqueeResetDelay={1000}
        >
          {songName}
        </MarqueeText>
      </View>
      <SeekBar
        durationMillis={songStatus.durationMillis}
        positionMillis={songStatus.positionMillis}
        onSeek={(e) => handleSeek(e)}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.control} onPress={gotoPickSongFunc}>
          <Ionicons name="ios-filing" size={48} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control}>
          <Ionicons
            name="ios-skip-backward"
            size={48}
            color="#444"
            onPress={btnPrevSong}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.control}
          onPress={btnPlayAndPauseClicked}
        >
          {isPlaying == false ? (
            <Ionicons name="ios-play-circle" size={88} color="#444" />
          ) : (
            <Ionicons name="md-pause" size={88} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control}>
          <Ionicons
            name="ios-skip-forward"
            size={48}
            color="#444"
            onPress={btnNextSong}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control}>
          <Ionicons
            name="ios-close-circle"
            size={48}
            color="#444"
            onPress={btnDeleteSong}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxWidth: 130
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  SongNamecontainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 50
  },
  control: {
    margin: 15
  },
  containerText: {
    color: "#1A535C",
    fontSize: 50,
    margin: 20
  },
  songNameText: {
    fontSize: 20
  },
  getStartedButtonText: {
    color: "white"
  }
});
