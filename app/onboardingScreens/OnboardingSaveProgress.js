// app/onboardingScreens/OnboardingSaveProgress.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../config/firebase';
import { AuthService } from '../../services/AuthService';
import { t } from '../i18n';

WebBrowser.maybeCompleteAuthSession();

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export default function OnboardingSaveProgress({ onNext, onboardingData = {} }) {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '338991525353-1r9lu6pl024a1vrf7mlg7k77pqj6vrvc.apps.googleusercontent.com',
    iosClientId: '338991525353-kvd8elr7d227p8493is5qnda0aq2cd5e.apps.googleusercontent.com',
    webClientId: '338991525353-1r9lu6pl024a1vrf7mlg7k77pqj6vrvc.apps.googleusercontent.com',
  });

  useEffect(() => {
    console.log('🔍 Response type:', response?.type);
    console.log('🔍 Response params:', response?.params);
    
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('✅ Got ID token, proceeding...');
      handleGoogleSuccess(id_token);
    } else if (response?.type === 'error') {
      console.error('❌ Auth error:', response.error);
      Alert.alert('Authentication Error', response.error?.message || 'Unknown error');
    }
  }, [response]);

  const handleGoogleSuccess = async (idToken) => {
    setLoading(true);
    try {
      console.log('🔐 Signing in with credential...');
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      
      console.log('✅ User signed in:', userCredential.user.email);
      
      await AuthService.saveUserData(userCredential.user.uid, {
        ...onboardingData,
        signInMethod: 'google',
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      });

      console.log('✅ User data saved');

      onNext('onboardingPaywall', {
        ...onboardingData,
        userId: userCredential.user.uid,
        signInMethod: 'google',
        accountCreated: true,
      });
    } catch (error) {
      console.error('❌ Sign in error:', error);
      Alert.alert('Sign In Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert(
        t('onboarding.paywall.alert_not_available'),
        t('onboarding.paywall.alert_apple_ios_only')
      );
      return;
    }

    setLoading(true);
    try {
      console.log('🍎 Starting Apple Sign In...');
      const result = await AuthService.signInWithApple();
      
      if (result.success) {
        console.log('✅ Apple Sign In successful:', result.user.email);
        
        await AuthService.saveUserData(result.user.uid, {
          ...onboardingData,
          signInMethod: 'apple',
          email: result.user.email,
          displayName: result.user.displayName,
        });

        onNext('onboardingPaywall', {
          ...onboardingData,
          userId: result.user.uid,
          signInMethod: 'apple',
          accountCreated: true,
        });
      } else {
        if (result.error !== 'Sign in cancelled') {
          console.error('❌ Apple Sign In failed:', result.error);
          Alert.alert('Sign In Failed', result.error);
        }
      }
    } catch (error) {
      console.error('❌ Apple Sign In error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('🚀 Starting Google Sign-In...');
    console.log('📋 Request config:', {
      iosClientId: '338991525353-kvd8elr7d227p8493is5qnda0aq2cd5e.apps.googleusercontent.com',
      hasRequest: !!request,
      redirectUri: request?.redirectUri
    });
    promptAsync();
  };

  const handleSkip = () => {
    console.log('⏭️ User skipped sign in');
    onNext('onboardingPaywall', {
      ...onboardingData,
      signInMethod: 'guest',
      accountCreated: false,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {t('onboarding.saveProgress.title1')} <Text style={styles.titleHighlight}>{t('onboarding.saveProgress.title2')}</Text>
        </Text>
        <Text style={styles.subtitle}>
          {t('onboarding.saveProgress.subtitle')}
        </Text>
      </View>

      <View style={styles.buttonsSection}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity 
            style={[styles.appleButton, loading && styles.buttonDisabled]} 
            onPress={handleAppleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={BRAND_COLORS.white} />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/apple.png')}
                  style={styles.appleIcon}
                  resizeMode="contain"
                />
                <Text style={styles.appleButtonText}>{t('onboarding.saveProgress.apple_button')}</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[styles.googleButton, loading && styles.buttonDisabled]} 
          onPress={handleGoogleSignIn}
          disabled={loading || !request}
        >
          {loading ? (
            <ActivityIndicator color={BRAND_COLORS.black} />
          ) : (
            <>
              <Image
                source={require('../../assets/images/google.png')}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>{t('onboarding.saveProgress.google_button')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={loading}>
          <Text style={styles.skipText}>
            {t('onboarding.saveProgress.skip_text')}{' '}
            <Text style={styles.skipLink}>{t('onboarding.saveProgress.skip_link')}</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            {t('onboarding.saveProgress.terms_text')}{' '}
            <Text 
              style={styles.termsLink}
              onPress={() => Linking.openURL('https://dracne.pro/tos')}
            >
              {t('onboarding.saveProgress.terms_link')}
            </Text>
            {' '}{t('onboarding.saveProgress.terms_and')}{' '}
            <Text 
              style={styles.termsLink}
              onPress={() => Linking.openURL('https://dracne.pro/privacy')}
            >
              {t('onboarding.saveProgress.privacy_link')}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  buttonsSection: {
    paddingHorizontal: 24,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLORS.black,
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: BRAND_COLORS.white,
  },
  appleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 25,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.black,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  skipLink: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  termsSection: {
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 12,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
});