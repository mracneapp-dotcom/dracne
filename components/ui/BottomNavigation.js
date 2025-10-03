// components/ui/BottomNavigation.js - Reduced Negative Space
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
};

// Updated SVG icons with reordered tabs
const RoutinesIcon = ({ color = "#666" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2"/>
  </Svg>
);

const CalendarIcon = ({ color = "#666" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke={color} strokeWidth="2"/>
  </Svg>
);

const PlusIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </Svg>
);

const LibraryIcon = ({ color = "#666" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M4 6H20M4 12H20M4 18H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

const ProfileIcon = ({ color = "#666" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke={color} strokeWidth="2"/>
    <Path d="M21 21C21 17.134 16.971 14 12 14C7.029 14 3 17.134 3 21" stroke={color} strokeWidth="2"/>
  </Svg>
);

export const BottomNavigation = ({ activeTab = 'upload', onTabPress }) => {
  const tabs = [
    { id: 'routines', icon: RoutinesIcon, label: 'Routines' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'upload', icon: PlusIcon, label: 'Upload', isMain: true },
    { id: 'library', icon: LibraryIcon, label: 'Library' },
    { id: 'profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {/* Plus button positioned absolutely - MOVED DOWN to reduce negative space */}
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity
          style={styles.mainTab}
          onPress={() => onTabPress('upload')}
        >
          <View style={styles.mainIconContainer}>
            <PlusIcon />
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Navigation bar with REDUCED padding - gray line moves down with plus button */}
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          // Don't render the plus button here since it's positioned absolutely
          if (tab.isMain) return <View key={tab.id} style={styles.spacerTab} />;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
            >
              <View style={[
                styles.iconContainer,
                activeTab === tab.id && styles.activeIconContainer,
              ]}>
                <tab.icon color={activeTab === tab.id ? BRAND_COLORS.primary : '#666'} />
              </View>
              <Text style={[
                styles.label,
                activeTab === tab.id && styles.activeLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    top: -20, // REDUCED from -40 to -20 - plus button moves down, reducing negative space
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 30, // REDUCED from 50 to 30 - gray line moves down with plus button
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5', // This gray line moves down with the plus button
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  spacerTab: {
    flex: 1.3, // Space for plus button
  },
  iconContainer: {
    marginBottom: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  activeIconContainer: {
    backgroundColor: `${BRAND_COLORS.primary}12`,
  },
  label: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    marginTop: 2,
  },
  activeLabel: {
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
});