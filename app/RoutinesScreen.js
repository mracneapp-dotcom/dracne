// app/RoutinesScreen.js - Routines Hub Screen (Updated for Smart Routine Hub)
import React from 'react';
import {
  Image,
  SafeAreaView,
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
};

export default function RoutinesScreen({
  onNavigateHome,
  onNavigateToMyDayRoutine,
  onNavigateToMyNightRoutine,
  onNavigateToSmartRoutineHub, // ✅ UPDATED: More descriptive prop name
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Navigation */}
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title Section - CENTERED VERTICALLY */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Your <Text style={styles.titleHighlight}>Skincare Routines</Text>
          </Text>
          <Text style={styles.subtitle}>
            All your personalized routines in one place
          </Text>
        </View>

        {/* Banners Container */}
        <View style={styles.bannersContainer}>
          {/* My Day Routine Banner */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToMyDayRoutine}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../assets/images/Banner My Day Routine.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* My Night Routine Banner */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToMyNightRoutine}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../assets/images/Banner My Night Routine.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Smart Routine Banner - NOW GOES TO HUB */}
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={onNavigateToSmartRoutineHub}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../assets/images/Banner Smart Routine.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
  },
  bannersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
    justifyContent: 'center',
    gap: 16,
  },
  bannerButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: BRAND_COLORS.lightGray,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
});