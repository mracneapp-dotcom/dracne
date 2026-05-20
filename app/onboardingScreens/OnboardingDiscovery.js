// app/onboardingScreens/OnboardingDiscovery.js
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '../i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const DISCOVERY_OPTIONS = [
  { 
    id: 'tiktok', 
    labelKey: 'onboarding.discovery.tiktok',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  { 
    id: 'instagram', 
    labelKey: 'onboarding.discovery.instagram',
    icon: require('../../assets/images/check.png'),
    color: '#E1306C',
  },
  { 
    id: 'google', 
    labelKey: 'onboarding.discovery.google',
    icon: require('../../assets/images/check.png'),
    color: '#4285F4',
  },
  { 
    id: 'friends', 
    labelKey: 'onboarding.discovery.friends',
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
  { 
    id: 'appstore', 
    labelKey: 'onboarding.discovery.appstore',
    icon: require('../../assets/images/check.png'),
    color: '#007AFF',
  },
  { 
    id: 'other', 
    labelKey: 'onboarding.discovery.other',
    icon: require('../../assets/images/check.png'),
    color: '#95A5A6',
  },
];

export default function OnboardingDiscovery({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onNext('onboardingExperience', { discoverySource: selectedOption });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {t('onboarding.discovery.title')} <Text style={styles.titleHighlight}>{t('onboarding.discovery.titleHighlight')}</Text>
        </Text>
        <Text style={styles.subtitle}>{t('onboarding.discovery.subtitle')}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsList}>
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
                    backgroundColor: '#F0F7E8',
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
                  styles.optionLabel,
                  isSelected && { color: option.color, fontWeight: '600' }
                ]}>
                  {t(option.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedOption && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>{t('onboarding.discovery.selected')}</Text>
          </View>
        )}
      </ScrollView>

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
            {t('onboarding.discovery.button')}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>{t('onboarding.discovery.helper')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  optionsList: {
    marginBottom: 20,
  },
  optionCard: {
    width: '100%',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  optionLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    flex: 1,
  },
  selectedBadge: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  selectedText: {
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