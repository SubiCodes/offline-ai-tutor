
import AlertPersonalization from '@/components/AlertPersonalization';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { checkIfKeyExists } from '@/util/checkIfNewUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useNavigationContainerRef } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [ready, setReady] = useState(false);
  const navigationRef = useNavigationContainerRef();

  const [openPersonalizationAlert, setOpenPersonalizationAlert] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', async () => {
      const exists = await checkIfKeyExists('name');
      setOpenPersonalizationAlert(!exists);
    });

    return unsubscribe;
  }, [navigationRef]);

  useEffect(() => {
    const initTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme"); // "light" | "dark" | null
        if (storedTheme === "light" || storedTheme === "dark") {
          setColorScheme(storedTheme);
        } else {
          setColorScheme("system"); // default
        }
      } catch (err) {
        console.error("Error loading theme:", err);
        setColorScheme("system");
      } finally {
        setReady(true);
      }
    };

    initTheme();
  }, []);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AlertPersonalization open={openPersonalizationAlert} onOpenChange={setOpenPersonalizationAlert} />
      <Drawer screenOptions={{
        headerTintColor: "#3B82F6", // 👈 global color for hamburger & back button
        drawerActiveTintColor: "#3B82F6",   // active text/icon color
        drawerInactiveTintColor: "#9CA3AF", // inactive text/icon color
        drawerActiveBackgroundColor: "#E0F2FE", // optional highlight bg for active item
      }}>
        <Drawer.Screen name="(home)" options={{
          headerShown: false, drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} />
        <Drawer.Screen name="(settings)" options={{
          headerShown: false, drawerLabel: "Settings", title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} />
      </Drawer>
      <PortalHost />
    </ThemeProvider>
  );
}
