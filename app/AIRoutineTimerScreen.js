// app/AIRoutineTimerScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, Dimensions, Image
} from 'react-native';
import { auth, db } from '../config/firebase';
import Svg, { Circle } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.65;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function AIRoutineTimerScreen({
  onBack,
  onComplete,
  routineType,
}) {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const elapsedRef = useRef(null);

  useEffect(() => {
    loadRoutine();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    elapsedRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(elapsedRef.current);
  }, [hasStarted]);

  const loadRoutine = async () => {
    try {
      // Try authenticated user first
      if (auth.currentUser) {
        try {
          const docRef = doc(db, 'users', auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().aiRoutine) {
            const routine = docSnap.data().aiRoutine;
            setSteps(routine[routineType] || []);
            setLoading(false);
            return;
          }
        } catch (authErr) {
          console.log('Auth user fetch failed, trying device:', authErr.message);
        }
      }

      // Try device-based doc
      const deviceId = Application.applicationId + '_' +
        ((await Application.getIosIdForVendorAsync()) ||
         Application.getAndroidId() ||
         'unknown');

      try {
        const deviceRef = doc(db, 'devices', deviceId);
        const deviceSnap = await getDoc(deviceRef);
        if (deviceSnap.exists() && deviceSnap.data().aiRoutine) {
          const routine = deviceSnap.data().aiRoutine;
          setSteps(routine[routineType] || []);
          setLoading(false);
          return;
        }
      } catch (deviceErr) {
        console.log('Device fetch failed:', deviceErr.message);
      }

      // No routine found
      setSteps([]);
    } catch (error) {
      console.log('Error loading AI routine:', error.message);
      setSteps([]);
    } finally {
      setLoading(false);
    }
  };

  // Set up timer and countdown when step changes or hasStarted changes
  useEffect(() => {
    if (steps.length === 0 || !hasStarted) return;

    const currentStep = steps[currentStepIndex];
    const waitTime = currentStep?.waitSeconds > 0
      ? currentStep.waitSeconds
      : 60;

    // Set state
    setIsWaiting(true);
    setTimeLeft(waitTime);

    // Start arc animation
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: waitTime * 1000,
      useNativeDriver: false,
    }).start();

    // Start countdown directly here - no dependency on isWaiting state
    let remaining = waitTime;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setIsWaiting(false);
      }
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentStepIndex, steps, hasStarted]);

  const handleNext = () => {
    setHasStarted(false);
    progressAnim.setValue(0);
    clearInterval(timerRef.current);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      const key = routineType === 'am' ? 'lastAMComplete' : 'lastPMComplete';
      AsyncStorage.setItem(key, new Date().toISOString());
      setTimeout(() => onComplete(), 1500);
    }
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ':' + String(s).padStart(2, '0');
  };

  const totalRoutineSeconds = steps.reduce((acc, step) =>
    acc + (step.waitSeconds || 0) + 60, 0);

  return (
    <View style={styles.fullScreen}>
      <SafeAreaView style={styles.container}>
        {/* Header -- matches app style */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Image
              source={require('../assets/images/dracne-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {routineType === 'am' ? 'Morning Routine' : 'Night Routine'}
          </Text>
          <TouchableOpacity onPress={onBack} style={styles.doneButton}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>


        {loading && (
          <View style={styles.centerContent}>
            <Text style={styles.loadingText}>Loading your routine...</Text>
          </View>
        )}

        {!loading && steps.length === 0 && (
          <View style={styles.centerContent}>
            <Text style={styles.emptyTitle}>
              Your AI routine is being prepared
            </Text>
            <Text style={styles.emptySubtext}>
              Complete onboarding to generate your personalized plan
            </Text>
            <TouchableOpacity style={styles.button} onPress={onBack}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && steps.length > 0 && (
          <View style={styles.content}>
            {/* Duration tracker */}
            <View style={styles.durationBar}>
              <Text style={styles.durationText}>
                {formatDuration(elapsedSeconds)}
                {' / '}
                {formatDuration(totalRoutineSeconds)}
              </Text>
              <Text style={styles.durationLabel}>today's routine</Text>
            </View>

            {/* Progress dots */}
            <View style={styles.progressDots}>
              {steps.map((_, i) => (
                <View key={i} style={[
                  styles.dot,
                  i === currentStepIndex && styles.dotActive,
                  i < currentStepIndex && styles.dotComplete,
                ]} />
              ))}
            </View>

            {/* Circle -- centered with flex */}
            <View style={styles.circleContainer}>
              <TouchableOpacity
                style={styles.circleOuter}
                onPress={() => {
                  if (!hasStarted) {
                    setHasStarted(true);
                  }
                }}
                activeOpacity={hasStarted ? 1 : 0.7}
              >
                <Svg
                  width={CIRCLE_SIZE}
                  height={CIRCLE_SIZE}
                  style={styles.svgAbsolute}
                >
                  {/* Gray background track */}
                  <Circle
                    cx={CIRCLE_SIZE / 2}
                    cy={CIRCLE_SIZE / 2}
                    r={RADIUS}
                    stroke="#E8E8E8"
                    strokeWidth={STROKE_WIDTH}
                    fill="none"
                  />
                  {/* Green progress arc -- grows clockwise from top */}
                  <AnimatedCircle
                    cx={CIRCLE_SIZE / 2}
                    cy={CIRCLE_SIZE / 2}
                    r={RADIUS}
                    stroke={BRAND_COLORS.primary}
                    strokeWidth={STROKE_WIDTH}
                    fill="none"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [CIRCUMFERENCE, 0],
                    })}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
                  />
                </Svg>

                {/* Center content */}
                <View style={styles.circleCenterContent}>
                  {!hasStarted && (
                    <>
                      <Text style={styles.stepNumber}>
                        Step {currentStepIndex + 1} of {steps.length}
                      </Text>
                      <Text style={styles.productName}>
                        {steps[currentStepIndex]?.product}
                      </Text>
                      <Text style={styles.tapToStartText}>Tap to start</Text>
                    </>
                  )}
                  {hasStarted && (
                    <>
                      <Text style={styles.stepNumber}>
                        Step {currentStepIndex + 1} of {steps.length}
                      </Text>
                      <Text style={styles.productName}>
                        {steps[currentStepIndex]?.product}
                      </Text>
                      {isWaiting && (
                        <Text style={styles.timerText}>
                          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </Text>
                      )}
                      {!isWaiting && (
                        <Text style={styles.applyText}>Apply now</Text>
                      )}
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            {/* Benefit */}
            <Text style={styles.benefitText}>
              {steps[currentStepIndex]?.benefit}
            </Text>

            {/* Main button */}
            <TouchableOpacity
              style={[styles.button, isWaiting && styles.buttonDisabled]}
              onPress={handleNext}
              disabled={isWaiting}
            >
              <Text style={styles.buttonText}>
                {isWaiting
                  ? 'Wait ' + Math.floor(timeLeft / 60) + ':' + String(timeLeft % 60).padStart(2, '0')
                  : currentStepIndex < steps.length - 1
                    ? 'Next Step'
                    : 'Complete Routine'
                }
              </Text>
            </TouchableOpacity>

            {/* Skip link -- always visible */}
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleNext}
            >
              <Text style={styles.skipText}>Skip and continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Complete overlay */}
        {isComplete && (
          <View style={styles.completeOverlay}>
            <Image
              source={require('../assets/images/Mascot party.png')}
              style={styles.mascotParty}
              resizeMode="contain"
            />
            <Text style={styles.completeText}>Routine Complete!</Text>
            <Text style={styles.completeSubtext}>
              {formatDuration(elapsedSeconds)} · great job taking care of your skin
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logoImage: {
    width: 60,
    height: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  doneButton: {
    padding: 4,
  },
  doneText: {
    color: BRAND_COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  durationBar: {
    alignItems: 'center',
    marginBottom: 8,
  },
  durationText: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
  },
  durationLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    backgroundColor: BRAND_COLORS.primary,
    width: 20,
    borderRadius: 4,
  },
  dotComplete: {
    backgroundColor: BRAND_COLORS.primary + '60',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circleOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  svgAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circleTrack: {},
  progressRing: {},
  circleCenterMask: { backgroundColor: 'transparent' },
  halfCircleRight: {},
  halfCircleLeft: {},
  greenRingOverlay: {},
  circleCenterContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 4,
    width: CIRCLE_SIZE - 30,
  },
  stepNumber: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  productName: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 16,
    color: '#1a1a1a',
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginTop: 8,
  },
  applyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  tapToStartText: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    marginTop: 12,
    padding: 8,
  },
  skipText: {
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  completeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FAFBFC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  mascotParty: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  completeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  completeSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});
