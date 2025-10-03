// app/onboardingScreens/OnboardingGenerating.js
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

const GENERATING_STEPS = [
  'Analyzing your skin concerns...',
  'Processing your skin type...',
  'Reviewing your goals...',
  'Customizing your routine...',
  'Almost ready...',
];

export default function OnboardingGenerating({ onNext }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < GENERATING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 60);

    const navigationTimeout = setTimeout(() => {
      onNext('onboardingPlanReady', { generationComplete: true });
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(navigationTimeout);
    };
  }, [onNext]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Main Title */}
        <Text style={styles.title}>Creating Your</Text>
        <Text style={styles.titleHighlight}>Personalized Plan</Text>

        {/* Loading Spinner */}
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={BRAND_COLORS.primary} />
        </View>

        {/* Current Step Text */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            {GENERATING_STEPS[currentStep]}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.min(progress, 100)}%</Text>
        </View>

        {/* Helper Text */}
        <Text style={styles.helperText}>
          This will only take a moment...
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
    backgroundColor: 'transparent', // ✓ Already correct
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 34,
  },
  titleHighlight: {
    fontSize: 32,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 38,
  },
  spinnerContainer: {
    marginBottom: 32,
  },
  stepContainer: {
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  helperText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
});