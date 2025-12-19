// app/MyNightRoutine.js - FULLY TRANSLATED (COMPLETE)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

const ROUTINE_LEVEL_COLORS = {
  basic: '#4A90E2',
  moderate: '#F39C12',
  comprehensive: '#9B59B6',
};

const STEP_ICONS = {
  cleanser: require('../assets/images/cream.png'),
  moisturizer: require('../assets/images/jar cream.png'),
  poreCare: require('../assets/images/serum.png'),
  advanced: require('../assets/images/serum.png'),
};

export default function MyNightRoutine({ 
  onNavigateHome, 
  onNavigateToNightRoutine,
  onNavigateToBasicNightRoutine,
  onNavigateToModerateNightRoutine,
  onNavigateToComprehensiveNightRoutine,
  onBack 
}) {
  const [routineData, setRoutineData] = useState(null);
  const [routineType, setRoutineType] = useState(null);
  const [skinType, setSkinType] = useState('normal');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRoutine();
  }, []);

  const loadRoutine = async () => {
    console.log('🌙 Loading Night Routine...');
    setIsLoading(true);
    
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }

      const customNightData = await AsyncStorage.getItem('myNightRoutine');
      if (customNightData) {
        const parsed = JSON.parse(customNightData);
        const hasProducts = (parsed.cleansers?.length > 0) || 
                            (parsed.moisturizers?.length > 0);
        const isUserCreated = parsed.completedAt || parsed.savedByUser === true;

        if (hasProducts && isUserCreated) {
          setRoutineData(parsed);
          setRoutineType('basic');
          setIsLoading(false);
          return;
        }
      }

      const comprehensiveData = await AsyncStorage.getItem('myComprehensiveNightRoutine');
      if (comprehensiveData) {
        const parsed = JSON.parse(comprehensiveData);
        const hasProducts = (parsed.cleansers?.length > 0) || 
                            (parsed.moisturizers?.length > 0);
        const isUserCreated = parsed.completedAt || parsed.savedByUser === true;
        
        if (hasProducts && isUserCreated) {
          setRoutineData(parsed);
          setRoutineType('comprehensive');
          setIsLoading(false);
          return;
        }
      }

      const moderateData = await AsyncStorage.getItem('myModerateNightRoutine');
      if (moderateData) {
        const parsed = JSON.parse(moderateData);
        const hasProducts = (parsed.cleansers?.length > 0) || 
                            (parsed.moisturizers?.length > 0);
        const isUserCreated = parsed.completedAt || parsed.savedByUser === true;
        
        if (hasProducts && isUserCreated) {
          setRoutineData(parsed);
          setRoutineType('moderate');
          setIsLoading(false);
          return;
        }
      }

      const basicData = await AsyncStorage.getItem('myBasicNightRoutine');
      if (basicData) {
        const parsed = JSON.parse(basicData);
        const hasProducts = (parsed.cleansers?.length > 0) || 
                            (parsed.moisturizers?.length > 0);
        const isUserCreated = parsed.completedAt || parsed.savedByUser === true;
        
        if (hasProducts && isUserCreated) {
          setRoutineData(parsed);
          setRoutineType('basic');
          setIsLoading(false);
          return;
        }
      }

      setRoutineData(null);
      setRoutineType(null); 
    } catch (error) {
      console.error('❌ Error loading Night Routine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRoutine();
    setRefreshing(false);
  }, []);

  const handleEditRoutine = () => {
    console.log(`Editing ${routineType} Night Routine`);
    if (routineType === 'basic' && onNavigateToBasicNightRoutine) {
      onNavigateToBasicNightRoutine();
    } else if (routineType === 'moderate' && onNavigateToModerateNightRoutine) {
      onNavigateToModerateNightRoutine();
    } else if (routineType === 'comprehensive' && onNavigateToComprehensiveNightRoutine) {
      onNavigateToComprehensiveNightRoutine();
    }
  };

  const handleClearRoutine = () => {
    const levelText = getRoutineTitle();
    
    Alert.alert(
      t('myNightRoutine.alert_clear_title'),
      t('myNightRoutine.alert_clear_message', { level: levelText }),
      [
        { text: t('myNightRoutine.alert_cancel'), style: 'cancel' },
        {
          text: t('myNightRoutine.alert_clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              if (routineType === 'basic') {
                await AsyncStorage.removeItem('myNightRoutine');
                await AsyncStorage.removeItem('myBasicNightRoutine');
              } else if (routineType === 'moderate') {
                await AsyncStorage.removeItem('myModerateNightRoutine');
              } else if (routineType === 'comprehensive') {
                await AsyncStorage.removeItem('myComprehensiveNightRoutine');
              }
              setRoutineData(null);
              setRoutineType(null);
              console.log(`${levelText} Night routine cleared`);
            } catch (error) {
              console.error('Error clearing night routine:', error);
            }
          }
        }
      ]
    );
  };

  const getStepCount = () => {
    if (routineType === 'comprehensive') return 4;
    if (routineType === 'moderate') return 3;
    return 2;
  };

  const getRoutineColor = () => {
    return ROUTINE_LEVEL_COLORS[routineType] || ROUTINE_LEVEL_COLORS.basic;
  };

  // ✅ UPDATED: Now uses translations
  const getRoutineTitle = () => {
    if (routineType === 'comprehensive') return t('myNightRoutine.comprehensive_routine');
    if (routineType === 'moderate') return t('myNightRoutine.moderate_routine');
    return t('myNightRoutine.basic_routine');
  };

  // ✅ NEW: Helper function to translate product data
  const translateProductData = (product) => {
    if (!product) return product;
    
    // Translate description if it has a descriptionKey
    const description = product.descriptionKey 
      ? t(product.descriptionKey) 
      : product.description;
    
    // Translate benefits if they have benefitKeys
    const benefits = product.benefitKeys 
      ? product.benefitKeys.map(key => t(`productBenefits.${key}`))
      : product.benefits;
    
    return {
      ...product,
      description,
      benefits
    };
  };

  // ✅ UPDATED: Now translates product data
  const renderProductCard = (product, index, total) => {
    const translatedProduct = translateProductData(product);
    
    return (
      <View key={product.id || index} style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productLeft}>
            <Text style={styles.productName}>{translatedProduct.name}</Text>
            <Text style={styles.productDescription}>{translatedProduct.description}</Text>
          </View>
          {total > 1 && (
            <View style={styles.optionBadge}>
              <Text style={styles.optionText}>{t('myNightRoutine.option')} {index + 1}</Text>
            </View>
          )}
        </View>
        
        {translatedProduct.benefits && (
          <View style={styles.benefitsRow}>
            {translatedProduct.benefits.map((benefit, idx) => (
              <View key={idx} style={styles.benefitTag}>
                <Text style={styles.benefitTagText}>{benefit}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderRoutineStep = (stepNumber, title, icon, products, usageNote) => {
    if (!products || products.length === 0) return null;

    return (
      <View style={styles.stepSection}>
        <View style={styles.stepHeader}>
          <View style={styles.stepIconContainer}>
            <Image source={icon} style={styles.stepIcon} resizeMode="contain" />
          </View>
          <View style={styles.stepTitleContainer}>
            <Text style={styles.stepNumber}>{t('myNightRoutine.step')} {stepNumber}</Text>
            <Text style={styles.stepTitle}>{title}</Text>
          </View>
        </View>

        <View style={styles.productsContainer}>
          {products.map((product, index) => 
            renderProductCard(product, index, products.length)
          )}
        </View>

        {usageNote && (
          <View style={styles.usageNoteBox}>
            <Text style={styles.usageNoteText}>{usageNote}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyTitle}>{t('myNightRoutine.empty_title')}</Text>
      <Text style={styles.emptyText}>
        {t('myNightRoutine.empty_text')}
      </Text>
      
      <DrAcneButton
        title={t('myNightRoutine.empty_button')}
        onPress={onNavigateToNightRoutine}
        style={styles.emptyButton}
      />
    </View>
  );

  const renderRoutineInfo = () => {
    if (!routineData) return null;

    const totalProducts = 
      (routineData.cleansers?.length || 0) + 
      (routineData.moisturizers?.length || 0) + 
      (routineData.poreCare?.length || 0) +
      (routineData.poreCareProducts?.length || 0) +
      (routineData.advancedTreatments?.length || 0);

    const stepCount = getStepCount();

    const productsText = totalProducts === 1 
      ? t('myNightRoutine.info_products')
      : t('myNightRoutine.info_products_plural');

    return (
      <View style={styles.routineInfoBox}>
        <Text style={styles.routineInfoTitle}>{t('myNightRoutine.info_title')}</Text>
        <Text style={styles.routineInfoText}>
          {totalProducts} {productsText} • {stepCount} {t('myNightRoutine.info_steps')}
        </Text>
        {routineData.completedAt && (
          <Text style={styles.routineInfoDate}>
            {t('myNightRoutine.info_completed')} {new Date(routineData.completedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    );
  };

  // ✅ Get translated skin type name
  const getSkinTypeName = () => t(`skinTypes.${skinType}`);

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const routineLevelColor = routineType ? ROUTINE_LEVEL_COLORS[routineType] : BRAND_COLORS.primary;

  if (isLoading) {
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
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('myNightRoutine.loading')}</Text>
        </View>
      </View>
    );
  }

  const cleansers = routineData?.cleansers || [];
  const moisturizers = routineData?.moisturizers || [];
  const poreCare = routineData?.poreCare || routineData?.poreCareProducts || [];
  const advancedTreatments = routineData?.advancedTreatments || [];

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

      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require('../assets/images/banner-my-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerMyText}>{t('routineBanners.my')}</Text>
          <Text style={styles.bannerRoutineText}>{t('routineBanners.night_line2')}</Text>
          <Text style={styles.bannerRoutineText}>{t('routineBanners.night_line3')}</Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {!routineData ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.badgesRow}>
                <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
                  <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
                    {getSkinTypeName()}
                  </Text>
                </View>

                {routineType && (
                  <View style={[styles.routineLevelBadge, { backgroundColor: `${routineLevelColor}15` }]}>
                    <Text style={[styles.routineLevelText, { color: routineLevelColor }]}>
                      {getRoutineTitle()}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.pageTitle}>{t('myNightRoutine.page_title')}</Text>

              {renderRoutineInfo()}

              {renderRoutineStep(
                1,
                t('myNightRoutine.evening_cleanser'),
                STEP_ICONS.cleanser,
                cleansers
              )}

              {renderRoutineStep(
                2,
                t('myNightRoutine.night_moisturizer'),
                STEP_ICONS.moisturizer,
                moisturizers
              )}

              {(routineType === 'moderate' || routineType === 'comprehensive') && 
                renderRoutineStep(
                  3,
                  t('myNightRoutine.pore_care'),
                  STEP_ICONS.poreCare,
                  poreCare,
                  t('myNightRoutine.usage_note_pore')
                )}

              {routineType === 'comprehensive' && 
                renderRoutineStep(
                  4,
                  t('myNightRoutine.advanced_night'),
                  STEP_ICONS.advanced,
                  advancedTreatments,
                  t('myNightRoutine.usage_note_advanced')
                )}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title={t('myNightRoutine.edit_button')}
                  onPress={handleEditRoutine}
                  style={styles.actionButton}
                />

                <DrAcneButton
                  title={t('myNightRoutine.clear_button')}
                  variant="outline"
                  onPress={handleClearRoutine}
                  style={styles.actionButton}
                />
              </View>

              <View style={styles.footerBox}>
                <Text style={styles.footerTitle}>{t('myNightRoutine.footer_title')}</Text>
                <Text style={styles.footerText}>
                  {t('myNightRoutine.footer_text', {
                    pore: (routineType === 'moderate' || routineType === 'comprehensive') ? t('myNightRoutine.footer_pore') : '',
                    advanced: routineType === 'comprehensive' ? t('myNightRoutine.footer_advanced') : ''
                  })}
                </Text>
              </View>

              <View style={styles.citationContainer}>
                <Text style={styles.citationText}>
                  {t('myNightRoutine.citation_intro')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-steps')}
                  >
                    {t('myNightRoutine.citation_link1')}
                  </Text>
                  {t('myNightRoutine.citation_part2')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4345901/')}
                  >
                    {t('myNightRoutine.citation_link2')}
                  </Text>
                  {t('myNightRoutine.citation_part3')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751381/')}
                  >
                    {t('myNightRoutine.citation_link3')}
                  </Text>
                  {t('myNightRoutine.citation_disclaimer')}
                </Text>
              </View>
            </>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
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
    justifyContent: 'center',
  },
  bannerImage: {
    borderRadius: 0,
  },
  bannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 10,
  },
  bannerMyText: {
    fontFamily: 'Brittany',
    fontSize: 38,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 40,
  },
  bannerRoutineText: {
    fontFamily: 'BalooBhai2',
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 34,
    marginTop: -5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: BRAND_COLORS.darkGray,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  skinTypeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skinTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  routineLevelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  routineLevelText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyStateContainer: {
    paddingVertical: 60,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyButton: {
    minWidth: 200,
  },
  routineInfoBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },
  routineInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  routineInfoText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    marginBottom: 4,
  },
  routineInfoDate: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginTop: 4,
  },
  stepSection: {
    marginBottom: 30,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  stepIcon: {
    width: 35,
    height: 35,
  },
  stepTitleContainer: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  productsContainer: {
    gap: 12,
  },
  productCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productLeft: {
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
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  optionBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 11,
    fontWeight: '700',
    color: BRAND_COLORS.white,
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
  usageNoteBox: {
    marginTop: 10,
    backgroundColor: `${BRAND_COLORS.primary}10`,
    padding: 8,
    borderRadius: 8,
  },
  usageNoteText: {
    fontSize: 12,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  footerBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  footerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 13,
    color: BRAND_COLORS.black,
    lineHeight: 20,
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
    height: 40,
  },
});