import { Platform } from 'react-native';
import { shouldEnableFacebookPixel } from './facebookToggle';

let AppEventsLogger = null;
let Settings = null;
let Tracking = null;

try {
  const FBSDK = require('react-native-fbsdk-next');
  AppEventsLogger = FBSDK.AppEventsLogger;
  Settings = FBSDK.Settings;
} catch (e) {
  console.log('Facebook SDK not available:', e.message);
}

if (Platform.OS === 'ios') {
  try {
    Tracking = require('expo-tracking-transparency');
  } catch (e) {
    console.log('Tracking not available');
  }
}

export const initializeFacebookPixel = async () => {
  if (!shouldEnableFacebookPixel() || !Settings) {
    console.log('Facebook Pixel: DISABLED');
    return;
  }

  try {
    if (Platform.OS === 'ios' && Tracking) {
      const { status } = await Tracking.requestTrackingPermissionsAsync();
      await Settings.setAdvertiserTrackingEnabled(status === 'granted');
    }
    await Settings.initializeSDK();
    console.log('Facebook Pixel: Initialized on', Platform.OS);
  } catch (error) {
    console.log('Facebook Pixel error:', error.message);
  }
};

export const trackFacebookEvent = async (eventName, parameters = {}) => {
  if (!shouldEnableFacebookPixel() || !AppEventsLogger) return;
  try {
    AppEventsLogger.logEvent(eventName, parameters);
    console.log('Facebook event:', eventName);
  } catch (error) {
    console.log('Facebook tracking error:', error.message);
  }
};

export const trackOnboardingWelcome = () => {
  trackFacebookEvent('OnboardingWelcome');
};

export const trackPaywallViewed = () => {
  trackFacebookEvent('ViewContent', {
    content_type: 'paywall',
    content_id: 'dracne_paywall',
  });
};

export const trackSubscriptionStarted = (plan, price) => {
  if (!AppEventsLogger) return;
  try {
    AppEventsLogger.logPurchase(price, 'USD', { plan });
    console.log('Facebook purchase tracked:', plan, price);
  } catch (e) {
    console.log('Facebook purchase error:', e.message);
  }
};

export const trackOnboardingComplete = () => {
  trackFacebookEvent('CompleteRegistration', {
    registration_method: 'DrAcne',
  });
};
