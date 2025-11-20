// app/ModerateRoutineStep2Info.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
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

export default function ModerateRoutineStep2Info({ 
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

  const getProductTitle = () => {
    if (skinType === 'oily') return 'Lightweight Moisturizer';
    if (skinType === 'dry') return 'Rich Day Moisturizer';
    return 'Balanced Day Moisturizer';
  };

  const getExplanationText = () => {
    if (skinType === 'oily') {
      return 'Even oily skin needs daytime hydration. Lightweight gel-creams or lotions provide essential moisture without adding excess oil, keeping your skin balanced throughout the day.';
    }
    if (skinType === 'dry') {
      return 'Dry skin benefits from richer moisturizers with humectants and occlusives. Look for formulas with ceramides, hyaluronic acid, and nourishing oils to maintain hydration all day.';
    }
    return 'A balanced moisturizer provides optimal hydration without feeling heavy or greasy. Choose formulas that feel comfortable and keep your skin looking fresh throughout the day.';
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
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
        onPress={onNavigateToDayRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner Day Routine 1.png')}
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
              source={require('../assets/images/jar cream.png')}
              style={styles.productIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>{getProductTitle()}</Text>
            <Text style={styles.productSubtitle}>Morning Step 2</Text>
          </View>
        </View>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>Curated for Your Skin</Text>
          <Text style={styles.introText}>
            We've selected moisturizers specifically for {skinTypeInfo.name.toLowerCase()}. Each product is proven effective and dermatologist-recommended for daytime hydration.
          </Text>
        </View>

        <View style={styles.explanationBox}>
          <Text style={styles.explanationTitle}>Why this matters</Text>
          <Text style={styles.explanationText}>
            {getExplanationText()}
          </Text>
        </View>

        <View style={styles.citationContainer}>
          <Text style={styles.citationText}>
            Day moisturizer recommendations based on{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751381/')}
            >
              research on daytime hydration and barrier function
            </Text>
            , clinical studies on{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4345901/')}
            >
              optimal product layering for morning skincare routines
            </Text>
            , and{' '}
            <Text 
              style={styles.citationLink}
              onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(17)32410-0/fulltext')}
            >
              dermatological guidance on skin type-specific moisturization
            </Text>
            . Individual results may vary - consult a dermatologist for personalized advice.
          </Text>
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