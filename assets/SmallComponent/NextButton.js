import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NextButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{ label="Next"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A2ED3A', // Change button background color here
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height:60,
    width:140,
  },
  label: {
    color: 'black', // Change button text color here
    fontSize: 20,
    fontFamily:'AppleSDGothicNeo-Light',
    fontWeight: 'bold',
  },
});

export default NextButton;
