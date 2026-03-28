// app/onboardingScreens/OnboardingSensitivities.js
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

const NONE_ID = 'none_above';

const SENSITIVITY_OPTIONS = [
  { id: 'fragrance',      labelKey: 'onboarding.sensitivities.fragrance',      color: '#FF7A7A' },
  { id: 'alcohol',        labelKey: 'onboarding.sensitivities.alcohol',        color: '#F39C12' },
  { id: 'essential_oils', labelKey: 'onboarding.sensitivities.essential_oils', color: '#9B59B6' },
  { id: 'silicones',      labelKey: 'onboarding.sensitivities.silicones',      color: '#4A90E2' },
  { id: 'sulfates',       labelKey: 'onboarding.sensitivities.sulfates',       color: '#7CB342' },
  { id: 'parabens',       labelKey: 'onboarding.sensitivities.parabens',       color: '#E74C3C' },
  { id: 'comedogenic',    labelKey: 'onboarding.sensitivities.comedogenic',    color: '#1ABC9C' },
  { id: 'acids',          labelKey: 'onboarding.sensitivities.acids',          color: '#E67E22' },
  { id: NONE_ID,          labelKey: 'onboarding.sensitivities.none_above',     color: '#95A5A6' },
];

export default function OnboardingSensitivities({ onNext }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (id) => {
    if (id === NONE_ID) {
      setSelectedItems([NONE_ID]);
    } else {
      setSelectedItems((prev) => {
        const withoutNone = prev.filter((item) => item !== NONE_ID);
        if (withoutNone.includes(id)) {
          return withoutNone.filter((item) => item !== id);
        }
        return [...withoutNone, id];
      });
    }
  };

  const isEnabled = selectedItems.length > 0;

  const handleContinue = () => {
    if (isEnabled) {
      onNext('onboardingAllergies', { sensitivities: selectedItems });
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
            {t('onboarding.sensitivities.title1')}{' '}
            <Text style={styles.titleHighlight}>{t('onboarding.sensitivities.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.sensitivities.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {SENSITIVITY_OPTIONS.map((option) => {
            const isSelected = selectedItems.includes(option.id);
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
                    source={require('../../assets/images/check.png')}
                    style={[styles.icon, { tintColor: isSelected ? BRAND_COLORS.white : '#999' }]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.optionLabel,
                  isSelected && { color: option.color, fontWeight: '600' },
                ]}>
                  {t(option.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.continueButton, !isEnabled && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isEnabled}
        >
          <Text style={[
            styles.continueButtonText,
            !isEnabled && styles.continueButtonTextDisabled,
          ]}>
            {t('onboarding.sensitivities.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.sensitivities.helper')}</Text>
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
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
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
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 14,
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
  optionLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    flex: 1,
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
