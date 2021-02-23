import React from "react";
import { StyleSheet, View, Dimensions, Text, Slider } from "react-native";

const SeekBar = ({ positionMillis, durationMillis, stop, onSeek }) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: windowWidth - 20
            }}
          >
            <Text style={[{ width: 40 }]}>
              {Math.floor(positionMillis / 1000 / 60) +
                "." +
                Math.floor((positionMillis / 1000) % 60)}
            </Text>
            <Text>
              {Math.floor(durationMillis / 1000 / 60) +
                "." +
                Math.floor((durationMillis / 1000) % 60)}
            </Text>
          </View>
        </View>
        <Slider
          style={{ width: windowWidth - 20, height: 40 }}
          minimumValue={0}
          maximumValue={durationMillis}
          value={positionMillis}
          minimumTrackTintColor="lightgrey"
          maximumTrackTintColor="#000000"
          onSlidingComplete={onSeek}
        />
      </View>
    </>
  );
};

export default SeekBar;
