// app/ComprehensiveRoutineStep4ProductSelection.js - WITH CITATIONS
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
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

const STEP_4_PRODUCTS = {
  oily: [
    {
      id: 'advanced_oily_1',
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      description: 'High-strength niacinamide for oil control',
      benefits: ['Pore minimizing', 'Oil regulation', 'Budget-friendly'],
    },
    {
      id: 'advanced_oily_2',
      name: 'Geek & Gorgeous A-Game 5 or 10',
      description: 'Retinal for advanced texture refinement',
      benefits: ['Fast-acting retinoid', 'Pore refining', 'Professional strength'],
    },
    {
      id: 'advanced_oily_3',
      name: 'Paula\'s Choice 10% Niacinamide',
      description: 'Clinical-strength pore treatment',
      benefits: ['Maximum strength', 'Proven effective', 'Dermatologist-recommended'],
    },
    {
      id: 'advanced_oily_4',
      name: 'Inkey List Retinol Serum',
      description: 'Entry retinol for texture improvement',
      benefits: ['Gentle retinol', 'Affordable', 'Good for beginners'],
    },
    {
      id: 'advanced_oily_5',
      name: 'Some By Mi Retinol Intense',
      description: 'K-beauty advanced retinol treatment',
      benefits: ['Intensive formula', 'Pore care', 'Texture refinement'],
    },
  ],
  dry: [
    {
      id: 'advanced_dry_1',
      name: 'Isntree Hyaluronic Acid Toner Plus',
      description: 'Multi-molecular weight HA for deep hydration',
      benefits: ['8 types HA', 'Plumping', 'Layerable'],
    },
    {
      id: 'advanced_dry_2',
      name: 'The Inkey List Peptide Moisturizer',
      description: 'Peptide treatment for barrier support',
      benefits: ['Collagen support', 'Hydrating', 'Affordable'],
    },
    {
      id: 'advanced_dry_3',
      name: 'COSRX Hydrium Triple Hyaluronic',
      description: 'Triple HA moisture ampoule',
      benefits: ['Intensive hydration', 'Layering essential', 'K-beauty'],
    },
    {
      id: 'advanced_dry_4',
      name: 'The Ordinary Buffet + Copper Peptides',
      description: 'Multi-peptide comprehensive treatment',
      benefits: ['Advanced peptides', 'Barrier repair', 'Professional-grade'],
    },
    {
      id: 'advanced_dry_5',
      name: 'Skin1004 Madagascar Centella Ampoule',
      description: 'Concentrated hydration and soothing',
      benefits: ['Pure centella', 'Deep hydration', 'Calming'],
    },
  ],
  combination: [
    {
      id: 'advanced_combo_1',
      name: 'Axis-Y Dark Spot Correcting Niacinamide',
      description: 'Balanced 5% niacinamide serum',
      benefits: ['Balanced strength', 'Tone evening', 'Versatile'],
    },
    {
      id: 'advanced_combo_2',
      name: 'Geek & Gorgeous A-Game 5',
      description: 'Gentle retinal for combination zones',
      benefits: ['Lightweight', 'Fast-acting', 'Zone-friendly'],
    },
    {
      id: 'advanced_combo_3',
      name: 'Beauty of Joseon Glow Serum',
      description: 'Propolis + niacinamide balancing essence',
      benefits: ['Balancing', 'Glow-inducing', 'Popular'],
    },
    {
      id: 'advanced_combo_4',
      name: 'The Ordinary Multi-Peptide Serum',
      description: 'Hair peptides for gentle treatment',
      benefits: ['Gentle peptides', 'Versatile', 'Affordable'],
    },
    {
      id: 'advanced_combo_5',
      name: 'Purito Fermented Complex 94',
      description: 'Fermented boosting essence',
      benefits: ['Balancing', 'Microbiome support', 'Gentle'],
    },
  ],
  normal: [
    {
      id: 'advanced_normal_1',
      name: 'Timeless Coenzyme Q10 Serum + Matrixyl',
      description: 'Advanced anti-aging peptide combination',
      benefits: ['Professional-grade', 'Collagen boost', 'Firming'],
    },
    {
      id: 'advanced_normal_2',
      name: 'Geek & Gorgeous A-Game 10',
      description: 'High-strength retinal for results',
      benefits: ['Maximum strength', 'Fast results', 'Professional'],
    },
    {
      id: 'advanced_normal_3',
      name: 'Naturium Multi-Peptide Serum',
      description: 'Comprehensive peptide complex',
      benefits: ['Multiple peptides', 'Professional formula', 'Effective'],
    },
    {
      id: 'advanced_normal_4',
      name: 'Some By Mi Yuja Niacin Serum',
      description: 'Vitamin C + niacinamide brightening',
      benefits: ['Dual action', 'Brightening', 'Antioxidant'],
    },
    {
      id: 'advanced_normal_5',
      name: 'The Ordinary Granactive Retinoid 5%',
      description: 'Advanced retinoid alternative',
      benefits: ['Gentle yet effective', 'No prescription', 'Stable'],
    },
  ],
  sensitive: [
    {
      id: 'advanced_sens_1',
      name: 'KraveBeauty Great Barrier Relief',
      description: 'Intensive barrier repair ampoule',
      benefits: ['Tamanu + ceramides', 'Barrier fortification', 'Safe'],
    },
    {
      id: 'advanced_sens_2',
      name: 'A\'pieu Madecassoside Ampoule',
      description: 'Pure madecassoside concentrate',
      benefits: ['Single ingredient', 'Maximum calming', 'Safe'],
    },
    {
      id: 'advanced_sens_3',
      name: 'La Roche-Posay Cicaplast B5 Serum',
      description: 'Dermatologist-recommended barrier support',
      benefits: ['Panthenol B5', 'Professional', 'Gentle'],
    },
    {
      id: 'advanced_sens_4',
      name: 'Dr. Jart Cicapair Serum',
      description: 'Centella-based intensive soothing',
      benefits: ['Redness relief', 'Barrier support', 'Gentle'],
    },
    {
      id: 'advanced_sens_5',
      name: 'Skin1004 Probio-Cica Bakuchiol',
      description: 'Gentle retinol alternative with barrier support',
      benefits: ['Bakuchiol', 'Barrier-friendly', 'No irritation'],
    },
  ],
};

export default function ComprehensiveRoutineStep4ProductSelection({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 4,
  internalStep = 8
}) {
  const [skinType, setSkinType] = useState('normal');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
        setProducts(STEP_4_PRODUCTS[savedSkinType] || STEP_4_PRODUCTS.normal);
      } else {
        setProducts(STEP_4_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(STEP_4_PRODUCTS.normal);
    }
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          return [prev[prev.length - 1], product];
        }
        return [...prev, product];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedProducts.length > 0 && onContinue) {
      try {
        const routineData = await AsyncStorage.getItem('myComprehensiveRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.advancedTreatments = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myComprehensiveRoutine', JSON.stringify(currentRoutine));
        console.log('Saved advanced treatments to Comprehensive Routine:', selectedProducts);
      } catch (error) {
        console.error('Error saving to Comprehensive Routine:', error);
      }
      
      onContinue(selectedProducts);
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (selectedProducts.length > 0) {
      handleContinue();
    }
  };

  const getSectionTitle = () => {
    switch (skinType) {
      case 'oily':
        return t('comprehensiveRoutineStep4Products.high_performance');
      case 'dry':
        return t('comprehensiveRoutineStep4Products.deep_hydration');
      case 'combination':
        return t('comprehensiveRoutineStep4Products.balancing_multi');
      case 'normal':
        return t('comprehensiveRoutineStep4Products.advanced_anti_aging');
      case 'sensitive':
        return t('comprehensiveRoutineStep4Products.intensive_barrier');
      default:
        return t('comprehensiveRoutineStep4Products.advanced_anti_aging');
    }
  };

  const getExplanation = () => {
    switch (skinType) {
      case 'oily':
        return t('comprehensiveRoutineStep4Products.oily_explanation');
      case 'dry':
        return t('comprehensiveRoutineStep4Products.dry_explanation');
      case 'combination':
        return t('comprehensiveRoutineStep4Products.combo_explanation');
      case 'normal':
        return t('comprehensiveRoutineStep4Products.normal_explanation');
      case 'sensitive':
        return t('comprehensiveRoutineStep4Products.sensitive_explanation');
      default:
        return t('comprehensiveRoutineStep4Products.normal_explanation');
    }
  };

  const getButtonText = () => {
    if (selectedProducts.length === 0) {
      return t('comprehensiveRoutineStep4Products.choose_advanced');
    } else if (selectedProducts.length === 1) {
      return t('comprehensiveRoutineStep4Products.continue_selection');
    } else {
      return t('comprehensiveRoutineStep4Products.continue_selections');
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 5;
  const totalInternalSteps = 10;
  const canGoNext = selectedProducts.length > 0;

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
          source={require('../assets/images/banner-day-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
          resizeMode="cover"
        >
          <View style={styles.dayRoutineBannerTextContainer}>
            <Text style={styles.dayRoutineLine1}>{t('dayRoutineBanners.line1')}</Text>
            <Text style={styles.dayRoutineLine2}>{t('dayRoutineBanners.line2')}</Text>
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
                onPress={handlePreviousStep}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>
                {t('comprehensiveRoutineStep4Products.step_of', { current: currentStep, total: totalSteps })}
              </Text>

              <TouchableOpacity
                onPress={handleNextStep}
                disabled={!canGoNext}
                style={[styles.arrowButton, !canGoNext && styles.arrowButtonDisabled]}
                activeOpacity={0.7}
              >
                <Text style={[styles.arrowText, !canGoNext && styles.arrowTextDisabled]}>
                  ›
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(internalStep / totalInternalSteps) * 100}%` }]} />
            </View>
          </View>

          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
            <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
              {t('comprehensiveRoutineStep4Products.for_skin', { skinType: t(`profile.skin_labels.${skinType}`) })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{getSectionTitle()}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {getExplanation()}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('comprehensiveRoutineStep4Products.select_products', { count: selectedProducts.length })}
            </Text>
            
            {products.map((product) => {
              const isSelected = selectedProducts.some(p => p.id === product.id);
              const selectionIndex = selectedProducts.findIndex(p => p.id === product.id);
              
              return (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCard,
                    isSelected && [styles.productCardSelected, { borderColor: skinTypeInfo.color }]
                  ]}
                  onPress={() => toggleProductSelection(product)}
                  activeOpacity={0.7}
                >
                  <View style={styles.productCardHeader}>
                    <View style={styles.productCardLeft}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                    {isSelected && (
                      <View style={[styles.checkmark, { backgroundColor: skinTypeInfo.color }]}>
                        <Text style={styles.checkmarkText}>{selectionIndex + 1}</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.benefitsRow}>
                    {product.benefits.map((benefit, idx) => (
                      <View key={idx} style={styles.benefitTag}>
                        <Text style={styles.benefitTagText}>{benefit}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedProducts.length === 0 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep4Products.helper_0')}</Text>
            </View>
          )}

          {selectedProducts.length === 2 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep4Products.helper_2')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('comprehensiveRoutineStep4Products.citation')}
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleContinue}
          disabled={selectedProducts.length === 0}
          style={[styles.continueButton, selectedProducts.length === 0 && styles.continueButtonDisabled]}
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
  arrowButtonDisabled: {
    backgroundColor: '#F5F5F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    lineHeight: 28,
  },
  arrowTextDisabled: {
    color: '#CCCCCC',
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  explanationBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  selectionContainer: {
    marginBottom: 10,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  productCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  productCardSelected: {
    borderWidth: 2.5,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  productCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productCardLeft: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  benefitTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitTagText: {
    fontSize: 10,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  helperBox: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  helperText: {
    fontSize: 13,
    color: '#B8860B',
    fontWeight: '600',
    textAlign: 'center',
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
    height: 160,
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
  continueButtonDisabled: {
    opacity: 0.5,
  },
});
