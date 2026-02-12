  // app/HomeScreen.js - ONLY CHANGING THE ORDER OF STREAK AND STATS
  import React, { useEffect, useState } from 'react';
  import {
    Image,
    SafeAreaView,
    StyleSheet,
    View
  } from 'react-native';
  import { BadgeDisplay } from '../components/home/BadgeDisplay';
  import { ProgressStatsBar } from '../components/home/ProgressStatsBar';
  import { RoutineBanners } from '../components/home/RoutineBanners';
  import { StreakCounter } from '../components/home/StreakCounter';
  import { WeeklyCalendar } from '../components/home/WeeklyCalendar';
  import { BadgeUnlockedModal } from '../components/modals/BadgeUnlockedModal';

  const BRAND_COLORS = {
    primary: '#7CB342',
    secondary: '#FF7A7A',
    cream: '#FDF5E6',
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#999999',
  };

  export const HomeScreen = ({ 
    onNavigateToSkinTest,
    onNavigateToDayRoutine,
    onNavigateToNightRoutine,
    onNavigateToScanSkin,
    onNavigateToProfile,
    weeklyActivity = null,
    activeTab = 'routines',
    onTabPress,
    newlyUnlockedBadge = null,
    onBadgeModalClose,
    style = {} 
  }) => {
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [currentBadge, setCurrentBadge] = useState(null);

    useEffect(() => {
      if (newlyUnlockedBadge) {
        setCurrentBadge(newlyUnlockedBadge);
        setShowBadgeModal(true);
      }
    }, [newlyUnlockedBadge]);

    const handleTabPress = (tabId) => {
      if (onTabPress) {
        onTabPress(tabId);
      }
    };

    const handleSkinTestPress = () => {
      if (onNavigateToSkinTest) {
        onNavigateToSkinTest();
      }
    };

    const handleDayRoutinePress = () => {
      if (onNavigateToDayRoutine) {
        onNavigateToDayRoutine();
      }
    };

    const handleNightRoutinePress = () => {
      if (onNavigateToNightRoutine) {
        onNavigateToNightRoutine();
      }
    };

    const handleScanSkinPress = () => {
      if (onNavigateToScanSkin) {
        onNavigateToScanSkin();
      }
    };

    const handleViewAllBadges = () => {
      if (onNavigateToProfile) {
        onNavigateToProfile();
      }
    };

    const handleBadgePress = (badge) => {
      console.log('Badge pressed:', badge);
    };

    const handleBadgeModalClose = () => {
      setShowBadgeModal(false);
      setCurrentBadge(null);
      if (onBadgeModalClose) {
        onBadgeModalClose();
      }
    };

    return (
      <SafeAreaView style={[styles.container, style]}>
        <View style={styles.content}>
          {/* ✅ ONLY CHANGE: Swapped order - Stats LEFT, Streak RIGHT */}
          <View style={styles.topStatsRow}>
            <ProgressStatsBar />
            <StreakCounter />
          </View>

          {/* Logo and Calendar Section */}
          <View style={styles.logoCalendarSection}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <WeeklyCalendar weeklyActivity={weeklyActivity} />
          </View>

          {/* All Banners */}
          <View style={styles.bannersContainer}>
            <RoutineBanners 
              onDayRoutinePress={handleDayRoutinePress}
              onNightRoutinePress={handleNightRoutinePress}
              onSkinTestPress={handleSkinTestPress}
              onScanSkinPress={handleScanSkinPress}
            />
          </View>

          {/* Badge Display - Now after banners */}
          <BadgeDisplay
            onViewAllPress={handleViewAllBadges}
            onBadgePress={handleBadgePress}
          />
        </View>

        <BadgeUnlockedModal
          visible={showBadgeModal}
          badge={currentBadge}
          onClose={handleBadgeModalClose}
        />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    content: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
    },
    topStatsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 8,
      gap: 8,
    },
    logoCalendarSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    logo: {
      width: 70,
      height: 50,
    },
    bannersContainer: {
      paddingBottom: 1,
    },
  });