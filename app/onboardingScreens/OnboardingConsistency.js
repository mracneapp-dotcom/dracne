// app/onboardingScreens/OnboardingConsistency.js
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
};

const CONSISTENCY_OPTIONS = [
  {
    id: 'very_committed',
    label: 'Very committed',
    description: "I'll follow my routine daily",
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'mostly_committed',
    label: 'Mostly committed',
    description: 'I might miss a day here and there',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'trying_best',
    label: 'Trying my best',
    description: 'Life gets busy sometimes',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'not_sure',
    label: 'Not sure yet',
    description: "Let's see how it goes",
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
];

export default function OnboardingConsistency({ onNext }) {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      onNext('onboardingComparison', { consistency: selectedLevel });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.mainCircle}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.mainIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            How <Text style={styles.titleHighlight}>committed</Text> are you?
          </Text>
          <Text style={styles.subtitle}>
            Be honest - this helps us support you better
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {CONSISTENCY_OPTIONS.map((option) => {
            const isSelected = selectedLevel === option.id;
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
                onPress={() => handleSelect(option.id)}
              >
                <View style={[
                  styles.iconCircle,
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
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && { color: option.color, fontWeight: '600' }
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Consistency is key - even small steps lead to big results
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedLevel && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedLevel}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedLevel && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Select your commitment level</Text>
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
    paddingTop: 40, // ✓ REDUCED from 60
    paddingBottom: 140, // ✓ ADDED - prevents overlap with bottom button
    justifyContent: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24, // ✓ REDUCED from 32
  },
  mainCircle: {
    width: 70, // ✓ REDUCED from 80
    height: 70, // ✓ REDUCED from 80
    borderRadius: 35, // ✓ ADJUSTED
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainIcon: {
    width: 35, // ✓ REDUCED from 40
    height: 35, // ✓ REDUCED from 40
    tintColor: BRAND_COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30, // ✓ REDUCED from 40
  },
  title: {
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20, // ✓ REDUCED from 24
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16, // ✓ REDUCED from 18
    marginBottom: 10, // ✓ REDUCED from 14
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44, // ✓ REDUCED from 48
    height: 44, // ✓ REDUCED from 48
    borderRadius: 22, // ✓ ADJUSTED
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14, // ✓ REDUCED from 16
  },
  icon: {
    width: 22, // ✓ REDUCED from 24
    height: 22, // ✓ REDUCED from 24
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 16, // ✓ REDUCED from 17
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13, // ✓ REDUCED from 14
    color: '#666',
    lineHeight: 18, // ✓ REDUCED from 19
  },
  infoBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 14, // ✓ REDUCED from 16
    alignItems: 'center',
    marginBottom: 20, // ✓ ADDED - extra space before bottom section
  },
  infoText: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    lineHeight: 19,
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