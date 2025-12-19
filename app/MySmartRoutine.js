// app/MySmartRoutine.js - WITH SPANISH I18N
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
      t('mySmartRoutine.alert_clear_title'),
      t('mySmartRoutine.alert_clear_message', { concern: routine.concernName }),
      [
        { text: t('mySmartRoutine.alert_cancel'), style: 'cancel' },
        {
          text: t('mySmartRoutine.alert_clear'),
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
          { backgroundColor: timeLabel === t('mySmartRoutine.morning') ? '#FFF3E0' : '#E8EAF6' }
        ]}>
          <Text style={[
            styles.timeBadgeText,
            { color: timeLabel === t('mySmartRoutine.morning') ? '#F57C00' : '#3F51B5' }
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
                {totalProducts === 1 
                  ? t('mySmartRoutine.products_count', { count: totalProducts })
                  : t('mySmartRoutine.products_count_plural', { count: totalProducts })
                }
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
            {t('mySmartRoutine.created', { 
              date: new Date(routine.createdAt || routine.completedAt).toLocaleDateString()
            })}
          </Text>
        )}

        {dayProducts.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Image 
                source={require('../assets/images/sunscreen.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>{t('mySmartRoutine.day_routine')}</Text>
            </View>
            <View style={styles.productsContainer}>
              {dayProducts.map(product => renderProductCard(product, t('mySmartRoutine.morning')))}
            </View>
          </View>
        )}

        {nightProducts.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Image 
                source={require('../assets/images/jar cream.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>{t('mySmartRoutine.night_routine')}</Text>
            </View>
            <View style={styles.productsContainer}>
              {nightProducts.map(product => renderProductCard(product, t('mySmartRoutine.evening')))}
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
      <Text style={styles.emptyTitle}>{t('mySmartRoutine.empty_title')}</Text>
      <Text style={styles.emptyText}>
        {t('mySmartRoutine.empty_text')}
      </Text>
      
      <DrAcneButton
        title={t('mySmartRoutine.empty_button')}
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

      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require('../assets/images/banner-my-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerMyText}>{t('routineBanners.my')}</Text>
            <Text style={styles.bannerRoutineText}>{t('routineBanners.routine')}</Text>
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
          <Text style={styles.pageTitle}>
            {t('mySmartRoutine.title')} <Text style={styles.pageTitleHighlight}>{t('mySmartRoutine.title_highlight')}</Text>
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('mySmartRoutine.loading')}</Text>
            </View>
          ) : smartRoutines.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  {t('mySmartRoutine.info')}
                </Text>
              </View>

              {smartRoutines.map(routine => renderSmartRoutine(routine))}

              <View style={styles.actionsContainer}>
                <DrAcneButton
                  title={t('mySmartRoutine.button_create')}
                  onPress={onNavigateToCreate}
                  style={styles.actionButton}
                />
              </View>

              <View style={styles.citationContainer}>
                <Text style={styles.citationText}>
                  {t('mySmartRoutine.citation')}
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