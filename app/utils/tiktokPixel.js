// TikTok Business SDK tracking
// App ID: com.aleboshi.dracne
// TikTok App ID: 7637256358793887762

let TiktokBusiness = null;

try {
  TiktokBusiness = require('react-native-tiktok-business').default;
} catch (e) {
  console.log('TikTok SDK not available:', e.message);
}

export const initializeTikTok = async () => {
  if (!TiktokBusiness) {
    console.log('TikTok: SDK not available');
    return;
  }
  try {
    console.log('TikTok: Initialized');
  } catch (error) {
    console.log('TikTok init error:', error.message);
  }
};

const trackTikTokEvent = (eventName, props = []) => {
  if (!TiktokBusiness) return;
  try {
    TiktokBusiness.trackEvent(eventName, null, props);
    console.log('TikTok event:', eventName);
  } catch (error) {
    console.log('TikTok tracking error:', error.message);
  }
};

export const trackTikTokOnboardingWelcome = () => trackTikTokEvent('LaunchAPP');
export const trackTikTokPaywallViewed = () => trackTikTokEvent('ViewContent', [{ key: 'content_type', value: 'paywall' }]);
export const trackTikTokSubscriptionStarted = (plan, price) => trackTikTokEvent('Purchase', [
  { key: 'currency', value: 'USD' },
  { key: 'value', value: String(price) },
  { key: 'description', value: plan },
]);
export const trackTikTokOnboardingComplete = () => trackTikTokEvent('CompleteRegistration');
