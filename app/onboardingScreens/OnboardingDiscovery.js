// app/onboardingScreens/OnboardingDiscovery.js
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

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

export default function OnboardingDiscovery({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onNext('onboardingExperience', { discovery: selectedOption });
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>How did you find us?</Text>
          <Text style={styles.questionSubtitle}>
            We're always curious about our skincare community
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'tiktok' && styles.selectedOption]}
            onPress={() => handleOptionSelect('tiktok')}
          >
            <Text style={[styles.optionText, selectedOption === 'tiktok' && styles.selectedOptionText]}>TikTok</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'instagram' && styles.selectedOption]}
            onPress={() => handleOptionSelect('instagram')}
          >
            <Text style={[styles.optionText, selectedOption === 'instagram' && styles.selectedOptionText]}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'google' && styles.selectedOption]}
            onPress={() => handleOptionSelect('google')}
          >
            <Text style={[styles.optionText, selectedOption === 'google' && styles.selectedOptionText]}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'friends' && styles.selectedOption]}
            onPress={() => handleOptionSelect('friends')}
          >
            <Text style={[styles.optionText, selectedOption === 'friends' && styles.selectedOptionText]}>Friends or Family</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'appstore' && styles.selectedOption]}
            onPress={() => handleOptionSelect('appstore')}
          >
            <Text style={[styles.optionText, selectedOption === 'appstore' && styles.selectedOptionText]}>App Store</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'other' && styles.selectedOption]}
            onPress={() => handleOptionSelect('other')}
          >
            <Text style={[styles.optionText, selectedOption === 'other' && styles.selectedOptionText]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedOption && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={[styles.continueButtonText, !selectedOption && styles.continueButtonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Select one option above</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ CHANGED from white
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 30,
  },
  questionSubtitle: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: 'normal',
  },
  optionsSection: {
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: BRAND_COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: BRAND_COLORS.white,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    maxWidth: 300,
  },
  continueButtonDisabled: {
    backgroundColor: BRAND_COLORS.lightGray,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextDisabled: {
    color: BRAND_COLORS.gray,
  },
  helperText: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: 'normal',
  },
});