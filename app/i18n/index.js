// app/i18n/index.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en.json';
import es from './es.json';

const i18n = new I18n({
  en,
  es,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// ⚠️ TESTING MODE - FORCE SPANISH
const FORCE_SPANISH_FOR_TESTING = false; // ✅ CHANGED TO false - USE PHONE LANGUAGE

export const initializeLanguage = async () => {
  try {
    // 🇪🇸 FORCE SPANISH FOR TESTING
    if (FORCE_SPANISH_FOR_TESTING) {
      i18n.locale = 'es';
      await AsyncStorage.setItem('userLanguage', 'es');
      console.log('✅ Language FORCED to Spanish for testing');
      return;
    }

    // Normal auto-detection (for production)
    const savedLanguage = await AsyncStorage.getItem('userLanguage');
    
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      console.log('✅ Language loaded from storage:', savedLanguage);
    } else {
      let deviceLanguage = 'en';
      
      try {
        const locales = Localization.getLocales();
        if (locales && locales.length > 0) {
          deviceLanguage = locales[0].languageCode;
        }
      } catch (error) {
        console.log('⚠️ getLocales() not available, using fallback');
        if (Localization.locale) {
          deviceLanguage = Localization.locale.split('-')[0];
        }
      }

      const supportedLanguage = deviceLanguage === 'es' ? 'es' : 'en';
      i18n.locale = supportedLanguage;
      await AsyncStorage.setItem('userLanguage', supportedLanguage);
      console.log('✅ Language initialized:', supportedLanguage);
    }
  } catch (error) {
    console.error('Error initializing language:', error);
    i18n.locale = 'en';
  }
};

export const changeLanguage = async (language) => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem('userLanguage', language);
    console.log('✅ Language changed to:', language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

export const t = (key, params) => {
  return i18n.t(key, params);
};

export const getCurrentLanguage = () => {
  return i18n.locale;
};