import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApbB99DXunqQo7kWESSCyg3gn_eIFmHi4",
  authDomain: "dracne-200c0.firebaseapp.com",
  projectId: "dracne-200c0",
  storageBucket: "dracne-200c0.firebasestorage.app",
  messagingSenderId: "338991525353",
  appId: "1:338991525353:web:fef131e854e71551ff2f78",
  measurementId: "G-MHXV7W8R7E"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);