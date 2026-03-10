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

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRegisterMutation } from '@/redux/api/authApi';
export default function RegisterScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const isDark = colorScheme === 'dark';

    const [register, { isLoading, error, data }] = useRegisterMutation();

    const HandleRegister = () => {
        try {
            const response = register({
                fullName,
                username,
                email,
                password,
            });
            console.log(response);
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
                    <ThemedText style={styles.headerTitle} type="subtitle">Register Screen</ThemedText>
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
                        {/* Welcome Text */}
                        <View style={styles.welcomeContainer}>
                            <ThemedText style={styles.title} type="title">Create Account</ThemedText>
                            <ThemedText style={styles.subtitle}>Join our community and start sharing today.</ThemedText>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
                                <TextInput
                                    style={[styles.input, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#8E8E93"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.inputLabel}>Username</ThemedText>
                                <TextInput
                                    style={[styles.input, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                    placeholder="@username"
                                    placeholderTextColor="#8E8E93"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.inputLabel}>Email</ThemedText>
                                <TextInput
                                    style={[styles.input, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                    placeholder="example@mail.com"
                                    placeholderTextColor="#8E8E93"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <ThemedText style={styles.inputLabel}>Password</ThemedText>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.input, styles.passwordInput, { borderColor: isDark ? '#3A3A3C' : '#E5E5EA', color: isDark ? '#FFF' : '#000' }]}
                                        placeholder="Create a password"
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

                            {/* Terms Checkbox */}
                            <TouchableOpacity
                                style={styles.termsContainer}
                                onPress={() => setAgreeToTerms(!agreeToTerms)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, { borderColor: agreeToTerms ? '#2B8BFA' : '#E5E5EA', backgroundColor: agreeToTerms ? '#2B8BFA' : 'transparent' }]}>
                                    {agreeToTerms && <Ionicons name="checkmark" size={12} color="#FFF" />}
                                </View>
                                <ThemedText style={styles.termsText}>
                                    By signing up, you agree to our <ThemedText style={styles.linkText}>Terms of Service</ThemedText> and <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>.
                                </ThemedText>
                            </TouchableOpacity>

                            {/* Sign Up Button */}
                            <TouchableOpacity style={styles.signUpButton} onPress={HandleRegister}>
                                <ThemedText style={styles.signUpButtonText}>Sign Up</ThemedText>
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

                            {/* Log In Link */}
                            <View style={styles.footer}>
                                <ThemedText style={styles.footerText}>Already have an account? </ThemedText>
                                <TouchableOpacity onPress={() => router.push('/Auth/Login')}>
                                    <ThemedText style={styles.linkText}>Log in</ThemedText>
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
    welcomeContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#8E8E93',
        fontWeight: '500',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginTop: 4,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    termsText: {
        fontSize: 13,
        color: '#8E8E93',
        lineHeight: 18,
        flex: 1,
    },
    signUpButton: {
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
    signUpButtonText: {
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
