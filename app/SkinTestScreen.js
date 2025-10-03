// SkinTestScreen.js - EXACT design from your image with ONLY green button added
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
            // Navigate to home - for now just log
            console.log('Navigate to home screen');
            // TODO: Add navigation to home screen when available
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>Discover Your Skin Type</Text>
        <Text style={styles.subtitle}>
          Take at least one test so we can recommend the perfect products
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Why skin type matters:</Text>
            {' '}Different skin types need different approaches for better results!
          </Text>
        </View>

        <View style={styles.testsContainer}>
          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('End-of-Day Check')}
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

          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('Blotting Paper Test')}
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

          <TouchableOpacity 
            style={styles.testCard}
            onPress={() => onContinueToTest('Overnight Assessment')}
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

        <View style={styles.skipSection}>
          <Text style={styles.skipTitle}>Already know your skin type?</Text>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={onSkipToKnownSkinType}
          >
            <Text style={styles.skipButtonText}>I Know My Skin Type</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.laterButton}
            onPress={handleDoItLater}
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
    backgroundColor: BRAND_COLORS.white,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 13,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 18,
  },
  infoBold: {
    fontWeight: '600',
    color: BRAND_COLORS.black,
  },
  testsContainer: {
    marginBottom: 15,
    gap: 10,
  },
  testCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  testNumberBadge: {
    backgroundColor: BRAND_COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  testNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    marginBottom: 5,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionBadge: {
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  testDescription: {
    fontSize: 12,
    color: BRAND_COLORS.black,
    fontWeight: 'normal',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  /* ONLY ADDITION: Small green "Start Test →" button for Test 1 */
  startTestButton: {
    alignSelf: 'flex-end',
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  startTestText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  skipSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  skipTitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    marginBottom: 10,
  },
  skipButton: {
    backgroundColor: BRAND_COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    marginBottom: 10,
  },
  skipButtonText: {
    color: BRAND_COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  laterButton: {
    paddingVertical: 3,
  },
  laterButtonText: {
    color: BRAND_COLORS.gray,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});