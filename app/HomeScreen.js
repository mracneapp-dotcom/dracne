// app/HomeScreen.js - Main Home Screen (With Global Background)
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { RoutineBanners } from '../components/home/RoutineBanners';
import { StreakCounter } from '../components/home/StreakCounter';
import { WeeklyCalendar } from '../components/home/WeeklyCalendar';

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
  userStreak = 5,
  weeklyActivity = [],
  activeTab = 'routines',
  onTabPress,
  style = {} 
}) => {
  // Default weekly activity if none provided
  const defaultWeeklyActivity = [
    { day: 'Mon', date: 5, active: true },
    { day: 'Tue', date: 6, active: true },
    { day: 'Wed', date: 7, active: true },
    { day: 'Thu', date: 8, active: true },
    { day: 'Fri', date: 9, active: true },
    { day: 'Sat', date: 10, active: false },
    { day: 'Sun', date: 11, active: false },
  ];

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
    } else {
      console.log('Navigate to Day Routine - placeholder');
    }
  };

  const handleNightRoutinePress = () => {
    if (onNavigateToNightRoutine) {
      onNavigateToNightRoutine();
    } else {
      console.log('Navigate to Night Routine - placeholder');
    }
  };

  const handleScanSkinPress = () => {
    if (onNavigateToScanSkin) {
      onNavigateToScanSkin();
    } else {
      console.log('Navigate to Scan Skin - placeholder');
    }
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Streak Section */}
        <StreakCounter streak={userStreak} />

        {/* Logo and Calendar Section */}
        <View style={styles.logoCalendarSection}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <WeeklyCalendar weeklyActivity={weeklyActivity.length > 0 ? weeklyActivity : defaultWeeklyActivity} />
        </View>

        {/* All Banners (Day, Night, Skin Test, Scan Skin) */}
        <RoutineBanners 
          onDayRoutinePress={handleDayRoutinePress}
          onNightRoutinePress={handleNightRoutinePress}
          onSkinTestPress={handleSkinTestPress}
          onScanSkinPress={handleScanSkinPress}
        />

        {/* Future Content Space */}
        <View style={styles.futureContentSpace} />
      </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: 140,
    paddingHorizontal: 0,
  },
  logoCalendarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  logo: {
    width: 80,
    height: 60,
  },
  futureContentSpace: {
    height: 100,
    marginTop: 20,
  },
});