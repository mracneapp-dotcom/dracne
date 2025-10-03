// components/ui/ProgressBar.js - FIXED: Arrow always visible
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

export const ProgressBar = ({ 
  progress = 0, 
  onBack,
  showBackButton = true,
  style = {} 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/dracne-logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* REMOVED {showBackButton && ( - Arrow is ALWAYS rendered now */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={showBackButton ? onBack : null}
        activeOpacity={showBackButton ? 0.7 : 1}
        disabled={!showBackButton}
      >
        <Image 
          source={require('../../assets/images/left-navigation.png')} 
          style={[
            styles.backArrowImage,
            !showBackButton && { opacity: 0.3 }
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill,
              { width: `${Math.max(0, Math.min(100, progress))}%` }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    marginRight: 15,
  },
  logoImage: {
    width: 60,
    height: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowImage: {
    width: 20,
    height: 20,
  },
  progressBarWrapper: {
    flex: 1,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 4,
    minWidth: 8,
  },
});