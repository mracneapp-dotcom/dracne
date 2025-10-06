// app/onboardingScreens/OnboardingPlanReady.js
import React from 'react';
import {
  Image,
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
    color: BRAND_COLORS.primary,
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'AI-powered skin analysis',
    description: 'Track your progress with smart detection',
    color: '#4A90E2',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Science-backed timeline',
    description: 'Know exactly when to expect results',
    color: '#9B59B6',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Expert recommendations',
    description: 'Products and ingredients that work for you',
    color: '#F39C12',
  },
];

export default function OnboardingPlanReady({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingReminders', { viewedPlanReady: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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

        {/* Modern Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Your Plan is <Text style={styles.titleHighlight}>Ready!</Text>
          </Text>
          <Text style={styles.subtitle}>
            We've created a personalized skincare journey based on your unique needs
          </Text>
        </View>

        {/* Modern Features Cards */}
        <View style={styles.featuresContainer}>
          {PLAN_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[
                styles.featureIconContainer,
                { backgroundColor: `${feature.color}15` }
              ]}>
                <Image
                  source={feature.icon}
                  style={[
                    styles.featureIcon,
                    { tintColor: feature.color }
                  ]}
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
      </View>

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
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 140,
    justifyContent: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureIcon: {
    width: 22,
    height: 22,
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
  excitementContainer: {
    alignItems: 'center',
    marginTop: 10,
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
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: 16,
  },
});