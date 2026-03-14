import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLoginMutation } from '@/redux/api/authApi';
import { setUser } from '../../redux/authSlice';
export default function LoginScreen() {
    const dispatch = useDispatch();
    const colorScheme = useColorScheme() ?? 'light';
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isDark = colorScheme === 'dark';

    const [login, { isLoading, error, data }] = useLoginMutation();

    const HandleLogin = async () => {
        try {
            const response = await login({
                email: emailOrUsername,
                password,
            }).unwrap();
            router.push('/(tabs)');
            dispatch(setUser(response.user))
            console.log(response.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={isDark ? '#FFF' : '#000'} />
                    </TouchableOpacity>
                    <ThemedText style={styles.headerTitle} type="subtitle">Login Screen</ThemedText>
                    <View style={{ width: 40 }} />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Logo Box */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logoBox}>
                                <Ionicons name="share-social-outline" size={32} color="#FFF" />
                            </View>
                            <ThemedText style={styles.title} type="title">Welcome Back</ThemedText>
                            <ThemedText style={styles.subtitle}>Login to your account to continue sharing moments</ThemedText>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.inputLabel}>Username or Email</ThemedText>
                                <TextInput
                                    style={[styles.input, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                    placeholder="Enter your username or email"
                                    placeholderTextColor="#8E8E93"
                                    value={emailOrUsername}
                                    onChangeText={setEmailOrUsername}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.labelRow}>
                                    <ThemedText style={styles.inputLabel}>Password</ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.input, styles.passwordInput, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#8E8E93"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={20}
                                            color="#8E8E93"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Log In Button */}
                            <TouchableOpacity style={styles.logInButton} onPress={HandleLogin}>
                                <ThemedText style={styles.logInButtonText}>Log In</ThemedText>
                            </TouchableOpacity>

                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <ThemedText style={styles.dividerText}>or continue with</ThemedText>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialButtonsContainer}>
                                <TouchableOpacity style={[styles.socialButton, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA' }]}>
                                    <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
                                    <ThemedText style={styles.socialButtonText}>Google</ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.socialButton, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA' }]}>
                                    <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                                    <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
                                </TouchableOpacity>
                            </View>

                            {/* Sign Up Link */}
                            <View style={styles.footer}>
                                <ThemedText style={styles.footerText}>Don't have an account? </ThemedText>
                                <TouchableOpacity onPress={() => router.push('/Auth/Register')}>
                                    <ThemedText style={styles.linkText}>Sign Up</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 20,
    },
    logoBox: {
        width: 64,
        height: 64,
        backgroundColor: '#2B8BFA',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#2B8BFA',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    forgotText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2B8BFA',
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        backgroundColor: 'transparent',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    logInButton: {
        height: 54,
        backgroundColor: '#2B8BFA',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2B8BFA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    logInButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        gap: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5EA',
    },
    dividerText: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    socialButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    linkText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2B8BFA',
    },
});
