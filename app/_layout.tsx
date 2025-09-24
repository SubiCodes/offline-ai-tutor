import AlertPersonalization from '@/components/AlertPersonalization';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { checkIfKeyExists } from '@/util/checkIfNewUser';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useNavigationContainerRef } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const navigationRef = useNavigationContainerRef();

  const [openPersonalizationAlert, setOpenPersonalizationAlert] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', async () => {
      const exists = await checkIfKeyExists('userName');
      setOpenPersonalizationAlert(!exists);
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AlertPersonalization open={openPersonalizationAlert} onOpenChange={setOpenPersonalizationAlert} />
      <Drawer>
        <Drawer.Screen name="index" options={{ headerShown: true }} />
      </Drawer>
      <PortalHost />
    </ThemeProvider>
  );
}
