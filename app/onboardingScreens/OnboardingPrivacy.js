// app/onboardingScreens/OnboardingPrivacy.js
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
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

const PRIVACY_POINTS = [
  {
    title: 'Your photos stay private',
    description: 'Photos are analyzed securely and never shared with third parties',
    icon: require('../../assets/images/camera2.png'),
  },
  {
    title: 'AI-powered analysis only',
    description: 'Our AI processes your skin analysis - no human ever sees your photos',
    icon: require('../../assets/images/robot.png'),
  },
  {
    title: 'No cloud storage',
    description: 'Your photos are processed in real-time and not stored on our servers',
    icon: require('../../assets/images/no_cloud.png'),
  },
  {
    title: 'Data encryption',
    description: 'All data transmission is encrypted using industry-standard security',
    icon: require('../../assets/images/lock1.png'),
  },
];

export default function OnboardingPrivacy({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingGenerating', { acceptedPrivacy: true });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Privacy Matters</Text>
          <Text style={styles.subtitle}>
            We take your privacy seriously. Here's how we protect your data
          </Text>
        </View>

        {/* Privacy Points */}
        <View style={styles.privacyPointsContainer}>
          {PRIVACY_POINTS.map((point, index) => (
            <View key={index} style={styles.privacyPoint}>
              <View style={styles.iconCircle}>
                <Image
                  source={point.icon}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.pointContent}>
                <Text style={styles.pointTitle}>{point.title}</Text>
                <Text style={styles.pointDescription}>{point.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Disclaimer Section */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Dr. Acne provides educational skincare guidance and is not a substitute 
            for professional medical advice. Always consult a dermatologist for 
            diagnosis and treatment.
          </Text>
        </View>

        {/* Legal Text */}
        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            By continuing, you agree to our{' '}
            <Text style={styles.legalLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Button at Bottom */}
      <View style={styles.buttonContainer}>
        <DrAcneButton
          title="I understand, let's start"
          onPress={handleContinue}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ CHANGED from white
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  privacyPointsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  privacyPoint: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BRAND_COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  pointContent: {
    flex: 1,
  },
  pointTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 4,
    lineHeight: 21,
  },
  pointDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  disclaimerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 24,
    borderRadius: 10,
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 17,
  },
  legalContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  legalText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent', // ✓ Already transparent
  },
  button: {
    paddingVertical: 16,
  },
});