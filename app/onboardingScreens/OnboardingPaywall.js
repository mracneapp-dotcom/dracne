// app/onboardingScreens/OnboardingPaywall.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BENEFITS = [
  {
    icon: require('../../assets/images/check.png'),
    title: 'No Payment Due Now',
    description: '3 days completely free',
    color: BRAND_COLORS.primary,
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'AI-Powered Acne Detection',
    description: 'Smart skin analysis',
    color: '#4A90E2',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Personalized Skincare Plans',
    description: 'Tailored to your skin',
    color: '#9B59B6',
  },
];

export default function OnboardingPaywall({ onNext, onboardingData = {} }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    // Gentle entrance animation only - stays visible
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Subtle breathing animation - very gentle
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [fadeAnim, scaleAnim]);

  const handleContinue = () => {
    onNext('complete', {
      ...onboardingData,
      paywallCompleted: true,
      trialStarted: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Experience <Text style={styles.titleHighlight}>Dr. Acne</Text> for free
        </Text>
        <Text style={styles.subtitle}>
          Get personalized skincare analysis and professional routines
        </Text>
      </View>

      {/* Animated Mockup Section */}
      <View style={styles.mockupContainer}>
        <Animated.View
          style={[
            styles.mockupWrapper,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image
            source={require('../../assets/images/mockup1.png')}
            style={styles.mockupImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.mockupLabel}>See your personalized plan in action</Text>
      </View>

      {/* Modern Benefits Cards */}
      <View style={styles.benefitsContainer}>
        {BENEFITS.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={[
              styles.benefitIconContainer,
              { backgroundColor: `${benefit.color}15` }
            ]}>
              <Image
                source={benefit.icon}
                style={[
                  styles.benefitIcon,
                  { tintColor: benefit.color }
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Continue"
          onPress={handleContinue}
          style={styles.continueButton}
        />
        
        <Text style={styles.pricingText}>
          3 days free, then $35 per year
        </Text>
        <Text style={styles.cancelText}>
          Cancel anytime • No commitment
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    paddingHorizontal: 12,
  },
  mockupContainer: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  mockupWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupImage: {
    width: 180,
    height: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  mockupLabel: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  benefitsContainer: {
    paddingHorizontal: 24,
    marginBottom: 140,
    backgroundColor: 'transparent',
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  benefitIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  benefitIcon: {
    width: 16,
    height: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 1,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  continueButton: {
    paddingVertical: 18,
    marginBottom: 12,
  },
  pricingText: {
    fontSize: 15,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 6,
  },
  cancelText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontWeight: '400',
  },
});