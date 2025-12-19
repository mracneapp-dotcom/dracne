// app/ModerateRoutineStep3ProductSelection.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
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

const STEP_3_PRODUCTS = {
  oily: [
    {
      id: 'porecare_oily_1',
      name: 'COSRX BHA Power Liquid',
      description: '4% betaine salicylate for gentle pore care',
      benefits: ['BHA exfoliant', 'Pore clearing', 'Non-irritating'],
    },
    {
      id: 'porecare_oily_2',
      name: 'By Wishtrend Mandelic 5%',
      description: 'Gentle mandelic acid for sensitive oily skin',
      benefits: ['Large molecule', 'Less irritating', 'Pore care'],
    },
    {
      id: 'porecare_oily_3',
      name: "Paula's Choice 2% BHA",
      description: 'Cult-favorite salicylic acid treatment',
      benefits: ['Classic formula', 'Effective', 'Well-tolerated'],
    },
    {
      id: 'porecare_oily_4',
      name: 'The Inkey List Beta Hydroxy Acid',
      description: 'Affordable 2% salicylic acid serum',
      benefits: ['Budget-friendly', 'Simple', 'Effective'],
    },
    {
      id: 'porecare_oily_5',
      name: 'Some By Mi AHA BHA PHA Toner',
      description: 'Multi-acid toner with gentle exfoliation',
      benefits: ['Triple action', 'Daily use', 'Balancing'],
    },
  ],
  dry: [
    {
      id: 'essence_dry_1',
      name: 'Round Lab Birch Juice Toner',
      description: 'Hydrating essence with birch sap and hyaluronic acid',
      benefits: ['Deep hydration', 'Soothing', 'Popular'],
    },
    {
      id: 'essence_dry_2',
      name: 'Anua Heartleaf 77% Soothing Toner',
      description: 'Calming essence for dry sensitive skin',
      benefits: ['Heartleaf extract', 'Hydrating', 'Gentle'],
    },
    {
      id: 'essence_dry_3',
      name: 'Isntree Hyaluronic Toner Plus',
      description: 'Multi-molecular weight HA for deep hydration',
      benefits: ['8 types HA', 'Plumping', 'Layerable'],
    },
    {
      id: 'essence_dry_4',
      name: 'Klairs Supple Preparation Toner',
      description: 'Classic hydrating toner with beta-glucan',
      benefits: ['Gentle', 'Hydrating', 'Alcohol-free'],
    },
    {
      id: 'essence_dry_5',
      name: 'Pyunkang Yul Essence Toner',
      description: 'Minimalist essence with astragalus extract',
      benefits: ['Simple formula', 'Hydrating', 'Safe'],
    },
  ],
  combination: [
    {
      id: 'targeted_combo_1',
      name: 'By Wishtrend Mandelic 5% (T-zone)',
      description: 'Gentle acid for oily T-zone areas',
      benefits: ['T-zone treatment', 'Gentle', 'Effective'],
    },
    {
      id: 'targeted_combo_2',
      name: 'COSRX BHA Power Liquid (T-zone)',
      description: 'BHA treatment for T-zone congestion',
      benefits: ['Pore clearing', 'Oil control', 'T-zone focused'],
    },
    {
      id: 'targeted_combo_3',
      name: 'Round Lab Birch Juice Toner (Cheeks)',
      description: 'Hydrating essence for dry cheek areas',
      benefits: ['Cheek hydration', 'Soothing', 'Balancing'],
    },
    {
      id: 'targeted_combo_4',
      name: "Paula's Choice 2% BHA (T-zone)",
      description: 'Classic BHA for combination T-zone',
      benefits: ['Effective', 'T-zone care', 'Trusted'],
    },
    {
      id: 'targeted_combo_5',
      name: 'Isntree HA Toner (Cheeks)',
      description: 'Lightweight hydration for cheeks',
      benefits: ['Cheek care', 'Non-greasy', 'Hydrating'],
    },
  ],
  normal: [
    {
      id: 'antioxidant_normal_1',
      name: 'Some By Mi Yuja Niacin Serum',
      description: 'Brightening serum with niacinamide and vitamin C',
      benefits: ['Brightening', 'Antioxidant', 'Gentle'],
    },
    {
      id: 'antioxidant_normal_2',
      name: 'Dear, Klairs Freshly Juiced Vitamin Drop',
      description: 'Gentle vitamin C serum for daily use',
      benefits: ['5% Vitamin C', 'Gentle', 'Brightening'],
    },
    {
      id: 'antioxidant_normal_3',
      name: 'Timeless CE Ferulic (alternative)',
      description: 'Vitamin C, E, and ferulic acid combo',
      benefits: ['Triple antioxidant', 'Professional', 'Effective'],
    },
    {
      id: 'antioxidant_normal_4',
      name: 'Naturium Vitamin C Complex',
      description: 'Stable vitamin C derivative serum',
      benefits: ['Stable formula', 'Affordable', 'Effective'],
    },
    {
      id: 'antioxidant_normal_5',
      name: 'The Ordinary Niacinamide 10%',
      description: 'High-strength niacinamide for brightness',
      benefits: ['Budget-friendly', 'Brightening', 'Simple'],
    },
  ],
  sensitive: [
    {
      id: 'soothing_sens_1',
      name: 'KraveBeauty Great Barrier Relief',
      description: 'Barrier support serum with tamanu and ceramides',
      benefits: ['Barrier repair', 'Calming', 'Safe'],
    },
    {
      id: 'soothing_sens_2',
      name: 'Dr. Jart Cicapair Serum',
      description: 'Centella-based soothing serum',
      benefits: ['Centella asiatica', 'Redness relief', 'Gentle'],
    },
    {
      id: 'soothing_sens_3',
      name: "A'pieu Madecassoside Ampoule",
      description: 'Pure madecassoside for calming',
      benefits: ['Single ingredient', 'Calming', 'Safe'],
    },
    {
      id: 'soothing_sens_4',
      name: 'La Roche-Posay Cicaplast B5 Serum',
      description: 'Dermatologist-recommended soothing serum',
      benefits: ['Panthenol B5', 'Professional', 'Gentle'],
    },
    {
      id: 'soothing_sens_5',
      name: 'Purito Centella Unscented Serum',
      description: 'Pure centella serum for reactive skin',
      benefits: ['Fragrance-free', 'Simple', 'Soothing'],
    },
  ],
};

const STEP_3_TITLES = {
  oily: 'Pore Care Products',
  dry: 'Hydrating Essences',
  combination: 'Targeted Treatments',
  normal: 'Antioxidant Serums',
  sensitive: 'Soothing Serums',
};

const STEP_3_EXPLANATIONS = {
  oily: 'Choose 1-2 pore care products to use 2-4 times per week in the evening. Start with 2x per week and increase gradually. These products help keep your pores clear and prevent breakouts.',
  dry: 'Choose 1-2 hydrating essences to layer under your moisturizer morning and evening. Apply on damp skin for best results. These create a moisture sandwich that locks in hydration.',
  combination: 'Choose 1 BHA/mandelic product for T-zone AND 1 hydrating essence for cheeks. Apply BHA only on T-zone 2-4x per week. Use essence on cheeks daily. This zone-specific approach balances your skin.',
  normal: 'Choose 1 antioxidant serum to use in the morning before moisturizer. These protect from environmental damage and brighten your complexion. Always follow with sunscreen.',
  sensitive: 'Choose 1-2 soothing serums to use morning and evening. These calm reactive skin and strengthen your barrier. Safe for twice-daily use with no irritation potential.',
};

export default function ModerateRoutineStep3ProductSelection({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onContinue, 
  currentStep = 3,
  internalStep = 6
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
        setProducts(STEP_3_PRODUCTS[savedSkinType] || STEP_3_PRODUCTS.normal);
      } else {
        setProducts(STEP_3_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(STEP_3_PRODUCTS.normal);
    }
  };

  const toggleProductSelection = (product) => {
    const maxSelections = skinType === 'combination' ? 2 : 2;
    
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= maxSelections) {
          return [prev[prev.length - 1], product];
        }
        return [...prev, product];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedProducts.length > 0 && onContinue) {
      try {
        const routineData = await AsyncStorage.getItem('myModerateRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.specializedProducts = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myModerateRoutine', JSON.stringify(currentRoutine));
        console.log('Saved specialized products to Moderate Routine:', selectedProducts);
      } catch (error) {
        console.error('Error saving to Moderate Routine:', error);
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
    const minRequired = skinType === 'combination' ? 2 : 1;
    
    if (selectedProducts.length === 0) {
      return skinType === 'combination' ? 'Choose 2 Products (1 for T-zone, 1 for cheeks)' : 'Choose My Product';
    } else if (selectedProducts.length === 1) {
      return skinType === 'combination' ? 'Choose 1 More Product' : 'Continue with My Selection';
    } else {
      return 'Continue with My Selections';
    }
  };

  const getHelperText = () => {
    if (skinType === 'combination') {
      if (selectedProducts.length === 0) {
        return 'Select 2 products: 1 BHA/Mandelic for T-zone + 1 Hydrating essence for cheeks';
      } else if (selectedProducts.length === 1) {
        return 'Select 1 more product to complete zone-specific care';
      } else {
        return 'Perfect! You have products for both zones';
      }
    } else {
      if (selectedProducts.length === 0) {
        return 'Select at least 1 product to continue';
      } else if (selectedProducts.length === 1) {
        return 'You can add 1 more product as an alternative';
      } else {
        return 'Maximum 2 products selected';
      }
    }
  };

  const getCitationText = () => {
    if (skinType === 'oily') {
      return (
        <Text style={styles.citationText}>
          Pore care treatment recommendations based on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4554394/')}
          >
            clinical research on salicylic acid and beta hydroxy acids for acne-prone skin
          </Text>
          , studies on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(06)02559-X/fulltext')}
          >
            chemical exfoliation safety and efficacy
          </Text>
          , and{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5574737/')}
          >
            dermatological guidance on gradual introduction of active ingredients
          </Text>
          . Individual tolerance varies - consult a dermatologist for personalized treatment protocols.
        </Text>
      );
    } else if (skinType === 'dry') {
      return (
        <Text style={styles.citationText}>
          Hydrating essence recommendations based on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751381/')}
          >
            research on hyaluronic acid and multi-layer hydration
          </Text>
          , clinical studies on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4345901/')}
          >
            product layering for optimal skin hydration
          </Text>
          , and{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(17)32410-0/fulltext')}
          >
            dermatological guidance on barrier function and moisture retention
          </Text>
          . Individual results may vary - consult a dermatologist for personalized advice.
        </Text>
      );
    } else if (skinType === 'combination') {
      return (
        <Text style={styles.citationText}>
          Zone-specific treatment recommendations based on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4554394/')}
          >
            clinical research on targeted acne treatment for combination skin
          </Text>
          , studies on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751381/')}
          >
            differential hydration needs in T-zone versus cheeks
          </Text>
          , and{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(17)32410-0/fulltext')}
          >
            dermatological protocols for balancing mixed skin types
          </Text>
          . Individual tolerance varies - consult a dermatologist for personalized treatment.
        </Text>
      );
    } else if (skinType === 'normal') {
      return (
        <Text style={styles.citationText}>
          Antioxidant serum recommendations based on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3673383/')}
          >
            clinical research on vitamin C and niacinamide for skin protection
          </Text>
          , studies on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5605218/')}
          >
            antioxidant efficacy in preventing environmental damage
          </Text>
          , and{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(15)02614-6/fulltext')}
          >
            dermatological guidance on morning antioxidant application
          </Text>
          . Individual results may vary - always follow with sunscreen and consult a dermatologist.
        </Text>
      );
    } else {
      return (
        <Text style={styles.citationText}>
          Soothing serum recommendations based on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5796020/')}
          >
            clinical research on centella asiatica and barrier repair ingredients
          </Text>
          , studies on{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4158622/')}
          >
            anti-inflammatory compounds for sensitive skin
          </Text>
          , and{' '}
          <Text 
            style={styles.citationLink}
            onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(17)32410-0/fulltext')}
          >
            dermatological protocols for managing reactive skin
          </Text>
          . These are safe for twice-daily use - consult a dermatologist for personalized care.
        </Text>
      );
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 4;
  const totalInternalSteps = 8;
  const minRequired = skinType === 'combination' ? 2 : 1;
  const canGoNext = selectedProducts.length >= minRequired;

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
                {t('moderateRoutineStep3Products.step_of', { current: currentStep, total: totalSteps })}
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
              {t('moderateRoutineStep3Products.for_skin', { 
                skinType: t(`profile.skin_labels.${skinType}`)
              })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{STEP_3_TITLES[skinType]}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {STEP_3_EXPLANATIONS[skinType]}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {skinType === 'combination' 
                ? `Select 2 Products (${selectedProducts.length}/2 selected)`
                : `Select 1-2 Products ${selectedProducts.length > 0 ? `(${selectedProducts.length} selected)` : ''}`
              }
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

          <View style={styles.helperBox}>
            <Text style={styles.helperText}>{getHelperText()}</Text>
          </View>

          <View style={styles.citationContainer}>
            {getCitationText()}
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleContinue}
          disabled={!canGoNext}
          style={[styles.continueButton, !canGoNext && styles.continueButtonDisabled]}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTextContainer: {
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 28,
    fontWeight: '700',
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