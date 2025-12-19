// app/BasicRoutineStep2Info.js - FULLY TRANSLATED WITH PROPER BANNER
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';
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

const SKIN_TYPE_INFO = {
  oily: { color: '#4A90E2' },
  dry: { color: '#F39C12' },
  combination: { color: BRAND_COLORS.primary },
  normal: { color: '#9B59B6' },
  sensitive: { color: BRAND_COLORS.primary },
};

export default function BasicRoutineStep2Info({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 2,
  internalStep = 3
}) {
  const [skinType, setSkinType] = useState('normal');

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (onContinue) {
      onContinue();
    }
  };

  // ✅ GET TRANSLATED SKIN TYPE NAME
  const getTranslatedSkinTypeName = () => {
    return t(`skinTypes.${skinType}`);
  };

  const getProductTitle = () => {
    if (skinType === 'oily') return t('basicRoutine.lightweight_gel_cream');
    if (skinType === 'dry') return t('basicRoutine.rich_moisturizer');
    return t('basicRoutine.light_medium_moisturizer');
  };

  const getExplanationText = () => {
    if (skinType === 'oily') {
      return t('basicRoutine.moisturizer_day_text_oily');
    }
    if (skinType === 'dry') {
      return t('basicRoutine.moisturizer_day_text_dry');
    }
    return t('basicRoutine.moisturizer_day_text_normal');
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3;
  const totalInternalSteps = 6;

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

      {/* ✅ FIXED: Day Routine Banner with Proper Two-Line Format */}
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToDayRoutine}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/banner-day-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.dayRoutineBannerTextContainer}>
            <Text style={styles.dayRoutineLine1}>{t('dayRoutineBanners.line1')}</Text>
            <Text style={styles.dayRoutineLine2}>{t('dayRoutineBanners.line2')}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <TouchableOpacity
              onPress={handlePreviousStep}
              style={styles.arrowButton}
              activeOpacity={0.7}
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.progressText}>
              {t('basicRoutine.step_of', { current: currentStep, total: totalSteps })}
            </Text>

            <TouchableOpacity
              onPress={handleNextStep}
              style={styles.arrowButton}
              activeOpacity={0.7}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(internalStep / totalInternalSteps) * 100}%` }]} />
          </View>
        </View>

        {/* ✅ FIXED: Skin type badge with translated name */}
        <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
          <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
            {t('basicRoutine.for_skin', { skinType: getTranslatedSkinTypeName() })}
          </Text>
        </View>

        <View style={styles.productHeader}>
          <View style={styles.productIconContainer}>
            <Image 
              source={require('../assets/images/jar cream.png')}
              style={styles.productIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>{getProductTitle()}</Text>
            <Text style={styles.productSubtitle}>{t('basicRoutine.morning_step_2')}</Text>
          </View>
        </View>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>{t('basicRoutine.curated_title')}</Text>
          <Text style={styles.introText}>
            {t('basicRoutine.curated_text_moisturizers', { skinType: getTranslatedSkinTypeName().toLowerCase() })}
          </Text>
        </View>

        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>{t('basicRoutine.why_this_matters')}</Text>
          <Text style={styles.explanationText}>
            {getExplanationText()}
          </Text>
        </View>

        <View style={styles.citationContainer}>
          <Text style={styles.citationText}>
            {t('basicRoutine.citation_moisturizer_part1')}{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6628577/')}
            >
              {t('basicRoutine.citation_moisturizer_link1')}
            </Text>
            {t('basicRoutine.citation_moisturizer_part2')}{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(03)02617-4/fulltext')}
            >
              {t('basicRoutine.citation_moisturizer_link2')}
            </Text>
            {t('basicRoutine.citation_moisturizer_part3')}{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieve-dry-skin')}
            >
              {t('basicRoutine.citation_moisturizer_link3')}
            </Text>
            {t('basicRoutine.citation_moisturizer_part4')}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={t('basicRoutine.see_products_button')}
          onPress={handleNextStep}
          style={styles.continueButton}
        />
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
    marginBottom: 20,
  },
  bannerImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderRadius: 0,
  },
  // ✅ FIXED: Day Routine Banner Text Styles - Proper Two-Line Format
  dayRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
  },
  dayRoutineLine1: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  dayRoutineLine2: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -4,
    includeFontPadding: false,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    lineHeight: 28,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    minWidth: 100,
  },
  progressBar: {
    height: 6,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 3,
  },
  skinTypeBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  skinTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  productIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productIcon: {
    width: 45,
    height: 45,
  },
  productTextContainer: {
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    fontWeight: '500',
  },
  introBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  introText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  explanationBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  citationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  citationText: {
    fontSize: 11,
    color: '#999999',
    lineHeight: 16,
    textAlign: 'center',
  },
  citationLink: {
    fontSize: 11,
    color: '#666666',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 27,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 90,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
  },
});