// TikTok Business SDK tracking
// App ID (iOS): 6755008898
// TikTok App ID: 7637256358793887762

let TikTokSDK = null;

try {
  TikTokSDK = require('@layers/expo-tiktok-business').default;
} catch (e) {
  console.log('TikTok SDK not available:', e.message);
}

export const initializeTikTok = async () => {
  if (!TikTokSDK) {
    console.log('TikTok: SDK not available');
    return;
  }
  try {
    await TikTokSDK.initialize(
      { ios: 'com.aleboshi.dracne', android: 'com.aleboshi.dracne' },
      { ios: '7637256358793887762', android: '7637256358793887762' },
      { debugMode: __DEV__ }
    );
    console.log('TikTok: Initialized');
  } catch (error) {
    console.log('TikTok init error:', error.message);
  }
};

const trackTikTokEvent = async (eventName, properties = {}) => {
  if (!TikTokSDK) return;
  try {
    await TikTokSDK.trackEvent(eventName, properties);
    console.log('TikTok event:', eventName);
  } catch (error) {
    console.log('TikTok tracking error:', error.message);
  }
};

export const trackTikTokOnboardingWelcome = () => trackTikTokEvent('LaunchAPP');
export const trackTikTokPaywallViewed = () => trackTikTokEvent('ViewContent', { content_type: 'paywall' });
export const trackTikTokSubscriptionStarted = (plan, price) => trackTikTokEvent('CompletePayment', { value: price, currency: 'USD', description: plan });
export const trackTikTokOnboardingComplete = () => trackTikTokEvent('Registration');
