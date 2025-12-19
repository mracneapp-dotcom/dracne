// app/MyDayRoutine.js - FULLY TRANSLATED (COMPLETE)
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

const ROUTINE_LEVEL_COLORS = {
  basic: '#4A90E2',
  moderate: '#F39C12',
  comprehensive: '#9B59B6',
};

const STEP_ICONS = {
  cleanser: require('../assets/images/cream.png'),
  moisturizer: require('../assets/images/jar cream.png'),
  sunscreen: require('../assets/images/sunscreen.png'),
};

export default function MyDayRoutine({ 
  onNavigateHome,
  onNavigateToBasicRoutine,
  onNavigateToDayRoutine,
  onBack 
}) {
  const [routineData, setRoutineData] = useState(null);
  const [skinType, setSkinType] = useState('normal');
  const [routineLevel, setRoutineLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRoutineData();
  }, []);

  const loadRoutineData = async () => {
    try {
      setLoading(true);
      
      const customDayRoutine = await AsyncStorage.getItem('myDayRoutine');
      const basicRoutine = await AsyncStorage.getItem('myBasicRoutine');
      const moderateRoutine = await AsyncStorage.getItem('myModerateRoutine');
      const comprehensiveRoutine = await AsyncStorage.getItem('myComprehensiveRoutine');
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      
      let selectedRoutine = null;
      let selectedLevel = null;
      
      if (customDayRoutine) {
        const customData = JSON.parse(customDayRoutine);
        const hasProducts = (customData.cleansers?.length > 0) || 
                            (customData.moisturizers?.length > 0) ||
                            (customData.sunscreens?.length > 0);
        const isUserCreated = customData.completedAt || customData.savedByUser === true;
        if (hasProducts && isUserCreated) {
          selectedRoutine = customData;
          selectedLevel = 'basic';
        }
      }
      
      if (comprehensiveRoutine) {
        const comprehensiveData = JSON.parse(comprehensiveRoutine);
        const hasProducts = (comprehensiveData.cleansers?.length > 0) ||
                            (comprehensiveData.moisturizers?.length > 0) ||
                            (comprehensiveData.sunscreens?.length > 0);
        const isUserCreated = comprehensiveData.completedAt || comprehensiveData.savedByUser === true;
        if (hasProducts && isUserCreated) {
          selectedRoutine = comprehensiveData;
          selectedLevel = 'comprehensive';
        }
      }
      
      if (moderateRoutine) {
        const moderateData = JSON.parse(moderateRoutine);
        const hasProducts = (moderateData.cleansers?.length > 0) ||
                            (moderateData.moisturizers?.length > 0) ||
                            (moderateData.sunscreens?.length > 0);
        const isUserCreated = moderateData.completedAt || moderateData.savedByUser === true;
        
        if (hasProducts && isUserCreated) {
          if (!selectedRoutine || 
              (moderateData.completedAt && selectedRoutine.completedAt && 
               new Date(moderateData.completedAt) > new Date(selectedRoutine.completedAt))) {
            selectedRoutine = moderateData;
            selectedLevel = 'moderate';
          }
        }
      }
      
      if (basicRoutine) {
        const basicData = JSON.parse(basicRoutine);
        const hasProducts = (basicData.cleansers?.length > 0) ||
                            (basicData.moisturizers?.length > 0) ||
                            (basicData.sunscreens?.length > 0);
        const isUserCreated = basicData.completedAt || basicData.savedByUser === true;
        
        if (hasProducts && isUserCreated) {
          if (!selectedRoutine || 
              (basicData.completedAt && selectedRoutine.completedAt && 
               new Date(basicData.completedAt) > new Date(selectedRoutine.completedAt))) {
            selectedRoutine = basicData;
            selectedLevel = 'basic';
          }
        }
      }
      
      if (selectedRoutine) {
        setRoutineData(selectedRoutine);
        setRoutineLevel(selectedLevel);
      }
      
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading routine:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRoutineData();
    setRefreshing(false);
  }, []);

  const handleClearRoutine = () => {
    const levelText = getRoutineTitle();
    
    Alert.alert(
      t('myDayRoutine.alert_clear_title'),
      t('myDayRoutine.alert_clear_message', { level: levelText }),
      [
        { text: t('myDayRoutine.alert_cancel'), style: 'cancel' },
        {
          text: t('myDayRoutine.alert_clear'),
          style: 'destructive',
          onPress: async () => {
            try {
              if (routineLevel === 'basic') {
                await AsyncStorage.removeItem('myBasicRoutine');
                await AsyncStorage.removeItem('myDayRoutine');
              } else if (routineLevel === 'moderate') {
                await AsyncStorage.removeItem('myModerateRoutine');
              } else if (routineLevel === 'comprehensive') {
                await AsyncStorage.removeItem('myComprehensiveRoutine');
              }
              setRoutineData(null);
              setRoutineLevel(null);
              console.log(`${levelText} routine cleared`);
            } catch (error) {
              console.error('Error clearing routine:', error);
            }
          }
        }
      ]
    );
  };

  // ✅ NEW: Translate routine level name
  const getRoutineTitle = () => {
    if (routineLevel === 'comprehensive') return t('myDayRoutine.comprehensive_routine');
    if (routineLevel === 'moderate') return t('myDayRoutine.moderate_routine');
    return t('myDayRoutine.basic_routine');
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
      <View key={product.id} style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productLeft}>
            <Text style={styles.productName}>{translatedProduct.name}</Text>
            <Text style={styles.productDescription}>{translatedProduct.description}</Text>
          </View>
          {total > 1 && (
            <View style={styles.optionBadge}>
              <Text style={styles.optionText}>{t('myDayRoutine.option')} {index + 1}</Text>
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

  const renderRoutineStep = (stepNumber, title, icon, products) => {
    if (!products || products.length === 0) return null;

    return (
      <View style={styles.stepSection}>
        <View style={styles.stepHeader}>
          <View style={styles.stepIconContainer}>
            <Image source={icon} style={styles.stepIcon} resizeMode="contain" />
          </View>
          <View style={styles.stepTitleContainer}>
            <Text style={styles.stepNumber}>{t('myDayRoutine.step')} {stepNumber}</Text>
            <Text style={styles.stepTitle}>{title}</Text>
          </View>
        </View>

        <View style={styles.productsContainer}>
          {products.map((product, index) => 
            renderProductCard(product, index, products.length)
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyTitle}>{t('myDayRoutine.empty_title')}</Text>
      <Text style={styles.emptyText}>
        {t('myDayRoutine.empty_text')}
      </Text>
      
      <DrAcneButton
        title={t('myDayRoutine.empty_button')}
        onPress={onNavigateToDayRoutine}
        style={styles.emptyButton}
      />
    </View>
  );

  const renderRoutineInfo = () => {
    if (!routineData) return null;

    const totalProducts = 
      (routineData.cleansers?.length || 0) + 
      (routineData.moisturizers?.length || 0) + 
      (routineData.specializedProducts?.length || 0) +
      (routineData.advancedTreatments?.length || 0) +
      (routineData.sunscreens?.length || 0);

    const stepCount = routineLevel === 'comprehensive' ? 5 : (routineLevel === 'moderate' ? 4 : 3);

    const productsText = totalProducts === 1 
      ? t('myDayRoutine.info_products')
      : t('myDayRoutine.info_products_plural');

    return (
      <View style={styles.routineInfoBox}>
        <Text style={styles.routineInfoTitle}>{t('myDayRoutine.info_title')}</Text>
        <Text style={styles.routineInfoText}>
          {totalProducts} {productsText} • {stepCount} {t('myDayRoutine.info_steps')}
        </Text>
        {routineData.completedAt && (
          <Text style={styles.routineInfoDate}>
            {t('myDayRoutine.info_completed')} {new Date(routineData.completedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    );
  };

  const getStepTitle = (key) => {
    return t(`myDayRoutine.${key}`);
  };

  // ✅ NEW: Get translated skin type name
  const getSkinTypeName = () => t(`skinTypes.${skinType}`);

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const routineLevelColor = routineLevel ? ROUTINE_LEVEL_COLORS[routineLevel] : BRAND_COLORS.primary;

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
          <Text style={styles.bannerRoutineText}>{t('routineBanners.day_line2')}</Text>
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('myDayRoutine.loading')}</Text>
            </View>
          ) : !routineData ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.badgesRow}>
                <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
                  <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
                    {getSkinTypeName()}
                  </Text>
                </View>

                {routineLevel && (
                  <View style={[
                    styles.routineLevelBadge, 
                    { backgroundColor: `${routineLevelColor}15`, borderColor: routineLevelColor }
                  ]}>
                    <Text style={[styles.routineLevelText, { color: routineLevelColor }]}>
                      {getRoutineTitle()}
                    </Text>
                  </View>
                )}
              </View>

              {renderRoutineInfo()}

              {renderRoutineStep(
                1,
                getStepTitle('cleanser'),
                STEP_ICONS.cleanser,
                routineData.cleansers
              )}

              {renderRoutineStep(
                2,
                getStepTitle('moisturizer'),
                STEP_ICONS.moisturizer,
                routineData.moisturizers
              )}

              {routineLevel === 'moderate' && renderRoutineStep(
                3,
                getStepTitle('specialized'),
                STEP_ICONS.moisturizer,
                routineData.specializedProducts
              )}

              {routineLevel === 'comprehensive' && (
                <>
                  {renderRoutineStep(
                    3,
                    getStepTitle('specialized'),
                    STEP_ICONS.moisturizer,
                    routineData.specializedProducts
                  )}
                  {renderRoutineStep(
                    4,
                    getStepTitle('advanced'),
                    STEP_ICONS.moisturizer,
                    routineData.advancedTreatments
                  )}
                </>
              )}

              {renderRoutineStep(
                routineLevel === 'comprehensive' ? 5 : (routineLevel === 'moderate' ? 4 : 3),
                getStepTitle('sunscreen'),
                STEP_ICONS.sunscreen,
                routineData.sunscreens
              )}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title={t('myDayRoutine.edit_button')}
                  onPress={onNavigateToBasicRoutine}
                  style={styles.actionButton}
                />

                <DrAcneButton
                  title={t('myDayRoutine.clear_button')}
                  variant="outline"
                  onPress={handleClearRoutine}
                  style={styles.actionButton}
                />
              </View>

              <View style={styles.footerBox}>
                <Text style={styles.footerTitle}>{t('myDayRoutine.footer_title')}</Text>
                <Text style={styles.footerText}>
                  {t('myDayRoutine.footer_text', {
                    specialized: (routineLevel === 'moderate' || routineLevel === 'comprehensive') ? t('myDayRoutine.footer_specialized') : '',
                    advanced: routineLevel === 'comprehensive' ? t('myDayRoutine.footer_advanced') : ''
                  })}
                </Text>
              </View>

              <View style={styles.citationContainer}>
                <Text style={styles.citationText}>
                  {t('myDayRoutine.citation_intro')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-steps')}
                  >
                    {t('myDayRoutine.citation_link1')}
                  </Text>
                  {t('myDayRoutine.citation_part2')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4345901/')}
                  >
                    {t('myDayRoutine.citation_link2')}
                  </Text>
                  {t('myDayRoutine.citation_part3')}{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(18)32767-6/fulltext')}
                  >
                    {t('myDayRoutine.citation_link3')}
                  </Text>
                  {t('myDayRoutine.citation_disclaimer')}
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
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
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