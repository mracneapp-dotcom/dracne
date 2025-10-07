// SkinTestScreen.js - Single Screen Fit (No Scrolling)
import React from 'react';
import {
  Alert,
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
  lightGray: '#E5E5E5',
};

export const SkinTestScreen = ({ 
  onBack, 
  onContinueToTest, 
  onSkipToKnownSkinType,
  onNavigateHome,
  style 
}) => {
  const handleDoItLater = () => {
    Alert.alert(
      'Important Notice',
      'Adding your skin type is highly important for us to provide the right skincare recommendations tailored to your needs. Without this information, we cannot ensure the most effective treatment plan for your skin.',
      [
        {
          text: 'Stay Here',
          style: 'cancel'
        },
        {
          text: 'Continue Anyway',
          onPress: () => {
            if (onNavigateHome) {
              onNavigateHome();
            } else {
              console.log('Navigate to home screen');
            }
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  const handleLogoPress = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      console.log('Navigate to home screen');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Logo - Top Left */}
      <View style={styles.logoHeader}>
        <TouchableOpacity 
          onPress={handleLogoPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Header with Styled Title */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Discover Your Skin <Text style={styles.titleHighlight}>Type</Text>
          </Text>
          <Text style={styles.subtitle}>
            Take at least one test so we can recommend the perfect products
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Why skin type matters:</Text>
            {' '}Different skin types need different approaches for better results!
          </Text>
        </View>

        {/* Tests Container */}
        <View style={styles.testsContainer}>
          {/* Test 1 */}
          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('End-of-Day Check')}
            activeOpacity={0.9}
          >
            <View style={styles.testNumberBadge}>
              <Text style={styles.testNumber}>Test 1</Text>
            </View>
            <Text style={styles.testTitle}>End-of-Day Check</Text>
            <View style={styles.descriptionRow}>
              <View style={styles.descriptionBadge}>
                <Text style={styles.testDescription}>
                  Available immediately • 2 minutes
                </Text>
              </View>
              <View style={styles.startTestButton}>
                <Text style={styles.startTestText}>Start Test →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Test 2 */}
          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('Blotting Paper Test')}
            activeOpacity={0.9}
          >
            <View style={styles.testNumberBadge}>
              <Text style={styles.testNumber}>Test 2</Text>
            </View>
            <Text style={styles.testTitle}>Blotting Paper Test</Text>
            <View style={styles.descriptionRow}>
              <View style={styles.descriptionBadge}>
                <View style={styles.warningRow}>
                  <Image 
                    source={require('../assets/images/warning-icon.png')} 
                    style={styles.warningIcon}
                  />
                  <Text style={styles.testDescription}>
                    Need blotting papers • 5 minutes
                  </Text>
                </View>
              </View>
              <View style={styles.startTestButton}>
                <Text style={styles.startTestText}>Start Test →</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Test 3 */}
          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('Overnight Assessment')}
            activeOpacity={0.9}
          >
            <View style={styles.testNumberBadge}>
              <Text style={styles.testNumber}>Test 3</Text>
            </View>
            <Text style={styles.testTitle}>Overnight Assessment</Text>
            <View style={styles.descriptionRow}>
              <View style={styles.descriptionBadge}>
                <Text style={styles.testDescription}>
                  Best done tonight • Check tomorrow morning
                </Text>
              </View>
              <View style={styles.startTestButton}>
                <Text style={styles.startTestText}>Start Test →</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Skip Section */}
        <View style={styles.skipSection}>
          <Text style={styles.skipTitle}>Already know your skin type?</Text>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={onSkipToKnownSkinType}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>I Know My Skin Type</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.laterButton}
            onPress={handleDoItLater}
            activeOpacity={0.7}
          >
            <Text style={styles.laterButtonText}>I'll do it later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoHeader: {
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 60,
    height: 42,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 100, // Space for bottom navigation
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 30,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  infoBox: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  infoText: {
    fontSize: 12,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 17,
  },
  infoBold: {
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  testsContainer: {
    marginBottom: 12,
    gap: 10,
  },
  testCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  testNumberBadge: {
    backgroundColor: `${BRAND_COLORS.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  testNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
  },
  testTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 8,
    lineHeight: 20,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  descriptionBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flex: 1,
  },
  testDescription: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    lineHeight: 14,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  startTestButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  startTestText: {
    color: BRAND_COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  skipSection: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  skipTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  skipButton: {
    backgroundColor: BRAND_COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    marginBottom: 10,
    minWidth: 180,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  skipButtonText: {
    color: BRAND_COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  laterButton: {
    paddingVertical: 4,
  },
  laterButtonText: {
    color: BRAND_COLORS.gray,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});