// app/onboardingScreens/OnboardingSkinType.js
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const SKIN_TYPES = [
  {
    id: 'oily',
    label: 'Oily',
    description: 'Shiny throughout the day',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'dry',
    label: 'Dry',
    description: 'Tight, flaky, or rough',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'combination',
    label: 'Combination',
    description: 'Oily T-zone, dry cheeks',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'normal',
    label: 'Normal',
    description: 'Balanced, not too oily or dry',
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
  {
    id: 'sensitive',
    label: 'Sensitive',
    description: 'Easily irritated or red',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
];

export default function OnboardingSkinType({ onNext }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleContinue = async () => {
    if (selectedType) {
      // Save skin type to AsyncStorage for easy access throughout the app
      try {
        await AsyncStorage.setItem('userSkinType', selectedType);
        console.log('✅ Skin type saved:', selectedType);
      } catch (error) {
        console.error('Error saving skin type:', error);
      }

      // Pass to next screen with skin type data
      onNext('onboardingRoutine', { skinType: selectedType });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            What's your <Text style={styles.titleHighlight}>skin type?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Choose the one that best describes your skin
          </Text>
        </View>

        <View style={styles.typesContainer}>
          {SKIN_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  isSelected && {
                    borderColor: type.color,
                    borderWidth: 2,
                    backgroundColor: `${type.color}10`,
                  }
                ]}
                onPress={() => handleSelect(type.id)}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isSelected ? type.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={type.icon}
                    style={[
                      styles.icon,
                      { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.typeLabel,
                    isSelected && { color: type.color, fontWeight: '600' }
                  ]}>
                    {type.label}
                  </Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedType && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              Perfect! We'll customize your routine for {SKIN_TYPES.find(t => t.id === selectedType)?.label.toLowerCase()} skin
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedType && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          {selectedType ? 'Your personalized plan is ready!' : 'Select your skin type'}
        </Text>
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
    paddingHorizontal: 20,
    paddingTop: 40,
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
  typesContainer: {
    marginBottom: 20,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 17,
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  selectionInfo: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
  },
  selectionText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
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