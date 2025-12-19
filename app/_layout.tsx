// app/_layout.tsx - Fast splash screen hiding + Font loading
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';

// Keep splash visible while loading
SplashScreen.preventAutoHideAsync().catch(() => {
  // In case splash screen can't be prevented, ignore error
});

export default function RootLayout() {
  // Load custom Montserrat fonts
  const [fontsLoaded, fontError] = useFonts({
    'Baloo': require('../assets/images/fonts/Baloo-Regular.ttf'),
    'Brittany': require('../assets/images/fonts/Brittany.otf'),
  });

  // Hide splash screen as soon as fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Hide splash screen immediately to show your animation
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError, onLayoutRootView]);

  // Don't render until fonts are ready
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false,
        }} 
      />
    </Stack>
  );
}