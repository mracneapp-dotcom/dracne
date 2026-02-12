// app/BasicRoutineStep3ProductSelection.js - FULLY UPDATED WITH TRANSLATIONS & PROPER BANNER
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
  oily: { color: '#4A90E2' },
  dry: { color: '#F39C12' },
  combination: { color: BRAND_COLORS.primary },
  normal: { color: '#9B59B6' },
  sensitive: { color: BRAND_COLORS.primary },
};

const SUNSCREEN_PRODUCTS = {
  oily: [
    {
      id: 'sunscreen_oily_1',
      name: 'TIZO Mineral Sun Defense',
      descriptionKey: 'products.sunscreens.oily_1_desc',
      benefitKeys: ['matte_finish', 'mineral', 'spf_50'],
    },
    {
      id: 'sunscreen_oily_2',
      name: 'Beauty of Joseon Relief Sun',
      descriptionKey: 'products.sunscreens.oily_2_desc',
      benefitKeys: ['lightweight', 'no_white_cast', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_oily_3',
      name: 'Isntree Hyaluronic Aqua Gel',
      descriptionKey: 'products.sunscreens.oily_3_desc',
      benefitKeys: ['fresh_finish', 'hydrating', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_oily_4',
      name: 'EltaMD UV Clear',
      descriptionKey: 'products.sunscreens.oily_4_desc',
      benefitKeys: ['oil_free', 'niacinamide', 'spf_46'],
    },
    {
      id: 'sunscreen_oily_5',
      name: 'La Roche-Posay Anthelios',
      descriptionKey: 'products.sunscreens.oily_5_desc',
      benefitKeys: ['matte_finish', 'tested', 'spf_50_plus'],
    },
  ],
  dry: [
    {
      id: 'sunscreen_dry_1',
      name: 'TIZO AM Replenish / Tinted',
      descriptionKey: 'products.sunscreens.dry_1_desc',
      benefitKeys: ['moisturizing', 'tinted_option', 'spf_40'],
    },
    {
      id: 'sunscreen_dry_2',
      name: 'Avene Solaire Mineral',
      descriptionKey: 'products.sunscreens.dry_2_desc',
      benefitKeys: ['hydrating', 'thermal_water', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_dry_3',
      name: 'Beauty of Joseon Relief Sun',
      descriptionKey: 'products.sunscreens.dry_3_desc',
      benefitKeys: ['dewy_finish', 'comfortable', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_dry_4',
      name: 'La Roche-Posay Anthelios',
      descriptionKey: 'products.sunscreens.dry_4_desc',
      benefitKeys: ['moisturizing', 'professional', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_dry_5',
      name: 'CeraVe Hydrating Sunscreen',
      descriptionKey: 'products.sunscreens.dry_5_desc',
      benefitKeys: ['affordable', 'ceramides', 'spf_30'],
    },
  ],
  combination: [
    {
      id: 'sunscreen_combo_1',
      name: 'TIZO Mineral Sun Defense',
      descriptionKey: 'products.sunscreens.combo_1_desc',
      benefitKeys: ['versatile', 'mineral', 'spf_50'],
    },
    {
      id: 'sunscreen_combo_2',
      name: 'Beauty of Joseon Relief Sun',
      descriptionKey: 'products.sunscreens.combo_2_desc',
      benefitKeys: ['balanced', 'popular', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_combo_3',
      name: 'Isntree Watery Sun Gel',
      descriptionKey: 'products.sunscreens.combo_3_desc',
      benefitKeys: ['light', 'hydrating', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_combo_4',
      name: 'EltaMD UV Clear',
      descriptionKey: 'products.sunscreens.combo_4_desc',
      benefitKeys: ['balanced', 'professional', 'spf_46'],
    },
    {
      id: 'sunscreen_combo_5',
      name: 'La Roche-Posay Anthelios',
      descriptionKey: 'products.sunscreens.combo_5_desc',
      benefitKeys: ['reliable', 'tested', 'spf_50_plus'],
    },
  ],
  normal: [
    {
      id: 'sunscreen_normal_1',
      name: 'TIZO Mineral Sun Defense',
      descriptionKey: 'products.sunscreens.normal_1_desc',
      benefitKeys: ['reliable', 'mineral', 'spf_50'],
    },
    {
      id: 'sunscreen_normal_2',
      name: 'Beauty of Joseon Relief Sun',
      descriptionKey: 'products.sunscreens.normal_2_desc',
      benefitKeys: ['elegant', 'comfortable', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_normal_3',
      name: 'EltaMD UV Clear',
      descriptionKey: 'products.sunscreens.normal_3_desc',
      benefitKeys: ['professional', 'clean_finish', 'spf_46'],
    },
    {
      id: 'sunscreen_normal_4',
      name: 'La Roche-Posay Anthelios',
      descriptionKey: 'products.sunscreens.normal_4_desc',
      benefitKeys: ['tested', 'reliable', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_normal_5',
      name: 'Isntree Watery Sun Gel',
      descriptionKey: 'products.sunscreens.normal_5_desc',
      benefitKeys: ['fresh', 'hydrating', 'spf_50_plus'],
    },
  ],
  sensitive: [
    {
      id: 'sunscreen_sens_1',
      name: 'TIZO AM Replenish / Mineral Sun Defense',
      descriptionKey: 'products.sunscreens.sens_1_desc',
      benefitKeys: ['100_mineral', 'safe', 'spf_40'],
    },
    {
      id: 'sunscreen_sens_2',
      name: 'Avene Solaire Mineral',
      descriptionKey: 'products.sunscreens.sens_2_desc',
      benefitKeys: ['thermal_water', 'gentle', 'spf_50_plus'],
    },
    {
      id: 'sunscreen_sens_3',
      name: 'EltaMD UV Physical',
      descriptionKey: 'products.sunscreens.sens_3_desc',
      benefitKeys: ['physical_only', 'safe', 'spf_41'],
    },
    {
      id: 'sunscreen_sens_4',
      name: 'La Roche-Posay Anthelios Mineral',
      descriptionKey: 'products.sunscreens.sens_4_desc',
      benefitKeys: ['tested', 'fragrance_free', 'spf_50'],
    },
    {
      id: 'sunscreen_sens_5',
      name: 'CeraVe Mineral Sunscreen',
      descriptionKey: 'products.sunscreens.sens_5_desc',
      benefitKeys: ['budget_friendly', 'mineral', 'spf_30'],
    },
  ],
};

export default function BasicRoutineStep3ProductSelection({ 
  onNavigateHome,
  onNavigateToDayRoutine,
  onBack, 
  onComplete, 
  currentStep = 3,
  internalStep = 6
}) {
  const [skinType, setSkinType] = useState('normal');
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const getTranslatedSkinTypeName = () => {
    return t(`skinTypes.${skinType}`);
  };

  const handleComplete = async () => {
    if (selectedProduct) {
      try {
        const routineData = await AsyncStorage.getItem('myBasicRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.sunscreens = [selectedProduct];
        currentRoutine.lastUpdated = new Date().toISOString();
        currentRoutine.completedAt = new Date().toISOString();
        currentRoutine.level = 'basic';
        currentRoutine.timeOfDay = 'morning';
        
        await AsyncStorage.setItem('myBasicRoutine', JSON.stringify(currentRoutine));
        
        console.log('✅ Complete Routine Saved:', currentRoutine);
        console.log('📦 Cleansers:', currentRoutine.cleansers);
        console.log('📦 Moisturizers:', currentRoutine.moisturizers);
        console.log('📦 Sunscreens:', currentRoutine.sunscreens);
        
        setCompleteRoutineData(currentRoutine);
        setShowCompletionModal(true);
      } catch (error) {
        console.error('❌ Error saving complete routine:', error);
      }
    }
  };

  const handleModalClose = () => {
    console.log('🏠 Modal closed - navigating to Home');
    setShowCompletionModal(false);
    if (onNavigateHome) {
      setTimeout(() => {
        onNavigateHome();
      }, 300);
    }
  };

  const handleViewRoutine = () => {
    console.log('📋 Viewing Day Routine');
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
    if (selectedProduct) {
      handleComplete();
    }
  };

  const getButtonText = () => {
    if (!selectedProduct) {
      return t('basicRoutine.choose_sunscreen');
    }
    return t('basicRoutine.complete_routine');
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3;
  const totalInternalSteps = 6;
  const canGoNext = !!selectedProduct;

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
              {t('basicRoutine.sunscreen_explanation')}
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              {t('basicRoutine.choose_product')} {selectedProduct && t('productBenefits.selected_1')}
            </Text>
            
            {products.map((product) => {
              const isSelected = selectedProduct?.id === product.id;
              
              return (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCard,
                    isSelected && [styles.productCardSelected, { borderColor: skinTypeInfo.color }]
                  ]}
                  onPress={() => setSelectedProduct(product)}
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
                        <Text style={styles.checkmarkText}>✓</Text>
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

          {!selectedProduct && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>{t('basicRoutine.select_1_sunscreen')}</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('basicRoutine.citation_sunscreen_products_intro')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3543289/')}
              >
                {t('basicRoutine.citation_sunscreen_products_link1')}
              </Text>
              , {t('basicRoutine.citation_sunscreen_products_studies')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(19)30125-5/fulltext')}
              >
                {t('basicRoutine.citation_sunscreen_products_link2')}
              </Text>
              , {t('basicRoutine.citation_sunscreen_products_data')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun')}
              >
                {t('basicRoutine.citation_sunscreen_products_link3')}
              </Text>
              . {t('basicRoutine.citation_sunscreen_products_disclaimer')}
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleComplete}
          disabled={!selectedProduct}
          style={[styles.continueButton, !selectedProduct && styles.continueButtonDisabled]}
        />
      </View>

      <RoutineCompletionModal
        visible={showCompletionModal}
        onClose={handleModalClose}
        onViewRoutine={handleViewRoutine}
        routineData={completeRoutineData}
        routineType="basic"
        isNightRoutine={false}
        skinType={skinType}
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
    fontSize: 16,
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