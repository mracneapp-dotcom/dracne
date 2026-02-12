// app/ComprehensiveRoutineStep5ProductSelection.js - WITH CITATIONS
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
import RoutineCompletionModal from '../components/modals/RoutineCompletionModal';
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

const SUNSCREEN_PRODUCTS = {
  oily: [
    {
      id: 'sunscreen_oily_1',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Lightweight rice + probiotics SPF 50+ PA++++',
      benefits: ['Non-greasy', 'No white cast', 'K-Beauty favorite'],
    },
    {
      id: 'sunscreen_oily_2',
      name: 'Isntree Hyaluronic Acid Watery Sun',
      description: 'Water-based SPF 50+ PA++++',
      benefits: ['Ultra-light', 'Hydrating', 'Matte finish'],
    },
    {
      id: 'sunscreen_oily_3',
      name: 'La Roche-Posay Anthelios Oil Control',
      description: 'Mattifying fluid SPF 50+',
      benefits: ['Oil control', 'Non-comedogenic', 'Dermatologist-tested'],
    },
    {
      id: 'sunscreen_oily_4',
      name: 'Supergoop Unseen Sunscreen',
      description: 'Weightless gel SPF 40',
      benefits: ['Invisible finish', 'Oil-free', 'Makeup-friendly'],
    },
    {
      id: 'sunscreen_oily_5',
      name: 'COSRX Aloe Soothing Sun Cream',
      description: 'Lightweight aloe SPF 50+ PA+++',
      benefits: ['Soothing', 'Non-greasy', 'Affordable'],
    },
  ],
  dry: [
    {
      id: 'sunscreen_dry_1',
      name: 'COSRX Aloe Soothing Sun Cream',
      description: 'Hydrating cream SPF 50+ PA+++',
      benefits: ['Moisturizing', 'Calming aloe', 'Nourishing'],
    },
    {
      id: 'sunscreen_dry_2',
      name: 'Purito Daily Go-To Sunscreen',
      description: 'Hydrating essence SPF 50+ PA++++',
      benefits: ['Ultra-hydrating', 'Dewy finish', 'Gentle'],
    },
    {
      id: 'sunscreen_dry_3',
      name: 'La Roche-Posay Anthelios Mineral',
      description: '100% mineral SPF 50 tinted',
      benefits: ['Mineral protection', 'Moisturizing', 'Tinted'],
    },
    {
      id: 'sunscreen_dry_4',
      name: 'Elta MD UV Daily',
      description: 'Moisturizing SPF 40 tinted',
      benefits: ['Hydrating', 'Sheer tint', 'Professional-grade'],
    },
    {
      id: 'sunscreen_dry_5',
      name: 'Supergoop Glowscreen',
      description: 'Illuminating primer SPF 40',
      benefits: ['Dewy glow', 'Hydrating', 'Primer hybrid'],
    },
  ],
  combination: [
    {
      id: 'sunscreen_combo_1',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Balanced protection SPF 50+ PA++++',
      benefits: ['Versatile', 'Elegant finish', 'Popular'],
    },
    {
      id: 'sunscreen_combo_2',
      name: 'Isntree Hyaluronic Acid Watery Sun',
      description: 'Lightweight hydration SPF 50+ PA++++',
      benefits: ['Balanced', 'Fresh finish', 'Comfortable'],
    },
    {
      id: 'sunscreen_combo_3',
      name: 'La Roche-Posay Anthelios Invisible Fluid',
      description: 'Ultra-light fluid SPF 50+',
      benefits: ['Invisible', 'Balanced', 'Professional'],
    },
    {
      id: 'sunscreen_combo_4',
      name: 'Neutrogena Hydro Boost Water Gel',
      description: 'Gel-cream SPF 50',
      benefits: ['Hydrating', 'Affordable', 'Non-greasy'],
    },
    {
      id: 'sunscreen_combo_5',
      name: 'COSRX Aloe Soothing Sun Cream',
      description: 'Versatile protection SPF 50+ PA+++',
      benefits: ['Balanced', 'Soothing', 'Reliable'],
    },
  ],
  normal: [
    {
      id: 'sunscreen_normal_1',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Perfect daily SPF 50+ PA++++',
      benefits: ['Elegant', 'Comfortable', 'Reliable'],
    },
    {
      id: 'sunscreen_normal_2',
      name: 'Supergoop Unseen Sunscreen',
      description: 'Invisible protection SPF 40',
      benefits: ['Weightless', 'Invisible', 'Primer-like'],
    },
    {
      id: 'sunscreen_normal_3',
      name: 'La Roche-Posay Anthelios Melt-In',
      description: 'Lightweight milk SPF 60',
      benefits: ['High protection', 'Comfortable', 'Professional'],
    },
    {
      id: 'sunscreen_normal_4',
      name: 'Elta MD UV Clear',
      description: 'Lightweight SPF 46',
      benefits: ['Professional-grade', 'Niacinamide', 'Clear'],
    },
    {
      id: 'sunscreen_normal_5',
      name: 'COSRX Aloe Soothing Sun Cream',
      description: 'Daily essential SPF 50+ PA+++',
      benefits: ['Reliable', 'Affordable', 'Gentle'],
    },
  ],
  sensitive: [
    {
      id: 'sunscreen_sens_1',
      name: 'La Roche-Posay Anthelios Mineral',
      description: '100% mineral SPF 50 gentle formula',
      benefits: ['Mineral only', 'Fragrance-free', 'Safe'],
    },
    {
      id: 'sunscreen_sens_2',
      name: 'Elta MD UV Physical',
      description: '100% mineral tinted SPF 41',
      benefits: ['Mineral protection', 'Gentle', 'Professional'],
    },
    {
      id: 'sunscreen_sens_3',
      name: 'Purito Daily Go-To Sunscreen',
      description: 'Gentle essence SPF 50+ PA++++',
      benefits: ['Minimal ingredients', 'Soothing', 'Safe'],
    },
    {
      id: 'sunscreen_sens_4',
      name: 'Avene Mineral Fluid',
      description: 'Ultra-gentle mineral SPF 50+',
      benefits: ['Thermal water', 'Minimal formula', 'Safe'],
    },
    {
      id: 'sunscreen_sens_5',
      name: 'COSRX Aloe Soothing Sun Cream',
      description: 'Gentle daily protection SPF 50+ PA+++',
      benefits: ['Soothing aloe', 'Gentle', 'Non-irritating'],
    },
  ],
};

export default function ComprehensiveRoutineStep5ProductSelection({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onComplete,
  currentStep = 5,
  internalStep = 10
}) {
  const [skinType, setSkinType] = useState('normal');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completeRoutineData, setCompleteRoutineData] = useState(null);

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
        setProducts(SUNSCREEN_PRODUCTS[savedSkinType] || SUNSCREEN_PRODUCTS.normal);
      } else {
        setProducts(SUNSCREEN_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(SUNSCREEN_PRODUCTS.normal);
    }
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          return [prev[1], product];
        }
        return [...prev, product];
      }
    });
  };

  const handleComplete = async () => {
    if (selectedProducts.length > 0) {
      try {
        const routineData = await AsyncStorage.getItem('myComprehensiveRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.sunscreens = selectedProducts;
        currentRoutine.completedAt = new Date().toISOString();
        currentRoutine.lastUpdated = new Date().toISOString();
        currentRoutine.level = 'comprehensive';
        currentRoutine.timeOfDay = 'morning';
        
        await AsyncStorage.setItem('myComprehensiveRoutine', JSON.stringify(currentRoutine));
        
        console.log('Complete Comprehensive Routine Saved:', currentRoutine);
        console.log('Cleansers:', currentRoutine.cleansers);
        console.log('Moisturizers:', currentRoutine.moisturizers);
        console.log('Specialized Products:', currentRoutine.specializedProducts);
        console.log('Advanced Treatments:', currentRoutine.advancedTreatments);
        console.log('Sunscreens:', currentRoutine.sunscreens);
        
        setCompleteRoutineData(currentRoutine);
        setShowCompletionModal(true);
      } catch (error) {
        console.error('Error completing Comprehensive Routine:', error);
      }
    }
  };

  const handleModalClose = () => {
    console.log('Modal closed - navigating to Home');
    setShowCompletionModal(false);
    if (onNavigateHome) {
      setTimeout(() => {
        onNavigateHome();
      }, 300);
    }
  };

  const handleViewRoutine = () => {
    console.log('Viewing Comprehensive Routine');
    setShowCompletionModal(false);
    if (onNavigateToDayRoutine) {
      setTimeout(() => {
        onNavigateToDayRoutine();
      }, 300);
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (selectedProducts.length > 0) {
      handleComplete();
    }
  };

  const getButtonText = () => {
    if (selectedProducts.length === 0) {
      return t('comprehensiveRoutineStep5Products.choose_sunscreen');
    } else if (selectedProducts.length === 1) {
      return t('comprehensiveRoutineStep5Products.complete_routine');
    } else {
      return t('comprehensiveRoutineStep5Products.complete_routine');
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
                {t('comprehensiveRoutineStep5Products.step_of', { current: currentStep, total: totalSteps })}
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
              {t('comprehensiveRoutineStep5Products.for_skin', { skinType: t(`profile.skin_labels.${skinType}`) })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{t('comprehensiveRoutineStep5Products.sunscreen_recommendations')}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {t('comprehensiveRoutineStep5Products.explanation')}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('comprehensiveRoutineStep5Products.select_products', { count: selectedProducts.length })}
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
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep5Products.helper_0')}</Text>
            </View>
          )}

          {selectedProducts.length === 2 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep5Products.helper_2')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('comprehensiveRoutineStep5Products.citation')}
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleComplete}
          disabled={selectedProducts.length === 0}
          style={[styles.continueButton, selectedProducts.length === 0 && styles.continueButtonDisabled]}
        />
      </View>

      <RoutineCompletionModal
        visible={showCompletionModal}
        onClose={handleModalClose}
        onViewRoutine={handleViewRoutine}
        routineData={completeRoutineData}
        routineType="comprehensive"
      />
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
