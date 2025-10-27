// app/HomeScreen.js - FULL UPDATED CODE (REMOVE DEMO STREAK)
import React from 'react';
import {
  Image,
  SafeAreaView,
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
  weeklyActivity = null,
  activeTab = 'routines',
  onTabPress,
  style = {} 
}) => {
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
      <View style={styles.content}>
        {/* Streak Section - Now auto-updates */}
        <StreakCounter />

        {/* Logo and Calendar Section */}
        <View style={styles.logoCalendarSection}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <WeeklyCalendar weeklyActivity={weeklyActivity} />
        </View>

        {/* All Banners (Day, Night, Skin Test, Scan Skin) */}
        <View style={styles.bannersContainer}>
          <RoutineBanners 
            onDayRoutinePress={handleDayRoutinePress}
            onNightRoutinePress={handleNightRoutinePress}
            onSkinTestPress={handleSkinTestPress}
            onScanSkinPress={handleScanSkinPress}
          />
        </View>
      </View>
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
  logoCalendarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 60,
  },
  bannersContainer: {
    flex: 1,
    paddingBottom: 120,
    justifyContent: 'center',
  },
});