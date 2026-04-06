// components/ui/BottomNavigation.js - WITH SPANISH I18N
import React, { useState, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { t } from '../../app/i18n';

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
  const [popupVisible, setPopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const openPopup = () => {
    setPopupVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closePopup = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setPopupVisible(false));
  };

  const handlePlusPress = () => {
    if (popupVisible) {
      closePopup();
    } else {
      openPopup();
    }
  };

  const handleAction = (action) => {
    closePopup();
    if (onTabPress) onTabPress(action);
  };

  const tabs = [
    { id: 'routines', icon: RoutinesIcon, label: 'navigation.routines' },
    { id: 'calendar', icon: CalendarIcon, label: 'navigation.calendar' },
    { id: 'upload', icon: PlusIcon, label: 'navigation.upload', isMain: true },
    { id: 'library', icon: LibraryIcon, label: 'navigation.library' },
    { id: 'profile', icon: ProfileIcon, label: 'navigation.profile' },
  ];

  return (
    <View style={styles.container}>
      {/* Elevated center button */}
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity
          style={styles.mainTab}
          onPress={handlePlusPress}
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
                    {t(tab.label)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {popupVisible && (
        <TouchableOpacity
          style={styles.popupBackdrop}
          activeOpacity={1}
          onPress={closePopup}
        >
          <Animated.View style={[
            styles.popup,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}>
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => handleAction('upload')}
            >
              <View style={[styles.popupIcon, { backgroundColor: '#4A90E215' }]}>
                <Image
                  source={require('../../assets/images/Scan.png')}
                  style={styles.popupIconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.popupTextContainer}>
                <Text style={styles.popupItemTitle}>Scan My Skin</Text>
                <Text style={styles.popupItemSub}>AI acne detection</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.popupDivider} />

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => handleAction('aiRoutineAM')}
            >
              <View style={[styles.popupIcon, { backgroundColor: '#7CB34215' }]}>
                <Image
                  source={require('../../assets/images/Plus.png')}
                  style={styles.popupIconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.popupTextContainer}>
                <Text style={styles.popupItemTitle}>Start Morning Routine</Text>
                <Text style={styles.popupItemSub}>AI personalized</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.popupDivider} />

            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => handleAction('aiRoutinePM')}
            >
              <View style={[styles.popupIcon, { backgroundColor: '#1a1a2e15' }]}>
                <Image
                  source={require('../../assets/images/Bottle1.png')}
                  style={styles.popupIconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.popupTextContainer}>
                <Text style={styles.popupItemTitle}>Start Night Routine</Text>
                <Text style={styles.popupItemSub}>AI personalized</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
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
  popupBackdrop: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    top: -1000,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  popupIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  popupIconImage: {
    width: 26,
    height: 26,
  },
  popupTextContainer: {
    flex: 1,
  },
  popupItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  popupItemSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  popupDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
  },
});