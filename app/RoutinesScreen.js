// app/RoutinesScreen.js - Routines Hub Screen with Dynamic Banners
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from './i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
};

export default function RoutinesScreen({
  onNavigateHome,
  onNavigateToMyDayRoutine,
  onNavigateToMyNightRoutine,
  onNavigateToSmartRoutineHub,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Navigation */}
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('routines.screen_title')} <Text style={styles.titleHighlight}>{t('routines.screen_title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('routines.screen_subtitle')}
          </Text>
        </View>

        {/* Banners Container */}
        <View style={styles.bannersContainer}>
          {/* My Day Routine Banner */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToMyDayRoutine}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={require('../assets/images/banner-day-routine-base.png')}
              style={styles.bannerImageBackground}
              imageStyle={styles.bannerImage}
            >
              <View style={styles.dayBannerTextContainer}>
                <Text style={styles.bannerMyText}>{t('routineBanners.my')}</Text>
                <Text style={styles.bannerRoutineText}>
                  {t('routineBanners.day_line2')}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* My Night Routine Banner */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToMyNightRoutine}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={require('../assets/images/banner-night-routine-base.png')}
              style={styles.bannerImageBackground}
              imageStyle={styles.bannerImage}
            >
              <View style={styles.nightBannerTextContainer}>
                <Text style={styles.bannerMyText}>{t('routineBanners.my')}</Text>
                <Text style={styles.nightBannerLine2}>{t('routineBanners.night_line2')}</Text>
                <Text style={styles.nightBannerLine3}>{t('routineBanners.night_line3')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* Smart Routine Banner */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToSmartRoutineHub}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={require('../assets/images/banner-scan-skin-base.png')}
              style={styles.bannerImageBackground}
              imageStyle={styles.bannerImage}
            >
              <View style={styles.smartBannerTextContainer}>
                <Text style={styles.smartBannerText1}>{t('routineBanners.smart_line1')}</Text>
                <Text style={styles.smartBannerText2}>{t('routineBanners.smart_line2')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
  },
  bannersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
    justifyContent: 'center',
    gap: 16,
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
  bannerImageBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderRadius: 12,
  },
  dayBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 12,
    flex: 1,
    justifyContent: 'center',
  },
  nightBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bannerMyText: {
    fontFamily: 'Brittany',
    fontSize: 38,
    lineHeight: 48,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  bannerRoutineText: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 34,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -8,
    includeFontPadding: false,
  },
  nightBannerLine2: {
    fontFamily: 'Baloo',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -8,
    includeFontPadding: false,
  },
  nightBannerLine3: {
    fontFamily: 'Baloo',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -6,
    includeFontPadding: false,
  },
  smartBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 12,
    flex: 1,
    justifyContent: 'center',
  },
  smartBannerText1: {
    fontFamily: 'Baloo',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  smartBannerText2: {
    fontFamily: 'Baloo',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -8,
    includeFontPadding: false,
  },
});