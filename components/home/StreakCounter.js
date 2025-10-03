// components/home/StreakCounter.js - Streak Counter Component
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
};

export const StreakCounter = ({ streak = 0 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.streakNumber}>{streak}</Text>
      <Image 
        source={require('../../assets/images/Streak 1.png')} 
        style={styles.streakIcon}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Changed from 'center' to align right
    paddingTop: 20,
    paddingRight: 20, // Added right padding
    marginBottom: 20,
  },
  streakNumber: {
    fontSize: 20, // Reduced from 24 to match design better
    fontWeight: 'bold',
    color: BRAND_COLORS.darkGray, // Changed from black to dark gray
    marginRight: 8,
  },
  streakIcon: {
    width: 32,
    height: 32,
  },
});