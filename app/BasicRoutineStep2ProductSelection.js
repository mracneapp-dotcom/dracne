// app/BasicRoutineStep2ProductSelection.js - FULLY TRANSLATED
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

const MOISTURIZER_PRODUCTS = {
  oily: [
    {
      id: 'moisturizer_oily_1',
      name: 'Beauty of Joseon Dynasty Cream Light',
      descriptionKey: 'products.moisturizers.oily_1_desc',
      benefitKeys: ['non_greasy', 'hydrating', 'k_beauty'],
    },
    {
      id: 'moisturizer_oily_2',
      name: 'Isntree Hyaluronic Aqua Gel Cream',
      descriptionKey: 'products.moisturizers.oily_2_desc',
      benefitKeys: ['lightweight', 'plumping', 'fresh_finish'],
    },
    {
      id: 'moisturizer_oily_3',
      name: 'Innisfree Green Tea Seed Cream',
      descriptionKey: 'products.moisturizers.oily_3_desc',
      benefitKeys: ['oil_control', 'antioxidant', 'popular'],
    },
    {
      id: 'moisturizer_oily_4',
      name: 'Neutrogena Hydro Boost',
      descriptionKey: 'products.moisturizers.oily_4_desc',
      benefitKeys: ['affordable', 'oil_free', 'hydrating'],
    },
    {
      id: 'moisturizer_oily_5',
      name: 'Clinique Dramatically Different Gel',
      descriptionKey: 'products.moisturizers.oily_5_desc',
      benefitKeys: ['oil_free', 'trusted', 'dermatologist_tested'],
    },
  ],
  dry: [
    {
      id: 'moisturizer_dry_1',
      name: 'COSRX Snail 92 All In One Cream',
      descriptionKey: 'products.moisturizers.dry_1_desc',
      benefitKeys: ['nourishing', 'repairing', 'hydrating'],
    },
    {
      id: 'moisturizer_dry_2',
      name: 'Illiyoon Ceramide Ato Concentrate',
      descriptionKey: 'products.moisturizers.dry_2_desc',
      benefitKeys: ['rich', 'barrier_repair', 'k_beauty_favorite'],
    },
    {
      id: 'moisturizer_dry_3',
      name: "Kiehl's Ultra Facial Cream",
      descriptionKey: 'products.moisturizers.dry_3_desc',
      benefitKeys: ['24_hour_hydration', 'luxurious', 'iconic'],
    },
    {
      id: 'moisturizer_dry_4',
      name: 'CeraVe Moisturizing Cream',
      descriptionKey: 'products.moisturizers.dry_4_desc',
      benefitKeys: ['affordable', 'ceramides', 'dermatologist_loved'],
    },
    {
      id: 'moisturizer_dry_5',
      name: 'First Aid Beauty Ultra Repair',
      descriptionKey: 'products.moisturizers.dry_5_desc',
      benefitKeys: ['soothing', 'rich', 'fast_absorbing'],
    },
  ],
  combination: [
    {
      id: 'moisturizer_combo_1',
      name: 'Beauty of Joseon Dynasty Cream',
      descriptionKey: 'products.moisturizers.combo_1_desc',
      benefitKeys: ['balanced', 'versatile', 'elegant'],
    },
    {
      id: 'moisturizer_combo_2',
      name: 'Isntree Aloe Soothing Gel',
      descriptionKey: 'products.moisturizers.combo_2_desc',
      benefitKeys: ['soothing', 'lightweight', 'fresh'],
    },
    {
      id: 'moisturizer_combo_3',
      name: 'Clinique Moisture Surge',
      descriptionKey: 'products.moisturizers.combo_3_desc',
      benefitKeys: ['oil_free', 'hydrating', 'balanced'],
    },
    {
      id: 'moisturizer_combo_4',
      name: 'Neutrogena Hydro Boost',
      descriptionKey: 'products.moisturizers.combo_4_desc',
      benefitKeys: ['versatile', 'affordable', 'effective'],
    },
    {
      id: 'moisturizer_combo_5',
      name: 'COSRX Snail 92',
      descriptionKey: 'products.moisturizers.combo_5_desc',
      benefitKeys: ['adaptable', 'repairing', 'popular'],
    },
  ],
  normal: [
    {
      id: 'moisturizer_normal_1',
      name: 'COSRX Snail 92 All In One Cream',
      descriptionKey: 'products.moisturizers.normal_1_desc',
      benefitKeys: ['balanced', 'repairing', 'versatile'],
    },
    {
      id: 'moisturizer_normal_2',
      name: 'Beauty of Joseon Dynasty Cream',
      descriptionKey: 'products.moisturizers.normal_2_desc',
      benefitKeys: ['elegant', 'balanced', 'popular'],
    },
    {
      id: 'moisturizer_normal_3',
      name: 'Clinique Moisture Surge',
      descriptionKey: 'products.moisturizers.normal_3_desc',
      benefitKeys: ['hydrating', 'reliable', 'oil_free'],
    },
    {
      id: 'moisturizer_normal_4',
      name: 'Eucerin Lotion',
      descriptionKey: 'products.moisturizers.normal_4_desc',
      benefitKeys: ['lightweight', 'budget_friendly', 'gentle'],
    },
    {
      id: 'moisturizer_normal_5',
      name: 'Neutrogena Hydro Boost',
      descriptionKey: 'products.moisturizers.normal_5_desc',
      benefitKeys: ['hydrating', 'fresh', 'affordable'],
    },
  ],
  sensitive: [
    {
      id: 'moisturizer_sens_1',
      name: 'Illiyoon Ceramide Ato',
      descriptionKey: 'products.moisturizers.sens_1_desc',
      benefitKeys: ['minimal_ingredients', 'ceramides', 'safe'],
    },
    {
      id: 'moisturizer_sens_2',
      name: 'La Roche-Posay Toleriane Dermallergo',
      descriptionKey: 'products.moisturizers.sens_2_desc',
      benefitKeys: ['dermatologist_tested', 'fragrance_free', 'safe'],
    },
    {
      id: 'moisturizer_sens_3',
      name: 'CeraVe Moisturizing Cream',
      descriptionKey: 'products.moisturizers.sens_3_desc',
      benefitKeys: ['affordable', 'ceramides', 'non_irritating'],
    },
    {
      id: 'moisturizer_sens_4',
      name: 'A-Derma Dermalibour',
      descriptionKey: 'products.moisturizers.sens_4_desc',
      benefitKeys: ['soothing', 'repairing', 'gentle'],
    },
    {
      id: 'moisturizer_sens_5',
      name: 'First Aid Beauty Ultra Repair',
      descriptionKey: 'products.moisturizers.sens_5_desc',
      benefitKeys: ['colloidal_oatmeal', 'safe', 'soothing'],
    },
  ],
};

export default function BasicRoutineStep2ProductSelection({ 
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

  const getTranslatedSkinTypeName = () => {
    return t(`skinTypes.${skinType}`);
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
        const routineData = await AsyncStorage.getItem('myDayRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.moisturizers = selectedProducts;
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myDayRoutine', JSON.stringify(currentRoutine));
        console.log('✅ Saved moisturizers to My Day Routine:', selectedProducts);
      } catch (error) {
        console.error('Error saving to My Day Routine:', error);
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
      return t('basicRoutine.choose_moisturizer');
    } else if (selectedProducts.length === 1) {
      return t('basicRoutine.continue_selection_singular');
    } else {
      return t('basicRoutine.continue_selection_plural');
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
        onPress={onNavigateToDayRoutine}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/banner-day-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
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
              {t('basicRoutine.for_skin', { skinType: getTranslatedSkinTypeName() })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>{t('basicRoutine.product_recommendations')}</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              {t('basicRoutine.explanation_moisturizer_selection')}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('basicRoutine.select_1_2_products')} {selectedProducts.length > 0 && t('basicRoutine.x_selected', { count: selectedProducts.length })}
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
              <Text style={styles.helperText}>{t('basicRoutine.maximum_2_selected')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('basicRoutine.citation_moisturizer_products_intro')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6628577/')}
              >
                {t('basicRoutine.citation_moisturizer_products_link1')}
              </Text>
              , {t('basicRoutine.citation_moisturizer_products_studies')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.jidonline.org/article/S0022-202X(15)41268-2/fulltext')}
              >
                {t('basicRoutine.citation_moisturizer_products_link2')}
              </Text>
              , {t('basicRoutine.citation_moisturizer_products_profiles')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.cir-safety.org/ingredients')}
              >
                {t('basicRoutine.citation_moisturizer_products_link3')}
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