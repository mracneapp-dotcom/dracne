// app/onboardingScreens/OnboardingPrivacy.js
import React from 'react';
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

const PRIVACY_FEATURES = [
  {
    icon: require('../../assets/images/check.png'),
    title: 'Your photos stay private',
    description: 'Never shared or stored on our servers',
    color: BRAND_COLORS.primary,
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Secure AI processing',
    description: 'Analysis happens instantly and securely',
    color: '#4A90E2',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'No data selling',
    description: 'We never sell your information',
    color: BRAND_COLORS.secondary,
  },
];

export default function OnboardingPrivacy({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingGenerating', { privacyAccepted: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.lockCircle}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            Your <Text style={styles.titleHighlight}>privacy</Text> matters
          </Text>
          <Text style={styles.subtitle}>
            Here's how we protect your information
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {PRIVACY_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}15` }]}>
                <Image
                  source={feature.icon}
                  style={[styles.featureIcon, { tintColor: feature.color }]}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>I understand, continue</Text>
        </TouchableOpacity>
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
  lockCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lockIcon: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
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
  featuresContainer: {
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureIcon: {
    width: 24,
    height: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 3,
    lineHeight: 20,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  legalContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  legalText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  continueButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});