// app/onboardingScreens/OnboardingStruggle.js
import React, { useState } from 'react';
import {
  Image,
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

const STRUGGLE_OPTIONS = [
  {
    id: 'breakouts',
    labelKey: 'onboarding.struggle.breakouts',
    descKey: 'onboarding.struggle.breakouts_desc',
    icon: require('../../assets/images/no_icon.png'),
    color: BRAND_COLORS.secondary,
  },
  {
    id: 'nothing_works',
    labelKey: 'onboarding.struggle.nothing_works',
    descKey: 'onboarding.struggle.nothing_works_desc',
    icon: require('../../assets/images/no_icon.png'),
    color: '#E74C3C',
  },
  {
    id: 'too_many',
    labelKey: 'onboarding.struggle.too_many',
    descKey: 'onboarding.struggle.too_many_desc',
    icon: require('../../assets/images/no_icon.png'),
    color: '#F39C12',
  },
  {
    id: 'dont_know',
    labelKey: 'onboarding.struggle.dont_know',
    descKey: 'onboarding.struggle.dont_know_desc',
    icon: require('../../assets/images/no_icon.png'),
    color: '#9B59B6',
  },
];

export default function OnboardingStruggle({ onNext }) {
  const [selectedStruggle, setSelectedStruggle] = useState(null);

  const handleSelect = (struggleId) => {
    setSelectedStruggle(struggleId);
  };

  const handleContinue = () => {
    if (selectedStruggle) {
      onNext('onboardingBarrierHealth1', { struggle: selectedStruggle });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('onboarding.struggle.title')} <Text style={styles.titleHighlight}>{t('onboarding.struggle.titleHighlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.struggle.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {STRUGGLE_OPTIONS.map((option) => {
            const isSelected = selectedStruggle === option.id;
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
                    {t(option.labelKey)}
                  </Text>
                  <Text style={styles.optionDescription}>{t(option.descKey)}</Text>
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
            !selectedStruggle && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedStruggle}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedStruggle && styles.continueButtonTextDisabled
          ]}>
            {t('onboarding.struggle.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.struggle.helper')}</Text>
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
    paddingTop: 60,
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
    color: BRAND_COLORS.secondary,
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