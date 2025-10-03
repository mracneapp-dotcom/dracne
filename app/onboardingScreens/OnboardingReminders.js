// app/onboardingScreens/OnboardingReminders.js
import Constants from 'expo-constants';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
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

export default function OnboardingReminders({ onNext }) {
  const isExpoGo = Constants.appOwnership === 'expo';
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createTapAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation = createTapAnimation();
    animation.start();

    return () => {
      animation.stop();
    };
  }, [bounceAnim]);

  const handleAllow = () => {
    if (isExpoGo) {
      Alert.alert(
        'Notifications Enabled!',
        'In the real app, this will open your phone settings. For now, we\'ll continue with reminders enabled.',
        [{ text: 'Continue', onPress: () => proceedWithNotifications(true) }]
      );
    } else {
      openNotificationSettings();
    }
  };

  const handleDontAllow = () => {
    proceedWithNotifications(false);
  };

  const handleSkip = () => {
    proceedWithNotifications(false);
  };

  const handleContinue = () => {
    proceedWithNotifications(false);
  };

  const openNotificationSettings = async () => {
    try {
      const { Linking } = require('react-native');
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.log('Error opening settings:', error);
    }
  };

  const proceedWithNotifications = (enabled) => {
    onNext('onboardingRating', {
      reminders: {
        morning: { enabled: enabled, time: '8:00 AM' },
        evening: { enabled: enabled, time: '10:00 PM' },
      },
      notificationsEnabled: enabled,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reach your goals with</Text>
          <Text style={styles.titleBold}>notifications</Text>
        </View>

        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Tap "Continue" and allow notifications to stay on track
          </Text>
        </View>

        {/* Simple Notification Dialog */}
        <View style={styles.mockDialogContainer}>
          <View style={styles.mockDialog}>
            <View style={styles.mockDialogContent}>
              <Text style={styles.mockDialogTitle}>
                Dr. Acne would like to send you
              </Text>
              <Text style={styles.mockDialogTitle}>
                Notifications
              </Text>
            </View>

            <View style={styles.mockButtonsContainer}>
              <TouchableOpacity 
                style={styles.mockButtonLeft}
                onPress={handleDontAllow}
              >
                <Text style={styles.mockButtonTextLeft}>Don't Allow</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.mockButtonRight}
                onPress={handleAllow}
              >
                <Text style={styles.mockButtonTextRight}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Animated Pointing Hand */}
          <Animated.View 
            style={[
              styles.pointingImageContainer,
              {
                transform: [{ translateY: bounceAnim }]
              }
            ]}
          >
            <Image
              source={require('../../assets/images/pointing.png')}
              style={styles.pointingImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Why This Helps Section */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Why this helps:</Text>
          <Text style={styles.benefitItem}>• Consistency is the key to clear skin</Text>
          <Text style={styles.benefitItem}>• Build lasting skincare habits</Text>
          <Text style={styles.benefitItem}>• Track your progress easily</Text>
        </View>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Skip Option */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
          <Text style={styles.skipText}>I'll set this up later</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <DrAcneButton
            title="Continue"
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '400',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 32,
  },
  titleBold: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 32,
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 32,
  },
  instructionText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  mockDialogContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  mockDialog: {
    width: '100%',
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  mockDialogContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  mockDialogTitle: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  mockButtonsContainer: {
    flexDirection: 'row',
  },
  mockButtonLeft: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
  },
  mockButtonRight: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: BRAND_COLORS.black,
    alignItems: 'center',
  },
  mockButtonTextLeft: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.black,
  },
  mockButtonTextRight: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
  pointingImageContainer: {
    marginTop: 12,
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: '25%',
  },
  pointingImage: {
    width: 40,
    height: 40,
    tintColor: BRAND_COLORS.primary,
  },
  benefitsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  benefitItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
    marginBottom: 4,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'transparent', // ✓ CHANGED from BRAND_COLORS.white
  },
  skipContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  skipText: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 16,
  },
});