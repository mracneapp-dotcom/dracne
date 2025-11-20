// app/MySmartRoutine.js - DISPLAY SAVED SMART ROUTINES (UPDATED WITH CITATIONS)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
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
  smartBlue: '#82b2df',
};

const CONCERN_COLORS = {
  nodules: '#FF7A7A',
  blackheads: '#4A90E2',
  whiteheads: '#7CB342',
  papules: '#F39C12',
  marks: '#9B59B6',
};

const CONCERN_ICONS = {
  nodules: require('../assets/images/Nodule.png'),
  blackheads: require('../assets/images/Blackhead.png'),
  whiteheads: require('../assets/images/Whitehead.png'),
  papules: require('../assets/images/Papule.png'),
  marks: require('../assets/images/Mark.png'),
};

export default function MySmartRoutine({ 
  onNavigateHome,
  onNavigateToSmartRoutineHub,
  onNavigateToCreate
}) {
  const [smartRoutines, setSmartRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSmartRoutines();
  }, []);

  const loadSmartRoutines = async () => {
    try {
      setLoading(true);
      
      // Load ONLY the most recent smart routine (like MyDayRoutine does)
      const concernIds = ['nodules', 'blackheads', 'whiteheads', 'papules', 'marks'];
      let mostRecentRoutine = null;
      let mostRecentDate = null;
      
      for (const concernId of concernIds) {
        const storageKey = `mySmartRoutine_${concernId}`;
        const routineData = await AsyncStorage.getItem(storageKey);
        
        if (routineData) {
          try {
            const parsed = JSON.parse(routineData);
            
            const hasProducts = (parsed?.dayProducts?.length > 0 || parsed?.nightProducts?.length > 0);
            const isUserCreated = parsed?.completedAt || parsed?.createdAt || parsed?.savedByUser === true;

            if (hasProducts && isUserCreated) {
              const routineDate = new Date(parsed.createdAt || parsed.completedAt || 0);
              
              // Keep only the most recent smart routine
              if (!mostRecentRoutine || routineDate > mostRecentDate) {
                mostRecentRoutine = { ...parsed, storageKey };
                mostRecentDate = routineDate;
              }
            }
          } catch (e) {
            console.error(`Error parsing smart routine ${concernId}:`, e);
          }
        }
      }
      
      // Set only the most recent routine (or empty array if none)
      setSmartRoutines(mostRecentRoutine ? [mostRecentRoutine] : []);
      
    } catch (error) {
      console.error('Error loading smart routines:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSmartRoutines();
    setRefreshing(false);
  }, []);

  const handleClearRoutine = (routine) => {
    Alert.alert(
      'Clear Smart Routine',
      `Are you sure you want to clear your ${routine.concernName} routine? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(routine.storageKey);
              await loadSmartRoutines();
            } catch (error) {
              console.error('Error clearing routine:', error);
            }
          }
        }
      ]
    );
  };

  const renderProductCard = (product, timeLabel) => (
    <View key={product.id} style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productLeft}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        <View style={[
          styles.timeBadge, 
          { backgroundColor: timeLabel === 'Morning' ? '#FFF3E0' : '#E8EAF6' }
        ]}>
          <Text style={[
            styles.timeBadgeText,
            { color: timeLabel === 'Morning' ? '#F57C00' : '#3F51B5' }
          ]}>
            {timeLabel}
          </Text>
        </View>
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

  const renderSmartRoutine = (routine) => {
    const concernColor = CONCERN_COLORS[routine.concernId] || BRAND_COLORS.smartBlue;
    const concernIcon = CONCERN_ICONS[routine.concernId];
    const dayProducts = routine.dayProducts || [];
    const nightProducts = routine.nightProducts || [];
    const totalProducts = dayProducts.length + nightProducts.length;

    return (
      <View key={routine.storageKey} style={[styles.routineCard, { borderLeftColor: concernColor }]}>
        <View style={styles.routineHeader}>
          <View style={styles.routineHeaderLeft}>
            <View style={[styles.concernIconContainer, { backgroundColor: `${concernColor}15` }]}>
              <Image 
                source={concernIcon}
                style={[styles.concernIcon, { tintColor: concernColor }]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.routineTitleContainer}>
              <Text style={styles.routineTitle}>{routine.concernName}</Text>
              <Text style={styles.routineSubtitle}>
                {totalProducts} product{totalProducts !== 1 ? 's' : ''} selected
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleClearRoutine(routine)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {(routine.createdAt || routine.completedAt) && (
          <Text style={styles.completedDate}>
          Created {new Date(routine.createdAt || routine.completedAt).toLocaleDateString()}
          </Text>
        )}

        {/* DAY PRODUCTS */}
        {dayProducts.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Image 
                source={require('../assets/images/sunscreen.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>Day Routine</Text>
            </View>
            <View style={styles.productsContainer}>
              {dayProducts.map(product => renderProductCard(product, 'Morning'))}
            </View>
          </View>
        )}

        {/* NIGHT PRODUCTS */}
        {nightProducts.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Image 
                source={require('../assets/images/jar cream.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>Night Routine</Text>
            </View>
            <View style={styles.productsContainer}>
              {nightProducts.map(product => renderProductCard(product, 'Evening'))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconContainer}>
        <Image 
          source={require('../assets/images/check.png')}
          style={styles.emptyIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.emptyTitle}>No Smart Routines Yet</Text>
      <Text style={styles.emptyText}>
        Create a targeted routine to address your specific skin concerns. Smart routines work alongside your Day & Night routines.
      </Text>
      
      <DrAcneButton
        title="Create Smart Routine"
        onPress={onNavigateToCreate}
        style={styles.emptyButton}
      />
    </View>
  );

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
        onPress={onNavigateToSmartRoutineHub}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner My Smart Routine.png')}
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
          <Text style={styles.pageTitle}>
            My <Text style={styles.pageTitleHighlight}>Smart Routines</Text>
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your routines...</Text>
            </View>
          ) : smartRoutines.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Apply these treatments after cleansing, before moisturizing. Use 2-3 times per week for best results.
                </Text>
              </View>

              {smartRoutines.map(routine => renderSmartRoutine(routine))}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title="Create Another Smart Routine"
                  onPress={onNavigateToCreate}
                  style={styles.actionButton}
                />
              </View>

              <View style={styles.citationContainer}>
                <Text style={styles.citationText}>
                  Smart routine application protocols based on{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.aad.org/public/diseases/acne/skin-care/tips')}
                  >
                    American Academy of Dermatology guidelines for targeted acne treatment integration
                  </Text>
                  , research on{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5574737/')}
                  >
                    safe frequency and gradual active introduction for concern-specific treatments
                  </Text>
                  , and{' '}
                  <Text 
                    style={styles.citationLink}
                    onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(15)02614-6/fulltext')}
                  >
                    dermatological protocols for combining targeted treatments with daily routines
                  </Text>
                  . Smart routines complement your Day & Night care - adjust frequency based on skin tolerance and consult a dermatologist for personalized treatment plans.
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
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  pageTitleHighlight: {
    color: BRAND_COLORS.smartBlue,
    fontWeight: '800',
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
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.smartBlue,
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
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.smartBlue,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  routineCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  concernIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  concernIcon: {
    width: 28,
    height: 28,
  },
  routineTitleContainer: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  routineSubtitle: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.secondary,
  },
  completedDate: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
    marginBottom: 12,
  },
  productsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: BRAND_COLORS.smartBlue,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  productsContainer: {
    gap: 8,
  },
  productCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productLeft: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  productDescription: {
    fontSize: 11,
    color: BRAND_COLORS.darkGray,
    lineHeight: 15,
  },
  timeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  timeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  benefitTag: {
    backgroundColor: BRAND_COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
  },
  benefitTagText: {
    fontSize: 9,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    width: '100%',
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