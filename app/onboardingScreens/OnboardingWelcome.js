// app/onboardingScreens/OnboardingWelcome.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
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

export default function OnboardingWelcome({ onNext }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Logo animations
  const logoPulseAnim = useRef(new Animated.Value(1)).current;
  const logoGlowAnim = useRef(new Animated.Value(0.3)).current;
  
  // Feature cards animations (one for each card)
  const card1Anim = useRef(new Animated.Value(1)).current;
  const card2Anim = useRef(new Animated.Value(1)).current;
  const card3Anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo pulse animation (continuous loop)
    const logoPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoPulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Logo glow animation (continuous loop)
    const logoGlow = Animated.loop(
      Animated.sequence([
        Animated.timing(logoGlowAnim, {
          toValue: 0.7,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(logoGlowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    // Feature cards staggered pulse animation (continuous loop)
    const cardsPulse = Animated.loop(
      Animated.stagger(400, [
        // Card 1
        Animated.sequence([
          Animated.timing(card1Anim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(card1Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.delay(1200), // Wait for other cards
        ]),
        // Card 2
        Animated.sequence([
          Animated.timing(card2Anim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(card2Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.delay(800), // Wait for card 3
        ]),
        // Card 3
        Animated.sequence([
          Animated.timing(card3Anim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(card3Anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.delay(400), // Small delay before loop restarts
        ]),
      ])
    );

    logoPulse.start();
    logoGlow.start();
    
    // Delay cards animation to start after initial fade in
    setTimeout(() => {
      cardsPulse.start();
    }, 1000);

    return () => {
      logoPulse.stop();
      logoGlow.stop();
      cardsPulse.stop();
    };
  }, []);

  const handleGetStarted = () => {
    onNext('onboardingDiscovery', { welcomeCompleted: true });
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* Animated Logo Section */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.logoWrapper,
              { transform: [{ scale: logoPulseAnim }] }
            ]}
          >
            <Image
              source={require('../../assets/images/dracne-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Animated.View 
              style={[
                styles.logoGlowRing,
                { opacity: logoGlowAnim }
              ]}
            />
          </Animated.View>
        </View>

        {/* Hero Section with Color Accent */}
        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>
            Welcome to{'\n'}
            <Text style={styles.brandHighlight}>Dr. Acne</Text>
          </Text>
          <Text style={styles.subtitle}>
            Your AI-powered skincare companion for clear, healthy skin
          </Text>
        </View>

        {/* Animated Feature Highlights */}
        <View style={styles.featuresGrid}>
          <Animated.View 
            style={[
              styles.featureCard, 
              styles.featureCard1,
              { transform: [{ scale: card1Anim }] }
            ]}
          >
            <View style={styles.featureIconContainer}>
              <Image
                source={require('../../assets/images/robot.png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>AI Analysis</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.featureCard, 
              styles.featureCard2,
              { transform: [{ scale: card2Anim }] }
            ]}
          >
            <View style={styles.featureIconContainer}>
              <Image
                source={require('../../assets/images/check.png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>Personalized</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.featureCard, 
              styles.featureCard3,
              { transform: [{ scale: card3Anim }] }
            ]}
          >
            <View style={styles.featureIconContainer}>
              <Image
                source={require('../../assets/images/thunder.png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>Fast Results</Text>
          </Animated.View>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustBadge}>
          <Text style={styles.trustText}>Trusted by thousands worldwide</Text>
        </View>
      </Animated.View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.continueButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Takes less than 2 minutes</Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoGlowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    backgroundColor: 'transparent',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  brandHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  featureCard: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureCard1: {
    borderTopWidth: 3,
    borderTopColor: BRAND_COLORS.primary,
  },
  featureCard2: {
    borderTopWidth: 3,
    borderTopColor: '#4A90E2',
  },
  featureCard3: {
    borderTopWidth: 3,
    borderTopColor: BRAND_COLORS.secondary,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 28,
    height: 28,
    tintColor: BRAND_COLORS.black,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
  },
  trustBadge: {
    alignItems: 'center',
    marginTop: 20,
  },
  trustText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
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
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    maxWidth: 300,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});