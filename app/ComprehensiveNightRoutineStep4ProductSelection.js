// app/ComprehensiveNightRoutineStep4ProductSelection.js
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

const STEP_4_PRODUCTS = {
  oily: [
    {
      id: 'advanced_night_oily_1',
      name: 'Geek & Gorgeous A-Game 5 or 10',
      description: 'Retinal for pore refinement and texture',
      benefits: ['Fast-acting', 'Pore refining', 'Professional strength'],
    },
    {
      id: 'advanced_night_oily_2',
      name: 'The Inkey List Retinol',
      description: 'Entry retinol for texture improvement',
      benefits: ['Gentle retinol', 'Affordable', 'Good for beginners'],
    },
    {
      id: 'advanced_night_oily_3',
      name: 'Adapalene 0.1%',
      description: 'Prescription-strength retinoid for acne',
      benefits: ['Maximum efficacy', 'Acne-focused', 'Medical-grade'],
    },
    {
      id: 'advanced_night_oily_4',
      name: 'Some By Mi Retinol Intense',
      description: 'K-beauty advanced retinol treatment',
      benefits: ['Intensive formula', 'Pore care', 'Texture refinement'],
    },
    {
      id: 'advanced_night_oily_5',
      name: 'The Ordinary Granactive Retinoid',
      description: 'Gentle retinoid alternative',
      benefits: ['Less irritating', 'Stable formula', 'Budget-friendly'],
    },
  ],
  dry: [
    {
      id: 'advanced_night_dry_1',
      name: 'Geek & Gorgeous A-Game 5',
      description: 'Gentle retinal with buffer-friendly texture',
      benefits: ['Gentle strength', 'Bufferable', 'Effective'],
    },
    {
      id: 'advanced_night_dry_2',
      name: 'The Inkey List Peptide Moisturizer',
      description: 'Peptide treatment for barrier support',
      benefits: ['Collagen support', 'Hydrating', 'No irritation'],
    },
    {
      id: 'advanced_night_dry_3',
      name: 'Skin1004 Probio-Cica Bakuchiol Eye Ampoule',
      description: 'Bakuchiol alternative for reactive skin',
      benefits: ['Retinol alternative', 'Barrier-friendly', 'Gentle'],
    },
    {
      id: 'advanced_night_dry_4',
      name: 'The Ordinary Buffet + Copper Peptides',
      description: 'Multi-peptide comprehensive treatment',
      benefits: ['Advanced peptides', 'Barrier repair', 'Professional-grade'],
    },
    {
      id: 'advanced_night_dry_5',
      name: 'Olay Regenerist Night',
      description: 'Peptide night cream with niacinamide',
      benefits: ['Affordable', 'Hydrating', 'Gentle'],
    },
  ],
  combination: [
    {
      id: 'advanced_night_combo_1',
      name: 'Geek & Gorgeous A-Game 5',
      description: 'Balanced retinal for zone application',
      benefits: ['Lightweight', 'Fast-acting', 'Zone-friendly'],
    },
    {
      id: 'advanced_night_combo_2',
      name: 'The Inkey List Retinol',
      description: 'Gentle retinol for combination zones',
      benefits: ['Balanced', 'Affordable', 'Versatile'],
    },
    {
      id: 'advanced_night_combo_3',
      name: 'The Ordinary Multi-Peptide Serum',
      description: 'Hair peptides for gentle treatment',
      benefits: ['Gentle peptides', 'Versatile', 'Affordable'],
    },
    {
      id: 'advanced_night_combo_4',
      name: 'Some By Mi Retinol Intense',
      description: 'K-beauty retinol for combination skin',
      benefits: ['Balanced formula', 'Effective', 'Popular'],
    },
    {
      id: 'advanced_night_combo_5',
      name: 'Skin1004 Probio-Cica Bakuchiol',
      description: 'Gentle retinol alternative',
      benefits: ['Bakuchiol', 'Barrier-friendly', 'Safe'],
    },
  ],
  normal: [
    {
      id: 'advanced_night_normal_1',
      name: 'Geek & Gorgeous A-Game 10',
      description: 'High-strength retinal for results',
      benefits: ['Maximum strength', 'Fast results', 'Professional'],
    },
    {
      id: 'advanced_night_normal_2',
      name: 'The Inkey List Peptide Moisturizer',
      description: 'Comprehensive peptide night cream',
      benefits: ['Multiple peptides', 'Hydrating', 'Effective'],
    },
    {
      id: 'advanced_night_normal_3',
      name: 'Olay Regenerist Night',
      description: 'Classic peptide night cream',
      benefits: ['Affordable', 'Proven', 'Gentle'],
    },
    {
      id: 'advanced_night_normal_4',
      name: 'Some By Mi Retinol Intense',
      description: 'Advanced retinol for healthy skin',
      benefits: ['Intensive', 'Effective', 'Popular'],
    },
    {
      id: 'advanced_night_normal_5',
      name: 'The Ordinary Granactive Retinoid 5%',
      description: 'Advanced retinoid alternative',
      benefits: ['Gentle yet effective', 'Stable', 'No prescription'],
    },
  ],
  sensitive: [
    {
      id: 'advanced_night_sens_1',
      name: 'Isntree Ceramide+ Night Cream',
      description: 'Rich ceramide barrier support',
      benefits: ['Barrier repair', 'Non-irritating', 'Gentle'],
    },
    {
      id: 'advanced_night_sens_2',
      name: 'La Roche-Posay Cicaplast Baume B5',
      description: 'Intensive barrier recovery balm',
      benefits: ['Panthenol B5', 'Professional', 'Safe'],
    },
    {
      id: 'advanced_night_sens_3',
      name: 'Skin1004 Probio-Cica (bakuchiol)',
      description: 'Gentle retinol alternative with barrier support',
      benefits: ['Bakuchiol', 'Barrier-friendly', 'No irritation'],
    },
    {
      id: 'advanced_night_sens_4',
      name: 'KraveBeauty Great Barrier Relief',
      description: 'Intensive barrier repair ampoule',
      benefits: ['Tamanu + ceramides', 'Calming', 'Safe'],
    },
    {
      id: 'advanced_night_sens_5',
      name: 'First Aid Beauty Ultra Repair',
      description: 'Rich barrier support cream',
      benefits: ['Colloidal oatmeal', 'Soothing', 'Gentle'],
    },
  ],
};

export default function ComprehensiveNightRoutineStep4ProductSelection({ 
  onNavigateHome,
  onNavigateToNightRoutine,
  onBack, 
  onComplete,
  currentStep = 4,
  internalStep = 8
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
        return [product];
      }
    });
  };

  const handleComplete = async () => {
    if (selectedProducts.length > 0) {
      try {
        const routineData = await AsyncStorage.getItem('myComprehensiveNightRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.advancedTreatments = selectedProducts;
        currentRoutine.completedAt = new Date().toISOString();
        currentRoutine.lastUpdated = new Date().toISOString();
        currentRoutine.level = 'comprehensive';
        currentRoutine.timeOfDay = 'evening';
        
        await AsyncStorage.setItem('myComprehensiveNightRoutine', JSON.stringify(currentRoutine));
        
        console.log('Complete Comprehensive Night Routine Saved:', currentRoutine);
        
        setCompleteRoutineData(currentRoutine);
        setShowCompletionModal(true);
      } catch (error) {
        console.error('Error completing Comprehensive Night Routine:', error);
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
    console.log('Viewing Comprehensive Night Routine');
    setShowCompletionModal(false);
    if (onNavigateToNightRoutine) {
      setTimeout(() => {
        onNavigateToNightRoutine();
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
      return t('comprehensiveNightRoutine.choose_advanced_treatment');
    } else {
      return t('comprehensiveNightRoutine.complete_comprehensive_night');
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 4;
  const totalInternalSteps = 8;
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
        <ImageBackground
          source={require('../assets/images/banner-night-routine-base.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        >
          <Text style={styles.bannerText}>{t('routines.night_routine')}</Text>
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
                {t('basicRoutine.step_of', { current: currentStep, total: totalSteps })}
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
              {t('basicRoutine.for_skin', { skinType: skinTypeInfo.name })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            {t(`comprehensiveNightRoutine.step_4_titles.${skinType}`)}
          </Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {t(`comprehensiveNightRoutine.step_4_explanations.${skinType}`)}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('comprehensiveNightRoutine.select_1_product')} {selectedProducts.length > 0 && `(${selectedProducts.length} ${t('basicRoutine.selected')})`}
            </Text>
            
            {products.map((product) => {
              const isSelected = selectedProducts.some(p => p.id === product.id);
              
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
                        <Text style={styles.checkmarkText}>✓</Text>
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
              <Text style={styles.helperText}>
                {t('comprehensiveNightRoutine.select_1_complete_routine')}
              </Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              Advanced treatment recommendations based on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/22348566/')}
              >
                research on retinoid mechanisms for collagen synthesis and cellular turnover
              </Text>
              , studies on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2699641/')}
              >
                peptide signaling in skin rejuvenation
              </Text>
              , and{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/31045835/')}
              >
                bakuchiol as a retinol-alternative for sensitive skin
              </Text>
              . Start slowly with 2-3x weekly use - consult a dermatologist for prescription-strength options.
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
        isNightRoutine={true}
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
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
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