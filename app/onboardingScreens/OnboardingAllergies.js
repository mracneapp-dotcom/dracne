// app/onboardingScreens/OnboardingAllergies.js
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

const NONE_ID = 'none_known';

const ALLERGY_OPTIONS = [
  { id: 'nickel',   labelKey: 'onboarding.allergies.nickel',     color: '#95A5A6' },
  { id: 'latex',    labelKey: 'onboarding.allergies.latex',      color: '#E74C3C' },
  { id: 'nuts',     labelKey: 'onboarding.allergies.nuts',       color: '#F39C12' },
  { id: 'propolis', labelKey: 'onboarding.allergies.propolis',   color: '#F1C40F' },
  { id: 'lanolin',  labelKey: 'onboarding.allergies.lanolin',    color: '#1ABC9C' },
  { id: 'gluten',   labelKey: 'onboarding.allergies.gluten',     color: '#E67E22' },
  { id: 'soy',      labelKey: 'onboarding.allergies.soy',        color: '#27AE60' },
  { id: NONE_ID,    labelKey: 'onboarding.allergies.none_known', color: '#4A90E2' },
];

export default function OnboardingAllergies({ onNext }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customText, setCustomText] = useState('');

  const handleSelect = (id) => {
    if (id === NONE_ID) {
      setSelectedItems([NONE_ID]);
      setCustomText('');
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

  const handleCustomTextChange = (text) => {
    setCustomText(text);
    if (text.trim().length > 0) {
      setSelectedItems((prev) => prev.filter((item) => item !== NONE_ID));
    }
  };

  const isEnabled =
    selectedItems.length > 0 || customText.trim().length > 0;

  const handleContinue = () => {
    if (isEnabled) {
      const allergies = customText.trim().length > 0
        ? [...selectedItems, customText.trim()]
        : selectedItems;
      onNext('onboardingSkinConcerns', { allergies });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            {t('onboarding.allergies.title1')}{' '}
            <Text style={styles.titleHighlight}>{t('onboarding.allergies.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.allergies.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {ALLERGY_OPTIONS.map((option) => {
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

        <TextInput
          style={[
            styles.textInput,
            customText.trim().length > 0 && styles.textInputActive,
          ]}
          placeholder={t('onboarding.allergies.placeholder')}
          placeholderTextColor="#AAA"
          value={customText}
          onChangeText={handleCustomTextChange}
          returnKeyType="done"
        />
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
            {t('onboarding.allergies.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.allergies.helper')}</Text>
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
    marginBottom: 16,
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
  textInput: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: BRAND_COLORS.black,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  textInputActive: {
    borderColor: BRAND_COLORS.primary,
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
