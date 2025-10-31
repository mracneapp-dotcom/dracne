import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {
    OAuthProvider,
    signInWithCredential
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
  
  export const AuthService = {
    signInWithApple: async () => {
      try {
        const nonce = Math.random().toString(36).substring(2, 10);
        const hashedNonce = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          nonce
        );
  
        const appleCredential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
          nonce: hashedNonce,
        });
  
        const { identityToken } = appleCredential;
        const provider = new OAuthProvider('apple.com');
        const credential = provider.credential({
          idToken: identityToken,
          rawNonce: nonce,
        });
  
        const userCredential = await signInWithCredential(auth, credential);
        return { success: true, user: userCredential.user };
      } catch (error) {
        if (error.code === 'ERR_REQUEST_CANCELED') {
          return { success: false, error: 'Sign in cancelled' };
        }
        return { success: false, error: error.message };
      }
    },
  
    saveUserData: async (userId, userData) => {
      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    getUserData: async (userId) => {
      try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          return { success: true, data: userDoc.data() };
        }
        return { success: false, error: 'User not found' };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  
    signOut: async () => {
      try {
        await auth.signOut();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };