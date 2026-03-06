import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfile() {
    const [name, setName] = useState('Alex Rivera');
    const [username, setUsername] = useState('arivera_dev');
    const [website, setWebsite] = useState('https://alexrivera.design');
    const [bio, setBio] = useState('Product Designer & Tech Enthusiast.\nBuilding the future one pixel at a time. 🌟✨');
    const [email, setEmail] = useState('alex.rivera@example.com');
    const [phone, setPhone] = useState('+1 (555) 000-1234');
    const [gender, setGender] = useState('Male');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
                    <Text style={styles.headerActionLeft}>Cancel</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Edit Profile</Text>

                <TouchableOpacity hitSlop={8}>
                    <Text style={styles.headerActionRight}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Avatar ── */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                    </View>
                    <TouchableOpacity style={styles.changePhotoBtn}>
                        <Text style={styles.changePhotoText}>Change profile photo</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Public Fields ── */}
                <View style={styles.fieldsCard}>
                    <FormField label="Name" value={name} onChangeText={setName} />
                    <Divider />
                    <FormField label="Username" value={username} onChangeText={setUsername} />
                    <Divider />
                    <FormField
                        label="Website"
                        value={website}
                        onChangeText={setWebsite}
                        keyboardType="url"
                        autoCapitalize="none"
                    />
                    <Divider />
                    <FormField
                        label="Bio"
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {/* ── Private Information ── */}
                <Text style={styles.sectionTitle}>PRIVATE INFORMATION</Text>

                <View style={styles.fieldsCard}>
                    <FormField
                        label="Email address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Divider />
                    <FormField
                        label="Phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <Divider />
                    {/* Gender row with chevron */}
                    <View style={styles.fieldRow}>
                        <Text style={styles.fieldLabel}>Gender</Text>
                        <View style={styles.genderRow}>
                            <Text style={styles.fieldValue}>{gender}</Text>
                            <Ionicons name="chevron-down" size={18} color="#8E8E93" style={{ marginLeft: 4 }} />
                        </View>
                    </View>
                </View>

                {/* ── Bottom Links ── */}
                <View style={styles.bottomLinks}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Switch to Professional Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 18 }}>
                        <Text style={[styles.linkText, styles.linkTextRed]}>Personal Information Settings</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ─── Reusable field ─── */
type FormFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: 'default' | 'email-address' | 'url' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

function FormField({
    label,
    value,
    onChangeText,
    multiline = false,
    numberOfLines,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
}: FormFieldProps) {
    return (
        <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
                style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholderTextColor="#C7C7CC"
            />
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

/* ─── Styles ─── */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 13,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    headerActionLeft: {
        fontSize: 16,
        color: '#1C1C1E',
        fontWeight: '400',
    },
    headerActionRight: {
        fontSize: 16,
        color: '#2B8BFA',
        fontWeight: '600',
    },

    /* Scroll */
    scrollContent: {
        paddingBottom: 40,
    },

    /* Avatar */
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    avatarWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
        backgroundColor: '#E5E5EA',
        marginBottom: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    changePhotoBtn: {
        paddingVertical: 2,
    },
    changePhotoText: {
        fontSize: 15,
        color: '#2B8BFA',
        fontWeight: '500',
    },

    /* Fields card */
    fieldsCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 0,
        marginBottom: 8,
    },
    fieldRow: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    fieldLabel: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 4,
        fontWeight: '400',
    },
    fieldInput: {
        fontSize: 15,
        color: '#1C1C1E',
        paddingVertical: 0,
    },
    fieldInputMultiline: {
        minHeight: 54,
        textAlignVertical: 'top',
    },
    fieldValue: {
        fontSize: 15,
        color: '#1C1C1E',
    },
    genderRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
        marginLeft: 16,
    },

    /* Section title */
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
    },

    /* Bottom links */
    bottomLinks: {
        alignItems: 'center',
        marginTop: 24,
        paddingBottom: 12,
    },
    linkText: {
        fontSize: 14,
        color: '#2B8BFA',
        fontWeight: '500',
    },
    linkTextRed: {
        color: '#FF3B30',
    },
});