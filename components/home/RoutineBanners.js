// components/home/RoutineBanners.js - Day and Night Routine Banners
import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export const RoutineBanners = ({ 
  onDayRoutinePress,
  onNightRoutinePress 
}) => {
  return (
    <View style={styles.container}>
      {/* Day Routine Banner */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onDayRoutinePress}
        activeOpacity={0.8}
      >
        <Image 
          source={require('../../assets/images/Banner  Day Routine 1.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Night Routine Banner */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onNightRoutinePress}
        activeOpacity={0.8}
      >
        <Image 
          source={require('../../assets/images/Banner  Night Routine 1.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  bannerButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: 95, // Increased from 80 to prevent image cropping
  },
});