// app/_layout.tsx - Hide Navigation Headers
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide all navigation headers including "index"
        gestureEnabled: true, // Enable native swipe gestures
        animation: 'slide_from_right', // Native iOS-style transitions
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: false, // Explicitly hide header for index screen
        }} 
      />
    </Stack>
  );
}