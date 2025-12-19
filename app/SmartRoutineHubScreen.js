// app/SmartRoutineHubScreen.js - FULLY TRANSLATED WITH PROPER BANNER
import React from 'react';
import {
  Image,
  ImageBackground,
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
  smartBlue: '#82b2df',
};

export default function SmartRoutineHubScreen({ 
  onNavigateHome,
  onNavigateToCreate,
  onNavigateToMySmartRoutine
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ✅ FIXED: Smart Routine Banner with Proper Two-Line Format */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require('../assets/images/banner-scan-skin-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.smartBannerTextContainer}>
            <Text style={styles.smartBannerLine1}>{t('smartRoutineBanners.smart')}</Text>
            <Text style={styles.smartBannerLine2}>{t('smartRoutineBanners.routine')}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.contentFixed}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            {t('smartRoutineHub.title')} <Text style={styles.smartHighlight}>{t('smartRoutineHub.title_highlight')}</Text>
          </Text>
          <Text style={styles.questionSubtitle}>
            {t('smartRoutineHub.subtitle')}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Image 
            source={require('../assets/images/check.png')}
            style={styles.infoIcon}
            resizeMode="contain"
          />
          <Text style={styles.infoText}>
            {t('smartRoutineHub.info')}
          </Text>
        </View>

        <View style={styles.bannerButtonsContainer}>
          <TouchableOpacity
            onPress={onNavigateToCreate}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <ImageBackground
              source={require('../assets/images/banner-create-routine-base.png')}
              style={styles.bannerButtonImageBg}
              imageStyle={styles.bannerButtonImage}
            >
              <View style={styles.createBannerTextContainer}>
                <Text style={styles.createBannerText1}>{t('routineBanners.create')}</Text>
                <Text style={styles.createBannerText2}>{t('routineBanners.create_routine')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onNavigateToMySmartRoutine}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <ImageBackground
              source={require('../assets/images/banner-my-routine-base.png')}
              style={styles.bannerButtonImageBg}
              imageStyle={styles.bannerButtonImage}
            >
              <View style={styles.myRoutineBannerTextContainer}>
                <Text style={styles.myRoutineBannerMyText}>{t('routineBanners.my')}</Text>
                <Text style={styles.myRoutineBannerText}>{t('routineBanners.routine')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  bannerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 15,
  },
  bannerImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderRadius: 0,
  },
  // ✅ FIXED: Smart Routine Banner Text Styles - Proper Two-Line Format
  smartBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  smartBannerLine1: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  smartBannerLine2: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -4,
    includeFontPadding: false,
  },
  contentFixed: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  smartHighlight: {
    color: BRAND_COLORS.smartBlue,
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BBDEFB',
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: BRAND_COLORS.smartBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
  },
  bannerButtonsContainer: {
    marginTop: 5,
    gap: 15,
    marginBottom: 20,
  },
  bannerButton: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerButtonImageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  bannerButtonImage: {
    borderRadius: 12,
  },
  createBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 15,
  },
  createBannerText1: {
    fontFamily: 'BalooBhai2',
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 38,
  },
  createBannerText2: {
    fontFamily: 'BalooBhai2',
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 38,
    marginTop: -8,
  },
  myRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 15,
  },
  myRoutineBannerMyText: {
    fontFamily: 'Brittany',
    fontSize: 42,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 44,
  },
  myRoutineBannerText: {
    fontFamily: 'BalooBhai2',
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 38,
    marginTop: -8,
  },
});