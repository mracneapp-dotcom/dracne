// app/ComprehensiveNightRoutineStep2Info.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';

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

const STEP_2_CONTENT = {
  oily: {
    title: 'Lightweight Night Moisturizer',
    subtitle: 'Night Step 2',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Night Hydration Without Heaviness',
    introText: 'Even oily skin needs overnight moisture. Gel-creams with humectants and light occlusives provide hydration while you sleep without clogging pores or feeling greasy.',
    explanationTitle: 'How to use',
    explanationText: 'Apply after cleansing and before any treatments. Even if using pore care products later, this base layer prevents over-drying. Look for glycerin/HA + dimethicone/squalane.',
    warningTitle: 'Night Application',
    warningText: 'Use slightly more than daytime\nPrevents overnight dehydration\nEven oily skin needs moisture\nThin layer is enough',
  },
  dry: {
    title: 'Rich Night Moisturizer',
    subtitle: 'Night Step 2',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Deep Overnight Repair',
    introText: 'Night is when your skin repairs itself. Rich moisturizers with ceramides, cholesterol, and fatty acids work while you sleep to strengthen your barrier and lock in hydration.',
    explanationTitle: 'How to use',
    explanationText: 'Apply generously after cleansing. Night is the time for richer textures. Look for humectants + richer occlusives like petrolatum or shea butter. This creates the perfect repair environment.',
    warningTitle: 'Overnight Repair',
    warningText: 'Richer texture is good for night\nBarrier repair happens during sleep\nApply to damp skin for best results\nThin layer still effective',
  },
  combination: {
    title: 'Balanced Night Moisturizer',
    subtitle: 'Night Step 2',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Zone-Adapted Night Care',
    introText: 'Combination skin can use a single product at night with zone-specific amounts. Apply more on dry areas, less on T-zone. Your skin loses less water overnight, so lighter than you think is often enough.',
    explanationTitle: 'How to use',
    explanationText: 'Apply lightweight moisturizer all over, then add extra on dry patches. Night is more forgiving than day - you can use one product instead of zone-specific formulas.',
    warningTitle: 'Zone Strategy',
    warningText: 'One product, different amounts\nMore on cheeks, less on T-zone\nNight allows slight extra moisture\nAdjust based on morning feel',
  },
  normal: {
    title: 'Balanced Night Moisturizer',
    subtitle: 'Night Step 2',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Overnight Maintenance',
    introText: 'Your healthy skin barrier just needs consistent support. Light to medium moisturizers provide the perfect balance for overnight repair without being too heavy or too light.',
    explanationTitle: 'How to use',
    explanationText: 'Apply after cleansing. Your skin will tell you if you need more or less - if you wake up tight, use slightly more. If you wake up oily, use slightly less. Find your sweet spot.',
    warningTitle: 'Listen to Your Skin',
    warningText: 'Adjust amount based on morning feel\nNormal skin is flexible\nSeasonal adjustments okay\nConsistency is key',
  },
  sensitive: {
    title: 'Barrier Repair Night Moisturizer',
    subtitle: 'Night Step 2',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Intensive Overnight Support',
    introText: 'Sensitive skin needs barrier repair around the clock. Rich moisturizers with ceramides, panthenol, and minimal ingredients work overnight to calm and strengthen reactive skin.',
    explanationTitle: 'How to use',
    explanationText: 'Apply generously after cleansing. Night is the best time for richer, more supportive formulas. Look for ceramides, cholesterol, and calming ingredients. Your skin repairs most at night.',
    warningTitle: 'Gentle Approach',
    warningText: 'Rich texture helps barrier repair\nMinimal ingredients preferred\nFragrance-free essential\nPatch test new products',
  },
};

export default function ComprehensiveNightRoutineStep2Info({ 
  onNavigateHome,
  onNavigateToNightRoutine,
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

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const content = STEP_2_CONTENT[skinType] || STEP_2_CONTENT.normal;
  const totalSteps = 4;
  const totalInternalSteps = 8;

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
        onPress={onNavigateToNightRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner Night Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
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

            <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>

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
            For {skinTypeInfo.name}
          </Text>
        </View>

        <View style={styles.productHeader}>
          <View style={styles.productIconContainer}>
            <Image 
              source={content.icon}
              style={styles.productIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>{content.title}</Text>
            <Text style={styles.productSubtitle}>{content.subtitle}</Text>
          </View>
        </View>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>{content.introTitle}</Text>
          <Text style={styles.introText}>{content.introText}</Text>
        </View>

        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>{content.explanationTitle}</Text>
          <Text style={styles.explanationText}>{content.explanationText}</Text>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>{content.warningTitle}</Text>
          <Text style={styles.warningText}>{content.warningText}</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="See Product Recommendations"
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
    marginBottom: 16,
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
  warningBox: {
    backgroundColor: '#FFF9E6',
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
    borderRadius: 8,
    padding: 16,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B8860B',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
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