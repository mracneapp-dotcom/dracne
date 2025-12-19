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
import { t } from '../i18n';

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
  
  const logoPulseAnim = useRef(new Animated.Value(1)).current;
  const logoGlowAnim = useRef(new Animated.Value(0.3)).current;
  
  const card1Anim = useRef(new Animated.Value(1)).current;
  const card2Anim = useRef(new Animated.Value(1)).current;
  const card3Anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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

    const cardsPulse = Animated.loop(
      Animated.stagger(400, [
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
          Animated.delay(1200),
        ]),
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
          Animated.delay(800),
        ]),
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
          Animated.delay(400),
        ]),
      ])
    );

    logoPulse.start();
    logoGlow.start();
    
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

        <View style={styles.heroSection}>
          <Text style={styles.mainTitle}>
            {t('onboarding.welcome.title')}{'\n'}
            <Text style={styles.brandHighlight}>{t('onboarding.welcome.appName')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('onboarding.welcome.subtitle')}
          </Text>
        </View>

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
            <Text style={styles.featureTitle}>{t('onboarding.welcome.feature1')}</Text>
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
            <Text style={styles.featureTitle}>{t('onboarding.welcome.feature2')}</Text>
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
            <Text style={styles.featureTitle}>{t('onboarding.welcome.feature3')}</Text>
          </Animated.View>
        </View>

        <View style={styles.trustBadge}>
          <Text style={styles.trustText}>{t('onboarding.welcome.trust')}</Text>
        </View>
      </Animated.View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.continueButtonText}>{t('onboarding.welcome.button')}</Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>{t('onboarding.welcome.helper')}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 12,
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
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 16,
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