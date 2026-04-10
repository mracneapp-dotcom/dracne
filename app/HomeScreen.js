// app/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Image, Animated, Modal,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from './i18n';
import { WeeklyCalendar } from '../components/home/WeeklyCalendar';
import { BadgeDisplay } from '../components/home/BadgeDisplay';
import { BottomNavigation } from '../components/ui/BottomNavigation';

const { width } = Dimensions.get('window');

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return t('home.good_morning');
  if (hour < 17) return t('home.good_afternoon');
  return t('home.good_evening');
};

const getSkinStatus = () => {
  const hour = new Date().getHours();
  if (hour < 12) return t('home.skin_status_morning');
  if (hour < 17) return t('home.skin_status_afternoon');
  return t('home.skin_status_evening');
};

const getSkinEmoji = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '\uD83C\uDF3F';
  if (hour < 17) return '\u2728';
  return '\uD83C\uDF19';
};

const getInsights = () => [
  { color: BRAND_COLORS.primary, text: t('home.insight_1') },
  { color: BRAND_COLORS.secondary, text: t('home.insight_2') },
  { color: '#F39C12', text: t('home.insight_3') },
];

export const HomeScreen = ({
  onNavigateToSkinTest,
  onNavigateToDayRoutine,
  onNavigateToNightRoutine,
  onNavigateToScanSkin,
  onNavigateToMyJourney,
  onNavigateToProfile,
  onNavigateToAIRoutineAM,
  onNavigateToAIRoutinePM,
  userStreak,
  weeklyActivity,
  activeTab,
  onTabPress,
  newlyUnlockedBadge,
  onBadgeModalClose,
  style,
  userName = '',
}) => {
  const [streakModalVisible, setStreakModalVisible] = useState(false);
  const [appStreak, setAppStreak] = useState(0);
  const [routineStreak, setRoutineStreak] = useState(0);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const loadStreaks = async () => {
      try {
        const app = await AsyncStorage.getItem('@dracne_user_streak');
        const routine = await AsyncStorage.getItem('@dracne_routine_streak');
        setAppStreak(parseInt(app || '0'));
        setRoutineStreak(parseInt(routine || '0'));
      } catch (e) {}
    };
    loadStreaks();
  }, []);

  const openStreakModal = () => {
    setStreakModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeStreakModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setStreakModalVisible(false));
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* GREETING BANNER */}
        <View style={styles.greetingBanner}>
          <View style={styles.greetingLeft}>
            <Text style={styles.greetingText}>
              {getGreeting()}{userName ? ', ' + userName : ''}
            </Text>
            <Text style={styles.skinStatusText}>
              {getSkinStatus()} {getSkinEmoji()}
            </Text>
          </View>
          <Image
            source={require('../assets/images/dracne-logo.png')}
            style={styles.greetingMascot}
            resizeMode="contain"
          />
        </View>

        {/* STREAK ROW - tappable */}
        <TouchableOpacity
          style={styles.streakRow}
          onPress={openStreakModal}
          activeOpacity={0.8}
        >
          <View style={styles.streakLeft}>
            <Image
              source={require('../assets/images/Streak 1.png')}
              style={styles.streakFlame}
              resizeMode="contain"
            />
            <Text style={styles.streakCount}>
              {userStreak || appStreak} {t('home.day_streak')}
            </Text>
          </View>
          <WeeklyCalendar weeklyActivity={weeklyActivity} />
        </TouchableOpacity>

        {/* GRID — AI / Classic / Tools */}
        <View style={styles.grid}>
          {/* Row 1 — AI Personalized */}
          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardAM]}
            onPress={onNavigateToAIRoutineAM}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-ai-morning-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlay}>
              <Text style={styles.gridCardLabel}>{t('home.grid_ai_label')}</Text>
              <Text style={styles.gridCardTitle}>{t('home.grid_morning')}</Text>
              <Text style={styles.gridCardSub}>{t('home.grid_personalized')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardPM]}
            onPress={onNavigateToAIRoutinePM}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-ai-night-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlay}>
              <Text style={styles.gridCardLabel}>{t('home.grid_ai_label')}</Text>
              <Text style={styles.gridCardTitle}>{t('home.grid_night')}</Text>
              <Text style={styles.gridCardSub}>{t('home.grid_personalized')}</Text>
            </View>
          </TouchableOpacity>

          {/* Row 2 — Classic Routines */}
          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardClassicAM]}
            onPress={onNavigateToDayRoutine}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-day-routine-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlayRight}>
              <Text style={styles.gridCardLabelRight}>{t('home.grid_classic_label')}</Text>
              <Text style={styles.gridCardTitleRight}>{t('home.grid_classic_morning')}</Text>
              <Text style={styles.gridCardSubRight}>{t('home.grid_science_backed')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardClassicPM]}
            onPress={onNavigateToNightRoutine}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-night-routine-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlayRight}>
              <Text style={styles.gridCardLabelRight}>{t('home.grid_classic_label')}</Text>
              <Text style={styles.gridCardTitleRight}>{t('home.grid_classic_night')}</Text>
              <Text style={styles.gridCardSubRight}>{t('home.grid_science_backed')}</Text>
            </View>
          </TouchableOpacity>

          {/* Row 3 — Discovery Tools */}
          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardScan]}
            onPress={onNavigateToScanSkin}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-scan-skin-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlayRight}>
              <Text style={styles.gridCardLabelRight}>{t('home.grid_tools_label')}</Text>
              <Text style={styles.gridCardTitleRight}>{t('home.grid_scan')}</Text>
              <Text style={styles.gridCardSubRight}>{t('home.grid_scan_sub')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardSkinTest]}
            onPress={onNavigateToSkinTest}
            activeOpacity={0.85}
          >
            <Image
              source={require('../assets/images/banner-skin-test-base.png')}
              style={styles.gridCardBanner}
              resizeMode="cover"
            />
            <View style={styles.gridCardOverlay}>
              <Text style={styles.gridCardLabel}>{t('home.grid_tools_label')}</Text>
              <Text style={styles.gridCardTitle}>{t('home.grid_skin_test')}</Text>
              <Text style={styles.gridCardSub}>{t('home.grid_find_type')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI INSIGHTS CARD */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsTitle}>{t('home.ai_insights_title')}</Text>
            <Text style={styles.insightsBadge}>{t('home.ai_insights_badge')}</Text>
          </View>
          {getInsights().map((insight, i) => (
            <View key={i} style={styles.insightRow}>
              <View style={[styles.insightDot, { backgroundColor: insight.color }]} />
              <Text style={styles.insightText}>{insight.text}</Text>
            </View>
          ))}
        </View>

        {/* BADGES */}
        <BadgeDisplay
          newlyUnlockedBadge={newlyUnlockedBadge}
          onBadgeModalClose={onBadgeModalClose}
        />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={onTabPress}
      />

      {/* STREAK MODAL - slides up from bottom */}
      <Modal
        visible={streakModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeStreakModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeStreakModal}
        >
          <Animated.View
            style={[
              styles.streakModal,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.streakModalHandle} />
            <Text style={styles.streakModalTitle}>{t('home.streak_modal_title')}</Text>

            <View style={styles.streakModalRow}>
              <Image
                source={require('../assets/images/Streak 1.png')}
                style={styles.streakModalFlame}
                resizeMode="contain"
              />
              <View style={styles.streakModalInfo}>
                <Text style={styles.streakModalNumber}>{userStreak || appStreak}</Text>
                <Text style={styles.streakModalLabel}>{t('home.streak_app_label')}</Text>
              </View>
            </View>

            <View style={styles.streakDivider} />

            <View style={styles.streakModalRow}>
              <Text style={styles.streakModalIcon}>{'\u2728'}</Text>
              <View style={styles.streakModalInfo}>
                <Text style={styles.streakModalNumber}>{routineStreak}</Text>
                <Text style={styles.streakModalLabel}>{t('home.streak_routine_label')}</Text>
              </View>
            </View>

            <Text style={styles.streakModalMotivation}>
              {t('home.streak_motivation')}
            </Text>

            <TouchableOpacity
              style={styles.streakModalClose}
              onPress={closeStreakModal}
            >
              <Text style={styles.streakModalCloseText}>{t('home.streak_close')}</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 120 },

  greetingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 52,
    marginBottom: 16,
    backgroundColor: BRAND_COLORS.primary + '15',
    borderRadius: 20,
    padding: 16,
  },
  greetingLeft: { flex: 1 },
  greetingText: { fontSize: 14, color: '#666', fontWeight: '500' },
  skinStatusText: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginTop: 4 },
  greetingMascot: { width: 70, height: 70, marginLeft: 12 },

  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  streakLeft: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  streakFlame: { width: 24, height: 24, marginRight: 6 },
  streakCount: { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  gridCard: {
    width: (width - 44) / 2,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  gridCardAM: { backgroundColor: BRAND_COLORS.primary },
  gridCardPM: { backgroundColor: '#1a1a2e' },
  gridCardScan: { backgroundColor: '#4A90E2' },
  gridCardDay: { backgroundColor: '#F39C12' },
  gridCardNight: { backgroundColor: '#1a1a2e' },
  gridCardClassicAM: { backgroundColor: '#F39C12' },
  gridCardClassicPM: { backgroundColor: '#1a1a2e' },
  gridCardSkinTest: { backgroundColor: '#9B59B6' },
  gridCardInner: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  gridCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: 4,
  },
  gridCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  gridCardSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  gridCardLabelRight: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: 4,
    textAlign: 'right',
  },
  gridCardTitleRight: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 22,
    textAlign: 'right',
  },
  gridCardSubRight: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'right',
  },
  gridCardBanner: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  gridCardTitleOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    fontSize: 18,
    fontWeight: '800',
    color: BRAND_COLORS.white,
    textAlign: 'right',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  gridCardAccent: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gridCardOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  gridCardOverlayRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  insightsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  insightsTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  insightsBadge: {
    fontSize: 11,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    backgroundColor: BRAND_COLORS.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    marginRight: 10,
  },
  insightText: { flex: 1, fontSize: 13, color: '#444', lineHeight: 19 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  streakModal: {
    backgroundColor: BRAND_COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  streakModalHandle: {
    width: 40, height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  streakModalTitle: {
    fontSize: 20, fontWeight: '800',
    color: '#1a1a1a', marginBottom: 20,
  },
  streakModalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakModalFlame: { width: 40, height: 40, marginRight: 16 },
  streakModalIcon: { fontSize: 32, marginRight: 16 },
  streakModalInfo: { flex: 1 },
  streakModalNumber: {
    fontSize: 36, fontWeight: '800',
    color: BRAND_COLORS.primary,
  },
  streakModalLabel: { fontSize: 14, color: '#666', marginTop: 2 },
  streakDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  streakModalMotivation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  streakModalClose: {
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  streakModalCloseText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
