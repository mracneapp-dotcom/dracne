// app/onboardingScreens/OnboardingSkinType.js
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const SKIN_TYPES = [
  {
    id: 'oily',
    labelKey: 'onboarding.skinType.oily',
    descKey: 'onboarding.skinType.oily_desc',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'dry',
    labelKey: 'onboarding.skinType.dry',
    descKey: 'onboarding.skinType.dry_desc',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'combination',
    labelKey: 'onboarding.skinType.combination',
    descKey: 'onboarding.skinType.combination_desc',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'normal',
    labelKey: 'onboarding.skinType.normal',
    descKey: 'onboarding.skinType.normal_desc',
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
  {
    id: 'sensitive',
    labelKey: 'onboarding.skinType.sensitive',
    descKey: 'onboarding.skinType.sensitive_desc',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
  {
    id: 'unknown',
    labelKey: 'onboarding.skinType.unknown',
    descKey: 'onboarding.skinType.unknown_desc',
    icon: require('../../assets/images/check.png'),
    color: '#757575',
  },
];

export default function OnboardingSkinType({ onNext }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleContinue = async () => {
    if (selectedType) {
      try {
        await AsyncStorage.setItem('userSkinType', selectedType);
        console.log('✅ Skin type saved:', selectedType);
      } catch (error) {
        console.error('Error saving skin type:', error);
      }

      onNext('onboardingRoutine', { skinType: selectedType });
    }
  };

  const getSelectionMessage = () => {
    const selected = SKIN_TYPES.find(t => t.id === selectedType);
    if (selectedType === 'unknown') {
      return t('onboarding.skinType.unknown_message');
    }
    return t('onboarding.skinType.selected_message', { skinType: t(selected?.labelKey).toLowerCase() });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('onboarding.skinType.title1')} <Text style={styles.titleHighlight}>{t('onboarding.skinType.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('onboarding.skinType.subtitle')}
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
                    {t(type.labelKey)}
                  </Text>
                  <Text style={styles.typeDescription}>{t(type.descKey)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedType && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {getSelectionMessage()}
            </Text>
          </View>
        )}
      </ScrollView>

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
            {t('onboarding.skinType.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>
          {selectedType ? t('onboarding.skinType.helper_selected') : t('onboarding.skinType.helper')}
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
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 32,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  typesContainer: {
    marginBottom: 15,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
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
  },
  typeLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  typeDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  selectionInfo: {
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
  },
  selectionText: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
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