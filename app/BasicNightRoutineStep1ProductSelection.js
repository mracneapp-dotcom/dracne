// app/BasicNightRoutineStep1ProductSelection.js - FULLY UPDATED WITH TRANSLATIONS & PROPER BANNER
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
  oily: { color: '#4A90E2' },
  dry: { color: '#F39C12' },
  combination: { color: BRAND_COLORS.primary },
  normal: { color: '#9B59B6' },
  sensitive: { color: BRAND_COLORS.primary },
};

const CLEANSER_PRODUCTS = {
  oily: [
    {
      id: 'cleanser_night_oily_1',
      name: 'KraveBeauty Matcha Hemp',
      descriptionKey: 'products.cleansers.oily_1_desc',
      benefitKeys: ['gentle', 'balancing', 'non_stripping'],
    },
    {
      id: 'cleanser_night_oily_2',
      name: 'COSRX Low pH Good Morning',
      descriptionKey: 'products.cleansers.oily_2_desc',
      benefitKeys: ['ph_5_6', 'refreshing', 'daily_use'],
    },
    {
      id: 'cleanser_night_oily_3',
      name: 'Round Lab 1025 Dokdo Cleanser',
      descriptionKey: 'products.cleansers.oily_3_desc',
      benefitKeys: ['hydrating', 'soothing', 'k_beauty'],
    },
    {
      id: 'cleanser_night_oily_4',
      name: 'La Roche-Posay Toleriane Purifying',
      descriptionKey: 'products.cleansers.oily_4_desc',
      benefitKeys: ['dermatologist_tested', 'fragrance_free', 'gentle'],
    },
    {
      id: 'cleanser_night_oily_5',
      name: 'CeraVe Foaming',
      descriptionKey: 'products.cleansers.oily_5_desc',
      benefitKeys: ['affordable', 'ceramides', 'non_comedogenic'],
    },
  ],
  dry: [
    {
      id: 'cleanser_night_dry_1',
      name: 'KraveBeauty Oat So Simple Cleanser',
      descriptionKey: 'products.cleansers.dry_1_desc',
      benefitKeys: ['nourishing', 'calming', 'creamy_texture'],
    },
    {
      id: 'cleanser_night_dry_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      descriptionKey: 'products.cleansers.dry_2_desc',
      benefitKeys: ['ph_6_5', 'hypoallergenic', 'moisturizing'],
    },
    {
      id: 'cleanser_night_dry_3',
      name: 'Vanicream Gentle Cleanser',
      descriptionKey: 'products.cleansers.dry_3_desc',
      benefitKeys: ['fragrance_free', 'dye_free', 'non_irritating'],
    },
    {
      id: 'cleanser_night_dry_4',
      name: 'Avene Tolerance',
      descriptionKey: 'products.cleansers.dry_4_desc',
      benefitKeys: ['thermal_water', 'minimal_ingredients', 'soothing'],
    },
    {
      id: 'cleanser_night_dry_5',
      name: 'Cetaphil Gentle Cleanser',
      descriptionKey: 'products.cleansers.dry_5_desc',
      benefitKeys: ['budget_friendly', 'soap_free', 'mild'],
    },
  ],
  combination: [
    {
      id: 'cleanser_night_combo_1',
      name: 'KraveBeauty Matcha Hemp',
      descriptionKey: 'products.cleansers.combo_1_desc',
      benefitKeys: ['balancing', 'gentle', 'low_ph'],
    },
    {
      id: 'cleanser_night_combo_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      descriptionKey: 'products.cleansers.combo_2_desc',
      benefitKeys: ['ph_balanced', 'soft_foam', 'non_drying'],
    },
    {
      id: 'cleanser_night_combo_3',
      name: 'La Roche-Posay Toleriane Purifying',
      descriptionKey: 'products.cleansers.combo_3_desc',
      benefitKeys: ['purifying', 'comfortable', 'tested'],
    },
    {
      id: 'cleanser_night_combo_4',
      name: 'Round Lab Dokdo Cleanser',
      descriptionKey: 'products.cleansers.combo_4_desc',
      benefitKeys: ['hydrating', 'fresh', 'k_beauty'],
    },
    {
      id: 'cleanser_night_combo_5',
      name: 'Neutrogena Ultra Gentle',
      descriptionKey: 'products.cleansers.combo_5_desc',
      benefitKeys: ['affordable', 'effective', 'gentle'],
    },
  ],
  normal: [
    {
      id: 'cleanser_night_normal_1',
      name: 'KraveBeauty Matcha Hemp',
      descriptionKey: 'products.cleansers.normal_1_desc',
      benefitKeys: ['maintains_balance', 'gentle', 'daily_use'],
    },
    {
      id: 'cleanser_night_normal_2',
      name: 'Round Lab Dokdo Cleanser',
      descriptionKey: 'products.cleansers.normal_2_desc',
      benefitKeys: ['hydrating', 'clean_finish', 'popular'],
    },
    {
      id: 'cleanser_night_normal_3',
      name: 'Cetaphil Gentle Cleanser',
      descriptionKey: 'products.cleansers.normal_3_desc',
      benefitKeys: ['simple', 'reliable', 'budget_friendly'],
    },
    {
      id: 'cleanser_night_normal_4',
      name: 'La Roche-Posay Toleriane',
      descriptionKey: 'products.cleansers.normal_4_desc',
      benefitKeys: ['professional', 'gentle', 'effective'],
    },
    {
      id: 'cleanser_night_normal_5',
      name: 'COSRX Low pH Good Morning',
      descriptionKey: 'products.cleansers.normal_5_desc',
      benefitKeys: ['low_ph', 'energizing', 'light'],
    },
  ],
  sensitive: [
    {
      id: 'cleanser_night_sens_1',
      name: 'Avene Tolerance Extremely Gentle',
      descriptionKey: 'products.cleansers.sens_1_desc',
      benefitKeys: ['minimal_ingredients', 'soothing', 'safe'],
    },
    {
      id: 'cleanser_night_sens_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      descriptionKey: 'products.cleansers.sens_2_desc',
      benefitKeys: ['ph_6_5', 'tested', 'soft_foam'],
    },
    {
      id: 'cleanser_night_sens_3',
      name: 'Vanicream Gentle Cleanser',
      descriptionKey: 'products.cleansers.sens_3_desc',
      benefitKeys: ['fragrance_free', 'safe', 'simple'],
    },
    {
      id: 'cleanser_night_sens_4',
      name: 'La Roche-Posay Toleriane',
      descriptionKey: 'products.cleansers.sens_4_desc',
      benefitKeys: ['tested', 'gentle', 'reliable'],
    },
    {
      id: 'cleanser_night_sens_5',
      name: 'CeraVe Hydrating',
      descriptionKey: 'products.cleansers.sens_5_desc',
      benefitKeys: ['ceramides', 'affordable', 'non_irritating'],
    },
  ],
};

export default function BasicNightRoutineStep1ProductSelection({ 
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

  // ✅ GET TRANSLATED SKIN TYPE NAME
  const getTranslatedSkinTypeName = () => {
    return t(`basicRoutine.skin_type_${skinType}`);
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
        const routineData = await AsyncStorage.getItem('myNightRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.cleansers = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myNightRoutine', JSON.stringify(currentRoutine));
        console.log('✅ Saved night cleansers to My Night Routine:', selectedProducts);
      } catch (error) {
        console.error('Error saving to My Night Routine:', error);
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
      return t('basicRoutine.choose_cleanser');
    } else if (selectedProducts.length === 1) {
      return t('basicRoutine.continue_selection');
    } else {
      return t('basicRoutine.continue_selections');
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 2;
  const totalInternalSteps = 4;
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

      {/* ✅ FIXED: Night Routine Banner with Proper Two-Line Format */}
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToNightRoutine}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/banner-night-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.nightRoutineBannerTextContainer}>
            <Text style={styles.nightRoutineLine1}>{t('nightRoutineBanners.line1')}</Text>
            <Text style={styles.nightRoutineLine2}>{t('nightRoutineBanners.line2')}</Text>
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

          {/* ✅ FIXED: Now uses translated skin type name */}
          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
            <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
              {t('basicRoutine.for_skin', { skinType: getTranslatedSkinTypeName() })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{t('basicRoutine.product_recommendations')}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {t('basicRoutine.explanation_1_2')}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('basicRoutine.select_1_2')} {selectedProducts.length > 0 && t('basicRoutine.selected_count', { count: selectedProducts.length })}
            </Text>
            
            {products.map((product, index) => {
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
                      <Text style={styles.productDescription}>
                        {t(product.descriptionKey)}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={[styles.checkmark, { backgroundColor: skinTypeInfo.color }]}>
                        <Text style={styles.checkmarkText}>{selectionIndex + 1}</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.benefitsRow}>
                    {product.benefitKeys.map((benefitKey, idx) => (
                      <View key={idx} style={styles.benefitTag}>
                        <Text style={styles.benefitTagText}>
                          {t(`productBenefits.${benefitKey}`)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedProducts.length === 0 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('basicRoutine.select_1_continue')}</Text>
            </View>
          )}

          {selectedProducts.length === 2 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('basicRoutine.max_2_selected')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('basicRoutine.citation_products_intro')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.cir-safety.org/ingredients')}
              >
                {t('basicRoutine.citation_products_link1')}
              </Text>
              , {t('basicRoutine.citation_products_research')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://onlinelibrary.wiley.com/journal/14682494')}
              >
                {t('basicRoutine.citation_products_link2')}
              </Text>
              , {t('basicRoutine.citation_products_studies')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5849435/')}
              >
                {t('basicRoutine.citation_products_link3')}
              </Text>
              . {t('basicRoutine.citation_products_disclaimer')}
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
  // ✅ FIXED: Night Routine Banner Text Styles - Proper Two-Line Format
  nightRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
  },
  nightRoutineLine1: {
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
  nightRoutineLine2: {
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