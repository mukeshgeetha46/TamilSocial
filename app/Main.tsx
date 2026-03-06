import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSelector } from 'react-redux';


export const unstable_settings = {
    anchor: '(tabs)',
};

export default function Main() {
    const colorScheme = useColorScheme();
    const isDarkMode = useSelector((state: any) => state.theme.darkMode);
    console.log('💚', isDarkMode === true ? 'Dark' : 'Light')
    return (
        <ThemeProvider value={isDarkMode === true ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
