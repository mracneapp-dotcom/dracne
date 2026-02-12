// app/utils/facebookPixel.js
import { Platform } from 'react-native';
import { shouldEnableFacebookPixel } from './facebookToggle';

// iOS ONLY: Conditional imports
let Facebook = null;
let Tracking = null;

if (Platform.OS === 'ios') {
  try {
    Facebook = require('expo-facebook');
    Tracking = require('expo-tracking-transparency');
  } catch (e) {
    console.log('Facebook SDK not available');
  }
}

export const initializeFacebookPixel = async () => {
  if (!shouldEnableFacebookPixel() || Platform.OS !== 'ios' || !Facebook) {
    console.log('🚫 Facebook Pixel: DISABLED');
    return;
  }

  try {
    const { status } = await Tracking.requestTrackingPermissionsAsync();
    
    if (status === 'granted') {
      await Facebook.setAdvertiserTrackingEnabledAsync(true);
    } else {
      await Facebook.setAdvertiserTrackingEnabledAsync(false);
    }

    await Facebook.initializeAsync({
      appId: '4296363337358170',
      appName: 'Dr. Acne',
    });
    console.log('✅ Facebook Pixel: Initialized');
  } catch (error) {
    console.error('Facebook Pixel error:', error);
  }
};

export const trackFacebookEvent = async (eventName, parameters = {}) => {
  if (!shouldEnableFacebookPixel() || Platform.OS !== 'ios' || !Facebook) return;

  try {
    await Facebook.logEventAsync(eventName, parameters);
    console.log(`📊 Facebook: ${eventName}`);
  } catch (error) {
    console.error('Facebook tracking error:', error);
  }
};

// Predefined events
export const trackOnboardingWelcome = () => {
  trackFacebookEvent('OnboardingWelcome');
};

export const trackPaywallViewed = () => {
  trackFacebookEvent('PaywallViewed');
};

export const trackSubscriptionStarted = (plan) => {
  trackFacebookEvent('SubscriptionStarted', { plan });
};