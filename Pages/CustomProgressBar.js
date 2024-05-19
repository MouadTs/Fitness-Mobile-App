import React from "react";
import { View, StyleSheet } from "react-native";

const CustomProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    backgroundColor: "#3b3b3d",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default CustomProgressBar;
