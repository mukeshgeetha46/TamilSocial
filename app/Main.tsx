import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';


export const unstable_settings = {
    anchor: '(tabs)',
};

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Main() {
    const colorScheme = useColorScheme();
    const isDarkMode = useSelector((state: any) => state.theme.darkMode);
    console.log('💚', isDarkMode === true ? 'Dark' : 'Light')
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ThemeProvider value={isDarkMode === true ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                    </Stack>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
