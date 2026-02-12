// app/utils/facebookToggle.js
import { Platform } from 'react-native';

// ==========================================
// 🎚️ FACEBOOK PIXEL TOGGLE
// ==========================================
export const ENABLE_FACEBOOK_PIXEL = false; // ⬅️ SINGLE TOGGLE, Android build

export const shouldEnableFacebookPixel = () => {
  return Platform.OS === 'ios' && ENABLE_FACEBOOK_PIXEL;
};

console.log('📊 Facebook Pixel:', shouldEnableFacebookPixel() ? 'ENABLED' : 'DISABLED');