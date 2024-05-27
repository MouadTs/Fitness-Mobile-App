import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const PopEffect = ({ isVisible }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      scaleValue.setValue(0); // Reset the animation value
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isVisible, scaleValue]);

  return (
    <Animated.View
      style={[
        styles.popEffect,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      <Text style={styles.popEffectText}>🎉</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popEffect: {
    position: 'absolute',
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popEffectText: {
    fontSize: 36,
    color: '#4d962c',
  },
});

export default PopEffect;
