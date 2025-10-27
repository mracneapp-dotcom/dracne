// components/home/StreakCounter.js - FULL UPDATED CODE WITH REAL STREAK LOGIC
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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

const STREAK_STORAGE_KEY = '@dracne_user_streak';
const LAST_LOGIN_STORAGE_KEY = '@dracne_last_login';

// Helper function to get date string (YYYY-MM-DD)
const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

// Helper function to check if two dates are consecutive days
const isYesterday = (dateString) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateString(yesterday) === dateString;
};

export const StreakCounter = ({ streak: propStreak = null }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    updateStreak();
  }, []);

  const updateStreak = async () => {
    try {
      const today = getDateString();
      const lastLogin = await AsyncStorage.getItem(LAST_LOGIN_STORAGE_KEY);
      const savedStreak = await AsyncStorage.getItem(STREAK_STORAGE_KEY);
      
      let newStreak = 1; // Default to 1 for first time or reset

      if (lastLogin && savedStreak) {
        const currentStreak = parseInt(savedStreak, 10);
        
        if (lastLogin === today) {
          // Already logged in today, keep the same streak
          newStreak = currentStreak;
        } else if (isYesterday(lastLogin)) {
          // Logged in yesterday, increment streak
          newStreak = currentStreak + 1;
        } else {
          // Missed a day or more, reset streak to 1
          newStreak = 1;
        }
      }

      // Save the new streak and today's date
      await AsyncStorage.setItem(STREAK_STORAGE_KEY, newStreak.toString());
      await AsyncStorage.setItem(LAST_LOGIN_STORAGE_KEY, today);
      
      setStreak(newStreak);
    } catch (error) {
      console.error('Error updating streak:', error);
      setStreak(1); // Fallback to 1 if error
    }
  };

  // Use prop streak if provided (for testing), otherwise use state
  const displayStreak = propStreak !== null ? propStreak : streak;

  return (
    <View style={styles.container}>
      <Text style={styles.streakNumber}>{displayStreak}</Text>
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
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.darkGray,
    marginRight: 8,
  },
  streakIcon: {
    width: 32,
    height: 32,
  },
});