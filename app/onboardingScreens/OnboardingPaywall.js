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

export default function OnboardingPaywall({ onNext, onboardingData = {} }) {
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    const animateLoop = () => {
      slideAnim.setValue(SCREEN_WIDTH);
      
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -SCREEN_WIDTH,
            duration: 800,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(animateLoop, 500);
          });
        }, 3000);
      });
    };

    animateLoop();
  }, [slideAnim]);

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
          Experience Dr. Acne{'\n'}for free.
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
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <Image
            source={require('../../assets/images/mockup1.png')}
            style={styles.mockupImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsContainer}>
        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>No Payment Due Now</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>AI-Powered Acne Detection</Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>Personalized Skincare Plans</Text>
        </View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent', // ✓ ADDED
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  mockupContainer: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent', // ✓ ADDED
  },
  mockupWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupImage: {
    width: 200,
    height: 270,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  benefitsContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
    backgroundColor: 'transparent', // ✓ ADDED
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: BRAND_COLORS.primary,
    fontWeight: '700',
    marginRight: 10,
  },
  benefitText: {
    fontSize: 15,
    color: BRAND_COLORS.black,
    fontWeight: '500',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    backgroundColor: 'transparent', // ✓ CHANGED from implicit default - THIS WAS THE ISSUE!
  },
  continueButton: {
    paddingVertical: 18,
    marginBottom: 12,
  },
  pricingText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },
});