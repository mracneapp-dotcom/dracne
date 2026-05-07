// app/onboardingScreens/OnboardingReminders.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';
import { t } from '../i18n';
import {
  requestNotificationPermissions,
  scheduleDailyReminders,
} from '../utils/notificationService';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export default function OnboardingReminders({ onNext }) {
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

  const handleAllow = async () => {
    try {
      const granted = await requestNotificationPermissions();
      if (granted) {
        await scheduleDailyReminders('8:00 AM', '10:00 PM');
        proceedWithNotifications(true);
      } else {
        proceedWithNotifications(false);
      }
    } catch (error) {
      console.log('Notification setup error:', error.message);
      proceedWithNotifications(false);
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
          <Text style={styles.title}>
            {t('onboarding.reminders.title1')} <Text style={styles.titleHighlight}>{t('onboarding.reminders.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('onboarding.reminders.subtitle')}
          </Text>
        </View>

        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {t('onboarding.reminders.instruction')}
          </Text>
        </View>

        {/* Simple Notification Dialog */}
        <View style={styles.mockDialogContainer}>
          <View style={styles.mockDialog}>
            <View style={styles.mockDialogContent}>
              <Text style={styles.mockDialogTitle}>
                {t('onboarding.reminders.dialog_title1')}
              </Text>
              <Text style={styles.mockDialogTitle}>
                {t('onboarding.reminders.dialog_title2')}
              </Text>
            </View>

            <View style={styles.mockButtonsContainer}>
              <TouchableOpacity 
                style={styles.mockButtonLeft}
                onPress={handleDontAllow}
              >
                <Text style={styles.mockButtonTextLeft}>{t('onboarding.reminders.dialog_dont_allow')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.mockButtonRight}
                onPress={handleAllow}
              >
                <Text style={styles.mockButtonTextRight}>{t('onboarding.reminders.dialog_allow')}</Text>
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
          <Text style={styles.benefitsTitle}>{t('onboarding.reminders.benefits_title')}</Text>
          <Text style={styles.benefitItem}>{t('onboarding.reminders.benefit1')}</Text>
          <Text style={styles.benefitItem}>{t('onboarding.reminders.benefit2')}</Text>
          <Text style={styles.benefitItem}>{t('onboarding.reminders.benefit3')}</Text>
        </View>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Skip Option */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
          <Text style={styles.skipText}>{t('onboarding.reminders.skip')}</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <DrAcneButton
            title={t('onboarding.reminders.button')}
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
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
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
    backgroundColor: 'transparent',
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