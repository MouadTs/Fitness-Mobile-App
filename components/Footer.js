// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Footer = ({ currentPage }) => {
  const navigation = useNavigation();

  const handlePress = (page) => {
    navigation.navigate(page);
  };

  return (
    <View style={styles.footerContainer}>
      <BlurView intensity={40} style={styles.blurContainer} />
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress('Mainpage')}>
        <Ionicons name="home" size={24} color={currentPage === 'Home' ? '#63c138' : 'white'} />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress('AchievementsPage')}>
        <FontAwesome5 name="medal" size={24} color={currentPage === 'Achievements' ? '#63c138' : 'white'} />
        <Text style={styles.footerButtonText}>Achievements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress('Stats')}>
        <Ionicons name="stats-chart" size={24} color={currentPage === 'Stats' ? '#63c138' : 'white'} />
        <Text style={styles.footerButtonText}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => handlePress('Profile')}>
        <MaterialCommunityIcons name="face-man-profile" size={24} color={currentPage === 'Profile' ? '#63c138' : 'white'} />
        <Text style={styles.footerButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    // FooterStyle.js



  footerContainer: {
    height:80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    fontSize: 12,
    color: 'white',
  },
});



export default Footer;
