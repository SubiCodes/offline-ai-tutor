import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen
        name='settingsLandingPage'
        options={{
          title: 'Settings',
          headerShown: false
        }}
      />
    </Stack>
  );
}