// app/onboardingScreens/OnboardingGenerating.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const GENERATION_STEPS = [
  { text: 'Analyzing your skin profile', delay: 0 },
  { text: 'Matching ingredients to your needs', delay: 800 },
  { text: 'Creating your personalized routine', delay: 1600 },
  { text: 'Finalizing recommendations', delay: 2400 },
];

export default function OnboardingGenerating({ onNext }) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeAnims = useRef(GENERATION_STEPS.map(() => new Animated.Value(0))).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entry animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Spinning animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Fade in steps sequentially
    const stepAnimations = fadeAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: GENERATION_STEPS[index].delay,
        useNativeDriver: true,
      })
    );

    Animated.parallel(stepAnimations).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      onNext('onboardingPlanReady', { planGenerated: true });
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.iconContainer}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <View style={styles.loadingCircle}>
              <Image
                source={require('../../assets/images/brain.png')}
                style={styles.brainIcon}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            Creating Your <Text style={styles.titleHighlight}>Perfect Plan</Text>
          </Text>
          <Text style={styles.subtitle}>
            Hang tight, our AI is working its magic
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {GENERATION_STEPS.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.stepRow,
                { opacity: fadeAnims[index] }
              ]}
            >
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>{step.text}</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  loadingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  brainIcon: {
    width: 50,
    height: 50,
    tintColor: BRAND_COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
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
  },
  stepsContainer: {
    width: '100%',
    maxWidth: 320,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BRAND_COLORS.primary,
    marginRight: 14,
  },
  stepText: {
    fontSize: 15,
    color: BRAND_COLORS.black,
    flex: 1,
    lineHeight: 20,
  },
});