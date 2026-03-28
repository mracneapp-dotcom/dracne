// app/onboardingScreens/OnboardingSkinConcerns.js
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

const MAX_SELECTIONS = 3;

const SKIN_CONCERN_OPTIONS = [
  { id: 'pih',         labelKey: 'onboarding.skinConcerns.pih',         descKey: 'onboarding.skinConcerns.pih_desc',         color: '#9B59B6' },
  { id: 'dryness',     labelKey: 'onboarding.skinConcerns.dryness',     descKey: 'onboarding.skinConcerns.dryness_desc',     color: '#4A90E2' },
  { id: 'aging',       labelKey: 'onboarding.skinConcerns.aging',       descKey: 'onboarding.skinConcerns.aging_desc',       color: '#F39C12' },
  { id: 'pores',       labelKey: 'onboarding.skinConcerns.pores',       descKey: 'onboarding.skinConcerns.pores_desc',       color: '#1ABC9C' },
  { id: 'texture',     labelKey: 'onboarding.skinConcerns.texture',     descKey: 'onboarding.skinConcerns.texture_desc',     color: '#E67E22' },
  { id: 'redness',     labelKey: 'onboarding.skinConcerns.redness',     descKey: 'onboarding.skinConcerns.redness_desc',     color: BRAND_COLORS.secondary },
  { id: 'oiliness',    labelKey: 'onboarding.skinConcerns.oiliness',    descKey: 'onboarding.skinConcerns.oiliness_desc',    color: '#27AE60' },
  { id: 'sensitivity', labelKey: 'onboarding.skinConcerns.sensitivity', descKey: 'onboarding.skinConcerns.sensitivity_desc', color: '#E74C3C' },
  { id: 'glow',        labelKey: 'onboarding.skinConcerns.glow',        descKey: 'onboarding.skinConcerns.glow_desc',        color: '#F1C40F' },
  { id: 'breakouts',   labelKey: 'onboarding.skinConcerns.breakouts',   descKey: 'onboarding.skinConcerns.breakouts_desc',   color: BRAND_COLORS.primary },
];

export default function OnboardingSkinConcerns({ onNext }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_SELECTIONS) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const isEnabled = selectedItems.length > 0;

  const handleContinue = () => {
    if (isEnabled) {
      onNext('onboardingProducts', { skinConcerns: selectedItems });
    }
  };

  const isMaxReached = selectedItems.length >= MAX_SELECTIONS;

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
            {t('onboarding.skinConcerns.title1')}{' '}
            <Text style={styles.titleHighlight}>{t('onboarding.skinConcerns.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.skinConcerns.subtitle')}</Text>
        </View>

        {isMaxReached && (
          <View style={styles.maxHintBox}>
            <Text style={styles.maxHintText}>
              {t('onboarding.skinConcerns.max_hint', { count: selectedItems.length })}
            </Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {SKIN_CONCERN_OPTIONS.map((option) => {
            const isSelected = selectedItems.includes(option.id);
            const isDimmed = isMaxReached && !isSelected;
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
                  isDimmed && styles.optionCardDimmed,
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={isDimmed ? 0.4 : 0.8}
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
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && { color: option.color, fontWeight: '600' },
                    isDimmed && styles.textDimmed,
                  ]}>
                    {t(option.labelKey)}
                  </Text>
                  <Text style={[styles.optionDescription, isDimmed && styles.textDimmed]}>
                    {t(option.descKey)}
                  </Text>
                </View>
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
            {t('onboarding.skinConcerns.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.skinConcerns.helper')}</Text>
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
    width: 35,
    height: 35,
    tintColor: BRAND_COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
  maxHintBox: {
    backgroundColor: `${BRAND_COLORS.primary}15`,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  maxHintText: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
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
  optionCardDimmed: {
    opacity: 0.4,
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
  textDimmed: {
    color: '#AAA',
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
