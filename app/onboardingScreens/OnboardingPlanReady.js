// app/onboardingScreens/OnboardingPlanReady.js
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

const PLAN_FEATURES = [
  {
    icon: require('../../assets/images/check.png'),
    title: 'Personalized skincare routine',
    description: 'Morning & evening steps designed for you',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'AI-powered skin analysis',
    description: 'Track your progress with smart detection',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Science-backed timeline',
    description: 'Know exactly when to expect results',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Expert recommendations',
    description: 'Products and ingredients that work for you',
  },
];

export default function OnboardingPlanReady({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingReminders', { viewedPlanReady: true });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.successIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Plan is Ready!</Text>
          <Text style={styles.subtitle}>
            We've created a personalized skincare journey based on your unique needs
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's included:</Text>
          {PLAN_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={feature.icon}
                  style={styles.featureIcon}
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

        {/* Excitement Text */}
        <View style={styles.excitementContainer}>
          <Text style={styles.excitementText}>
            Ready to start your transformation?
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Button at Bottom */}
      <View style={styles.buttonContainer}>
        <DrAcneButton
          title="Let's do this!"
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
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
  },
  scrollContent: {
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
  },
  successCircle: {
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
  successIcon: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  featureIcon: {
    width: 16,
    height: 16,
    tintColor: BRAND_COLORS.primary,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 4,
    lineHeight: 21,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  excitementContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  excitementText: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent', // ✓ CHANGED from BRAND_COLORS.white
  },
  button: {
    paddingVertical: 16,
  },
});