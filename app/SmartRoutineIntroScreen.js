// app/SmartRoutineIntroScreen.js - FULLY TRANSLATED WITH PROPER BANNER
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  smartBlue: '#82b2df',
};

const CONCERN_INFO = {
  nodules: {
    name: 'Inflamed Acne (Nodules)',
    color: '#FF7A7A',
    icon: require('../assets/images/Nodule.png'),
    intro: 'Target deep, painful nodules with gentle anti-inflammatory actives',
    approach: 'We\'ll use calming ingredients like adapalene or azelaic acid to reduce inflammation without stripping your skin barrier.',
    keyIngredients: ['Adapalene 0.1%', 'Azelaic Acid 10-20%', 'Niacinamide 5-10%'],
  },
  blackheads: {
    name: 'Blackheads',
    color: '#4A90E2',
    icon: require('../assets/images/Blackhead.png'),
    intro: 'Dissolve oxidized sebum with chemical exfoliants',
    approach: 'BHA (salicylic acid) penetrates pores to clear oxidized sebum and prevent future blackheads.',
    keyIngredients: ['BHA 2-4%', 'Mandelic Acid', 'PHA'],
  },
  whiteheads: {
    name: 'Whiteheads',
    color: '#7CB342',
    icon: require('../assets/images/Whitehead.png'),
    intro: 'Accelerate cell turnover to prevent clogged pores',
    approach: 'Retinoids increase skin cell turnover, preventing pores from becoming clogged with dead skin and sebum.',
    keyIngredients: ['Adapalene 0.1%', 'Retinaldehyde', 'Low-strength Retinol'],
  },
  papules: {
    name: 'Papules & Pustules',
    color: '#F39C12',
    icon: require('../assets/images/Papule.png'),
    intro: 'Kill acne bacteria and reduce inflammation',
    approach: 'Benzoyl peroxide and niacinamide work together to eliminate bacteria and calm inflamed breakouts.',
    keyIngredients: ['Benzoyl Peroxide 2.5-5%', 'Niacinamide 10%', 'Tea Tree Oil'],
  },
  marks: {
    name: 'Post-Inflammatory Marks',
    color: '#9B59B6',
    icon: require('../assets/images/Mark.png'),
    intro: 'Fade dark spots with brightening actives',
    approach: 'Vitamin C, niacinamide, and alpha arbutin work to fade post-acne marks while retinoids accelerate cell turnover.',
    keyIngredients: ['Vitamin C 15-20%', 'Niacinamide 10%', 'Alpha Arbutin 2%', 'Retinoid'],
  },
};

export default function SmartRoutineIntroScreen({ 
  onNavigateHome,
  onNavigateBack,
  onContinue,
  concernId 
}) {
  const [concernData, setConcernData] = useState(null);

  useEffect(() => {
    if (concernId && CONCERN_INFO[concernId]) {
      setConcernData(CONCERN_INFO[concernId]);
    }
  }, [concernId]);

  if (!concernData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('smartRoutineIntro.error')}</Text>
      </View>
    );
  }

  const totalSteps = 2;
  const currentStep = 1;
  const totalInternalSteps = 2;
  const internalStep = 1;

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
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateBack}
        activeOpacity={0.9}
      >
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
                onPress={onNavigateBack}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>
                {t('smartRoutineIntro.step_of', { current: currentStep, total: totalSteps })}
              </Text>

              <TouchableOpacity
                onPress={onContinue}
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

          <View style={styles.header}>
            <View style={[styles.concernIconContainer, { backgroundColor: `${concernData.color}15` }]}>
              <Image 
                source={concernData.icon}
                style={[styles.concernIcon, { tintColor: concernData.color }]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.concernTitle}>{concernData.name}</Text>
            <Text style={styles.concernIntro}>{concernData.intro}</Text>
          </View>

          <View style={[styles.approachBox, { borderLeftColor: concernData.color }]}>
            <Text style={styles.approachTitle}>{t('smartRoutineIntro.treatment_approach')}</Text>
            <Text style={styles.approachText}>{concernData.approach}</Text>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.ingredientsTitle}>{t('smartRoutineIntro.key_ingredients')}</Text>
            {concernData.keyIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: concernData.color }]} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoBox}>
            <Image 
              source={require('../assets/images/check.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              {t('smartRoutineIntro.info_text')}
            </Text>
          </View>

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              Treatment approaches based on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.aad.org/public/diseases/acne/skin-care/tips')}
              >
                American Academy of Dermatology guidelines for targeted acne treatment
              </Text>
              , clinical research on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2699641/')}
              >
                topical retinoid and chemical exfoliant efficacy for specific acne types
              </Text>
              , and{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(06)02559-X/fulltext')}
              >
                dermatological protocols for safe combination therapy and gradual active introduction
              </Text>
              . Smart routines complement your daily care - consult a dermatologist for comprehensive treatment plans.
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={t('smartRoutineIntro.continue_button')}
          onPress={() => onContinue && onContinue()}
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
    marginBottom: 20,
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
    color: BRAND_COLORS.smartBlue,
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
    backgroundColor: BRAND_COLORS.smartBlue,
    borderRadius: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  concernIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  concernIcon: {
    width: 40,
    height: 40,
  },
  concernTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  concernIntro: {
    fontSize: 16,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  approachBox: {
    backgroundColor: BRAND_COLORS.white,
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  approachTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  approachText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    lineHeight: 20,
  },
  ingredientsSection: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 14,
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
  citationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
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
  bottomSpacing: {
    height: 100,
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
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    marginTop: 100,
  },
});