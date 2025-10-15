// app/ComprehensiveRoutineStep3Info.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
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

const STEP_3_CONTENT = {
  oily: {
    title: 'Pore Care Treatment',
    subtitle: 'Evening Step 3 (2-4x per week)',
    icon: require('../assets/images/cream.png'),
    introTitle: 'Targeted Pore Management',
    introText: 'BHA (salicylic acid) or mandelic acid helps keep pores clear and prevents breakouts. This is your active treatment step for managing oil and preventing congestion.',
    explanationTitle: 'How to use',
    explanationText: 'Apply 2-4 times per week in the evening on T-zone or full face as tolerated. Start with 2x per week and increase gradually. Always follow with moisturizer.',
    warningTitle: 'Important Guidelines',
    warningText: 'Start slowly (2x per week)\nUse in evening only\nAlways use sunscreen during the day\nSkip if skin feels irritated',
  },
  dry: {
    title: 'Hydrating Essence/Toner',
    subtitle: 'Morning & Evening Step 3',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Deep Hydration Layer',
    introText: 'Hydrating essences with panthenol, beta-glucan, and hyaluronic acid provide an extra moisture boost for dry skin. This step helps your moisturizer work more effectively.',
    explanationTitle: 'How to use',
    explanationText: 'Apply on damp skin after cleansing, before moisturizer. Pat gently until absorbed. This creates a moisture sandwich that locks in hydration more effectively.',
    warningTitle: 'Application Tip',
    warningText: 'Apply to damp skin for best results\nPat, do not rub\nLayer under moisturizer\nUse both morning and evening',
  },
  combination: {
    title: 'Targeted Zone Treatment',
    subtitle: 'Evening Step 3',
    icon: require('../assets/images/cream.png'),
    introTitle: 'Zone-Specific Care',
    introText: 'Combination skin needs different treatments for different zones: BHA or mandelic acid on oily T-zone, hydrating essence on dry cheeks. This customized approach balances your skin.',
    explanationTitle: 'How to use',
    explanationText: 'Apply BHA/mandelic acid only on T-zone 2-4x per week. Apply hydrating essence on cheeks. This zone-specific approach prevents over-treating or under-treating different areas.',
    warningTitle: 'Zone Application',
    warningText: 'BHA/Mandelic: T-zone only\nHydrating essence: Cheeks and dry areas\nStart 2x per week\nAdjust based on skin response',
  },
  normal: {
    title: 'Antioxidant Serum',
    subtitle: 'Morning Step 3',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Protective Antioxidants',
    introText: 'Antioxidant serums protect your skin from environmental damage and brighten your complexion. This is your prevention and maintenance step for healthy skin.',
    explanationTitle: 'How to use',
    explanationText: 'Apply in the morning after cleansing and before moisturizer. Vitamin C derivatives or niacinamide work beautifully for balanced skin. Always follow with sunscreen.',
    warningTitle: 'Application Guidelines',
    warningText: 'Use in morning only\nApply before moisturizer\nAlways follow with sunscreen\nVitamin C derivatives are gentler than pure L-ascorbic acid',
  },
  sensitive: {
    title: 'Soothing Serum',
    subtitle: 'Morning & Evening Step 3',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Calming & Barrier Support',
    introText: 'Soothing serums with centella, panthenol, beta-glucan, and madecassoside calm reactive skin and strengthen your barrier. This is your protective comfort layer.',
    explanationTitle: 'How to use',
    explanationText: 'Apply morning and evening after cleansing, before moisturizer. These ingredients reduce redness, calm irritation, and help prevent sensitivity flare-ups.',
    warningTitle: 'Gentle Care',
    warningText: 'Safe for twice-daily use\nNo irritation potential\nHelps prevent future sensitivity\nPerfect for reactive skin',
  },
};

export default function ComprehensiveRoutineStep3Info({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 3,
  internalStep = 5
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
  const content = STEP_3_CONTENT[skinType] || STEP_3_CONTENT.normal;
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
        <Image 
          source={require('../assets/images/Banner Day Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
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
  bottomSpacing: {
    height: 80,
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