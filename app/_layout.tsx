import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { checkIfKeyExists } from '@/util/checkIfNewUser';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useNavigationContainerRef } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', async () => {
      const exists = await checkIfKeyExists('userName');
      console.log(exists ? 'Key exists ✅' : 'Key does not exist ❌');
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Drawer>
        <Drawer.Screen name="index" options={{ headerShown: true }} />
      </Drawer>
      <PortalHost />
    </ThemeProvider>
  );
}
