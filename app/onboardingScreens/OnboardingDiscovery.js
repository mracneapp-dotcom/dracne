// app/onboardingScreens/OnboardingDiscovery.js
import React, { useState } from 'react';
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
  lightGray: '#E5E5E5',
};

const DISCOVERY_OPTIONS = [
  { id: 'tiktok', label: 'TikTok', icon: require('../../assets/images/check.png'), color: '#FF0050' },
  { id: 'instagram', label: 'Instagram', icon: require('../../assets/images/check.png'), color: '#E4405F' },
  { id: 'google', label: 'Google', icon: require('../../assets/images/check.png'), color: '#4285F4' },
  { id: 'friends', label: 'Friends or Family', icon: require('../../assets/images/check.png'), color: BRAND_COLORS.primary },
  { id: 'appstore', label: 'App Store', icon: require('../../assets/images/check.png'), color: '#0D7EFF' },
  { id: 'other', label: 'Other', icon: require('../../assets/images/check.png'), color: '#999' },
];

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
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            How did you <Text style={styles.titleHighlight}>find us?</Text>
          </Text>
          <Text style={styles.questionSubtitle}>
            We're always curious about our skincare community
          </Text>
        </View>

        <View style={styles.optionsSection}>
          {DISCOVERY_OPTIONS.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity 
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && { 
                    borderColor: option.color,
                    borderWidth: 2,
                    backgroundColor: `${option.color}10`,
                  }
                ]}
                onPress={() => handleOptionSelect(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isSelected ? option.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={option.icon}
                    style={[
                      styles.icon,
                      { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.optionText,
                  isSelected && { color: option.color, fontWeight: '600' }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>Great choice!</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedOption && styles.continueButtonTextDisabled
          ]}>
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
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 40, // ✓ REDUCED from 50
    paddingBottom: 160, // ✓ INCREASED from 140 - more space for button
    justifyContent: 'flex-start',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32, // ✓ REDUCED from 40 - tighter header spacing
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsSection: {
    marginBottom: 16, // ✓ REDUCED from 20 - tighter section spacing
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 14, // ✓ REDUCED from 16 - more compact cards
    marginBottom: 10, // ✓ REDUCED from 12 - tighter card spacing
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 40, // ✓ REDUCED from 44 - smaller icons
    height: 40, // ✓ REDUCED from 44
    borderRadius: 20, // ✓ ADJUSTED for new size
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // ✓ REDUCED from 14
  },
  icon: {
    width: 20, // ✓ REDUCED from 22
    height: 20, // ✓ REDUCED from 22
  },
  optionText: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    flex: 1,
  },
  selectionInfo: {
    alignItems: 'center',
    marginTop: 8, // ✓ REDUCED from 10
  },
  selectionText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '500',
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
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});