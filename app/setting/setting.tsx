import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.backBtn} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* ACCOUNT Section */}
                <Text style={styles.sectionHeader}>ACCOUNT</Text>
                <View style={styles.card}>
                    <SettingRow
                        icon={<Ionicons name="person-outline" size={20} color="#3A3A3C" />}
                        label="Edit Profile"
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Ionicons name="id-card-outline" size={20} color="#3A3A3C" />}
                        label="Personal Information"
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Ionicons name="lock-closed-outline" size={20} color="#3A3A3C" />}
                        label="Password & Security"
                    />
                </View>

                {/* PREFERENCES Section */}
                <Text style={styles.sectionHeader}>PREFERENCES</Text>
                <View style={styles.card}>
                    <SettingRow
                        icon={<Ionicons name="notifications-outline" size={20} color="#3A3A3C" />}
                        label="Notifications"
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Feather name="globe" size={20} color="#3A3A3C" />}
                        label="Language"
                        trailingText="English"
                    />
                    <View style={styles.rowDivider} />
                    <View style={styles.settingRow}>
                        <View style={styles.rowLeft}>
                            <View style={styles.iconWrapper}>
                                <Ionicons name="moon-outline" size={20} color="#3A3A3C" />
                            </View>
                            <Text style={styles.rowLabel}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: '#E5E5EA', true: '#2B8BFA' }}
                            thumbColor="#FFFFFF"
                            ios_backgroundColor="#E5E5EA"
                        />
                    </View>
                </View>

                {/* PRIVACY Section */}
                <Text style={styles.sectionHeader}>PRIVACY</Text>
                <View style={styles.card}>
                    <SettingRow
                        icon={<Ionicons name="eye-outline" size={20} color="#3A3A3C" />}
                        label="Account Privacy"
                        trailingText="Public"
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Ionicons name="ban-outline" size={20} color="#3A3A3C" />}
                        label="Blocked Accounts"
                    />
                </View>

                {/* SUPPORT Section */}
                <Text style={styles.sectionHeader}>SUPPORT</Text>
                <View style={styles.card}>
                    <SettingRow
                        icon={<Ionicons name="help-circle-outline" size={20} color="#3A3A3C" />}
                        label="Help Center"
                        isExternal
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Ionicons name="flag-outline" size={20} color="#3A3A3C" />}
                        label="Report a Problem"
                    />
                    <View style={styles.rowDivider} />
                    <SettingRow
                        icon={<Ionicons name="information-circle-outline" size={20} color="#3A3A3C" />}
                        label="About"
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutBtn}>
                    <MaterialIcons name="logout" size={20} color="#FF3B30" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.versionText}>Version 4.22.0 (8213)</Text>

            </ScrollView>
        </SafeAreaView>
    );
}

// Reusable row component
type SettingRowProps = {
    icon: React.ReactNode;
    label: string;
    trailingText?: string;
    isExternal?: boolean;
};

function SettingRow({ icon, label, trailingText, isExternal }: SettingRowProps) {
    return (
        <TouchableOpacity style={styles.settingRow}>
            <View style={styles.rowLeft}>
                <View style={styles.iconWrapper}>{icon}</View>
                <Text style={styles.rowLabel}>{label}</Text>
            </View>
            <View style={styles.rowRight}>
                {trailingText && <Text style={styles.trailingText}>{trailingText}</Text>}
                {isExternal
                    ? <Feather name="external-link" size={16} color="#C7C7CC" />
                    : <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F2F2F7',
    },
    backBtn: {
        width: 36,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        letterSpacing: 0.6,
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 30,
        marginRight: 14,
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 15,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    trailingText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    rowDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
        marginLeft: 60,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#FFF1F0',
        marginTop: 30,
        borderRadius: 14,
        paddingVertical: 16,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF3B30',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#AEAEB2',
        marginTop: 16,
    },
});
