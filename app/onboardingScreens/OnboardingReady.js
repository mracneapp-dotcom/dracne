// app/onboardingScreens/OnboardingReady.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
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
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
};

export default function OnboardingReady({ onNext }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, []);

  const handleGetStarted = () => {
    onNext('onboardingPrivacy', { ready: true }); // ✓ UPDATED to follow correct flow
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* AI Brain Icon */}
        <Animated.View 
          style={[
            styles.aiIconContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <View style={styles.aiIcon}>
            <Image 
              source={require('../../assets/images/brain.png')} 
              style={styles.brainImage}
              resizeMode="contain"
            />
            <Animated.View 
              style={[
                styles.glowRing,
                { opacity: glowAnim }
              ]}
            />
          </View>
        </Animated.View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            Ready to unlock your skin's{'\n'}
            <Text style={styles.aiHighlight}>AI insights?</Text>
          </Text>
          <Text style={styles.questionSubtitle}>
            Our advanced AI will analyze your skin and create a personalized routine just for you
          </Text>
        </View>

        {/* Enhanced Features Grid */}
        <View style={styles.featuresGrid}>
          <Animated.View 
            style={[
              styles.featureCard,
              styles.featureCard1,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <View style={styles.featureIcon}>
              <Image 
                source={require('../../assets/images/robot.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>AI Detection</Text>
            <Text style={styles.featureDesc}>Advanced computer vision</Text>
          </Animated.View>

          <View style={[styles.featureCard, styles.featureCard2]}>
            <View style={styles.featureIcon}>
              <Image 
                source={require('../../assets/images/thunder.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>Instant Results</Text>
            <Text style={styles.featureDesc}>Analysis in seconds</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard3]}>
            <View style={styles.featureIcon}>
              <Image 
                source={require('../../assets/images/gift.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.featureTitle}>Personalized</Text>
            <Text style={styles.featureDesc}>Tailored just for you</Text>
          </View>
        </View>

        {/* AI Processing Preview */}
        <View style={styles.processingPreview}>
          <Text style={styles.processingText}>AI Processing Preview:</Text>
          <View style={styles.processingSteps}>
            <View style={styles.processingStep}>
              <Animated.View 
                style={[
                  styles.processingDot,
                  styles.activeDot,
                  { opacity: glowAnim }
                ]}
              />
              <Text style={styles.stepText}>Scan</Text>
            </View>
            <View style={styles.processingArrow} />
            <View style={styles.processingStep}>
              <View style={[styles.processingDot, styles.activeDot]} />
              <Text style={styles.stepText}>Analyze</Text>
            </View>
            <View style={styles.processingArrow} />
            <View style={styles.processingStep}>
              <View style={styles.processingDot} />
              <Text style={styles.stepText}>Recommend</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Bottom Section */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title="I'm Ready!"
          onPress={handleGetStarted}
          style={styles.getStartedButton}
        />
        
        <Text style={styles.helperText}>
          Takes less than 30 seconds • 100% Private
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
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  aiIconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  aiIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainImage: {
    width: 60,
    height: 60,
    tintColor: BRAND_COLORS.primary,
  },
  glowRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    backgroundColor: 'transparent',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  aiHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  featureCard: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
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
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: BRAND_COLORS.darkGray,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 10,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 14,
  },
  processingPreview: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  processingText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  processingSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingStep: {
    alignItems: 'center',
  },
  processingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    marginBottom: 8,
  },
  activeDot: {
    backgroundColor: BRAND_COLORS.primary,
  },
  stepText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    fontWeight: '500',
  },
  processingArrow: {
    width: 20,
    height: 2,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  getStartedButton: {
    marginBottom: 16,
    width: '100%',
  },
  helperText: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});