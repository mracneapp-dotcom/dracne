// app/MyDayRoutine.js - FIXED COLORS: BLUE/ORANGE/PURPLE
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

const ROUTINE_LEVEL_COLORS = {
  basic: '#4A90E2',          // Blue
  moderate: '#F39C12',       // Orange
  comprehensive: '#9B59B6',  // Purple
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
      
      // CUSTOM ROUTINE FIRST
      const customDayRoutine = await AsyncStorage.getItem('myDayRoutine');
      
      const basicRoutine = await AsyncStorage.getItem('myBasicRoutine');
      const moderateRoutine = await AsyncStorage.getItem('myModerateRoutine');
      const comprehensiveRoutine = await AsyncStorage.getItem('myComprehensiveRoutine');
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      
      let selectedRoutine = null;
      let selectedLevel = null;
      
      // CHECK CUSTOM FIRST
      if (customDayRoutine) {
        const customData = JSON.parse(customDayRoutine);
        const hasProducts = (customData.cleansers?.length > 0) || 
                            (customData.moisturizers?.length > 0) ||
                            (customData.sunscreens?.length > 0);
        const isUserCreated = customData.completedAt || customData.savedByUser === true;
        if (hasProducts && isUserCreated) {
          selectedRoutine = customData;
          selectedLevel = 'custom';
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
    const levelText = routineLevel ? routineLevel.charAt(0).toUpperCase() + routineLevel.slice(1) : '';
    
    Alert.alert(
      'Clear Routine',
      `Are you sure you want to clear your ${levelText} Routine? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              if (routineLevel === 'basic') {
                await AsyncStorage.removeItem('myBasicRoutine');
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

  const renderProductCard = (product, index, total) => (
    <View key={product.id} style={styles.productCard}>
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
      
      <View style={styles.benefitsRow}>
        {product.benefits.map((benefit, idx) => (
          <View key={idx} style={styles.benefitTag}>
            <Text style={styles.benefitTagText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRoutineStep = (stepNumber, title, icon, products) => {
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
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyTitle}>No Routine Saved Yet</Text>
      <Text style={styles.emptyText}>
        Complete the Day Routine setup to create your personalized morning skincare routine.
      </Text>
      
      <DrAcneButton
        title="Create My Routine"
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

    return (
      <View style={styles.routineInfoBox}>
        <Text style={styles.routineInfoTitle}>Your Morning Routine</Text>
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

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToDayRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner My Day Routine.png')}
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your routine...</Text>
            </View>
          ) : !routineData ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.badgesRow}>
                <View style={[styles.skinTypeBadge, { backgroundColor: skinTypeInfo.color }]}>
                  <Text style={[styles.skinTypeText, { color: BRAND_COLORS.white }]}>
                    {skinTypeInfo.name}
                  </Text>
                </View>

                {routineLevel && (
                  <View style={[
                    styles.routineLevelBadge, 
                    { borderColor: routineLevelColor }
                  ]}>
                    <Text style={[styles.routineLevelText, { color: routineLevelColor }]}>
                      {routineLevel.charAt(0).toUpperCase() + routineLevel.slice(1)} Routine
                    </Text>
                  </View>
                )}
              </View>

              {renderRoutineInfo()}

              {renderRoutineStep(
                1,
                'Cleanser',
                STEP_ICONS.cleanser,
                routineData.cleansers
              )}

              {renderRoutineStep(
                2,
                'Moisturizer',
                STEP_ICONS.moisturizer,
                routineData.moisturizers
              )}

              {routineLevel === 'moderate' && renderRoutineStep(
                3,
                'Specialized Treatment',
                STEP_ICONS.moisturizer,
                routineData.specializedProducts
              )}

              {routineLevel === 'comprehensive' && (
                <>
                  {renderRoutineStep(
                    3,
                    'Specialized Treatment',
                    STEP_ICONS.moisturizer,
                    routineData.specializedProducts
                  )}
                  {renderRoutineStep(
                    4,
                    'Advanced Treatment',
                    STEP_ICONS.moisturizer,
                    routineData.advancedTreatments
                  )}
                </>
              )}

              {renderRoutineStep(
                routineLevel === 'comprehensive' ? 5 : (routineLevel === 'moderate' ? 4 : 3),
                'Sunscreen',
                STEP_ICONS.sunscreen,
                routineData.sunscreens
              )}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title="Edit Routine"
                  onPress={onNavigateToBasicRoutine}
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
                <Text style={styles.footerTitle}>Using Your Routine</Text>
                <Text style={styles.footerText}>
                  • Apply products in order: Cleanser → Moisturizer
                  {routineLevel === 'moderate' && ' → Specialized Treatment'}
                  {routineLevel === 'comprehensive' && ' → Specialized Treatment → Advanced Treatment'}
                  {' → Sunscreen\n'}
                  • Wait 1-2 minutes between steps for absorption{'\n'}
                  • Use sunscreen as the final step - never mix with other products{'\n'}
                  • Results typically appear after 8-12 weeks of consistent use
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
  bottomSpacing: {
    height: 40,
  },
});