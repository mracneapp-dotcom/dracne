// app/Calendar.js - WEEKLY ROUTINE CALENDAR
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Calendar({ onNavigateHome }) {
  const [dayRoutine, setDayRoutine] = useState(null);
  const [nightRoutine, setNightRoutine] = useState(null);
  const [smartRoutines, setSmartRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    loadAllRoutines();
    setCurrentDay(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  }, []);

  const loadAllRoutines = async () => {
    try {
      setLoading(true);
      
      // Load Day Routine
      const dayData = await AsyncStorage.getItem('myDayRoutine');
      if (dayData) setDayRoutine(JSON.parse(dayData));
      
      // Load Night Routine
      const nightData = await AsyncStorage.getItem('myNightRoutine');
      if (nightData) setNightRoutine(JSON.parse(nightData));
      
      // Load Smart Routines
      const smartRoutinesList = [];
      const concernIds = ['nodules', 'blackheads', 'whiteheads', 'papules', 'marks'];
      
      for (const concernId of concernIds) {
        const smartData = await AsyncStorage.getItem(`mySmartRoutine_${concernId}`);
        if (smartData) {
          smartRoutinesList.push(JSON.parse(smartData));
        }
      }
      
      setSmartRoutines(smartRoutinesList);
      console.log('✅ Calendar loaded all routines');
    } catch (error) {
      console.error('Error loading routines:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAllRoutines();
    setRefreshing(false);
  }, []);

  const getWeekSchedule = () => {
    // Build weekly schedule based on frequency
    const schedule = DAYS.map(() => ({
      morning: [],
      evening: [],
      isRestDay: false
    }));

    // Add Day Routine products (typically daily)
    if (dayRoutine?.dayProducts?.length > 0) {
      DAYS.forEach((_, index) => {
        schedule[index].morning.push(...dayRoutine.dayProducts);
      });
    }

    // Add Night Routine products (typically daily)
    if (nightRoutine?.nightProducts?.length > 0) {
      DAYS.forEach((_, index) => {
        schedule[index].evening.push(...nightRoutine.nightProducts);
      });
    }

    // Add Smart Routines (2-3x per week, strategically spaced)
    smartRoutines.forEach(routine => {
      // Distribute smart routines throughout the week
      const daysToApply = [0, 2, 4]; // Mon, Wed, Fri
      
      daysToApply.forEach(dayIndex => {
        if (routine.dayProducts?.length > 0) {
          schedule[dayIndex].morning.push(...routine.dayProducts.map(p => ({
            ...p,
            isSmart: true,
            concernName: routine.concernName
          })));
        }
        if (routine.nightProducts?.length > 0) {
          schedule[dayIndex].evening.push(...routine.nightProducts.map(p => ({
            ...p,
            isSmart: true,
            concernName: routine.concernName
          })));
        }
      });
    });

    // Mark rest days (days with no smart routine products)
    schedule.forEach((day, index) => {
      const hasSmartProducts = [...day.morning, ...day.evening].some(p => p.isSmart);
      if (!hasSmartProducts && smartRoutines.length > 0) {
        day.isRestDay = true;
      }
    });

    return schedule;
  };

  const showDayInfo = (dayIndex) => {
    const weekSchedule = getWeekSchedule();
    const dayData = weekSchedule[dayIndex];
    const isToday = dayIndex === currentDay;

    setModalContent({
      day: DAYS_FULL[dayIndex],
      isToday,
      isRestDay: dayData.isRestDay,
      morning: dayData.morning,
      evening: dayData.evening
    });
    setShowInfoModal(true);
  };

  const showRestDayInfo = () => {
    Alert.alert(
      '🌿 Rest Days',
      'Rest days are when you skip Smart Routine treatments to let your skin recover. You still follow your regular Day & Night routines.\n\nGiving your skin rest prevents irritation and helps treatments work better!',
      [{ text: 'Got it!' }]
    );
  };

  const renderProductMini = (product, index) => (
    <View key={`${product.id}-${index}`} style={styles.miniProduct}>
      <View style={[
        styles.productDot,
        { backgroundColor: product.isSmart ? BRAND_COLORS.smartBlue : BRAND_COLORS.primary }
      ]} />
      <Text style={styles.miniProductName} numberOfLines={1}>
        {product.name}
      </Text>
    </View>
  );

  const renderDayCard = (dayLabel, dayIndex) => {
    const weekSchedule = getWeekSchedule();
    const dayData = weekSchedule[dayIndex];
    const isToday = dayIndex === currentDay;
    const isRestDay = dayData.isRestDay;

    return (
      <TouchableOpacity
        key={dayLabel}
        style={[
          styles.dayCard,
          isToday && styles.dayCardToday,
          isRestDay && styles.dayCardRest
        ]}
        onPress={() => showDayInfo(dayIndex)}
        activeOpacity={0.7}
      >
        <View style={styles.dayHeader}>
          <Text style={[
            styles.dayLabel,
            isToday && styles.dayLabelToday
          ]}>
            {dayLabel}
          </Text>
          {isToday && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>TODAY</Text>
            </View>
          )}
        </View>

        {isRestDay ? (
          <View style={styles.restDayContent}>
            <Text style={styles.restDayIcon}>🌿</Text>
            <Text style={styles.restDayText}>Rest Day</Text>
            <Text style={styles.restDaySubtext}>Skip actives</Text>
          </View>
        ) : (
          <>
            {/* Morning Section */}
            {dayData.morning.length > 0 && (
              <View style={styles.timeSection}>
                <View style={styles.timeSectionHeader}>
                  <Image 
                    source={require('../assets/images/sunscreen.png')}
                    style={styles.timeSectionIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.timeSectionLabel}>AM</Text>
                </View>
                <View style={styles.productsList}>
                  {dayData.morning.slice(0, 3).map((product, idx) => 
                    renderProductMini(product, idx)
                  )}
                  {dayData.morning.length > 3 && (
                    <Text style={styles.moreProducts}>
                      +{dayData.morning.length - 3} more
                    </Text>
                  )}
                </View>
              </View>
            )}

            {/* Evening Section */}
            {dayData.evening.length > 0 && (
              <View style={styles.timeSection}>
                <View style={styles.timeSectionHeader}>
                  <Image 
                    source={require('../assets/images/jar cream.png')}
                    style={styles.timeSectionIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.timeSectionLabel}>PM</Text>
                </View>
                <View style={styles.productsList}>
                  {dayData.evening.slice(0, 3).map((product, idx) => 
                    renderProductMini(product, idx)
                  )}
                  {dayData.evening.length > 3 && (
                    <Text style={styles.moreProducts}>
                      +{dayData.evening.length - 3} more
                    </Text>
                  )}
                </View>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconContainer}>
        <Image 
          source={require('../assets/images/calendar.png')}
          style={styles.emptyIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.emptyTitle}>No Routines Yet</Text>
      <Text style={styles.emptyText}>
        Build your Day, Night, and Smart Routines first to see your personalized weekly calendar.
      </Text>
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
        activeOpacity={1}
      >
        <Image 
          source={require('../assets/images/Banner Calendar.png')}
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
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>
              Your <Text style={styles.pageTitleHighlight}>Weekly Calendar</Text>
            </Text>
            <TouchableOpacity 
              onPress={showRestDayInfo}
              style={styles.infoButton}
            >
              <Text style={styles.infoButtonText}>ℹ️</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading your calendar...</Text>
            </View>
          ) : !dayRoutine && !nightRoutine && smartRoutines.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: BRAND_COLORS.primary }]} />
                  <Text style={styles.legendText}>Day/Night Routine</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: BRAND_COLORS.smartBlue }]} />
                  <Text style={styles.legendText}>Smart Routine</Text>
                </View>
              </View>

              <View style={styles.weekGrid}>
                {DAYS.map((day, index) => renderDayCard(day, index))}
              </View>

              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
                <Text style={styles.tipText}>• Tap any day to see full details</Text>
                <Text style={styles.tipText}>• Green dots = regular routine</Text>
                <Text style={styles.tipText}>• Blue dots = smart treatments (2-3x/week)</Text>
                <Text style={styles.tipText}>• Rest days help prevent irritation</Text>
              </View>
            </>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Day Detail Modal */}
      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalContent?.day}</Text>
              {modalContent?.isToday && (
                <View style={styles.modalTodayBadge}>
                  <Text style={styles.modalTodayText}>TODAY</Text>
                </View>
              )}
              <TouchableOpacity 
                onPress={() => setShowInfoModal(false)}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {modalContent?.isRestDay ? (
                <View style={styles.modalRestDay}>
                  <Text style={styles.modalRestIcon}>🌿</Text>
                  <Text style={styles.modalRestTitle}>Rest Day</Text>
                  <Text style={styles.modalRestText}>
                    Skip your Smart Routine treatments today. Continue with your regular Day & Night routines only.
                  </Text>
                </View>
              ) : (
                <>
                  {/* Morning Products */}
                  {modalContent?.morning?.length > 0 && (
                    <View style={styles.modalSection}>
                      <View style={styles.modalSectionHeader}>
                        <Image 
                          source={require('../assets/images/sunscreen.png')}
                          style={styles.modalSectionIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.modalSectionTitle}>Morning Routine</Text>
                      </View>
                      {modalContent.morning.map((product, idx) => (
                        <View key={`morning-${idx}`} style={styles.modalProduct}>
                          <View style={styles.modalProductHeader}>
                            <Text style={styles.modalProductName}>{product.name}</Text>
                            {product.isSmart && (
                              <View style={styles.modalSmartBadge}>
                                <Text style={styles.modalSmartText}>SMART</Text>
                              </View>
                            )}
                          </View>
                          {product.description && (
                            <Text style={styles.modalProductDesc}>{product.description}</Text>
                          )}
                          {product.benefits && (
                            <View style={styles.modalBenefits}>
                              {product.benefits.map((benefit, bIdx) => (
                                <View key={bIdx} style={styles.modalBenefitTag}>
                                  <Text style={styles.modalBenefitText}>{benefit}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Evening Products */}
                  {modalContent?.evening?.length > 0 && (
                    <View style={styles.modalSection}>
                      <View style={styles.modalSectionHeader}>
                        <Image 
                          source={require('../assets/images/jar cream.png')}
                          style={styles.modalSectionIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.modalSectionTitle}>Evening Routine</Text>
                      </View>
                      {modalContent.evening.map((product, idx) => (
                        <View key={`evening-${idx}`} style={styles.modalProduct}>
                          <View style={styles.modalProductHeader}>
                            <Text style={styles.modalProductName}>{product.name}</Text>
                            {product.isSmart && (
                              <View style={styles.modalSmartBadge}>
                                <Text style={styles.modalSmartText}>SMART</Text>
                              </View>
                            )}
                          </View>
                          {product.description && (
                            <Text style={styles.modalProductDesc}>{product.description}</Text>
                          )}
                          {product.benefits && (
                            <View style={styles.modalBenefits}>
                              {product.benefits.map((benefit, bIdx) => (
                                <View key={bIdx} style={styles.modalBenefitTag}>
                                  <Text style={styles.modalBenefitText}>{benefit}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
  },
  pageTitleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  infoButton: {
    marginLeft: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BRAND_COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 16,
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
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.primary,
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
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  weekGrid: {
    gap: 12,
  },
  dayCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCardToday: {
    borderColor: BRAND_COLORS.primary,
    borderWidth: 3,
    shadowOpacity: 0.12,
    elevation: 4,
  },
  dayCardRest: {
    backgroundColor: '#F5F5F5',
    borderStyle: 'dashed',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: BRAND_COLORS.black,
    letterSpacing: 0.5,
  },
  dayLabelToday: {
    color: BRAND_COLORS.primary,
  },
  todayBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  todayBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: BRAND_COLORS.white,
    letterSpacing: 0.5,
  },
  restDayContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  restDayIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  restDayText: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.darkGray,
    marginBottom: 2,
  },
  restDaySubtext: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
  },
  timeSection: {
    marginBottom: 12,
  },
  timeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeSectionIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: BRAND_COLORS.primary,
  },
  timeSectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLORS.darkGray,
  },
  productsList: {
    gap: 4,
  },
  miniProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  miniProductName: {
    fontSize: 11,
    color: BRAND_COLORS.darkGray,
    flex: 1,
  },
  moreProducts: {
    fontSize: 10,
    color: BRAND_COLORS.gray,
    fontStyle: 'italic',
    marginTop: 2,
    marginLeft: 12,
  },
  tipsContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
    marginBottom: 4,
  },
  bottomSpacing: {
    height: 40,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: BRAND_COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: BRAND_COLORS.lightGray,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: BRAND_COLORS.black,
    flex: 1,
  },
  modalTodayBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 10,
  },
  modalTodayText: {
    fontSize: 10,
    fontWeight: '800',
    color: BRAND_COLORS.white,
  },
  modalClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
  },
  modalScroll: {
    maxHeight: '100%',
  },
  modalRestDay: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  modalRestIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalRestTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND_COLORS.darkGray,
    marginBottom: 12,
  },
  modalRestText: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: BRAND_COLORS.lightGray,
  },
  modalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSectionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: BRAND_COLORS.primary,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  modalProduct: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  modalProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  modalProductName: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    flex: 1,
  },
  modalSmartBadge: {
    backgroundColor: BRAND_COLORS.smartBlue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 8,
  },
  modalSmartText: {
    fontSize: 9,
    fontWeight: '800',
    color: BRAND_COLORS.white,
  },
  modalProductDesc: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
    marginBottom: 8,
  },
  modalBenefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  modalBenefitTag: {
    backgroundColor: BRAND_COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
  },
  modalBenefitText: {
    fontSize: 10,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
});