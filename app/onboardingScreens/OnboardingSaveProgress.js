// app/onboardingScreens/OnboardingSaveProgress.js
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export default function OnboardingSaveProgress({ onNext, onboardingData = {} }) {

  const handleAppleSignIn = () => {
    console.log('Apple Sign In pressed');
    onNext('onboardingPaywall', {
      ...onboardingData,
      signInMethod: 'apple',
      accountCreated: true,
    });
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In pressed');
    onNext('onboardingPaywall', {
      ...onboardingData,
      signInMethod: 'google',
      accountCreated: true,
    });
  };

  const handleSkip = () => {
    onNext('onboardingPaywall', {
      ...onboardingData,
      signInMethod: 'skipped',
      accountCreated: false,
    });
  };

  const handleContinue = () => {
    onNext('onboardingPaywall', {
      ...onboardingData,
      signInMethod: 'guest',
      accountCreated: false,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Save your progress</Text>
        <Text style={styles.subtitle}>
          Create an account to save your personalized skincare plan and progress
        </Text>
      </View>

      {/* Sign In Buttons */}
      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
          <Image
            source={require('../../assets/images/apple.png')}
            style={styles.appleIcon}
            resizeMode="contain"
          />
          <Text style={styles.appleButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer to push bottom content down */}
      <View style={styles.spacer} />

      {/* Bottom Section with Skip and Continue */}
      <View style={styles.bottomSection}>
        {/* Skip Section */}
        <View style={styles.skipSection}>
          <Text style={styles.skipText}>
            Would you like to sign in later? 
            <Text style={styles.skipLink} onPress={handleSkip}> Skip</Text>
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.continueSection}>
          <DrAcneButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  buttonsSection: {
    paddingHorizontal: 24,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLORS.black,
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: BRAND_COLORS.white,
  },
  appleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 25,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.black,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: 'transparent', // ✓ Already correct
  },
  skipSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  skipText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  skipLink: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  continueSection: {
    // No additional styling needed
  },
  continueButton: {
    paddingVertical: 18,
  },
});