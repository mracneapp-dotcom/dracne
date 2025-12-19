// app/ComprehensiveRoutineStep2ProductSelection.js
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

const MOISTURIZER_PRODUCTS = {
  oily: [
    {
      id: 'moist_oily_1',
      name: 'iUNIK Centella Calming Gel',
      description: 'Lightweight gel-cream with 70% centella asiatica',
      benefits: ['Oil-free', 'Soothing', 'Fast-absorbing'],
    },
    {
      id: 'moist_oily_2',
      name: 'COSRX Oil-Free Ultra-Moisturizing Lotion',
      description: 'Birch sap-based lightweight lotion',
      benefits: ['Oil-free', 'Hydrating', 'Non-greasy'],
    },
    {
      id: 'moist_oily_3',
      name: 'Neutrogena Hydro Boost Water Gel',
      description: 'Hyaluronic acid gel moisturizer',
      benefits: ['Oil-free', 'Lightweight', 'Budget-friendly'],
    },
    {
      id: 'moist_oily_4',
      name: 'La Roche-Posay Effaclar Mat',
      description: 'Mattifying moisturizer for oily skin',
      benefits: ['Mattifying', 'Pore-refining', 'Tested'],
    },
    {
      id: 'moist_oily_5',
      name: 'Belif True Aqua Bomb',
      description: 'Gel-cream with Lady\'s Mantle herb',
      benefits: ['Cooling', 'Hydrating', 'K-Beauty'],
    },
  ],
  dry: [
    {
      id: 'moist_dry_1',
      name: 'La Roche-Posay Toleriane Double Repair',
      description: 'Rich moisturizer with ceramides and niacinamide',
      benefits: ['Barrier repair', 'Nourishing', 'Tested'],
    },
    {
      id: 'moist_dry_2',
      name: 'CeraVe Moisturizing Cream',
      description: 'Rich cream with ceramides and hyaluronic acid',
      benefits: ['Affordable', 'Ceramides', 'Rich texture'],
    },
    {
      id: 'moist_dry_3',
      name: 'Etude SoonJung 2x Barrier Intensive Cream',
      description: 'Intensive barrier cream for sensitive dry skin',
      benefits: ['Hypoallergenic', 'Rich', 'Soothing'],
    },
    {
      id: 'moist_dry_4',
      name: 'Avene Tolerance Extremely Gentle Cream',
      description: 'Ultra-gentle nourishing cream',
      benefits: ['Minimal ingredients', 'Rich', 'Safe'],
    },
    {
      id: 'moist_dry_5',
      name: 'Vanicream Moisturizing Cream',
      description: 'Fragrance-free rich cream',
      benefits: ['Fragrance-free', 'Budget-friendly', 'Gentle'],
    },
  ],
  combination: [
    {
      id: 'moist_combo_1',
      name: 'iUNIK Centella Calming Gel',
      description: 'Lightweight gel suitable for all zones',
      benefits: ['Balanced', 'Calming', 'Adaptable'],
    },
    {
      id: 'moist_combo_2',
      name: 'Neutrogena Hydro Boost Water Gel',
      description: 'Hyaluronic acid gel moisturizer',
      benefits: ['Lightweight', 'Versatile', 'Affordable'],
    },
    {
      id: 'moist_combo_3',
      name: 'La Roche-Posay Toleriane Double Repair',
      description: 'Balanced moisturizer with ceramides',
      benefits: ['Barrier support', 'Versatile', 'Professional'],
    },
    {
      id: 'moist_combo_4',
      name: 'Belif True Aqua Bomb',
      description: 'Gel-cream texture for mixed zones',
      benefits: ['Balanced', 'Hydrating', 'Popular'],
    },
    {
      id: 'moist_combo_5',
      name: 'CeraVe PM Facial Lotion',
      description: 'Lightweight lotion with ceramides',
      benefits: ['Affordable', 'Balanced', 'Effective'],
    },
  ],
  normal: [
    {
      id: 'moist_normal_1',
      name: 'Neutrogena Hydro Boost Water Gel',
      description: 'Perfect lightweight moisture for healthy skin',
      benefits: ['Light', 'Effective', 'Budget-friendly'],
    },
    {
      id: 'moist_normal_2',
      name: 'La Roche-Posay Toleriane Double Repair',
      description: 'Balanced daily moisturizer',
      benefits: ['Versatile', 'Professional', 'Reliable'],
    },
    {
      id: 'moist_normal_3',
      name: 'Belif True Aqua Bomb',
      description: 'Refreshing gel-cream',
      benefits: ['Popular', 'Refreshing', 'Effective'],
    },
    {
      id: 'moist_normal_4',
      name: 'CeraVe PM Facial Lotion',
      description: 'Simple effective daily moisturizer',
      benefits: ['Affordable', 'Ceramides', 'Light'],
    },
    {
      id: 'moist_normal_5',
      name: 'iUNIK Centella Calming Gel',
      description: 'Soothing lightweight gel',
      benefits: ['Calming', 'Light', 'K-Beauty'],
    },
  ],
  sensitive: [
    {
      id: 'moist_sens_1',
      name: 'Avene Tolerance Extremely Gentle Cream',
      description: 'Ultra-gentle cream for reactive skin',
      benefits: ['Minimal ingredients', 'Safe', 'Rich'],
    },
    {
      id: 'moist_sens_2',
      name: 'Etude SoonJung 2x Barrier Intensive Cream',
      description: 'Hypoallergenic barrier cream',
      benefits: ['pH 5.5', 'Tested', 'Calming'],
    },
    {
      id: 'moist_sens_3',
      name: 'La Roche-Posay Toleriane Double Repair',
      description: 'Dermatologist-recommended barrier support',
      benefits: ['Tested', 'Ceramides', 'Safe'],
    },
    {
      id: 'moist_sens_4',
      name: 'Vanicream Moisturizing Cream',
      description: 'Free of common irritants',
      benefits: ['Fragrance-free', 'Simple', 'Budget-friendly'],
    },
    {
      id: 'moist_sens_5',
      name: 'CeraVe Moisturizing Cream',
      description: 'Gentle ceramide-rich cream',
      benefits: ['Ceramides', 'Affordable', 'Gentle'],
    },
  ],
};

export default function ComprehensiveRoutineStep2ProductSelection({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 2,
  internalStep = 4
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
        setProducts(MOISTURIZER_PRODUCTS[savedSkinType] || MOISTURIZER_PRODUCTS.normal);
      } else {
        setProducts(MOISTURIZER_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(MOISTURIZER_PRODUCTS.normal);
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

  const handleContinue = async () => {
    if (selectedProducts.length > 0 && onContinue) {
      try {
        const routineData = await AsyncStorage.getItem('myComprehensiveRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.moisturizers = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myComprehensiveRoutine', JSON.stringify(currentRoutine));
        console.log('Saved moisturizers to Comprehensive Routine:', selectedProducts);
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

  const getButtonText = () => {
    if (selectedProducts.length === 0) {
      return t('comprehensiveRoutineStep2Products.choose_moisturizer');
    } else if (selectedProducts.length === 1) {
      return t('comprehensiveRoutineStep2Products.continue_selection');
    } else {
      return t('comprehensiveRoutineStep2Products.continue_selections');
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
                {t('comprehensiveRoutineStep2Products.step_of', { current: currentStep, total: totalSteps })}
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
              {t('comprehensiveRoutineStep2Products.for_skin', { skinType: t(`profile.skin_labels.${skinType}`) })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{t('comprehensiveRoutineStep2Products.product_recommendations')}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {t('comprehensiveRoutineStep2Products.explanation')}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('comprehensiveRoutineStep2Products.select_products')} {selectedProducts.length > 0 && t('comprehensiveRoutineStep2Products.selected_count', { count: selectedProducts.length })}
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
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep2Products.select_one')}</Text>
            </View>
          )}

          {selectedProducts.length === 2 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('comprehensiveRoutineStep2Products.maximum_two')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('comprehensiveRoutineStep2Products.citation')}
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