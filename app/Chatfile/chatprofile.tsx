import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock Data
const PROFILE = {
    name: 'Alex Johnson',
    username: '@alex_j',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

const SHARED_MEDIA = [
    { id: '1', url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=200', type: 'image' },
    { id: '2', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', type: 'video' },
    { id: '3', url: 'https://images.unsplash.com/photo-1510018572596-a403bcedb266?auto=format&fit=crop&q=80&w=200', type: 'image' },
    { id: '4', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=200', type: 'image' },
    { id: '5', url: 'https://images.unsplash.com/photo-1502481851512-ca6d15b135bb?auto=format&fit=crop&q=80&w=200', type: 'image' },
    { id: '6', type: 'more', count: '+ MORE' },
];

export default function ChatProfile() {
    const [isMuted, setIsMuted] = useState(true);

    const renderMediaItem = (item: any, index: number) => {
        // Calculate size: 3 items per row with 10px spacing between (total 20px gap + 32px standard margins)
        const paddingHorizontal = 16 * 2;
        const itemGap = 10;
        // Check for fractional pixels that cause wrapping
        const itemSize = Math.floor((width - paddingHorizontal - (itemGap * 2)) / 3);

        if (item.type === 'more') {
            return (
                <TouchableOpacity key={item.id} style={[styles.mediaItemMore, { width: itemSize, height: itemSize }]}>
                    <Feather name="plus" size={24} color="#8E8E93" />
                    <Text style={styles.moreText}>{item.count}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity key={item.id} style={[styles.mediaItemWrapper, { width: itemSize, height: itemSize }]}>
                <Image source={{ uri: item.url }} style={styles.mediaItemImage} contentFit="cover" />
                {item.type === 'video' && (
                    <View style={styles.videoOverlay}>
                        <View style={styles.playIconContainer}>
                            <Ionicons name="play" size={20} color="#2B8BFA" style={{ marginLeft: 2 }} />
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconWrapper}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chat info</Text>
                <TouchableOpacity style={styles.headerIconWrapper}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} contentFit="cover" />
                    </View>
                    <Text style={styles.profileName}>{PROFILE.name}</Text>
                    <Text style={styles.profileUsername}>{PROFILE.username}</Text>
                </View>

                {/* Quick Actions (Audio, Video, Search) */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.actionBtnContainer}>
                        <View style={styles.actionIconBg}>
                            <Ionicons name="call" size={22} color="#2B8BFA" />
                        </View>
                        <Text style={styles.actionText}>Audio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtnContainer}>
                        <View style={styles.actionIconBg}>
                            <Ionicons name="videocam" size={24} color="#2B8BFA" />
                        </View>
                        <Text style={styles.actionText}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtnContainer}>
                        <View style={styles.actionIconBg}>
                            <Ionicons name="search" size={22} color="#2B8BFA" />
                        </View>
                        <Text style={styles.actionText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings List */}
                <View style={styles.settingsSection}>


                    <View style={styles.settingItem}>
                        <View style={styles.settingIconBg}>
                            {isMuted ? (
                                <Ionicons name="volume-mute" size={20} color="#2B8BFA" />
                            ) : (
                                <Ionicons name="volume-high" size={20} color="#2B8BFA" />
                            )}
                        </View>
                        <Text style={styles.settingLabel}>Mute Notifications</Text>
                        <Switch
                            trackColor={{ false: '#E5E5EA', true: '#2B8BFA' }}
                            thumbColor={'#FFFFFF'}
                            ios_backgroundColor="#E5E5EA"
                            onValueChange={() => setIsMuted(!isMuted)}
                            value={isMuted}
                        />
                    </View>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingIconBg}>
                            <Ionicons name="search-outline" size={18} color="#2B8BFA" />
                        </View>
                        <Text style={styles.settingLabel}>Search in Conversation</Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Destructive Actions */}
                <View style={styles.destructiveSection}>
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.destructiveIconBg}>
                            <Ionicons name="alert-circle" size={20} color="#FF3B30" />
                        </View>
                        <Text style={styles.destructiveLabel}>Report {PROFILE.username}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingItem, { marginBottom: 0 }]}>
                        <View style={styles.destructiveIconBg}>
                            <Ionicons name="ban" size={18} color="#FF3B30" />
                        </View>
                        <Text style={styles.destructiveLabel}>Block {PROFILE.name}</Text>
                    </TouchableOpacity>
                </View>

                {/* Shared Media Section */}
                <View style={styles.mediaSection}>
                    <View style={styles.mediaHeaderRow}>
                        <Text style={styles.mediaTitle}>Shared Media</Text>
                        <TouchableOpacity>
                            <Text style={styles.mediaSeeAll}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mediaGrid}>
                        {SHARED_MEDIA.map((item, idx) => renderMediaItem(item, idx))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // very light gray matching design
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerIconWrapper: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        // Soft shadow below avatar
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 16,
    },
    avatar: {
        width: 112,
        height: 112,
        borderRadius: 56,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    profileUsername: {
        fontSize: 15,
        color: '#2B8BFA',
        fontWeight: '500',
    },
    actionsSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
        marginBottom: 30,
    },
    actionBtnContainer: {
        alignItems: 'center',
    },
    actionIconBg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F0FE', // Light blue bg
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    settingsSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    settingIconBg: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#E8F0FE', // Light blue bg
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    destructiveSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    destructiveIconBg: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FCE8E8', // Light red bg
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    destructiveLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#FF3B30',
    },
    mediaSection: {
        paddingHorizontal: 16,
    },
    mediaHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    mediaTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    mediaSeeAll: {
        fontSize: 14,
        color: '#2B8BFA',
        fontWeight: '600',
    },
    mediaGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10, // Must match the calculated gap
    },
    mediaItemWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#E5E5EA',
        position: 'relative',
    },
    mediaItemImage: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark tint for videos
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaItemMore: {
        borderRadius: 12,
        backgroundColor: '#E8EAED',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreText: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        letterSpacing: 1,
    },
});
