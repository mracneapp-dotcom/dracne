// app/MyNightRoutine.js - UPDATED TO MATCH MY DAY ROUTINE STRUCTURE
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
};

const STEP_ICONS = {
  cleanser: require('../assets/images/cream.png'),
  moisturizer: require('../assets/images/jar cream.png'),
};

export default function MyNightRoutine({
  onNavigateHome,
  onNavigateToNightRoutine,
  onNavigateToBasicNightRoutine,
  onBack,
  style = {}
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
      
      const basicNightRoutine = await AsyncStorage.getItem('myBasicNightRoutine');
      const moderateNightRoutine = await AsyncStorage.getItem('myModerateNightRoutine');
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      
      let selectedRoutine = null;
      let selectedLevel = null;
      
      if (moderateNightRoutine) {
        const moderateData = JSON.parse(moderateNightRoutine);
        selectedRoutine = moderateData;
        selectedLevel = 'moderate';
      }
      
      if (basicNightRoutine) {
        const basicData = JSON.parse(basicNightRoutine);
        if (!selectedRoutine || 
            (basicData.completedAt && selectedRoutine.completedAt && 
             new Date(basicData.completedAt) > new Date(selectedRoutine.completedAt))) {
          selectedRoutine = basicData;
          selectedLevel = 'basic';
        }
      }
      
      if (selectedRoutine) {
        console.log(`Loaded ${selectedLevel} night routine:`, selectedRoutine);
        setRoutineData(selectedRoutine);
        setRoutineLevel(selectedLevel);
      }
      
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading night routine:', error);
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
      `Are you sure you want to clear your ${levelText} Night Routine? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              if (routineLevel === 'basic') {
                await AsyncStorage.removeItem('myBasicNightRoutine');
              } else if (routineLevel === 'moderate') {
                await AsyncStorage.removeItem('myModerateNightRoutine');
              }
              setRoutineData(null);
              setRoutineLevel(null);
              console.log(`${levelText} night routine cleared`);
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
      <Text style={styles.emptyTitle}>No Night Routine Yet</Text>
      <Text style={styles.emptyText}>
        Create your personalized evening skincare routine to start your journey
      </Text>
      <DrAcneButton
        title="Create Night Routine"
        onPress={onNavigateToBasicNightRoutine}
        style={styles.emptyButton}
      />
    </View>
  );

  const renderRoutineInfo = () => {
    if (!routineData) return null;

    const totalProducts = 
      (routineData.cleansers?.length || 0) + 
      (routineData.moisturizers?.length || 0) +
      (routineData.poreCare?.length || 0);

    const stepCount = routineLevel === 'moderate' ? 3 : 2;

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
  const routineLevelColor = routineLevel ? ROUTINE_LEVEL_COLORS[routineLevel] : BRAND_COLORS.primary;

  return (
    <View style={[styles.container, style]}>
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
          <View style={styles.badgesRow}>
            <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
              <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
                {skinTypeInfo.name}
              </Text>
            </View>

            {routineLevel && (
              <View style={[styles.routineLevelBadge, { backgroundColor: `${routineLevelColor}15` }]}>
                <Text style={[styles.routineLevelText, { color: routineLevelColor }]}>
                  {routineLevel.charAt(0).toUpperCase() + routineLevel.slice(1)} Routine
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.pageTitle}>My Night Routine</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your routine...</Text>
            </View>
          ) : !routineData ? (
            renderEmptyState()
          ) : (
            <>
              {renderRoutineInfo()}

              {renderRoutineStep(
                1,
                'Gentle Cleanser',
                STEP_ICONS.cleanser,
                routineData.cleansers
              )}

              {renderRoutineStep(
                2,
                'Night Moisturizer',
                STEP_ICONS.moisturizer,
                routineData.moisturizers
              )}

              {routineLevel === 'moderate' && renderRoutineStep(
                3,
                'Pore Care Treatment',
                STEP_ICONS.moisturizer,
                routineData.poreCare
              )}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title="Edit Routine"
                  onPress={onNavigateToBasicNightRoutine}
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
                <Text style={styles.footerTitle}>Evening Routine Tips</Text>
                <Text style={styles.footerText}>
                  • Remove all makeup and sunscreen thoroughly{'\n'}
                  • Use lukewarm water, never hot{'\n'}
                  • Pat skin dry gently{'\n'}
                  • Apply moisturizer while skin is slightly damp{'\n'}
                  • Allow skin to repair overnight
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