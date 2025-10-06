// app/onboardingScreens/OnboardingTimeline.js
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

const TIMELINE_OPTIONS = [
  {
    id: 'asap',
    label: 'As soon as possible',
    description: 'I want results fast',
    icon: require('../../assets/images/thunder.png'),
    color: BRAND_COLORS.secondary,
  },
  {
    id: 'months_3',
    label: 'Within 3 months',
    description: 'Steady, sustainable progress',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'months_6',
    label: 'Within 6 months',
    description: 'Long-term transformation',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'no_rush',
    label: 'No rush',
    description: "I'm focused on consistency", // ✓ FIXED: Escaped apostrophe with double quotes
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
];

export default function OnboardingTimeline({ onNext }) {
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const handleSelect = (timelineId) => {
    setSelectedTimeline(timelineId);
  };

  const handleContinue = () => {
    if (selectedTimeline) {
      onNext('onboardingResultsTimeline', { timeline: selectedTimeline });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            When do you want to see <Text style={styles.titleHighlight}>results?</Text>
          </Text>
          <Text style={styles.subtitle}>
            This helps us set realistic expectations
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {TIMELINE_OPTIONS.map((option) => {
            const isSelected = selectedTimeline === option.id;
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
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedTimeline && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedTimeline}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedTimeline && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Select your timeline</Text>
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
    paddingTop: 50,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 26,
    height: 26,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 17,
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
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