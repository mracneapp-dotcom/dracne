// components/home/RoutineBanners.js - Optimized with React.memo
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

// Preload images at module level
const BANNER_IMAGES = {
  dayRoutine: require('../../assets/images/Banner Day Routine 1.png'),
  nightRoutine: require('../../assets/images/Banner Night Routine 1.png'),
  skinTest: require('../../assets/images/Banner Skin Type Test.png'),
  scanSkin: require('../../assets/images/Banner Scan My Skin.png'),
};

export const RoutineBanners = React.memo(({ 
  onDayRoutinePress,
  onNightRoutinePress,
  onSkinTestPress,
  onScanSkinPress 
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
          source={BANNER_IMAGES.dayRoutine}
          style={styles.bannerImage}
          resizeMode="cover"
          fadeDuration={0}
        />
      </TouchableOpacity>

      {/* Night Routine Banner */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onNightRoutinePress}
        activeOpacity={0.8}
      >
        <Image 
          source={BANNER_IMAGES.nightRoutine}
          style={styles.bannerImage}
          resizeMode="cover"
          fadeDuration={0}
        />
      </TouchableOpacity>

      {/* Skin Type Test Banner */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onSkinTestPress}
        activeOpacity={0.8}
      >
        <Image 
          source={BANNER_IMAGES.skinTest}
          style={styles.bannerImage}
          resizeMode="cover"
          fadeDuration={0}
        />
      </TouchableOpacity>

      {/* Scan My Skin Banner */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onScanSkinPress}
        activeOpacity={0.8}
      >
        <Image 
          source={BANNER_IMAGES.scanSkin}
          style={styles.bannerImage}
          resizeMode="cover"
          fadeDuration={0}
        />
      </TouchableOpacity>
    </View>
  );
});

RoutineBanners.displayName = 'RoutineBanners';

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
    backgroundColor: BRAND_COLORS.lightGray,
  },
  bannerImage: {
    width: '100%',
    height: 95,
  },
});