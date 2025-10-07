// components/ui/BottomNavigation.js - Modern Refined Design
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

// Refined SVG icons with softer, rounder style
const RoutinesIcon = ({ color = "#666" }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const CalendarIcon = ({ color = "#666" }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path d="M8 2V6M16 2V6M3.5 10H20.5M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" 
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const PlusIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </Svg>
);

const LibraryIcon = ({ color = "#666" }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path d="M4 7H20M4 12H20M4 17H20" 
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ProfileIcon = ({ color = "#666" }) => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21C20 17.134 16.418 14 12 14C7.582 14 4 17.134 4 21M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const BottomNavigation = ({ activeTab = 'routines', onTabPress }) => {
  const tabs = [
    { id: 'routines', icon: RoutinesIcon, label: 'Routines' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'upload', icon: PlusIcon, label: 'Upload', isMain: true },
    { id: 'library', icon: LibraryIcon, label: 'Library' },
    { id: 'profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {/* Elevated center button */}
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity
          style={styles.mainTab}
          onPress={() => onTabPress('upload')}
          activeOpacity={0.85}
        >
          <View style={styles.mainIconContainer}>
            <View style={styles.mainIconInner}>
              <PlusIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Modern navigation bar */}
      <View style={styles.navBar}>
        <View style={styles.navBarInner}>
          {tabs.map((tab) => {
            if (tab.isMain) return <View key={tab.id} style={styles.spacerTab} />;
            
            const isActive = activeTab === tab.id;
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.tab}
                onPress={() => onTabPress(tab.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.tabContent,
                  isActive && styles.tabContentActive,
                ]}>
                  <View style={[
                    styles.iconCircle,
                    isActive && styles.iconCircleActive,
                  ]}>
                    <tab.icon color={isActive ? BRAND_COLORS.primary : '#8E8E93'} />
                  </View>
                  <Text style={[
                    styles.label,
                    isActive && styles.activeLabel
                  ]}>
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  plusButtonContainer: {
    position: 'absolute',
    top: -28,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  mainTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  mainIconInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  navBar: {
    backgroundColor: '#FFFFFF',
    paddingTop: 26,
    paddingBottom: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  navBarInner: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerTab: {
    flex: 1.2,
  },
  tabContent: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    minWidth: 60,
  },
  tabContentActive: {
    backgroundColor: `${BRAND_COLORS.primary}08`,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconCircleActive: {
    backgroundColor: `${BRAND_COLORS.primary}15`,
  },
  label: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  activeLabel: {
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
});