import { Platform } from 'react-native';

// Platform-specific payment handling
// iOS: Uses expo-in-app-purchases (working)
// Android: Coming soon (allows build to succeed)

export const PAYMENTS_AVAILABLE = Platform.OS === 'ios';

export const initializePurchases = async () => {
  if (Platform.OS === 'ios') {
    const InAppPurchases = require('expo-in-app-purchases');
    await InAppPurchases.connectAsync();
    return InAppPurchases;
  }
  return null;
};

export const getPurchaseModule = () => {
  if (Platform.OS === 'ios') {
    return require('expo-in-app-purchases');
  }
  return null;
};