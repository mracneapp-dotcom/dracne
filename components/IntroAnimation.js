import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
};

export default function IntroAnimation({ onComplete }) {
  // Nodule animation
  const noduleScale = useRef(new Animated.Value(1)).current;
  const noduleOpacity = useRef(new Animated.Value(1)).current;
  
  // Finger animations (left and right)
  const leftFingerX = useRef(new Animated.Value(-100)).current;
  const rightFingerX = useRef(new Animated.Value(100)).current;
  
  // Logo animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      // First squeeze attempt (0-0.6s)
      Animated.parallel([
        Animated.timing(leftFingerX, {
          toValue: -20,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rightFingerX, {
          toValue: 20,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(noduleScale, {
          toValue: 0.85,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      
      // Release (0.6-1.3s)
      Animated.parallel([
        Animated.timing(leftFingerX, {
          toValue: -100,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(rightFingerX, {
          toValue: 100,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(noduleScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      
      // Second squeeze attempt (1.3-2.2s)
      Animated.parallel([
        Animated.timing(leftFingerX, {
          toValue: -15,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rightFingerX, {
          toValue: 15,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(noduleScale, {
          toValue: 0.7,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      
      // Pop! (2.2-2.5s)
      Animated.parallel([
        Animated.timing(noduleScale, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(noduleOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(leftFingerX, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rightFingerX, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      
      // Logo appears (2.5-4s)
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start(() => {
      // Hold the logo for 1 second before transitioning
      setTimeout(() => {
        onComplete();
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Red nodule in center */}
      <Animated.View
        style={[
          styles.nodule,
          {
            transform: [{ scale: noduleScale }],
            opacity: noduleOpacity,
          },
        ]}
      />

      {/* Left finger shadow */}
      <Animated.View
        style={[
          styles.finger,
          styles.leftFinger,
          {
            transform: [{ translateX: leftFingerX }],
          },
        ]}
      />

      {/* Right finger shadow */}
      <Animated.View
        style={[
          styles.finger,
          styles.rightFinger,
          {
            transform: [{ translateX: rightFingerX }],
          },
        ]}
      />

      {/* Dr.Acne Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../assets/images/dracne-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BRAND_COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodule: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BRAND_COLORS.secondary,
    position: 'absolute',
  },
  finger: {
    width: 80,
    height: 120,
    backgroundColor: '#F5D5C8',
    position: 'absolute',
    opacity: 0.7,
  },
  leftFinger: {
    left: 0,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  rightFinger: {
    right: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
});