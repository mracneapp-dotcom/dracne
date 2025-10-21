// app/SmartRoutineHubScreen.js - HUB SCREEN WITH 2 OPTIONS
import React from 'react';
import {
    Image,
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
  smartBlue: '#82b2df',
};

export default function SmartRoutineHubScreen({ 
  onNavigateHome,
  onNavigateToCreate,
  onNavigateToMySmartRoutine
}) {
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
        <Image 
          source={require('../assets/images/Banner Smart Routine.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentFixed}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            Your <Text style={styles.smartHighlight}>Smart Routine</Text>
          </Text>
          <Text style={styles.questionSubtitle}>
            Target specific concerns with specialized treatments
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Image 
            source={require('../assets/images/check.png')}
            style={styles.infoIcon}
            resizeMode="contain"
          />
          <Text style={styles.infoText}>
            Smart Routines complement your Day & Night routines. Focus on one concern at a time for best results.
          </Text>
        </View>

        <View style={styles.bannerButtonsContainer}>
          <TouchableOpacity
            onPress={onNavigateToCreate}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <Image 
              source={require('../assets/images/Banner Create Routine.png')}
              style={styles.bannerButtonImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onNavigateToMySmartRoutine}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <Image 
              source={require('../assets/images/Banner My Routine.png')}
              style={styles.bannerButtonImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  contentFixed: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  smartHighlight: {
    color: BRAND_COLORS.smartBlue,
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BBDEFB',
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: BRAND_COLORS.smartBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
  },
  bannerButtonsContainer: {
    marginTop: 5,
    gap: 15,
    marginBottom: 20,
  },
  bannerButton: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerButtonImage: {
    width: '100%',
    height: '100%',
  },
});