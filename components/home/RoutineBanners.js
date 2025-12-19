// components/home/RoutineBanners.js - FIXED WITH PROPER STYLING
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { t } from '../../app/i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const BANNER_IMAGES = {
  dayRoutine: require('../../assets/images/banner-day-routine-base.png'),
  nightRoutine: require('../../assets/images/banner-night-routine-base.png'),
  skinTest: require('../../assets/images/banner-skin-test-base.png'),
  scanSkin: require('../../assets/images/banner-scan-skin-base.png'),
};

export const RoutineBanners = React.memo(({ 
  onDayRoutinePress,
  onNightRoutinePress,
  onSkinTestPress,
  onScanSkinPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Day Routine Banner - RIGHT ALIGNED */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onDayRoutinePress}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={BANNER_IMAGES.dayRoutine}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
          resizeMode="cover"
        >
          <View style={styles.rightAlignContainer}>
            <Text style={[styles.bannerText, styles.dayRoutineText]}>
              {t('home.banners.day_routine_line1')}
            </Text>
            <Text style={[styles.bannerText, styles.dayRoutineText]}>
              {t('home.banners.day_routine_line2')}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Night Routine Banner - RIGHT ALIGNED */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onNightRoutinePress}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={BANNER_IMAGES.nightRoutine}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
          resizeMode="cover"
        >
          <View style={styles.rightAlignContainer}>
            <Text style={[styles.bannerText, styles.nightRoutineText]}>
              {t('home.banners.night_routine_line1')}
            </Text>
            <Text style={[styles.bannerText, styles.nightRoutineText]}>
              {t('home.banners.night_routine_line2')}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Skin Type Test Banner - LEFT ALIGNED, TWO LINES */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onSkinTestPress}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={BANNER_IMAGES.skinTest}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
          resizeMode="cover"
        >
          <View style={styles.leftAlignContainer}>
            <Text style={[styles.bannerText, styles.skinTestText]}>
              {t('home.banners.skin_type_line1')}
            </Text>
            <Text style={[styles.bannerText, styles.skinTestText]}>
              {t('home.banners.skin_type_line2')}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Scan My Skin Banner - RIGHT ALIGNED, TWO LINES */}
      <TouchableOpacity 
        style={styles.bannerButton}
        onPress={onScanSkinPress}
        activeOpacity={0.8}
      >
        <ImageBackground
          source={BANNER_IMAGES.scanSkin}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
          resizeMode="cover"
        >
          <View style={styles.rightAlignContainer}>
            <Text style={[styles.bannerText, styles.scanSkinText]}>
              {t('home.banners.scan_skin_line1')}
            </Text>
            <Text style={[styles.bannerText, styles.scanSkinText]}>
              {t('home.banners.scan_skin_line2')}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
});

RoutineBanners.displayName = 'RoutineBanners';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 2,
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
    height: 95,
    justifyContent: 'center',
  },
  bannerImageStyle: {
    borderRadius: 12,
  },
  
  // ALIGNMENT CONTAINERS
  rightAlignContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
  },
  leftAlignContainer: {
    alignItems: 'flex-start',
    paddingLeft: 24,
  },
  centerAlignContainer: {
    alignItems: 'center',
  },
  
  // BASE TEXT STYLE - BALOOBHAI2 BOLD
  bannerText: {
    fontFamily: 'BalooBhai2',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
    lineHeight: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
    // Strong shadow for outline effect
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // INDIVIDUAL BANNER TEXT COLORS
  dayRoutineText: {
    color: '#FFFFFF',
  },
  nightRoutineText: {
    color: '#FFFFFF',
  },
  skinTestText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 32,
  },
  scanSkinText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
  },
});