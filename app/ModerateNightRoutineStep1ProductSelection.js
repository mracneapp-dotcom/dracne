// app/ModerateNightRoutineStep1ProductSelection.js
// Uses same cleanser products as BasicNightRoutine
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

const CLEANSER_PRODUCTS = {
  oily: [
    {
      id: 'cleanser_night_oily_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Low-pH gel cleanser with matcha and hemp seed oil',
      benefits: ['Gentle', 'Balancing', 'Non-stripping'],
    },
    {
      id: 'cleanser_night_oily_2',
      name: 'COSRX Low pH Good Morning',
      description: 'Mild gel cleanser with tea tree oil and BHA',
      benefits: ['pH 5.0-6.0', 'Refreshing', 'Daily use'],
    },
    {
      id: 'cleanser_night_oily_3',
      name: 'Round Lab 1025 Dokdo Cleanser',
      description: 'Mineral-rich gel cleanser from deep sea water',
      benefits: ['Hydrating', 'Soothing', 'K-Beauty'],
    },
    {
      id: 'cleanser_night_oily_4',
      name: 'La Roche-Posay Toleriane Purifying',
      description: 'Foaming cleanser for sensitive oily skin',
      benefits: ['Dermatologist-tested', 'Fragrance-free', 'Gentle'],
    },
    {
      id: 'cleanser_night_oily_5',
      name: 'CeraVe Foaming',
      description: 'Gentle foaming cleanser with ceramides',
      benefits: ['Affordable', 'Ceramides', 'Non-comedogenic'],
    },
  ],
  dry: [
    {
      id: 'cleanser_night_dry_1',
      name: 'KraveBeauty Oat So Simple Cleanser',
      description: 'Ultra-gentle cream cleanser with oat extract',
      benefits: ['Nourishing', 'Calming', 'Creamy texture'],
    },
    {
      id: 'cleanser_night_dry_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Whipped cream cleanser for sensitive dry skin',
      benefits: ['pH 6.5', 'Hypoallergenic', 'Moisturizing'],
    },
    {
      id: 'cleanser_night_dry_3',
      name: 'Vanicream Gentle Cleanser',
      description: 'Dermatologist-recommended gentle cleanser',
      benefits: ['Fragrance-free', 'Dye-free', 'Non-irritating'],
    },
    {
      id: 'cleanser_night_dry_4',
      name: 'Avene Tolerance',
      description: 'Ultra-gentle cream cleanser for reactive skin',
      benefits: ['Thermal water', 'Minimal ingredients', 'Soothing'],
    },
    {
      id: 'cleanser_night_dry_5',
      name: 'Cetaphil Gentle Cleanser',
      description: 'Classic gentle cleanser for dry sensitive skin',
      benefits: ['Budget-friendly', 'Soap-free', 'Mild'],
    },
  ],
  combination: [
    {
      id: 'cleanser_night_combo_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Balanced gel cleanser suitable for all zones',
      benefits: ['Balancing', 'Gentle', 'Low pH'],
    },
    {
      id: 'cleanser_night_combo_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Gentle cleanser that respects skin barrier',
      benefits: ['pH-balanced', 'Soft foam', 'Non-drying'],
    },
    {
      id: 'cleanser_night_combo_3',
      name: 'La Roche-Posay Toleriane Purifying',
      description: 'Balanced cleansing for combination skin',
      benefits: ['Purifying', 'Comfortable', 'Tested'],
    },
    {
      id: 'cleanser_night_combo_4',
      name: 'Round Lab Dokdo Cleanser',
      description: 'Mineral-balanced gentle cleanser',
      benefits: ['Hydrating', 'Fresh', 'K-Beauty'],
    },
    {
      id: 'cleanser_night_combo_5',
      name: 'Neutrogena Ultra Gentle',
      description: 'Simple effective cleanser for daily use',
      benefits: ['Affordable', 'Effective', 'Gentle'],
    },
  ],
  normal: [
    {
      id: 'cleanser_night_normal_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Perfect low-pH cleanser for healthy skin',
      benefits: ['Maintains balance', 'Gentle', 'Daily use'],
    },
    {
      id: 'cleanser_night_normal_2',
      name: 'Round Lab Dokdo Cleanser',
      description: 'Mineral-rich refreshing cleanser',
      benefits: ['Hydrating', 'Clean finish', 'Popular'],
    },
    {
      id: 'cleanser_night_normal_3',
      name: 'Cetaphil Gentle Cleanser',
      description: 'Classic gentle daily cleanser',
      benefits: ['Simple', 'Reliable', 'Budget-friendly'],
    },
    {
      id: 'cleanser_night_normal_4',
      name: 'La Roche-Posay Toleriane',
      description: 'Dermatologist-recommended daily cleanser',
      benefits: ['Professional', 'Gentle', 'Effective'],
    },
    {
      id: 'cleanser_night_normal_5',
      name: 'COSRX Low pH Good Morning',
      description: 'Refreshing evening cleanser',
      benefits: ['Low pH', 'Energizing', 'Light'],
    },
  ],
  sensitive: [
    {
      id: 'cleanser_night_sens_1',
      name: 'Avene Tolerance Extremely Gentle',
      description: 'Ultra-gentle cream cleanser for reactive skin',
      benefits: ['Minimal ingredients', 'Soothing', 'Safe'],
    },
    {
      id: 'cleanser_night_sens_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Hypoallergenic whipped cleanser',
      benefits: ['pH 6.5', 'Tested', 'Soft'],
    },
    {
      id: 'cleanser_night_sens_3',
      name: 'Vanicream Gentle Cleanser',
      description: 'Free of common irritants',
      benefits: ['Fragrance-free', 'Safe', 'Simple'],
    },
    {
      id: 'cleanser_night_sens_4',
      name: 'La Roche-Posay Toleriane',
      description: 'Dermatologist-recommended for sensitive skin',
      benefits: ['Tested', 'Gentle', 'Reliable'],
    },
    {
      id: 'cleanser_night_sens_5',
      name: 'CeraVe Hydrating',
      description: 'Gentle hydrating cleanser with ceramides',
      benefits: ['Ceramides', 'Affordable', 'Non-irritating'],
    },
  ],
};

export default function ModerateNightRoutineStep1ProductSelection({ 
  onNavigateHome,
  onNavigateToNightRoutine,
  onBack, 
  onContinue, 
  currentStep = 1,
  internalStep = 2
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
        setProducts(CLEANSER_PRODUCTS[savedSkinType] || CLEANSER_PRODUCTS.normal);
      } else {
        setProducts(CLEANSER_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(CLEANSER_PRODUCTS.normal);
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
        const routineData = await AsyncStorage.getItem('myModerateNightRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.cleansers = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myModerateNightRoutine', JSON.stringify(currentRoutine));
        console.log('Saved cleansers to Moderate Night Routine:', selectedProducts);
      } catch (error) {
        console.error('Error saving to Moderate Night Routine:', error);
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
      return 'Choose My Cleanser';
    } else if (selectedProducts.length === 1) {
      return 'Continue with My Selection';
    } else {
      return 'Continue with My Selections';
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3;
  const totalInternalSteps = 6;
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
        onPress={onNavigateToNightRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner Night Routine 1.png')}
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
              For {skinTypeInfo.name}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Product Recommendations</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Choose 1-2 cleansers to give you options when shopping. Having alternatives helps you find what works best for your skin and budget.
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              Select 1-2 Products {selectedProducts.length > 0 && `(${selectedProducts.length} selected)`}
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
              <Text style={styles.helperText}>Select at least 1 product to continue</Text>
            </View>
          )}

          {selectedProducts.length === 2 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>Maximum 2 products selected</Text>
            </View>
          )}

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