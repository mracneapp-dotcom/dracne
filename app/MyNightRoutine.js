// app/MyNightRoutine.js - COMPLETE WITH SKIN TYPE BADGE & CORRECT BANNER
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

const ROUTINE_LEVEL_COLORS = {
  basic: '#4A90E2',          // Blue
  moderate: '#F39C12',       // Orange
  comprehensive: '#9B59B6',  // Purple
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
      // Load skin type
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
     // CHECK CUSTOM ROUTINE FIRST
const customNightData = await AsyncStorage.getItem('myNightRoutine');
if (customNightData) {
  const parsed = JSON.parse(customNightData);
  const hasProducts = (parsed.cleansers?.length > 0) || 
                      (parsed.moisturizers?.length > 0);
  const isUserCreated = parsed.completedAt || parsed.savedByUser === true;

  if (hasProducts && isUserCreated) {
    setRoutineData(parsed);
    setRoutineType('custom');
    setIsLoading(false);
    return;
  }
}

// Check for Comprehensive first (most complete)
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

// Then check Moderate
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

// Finally check Basic
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

// No routine found
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
    const levelText = routineType ? routineType.charAt(0).toUpperCase() + routineType.slice(1) : '';
    
    Alert.alert(
      'Clear Night Routine',
      `Are you sure you want to clear your ${levelText} Night Routine? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              if (routineType === 'basic') {
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
    return 2; // basic
  };

  const getRoutineColor = () => {
    return ROUTINE_LEVEL_COLORS[routineType] || ROUTINE_LEVEL_COLORS.basic;
  };

  const getRoutineTitle = () => {
    if (routineType === 'comprehensive') return 'Comprehensive';
    if (routineType === 'moderate') return 'Moderate';
    return 'Basic';
  };

  const renderProductCard = (product, index, total) => (
    <View key={product.id || index} style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productLeft}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        {total > 1 && (
          <View style={styles.optionBadge}>
            <Text style={styles.optionText}>Option {index + 1}</Text>
          </View>
        )}
      </View>
      
      {product.benefits && (
        <View style={styles.benefitsRow}>
          {product.benefits.map((benefit, idx) => (
            <View key={idx} style={styles.benefitTag}>
              <Text style={styles.benefitTagText}>{benefit}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderRoutineStep = (stepNumber, title, icon, products, usageNote) => {
    if (!products || products.length === 0) return null;

    return (
      <View style={styles.stepSection}>
        <View style={styles.stepHeader}>
          <View style={styles.stepIconContainer}>
            <Image source={icon} style={styles.stepIcon} resizeMode="contain" />
          </View>
          <View style={styles.stepTitleContainer}>
            <Text style={styles.stepNumber}>Step {stepNumber}</Text>
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
      <Text style={styles.emptyTitle}>No Night Routine Saved Yet</Text>
      <Text style={styles.emptyText}>
        Create your personalized evening skincare routine to enhance your skin's nighttime repair.
      </Text>
      
      <DrAcneButton
        title="Create My Night Routine"
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

    return (
      <View style={styles.routineInfoBox}>
        <Text style={styles.routineInfoTitle}>Your Evening Routine</Text>
        <Text style={styles.routineInfoText}>
          {totalProducts} product{totalProducts !== 1 ? 's' : ''} selected • {stepCount} essential steps
        </Text>
        {routineData.completedAt && (
          <Text style={styles.routineInfoDate}>
            Completed {new Date(routineData.completedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    );
  };

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
          <Text style={styles.loadingText}>Loading your night routine...</Text>
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

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToNightRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner My Night Routine.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

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
                    {skinTypeInfo.name}
                  </Text>
                </View>

                {routineType && (
                  <View style={[styles.routineLevelBadge, { backgroundColor: `${routineLevelColor}15` }]}>
                    <Text style={[styles.routineLevelText, { color: routineLevelColor }]}>
                      {getRoutineTitle()} Routine
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.pageTitle}>My Night Routine</Text>

              {renderRoutineInfo()}

              {renderRoutineStep(
                1,
                'Evening Cleanser',
                STEP_ICONS.cleanser,
                cleansers
              )}

              {renderRoutineStep(
                2,
                'Night Moisturizer',
                STEP_ICONS.moisturizer,
                moisturizers
              )}

              {(routineType === 'moderate' || routineType === 'comprehensive') && 
                renderRoutineStep(
                  3,
                  'Pore Care Treatment',
                  STEP_ICONS.poreCare,
                  poreCare,
                  'Use 2-4 times per week'
                )}

              {routineType === 'comprehensive' && 
                renderRoutineStep(
                  4,
                  'Advanced Night Treatment',
                  STEP_ICONS.advanced,
                  advancedTreatments,
                  'Use 2-3 times per week, start slowly'
                )}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title="Edit Night Routine"
                  onPress={handleEditRoutine}
                  style={styles.actionButton}
                />

                <DrAcneButton
                  title="Clear Routine"
                  variant="outline"
                  onPress={handleClearRoutine}
                  style={styles.actionButton}
                />
              </View>

              <View style={styles.footerBox}>
                <Text style={styles.footerTitle}>Using Your Night Routine</Text>
                <Text style={styles.footerText}>
                  • Apply products in order: Cleanser → Moisturizer
                  {(routineType === 'moderate' || routineType === 'comprehensive') && ' → Pore Care (2-4x/week)'}
                  {routineType === 'comprehensive' && ' → Advanced Treatment (2-3x/week)'}
                  {'\n'}
                  • Wait 1-2 minutes between steps for absorption{'\n'}
                  • On treatment nights, apply pore care first, then advanced treatments{'\n'}
                  • Always follow with moisturizer to lock in benefits{'\n'}
                  • Nighttime is when skin repairs itself - consistent use is key
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
  bannerImage: {
    width: '100%',
    height: '100%',
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
  bottomSpacing: {
    height: 40,
  },
});