// app/ComprehensiveRoutineStep1Info.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
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
  oily: { color: '#4A90E2', name: 'Oily Skin' },
  dry: { color: '#F39C12', name: 'Dry Skin' },
  combination: { color: BRAND_COLORS.primary, name: 'Combination Skin' },
  normal: { color: '#9B59B6', name: 'Normal Skin' },
  sensitive: { color: BRAND_COLORS.primary, name: 'Sensitive Skin' },
};

export default function ComprehensiveRoutineStep1Info({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 1,
  internalStep = 1
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

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 5;
  const totalInternalSteps = 10;

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

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToDayRoutine}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/Banner Day Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        >
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>{t('dayRoutineBanners.create_line1')}</Text>
            <Text style={styles.bannerText}>{t('dayRoutineBanners.create_line2')}</Text>
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
              {t('comprehensiveRoutineStep1Info.step_of', { current: currentStep, total: totalSteps })}
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

        <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
          <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
            {t('comprehensiveRoutineStep1Info.for_skin', { skinType: t(`profile.skin_labels.${skinType}`) })}
          </Text>
        </View>

        <View style={styles.productHeader}>
          <View style={styles.productIconContainer}>
            <Image 
              source={require('../assets/images/cream.png')}
              style={styles.productIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>{t('basicRoutine.gentle_cleanser')}</Text>
            <Text style={styles.productSubtitle}>{t('comprehensiveRoutineStep2Info.morning_step')} 1</Text>
          </View>
        </View>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>{t('comprehensiveRoutineStep1Info.professional_selection')}</Text>
          <Text style={styles.introText}>
            {t('comprehensiveRoutineStep1Info.selection_text', { skinType: t(`profile.skin_labels.${skinType}`) })}
          </Text>
        </View>

        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>{t('comprehensiveRoutineStep1Info.why_matters')}</Text>
          <Text style={styles.explanationText}>
            {t('comprehensiveRoutineStep1Info.why_text')}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={t('comprehensiveRoutineStep1Info.see_products')}
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
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 32,
    fontWeight: '800',
    color: BRAND_COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
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