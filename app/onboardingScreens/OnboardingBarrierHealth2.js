// app/onboardingScreens/OnboardingBarrierHealth2.js
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

export default function OnboardingBarrierHealth2({ onNext }) {
  const [hasGrittyTexture, setHasGrittyTexture] = useState(null);

  const handleSelect = (value) => {
    setHasGrittyTexture(value);
  };

  const handleContinue = () => {
    if (hasGrittyTexture !== null) {
      onNext('onboardingSkinType', { barrierDamage2: hasGrittyTexture });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.questionCircle}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.questionIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            Does your skin have a <Text style={styles.titleHighlight}>sandy texture?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Continuing our skin barrier assessment
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              hasGrittyTexture === true && {
                borderColor: BRAND_COLORS.secondary,
                borderWidth: 2,
                backgroundColor: `${BRAND_COLORS.secondary}10`,
              }
            ]}
            onPress={() => handleSelect(true)}
          >
            <View style={[
              styles.iconCircle,
              { backgroundColor: hasGrittyTexture === true ? BRAND_COLORS.secondary : '#F5F5F5' }
            ]}>
              <Image
                source={require('../../assets/images/no_icon.png')}
                style={[
                  styles.optionIcon,
                  { tintColor: hasGrittyTexture === true ? BRAND_COLORS.white : '#999' }
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[
                styles.optionLabel,
                hasGrittyTexture === true && { color: BRAND_COLORS.secondary, fontWeight: '600' }
              ]}>
                Yes, it does
              </Text>
              <Text style={styles.optionDescription}>My skin feels rough or gritty to the touch</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              hasGrittyTexture === false && {
                borderColor: BRAND_COLORS.primary,
                borderWidth: 2,
                backgroundColor: `${BRAND_COLORS.primary}10`,
              }
            ]}
            onPress={() => handleSelect(false)}
          >
            <View style={[
              styles.iconCircle,
              { backgroundColor: hasGrittyTexture === false ? BRAND_COLORS.primary : '#F5F5F5' }
            ]}>
              <Image
                source={require('../../assets/images/check.png')}
                style={[
                  styles.optionIcon,
                  { tintColor: hasGrittyTexture === false ? BRAND_COLORS.white : '#999' }
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[
                styles.optionLabel,
                hasGrittyTexture === false && { color: BRAND_COLORS.primary, fontWeight: '600' }
              ]}>
                No, it's smooth
              </Text>
              <Text style={styles.optionDescription}>My skin texture feels normal and smooth</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            These questions help us create a safe, effective routine for you
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            hasGrittyTexture === null && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={hasGrittyTexture === null}
        >
          <Text style={[
            styles.continueButtonText,
            hasGrittyTexture === null && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Select one option</Text>
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  questionCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  questionIcon: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.white,
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
    color: '#9B59B6',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 24,
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
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIcon: {
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
  infoBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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