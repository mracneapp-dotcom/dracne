// app/onboardingScreens/OnboardingSkinHistory.js
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

const SKIN_HISTORY_OPTIONS = [
  {
    id: 'severe',
    labelKey: 'onboarding.skinHistory.severe',
    descKey: 'onboarding.skinHistory.severe_desc',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
  {
    id: 'moderate',
    labelKey: 'onboarding.skinHistory.moderate',
    descKey: 'onboarding.skinHistory.moderate_desc',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'mild',
    labelKey: 'onboarding.skinHistory.mild',
    descKey: 'onboarding.skinHistory.mild_desc',
    icon: require('../../assets/images/check.png'),
    color: '#7CB342',
  },
  {
    id: 'none',
    labelKey: 'onboarding.skinHistory.none',
    descKey: 'onboarding.skinHistory.none_desc',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
];

export default function OnboardingSkinHistory({ onNext }) {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      onNext('onboardingSensitivities', { acneHistory: selectedLevel });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
            {t('onboarding.skinHistory.title1')}{' '}
            <Text style={styles.titleHighlight}>{t('onboarding.skinHistory.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.skinHistory.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {SKIN_HISTORY_OPTIONS.map((option) => {
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
                  },
                ]}
                onPress={() => handleSelect(option.id)}
              >
                <View style={[
                  styles.iconCircle,
                  { backgroundColor: isSelected ? option.color : '#F5F5F5' },
                ]}>
                  <Image
                    source={option.icon}
                    style={[styles.icon, { tintColor: isSelected ? BRAND_COLORS.white : '#999' }]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && { color: option.color, fontWeight: '600' },
                  ]}>
                    {t(option.labelKey)}
                  </Text>
                  <Text style={styles.optionDescription}>{t(option.descKey)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{t('onboarding.skinHistory.info')}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedLevel && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedLevel}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedLevel && styles.continueButtonTextDisabled,
          ]}>
            {t('onboarding.skinHistory.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.skinHistory.helper')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BRAND_COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainIcon: {
    width: 35,
    height: 35,
    tintColor: BRAND_COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  infoBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
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
