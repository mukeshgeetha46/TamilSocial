import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Notif = {
    id: string;
    type: 'follow' | 'like' | 'comment' | 'mention' | 'group_like' | 'follow_back';
    avatars: string[];
    text: (string | { bold: string })[];
    time: string;
    thumbnail?: string;
    isFollowing?: boolean;
};

const NOTIFICATIONS: { section: string; data: Notif[] }[] = [
    {
        section: 'Today',
        data: [
            {
                id: '1',
                type: 'follow',
                avatars: ['https://i.pravatar.cc/150?img=12'],
                text: [{ bold: 'zane_doe' }, ' started following you.'],
                time: '2h',
                isFollowing: false,
            },
            {
                id: '2',
                type: 'like',
                avatars: ['https://i.pravatar.cc/150?img=32'],
                text: [{ bold: 'marina_sky' }, ' and ', { bold: '15 others' }, ' liked your photo.'],
                time: '4h',
                thumbnail: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=80&h=80&fit=crop',
            },
        ],
    },
    {
        section: 'Yesterday',
        data: [
            {
                id: '3',
                type: 'comment',
                avatars: ['https://i.pravatar.cc/150?img=53'],
                text: [{ bold: 'alex_j' }, ' commented: "This is absolutely incredible! 🔥"'],
                time: '1d',
                thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=80&h=80&fit=crop',
            },
            {
                id: '4',
                type: 'mention',
                avatars: ['https://i.pravatar.cc/150?img=44'],
                text: [{ bold: 'sarah.k' }, ' mentioned you in a comment: "@you check this out!"'],
                time: '1d',
                thumbnail: 'https://images.unsplash.com/photo-1510018572596-a403bcedb266?w=80&h=80&fit=crop',
            },
        ],
    },
    {
        section: 'This Week',
        data: [
            {
                id: '5',
                type: 'group_like',
                avatars: [
                    'https://i.pravatar.cc/150?img=15',
                    'https://i.pravatar.cc/150?img=25',
                    'https://i.pravatar.cc/150?img=17',
                ],
                text: [{ bold: 'david_w' }, ', ', { bold: 'lily_m' }, ' and ', { bold: '42 others' }, ' liked your reel.'],
                time: '3d',
                thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=80&h=80&fit=crop',
            },
            {
                id: '6',
                type: 'follow_back',
                avatars: ['https://i.pravatar.cc/150?img=47'],
                text: [{ bold: 'claire_design' }, ' started following you.'],
                time: '5d',
                isFollowing: true,
            },
        ],
    },
];

export default function Notification() {
    const [followStates, setFollowStates] = useState<Record<string, boolean>>({
        '1': false,
        '6': true,
    });

    const toggleFollow = (id: string) => {
        setFollowStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderText = (parts: Notif['text']) =>
        parts.map((part, i) =>
            typeof part === 'object' ? (
                <Text key={i} style={styles.boldText}>{part.bold}</Text>
            ) : (
                <Text key={i}>{part}</Text>
            )
        );

    const renderItem = (item: Notif) => {
        const showFollowBtn = item.type === 'follow' || item.type === 'follow_back';
        const isFollowing = followStates[item.id] ?? item.isFollowing;

        return (
            <View key={item.id} style={styles.notifRow}>
                {/* Avatar(s) */}
                <View style={styles.avatarsContainer}>
                    {item.avatars.length === 1 ? (
                        <Image source={{ uri: item.avatars[0] }} style={styles.avatar} contentFit="cover" />
                    ) : (
                        <View style={styles.stackedAvatars}>
                            {item.avatars.slice(0, 3).map((a, i) => (
                                <Image
                                    key={i}
                                    source={{ uri: a }}
                                    style={[styles.stackedAvatar, { left: i * 18 }]}
                                    contentFit="cover"
                                />
                            ))}
                        </View>
                    )}
                </View>

                {/* Text */}
                <View style={styles.notifContent}>
                    <Text style={styles.notifText} numberOfLines={3}>
                        {renderText(item.text)}
                        <Text style={styles.timeText}> {item.time}</Text>
                    </Text>
                </View>

                {/* Right side: button or thumbnail */}
                {showFollowBtn ? (
                    <TouchableOpacity
                        style={[styles.followBtn, isFollowing && styles.followingBtn]}
                        onPress={() => toggleFollow(item.id)}
                    >
                        <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                ) : item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} contentFit="cover" />
                ) : null}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerSide}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={styles.headerSide} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {NOTIFICATIONS.map(group => (
                    <View key={group.section}>
                        <Text style={styles.sectionTitle}>{group.section}</Text>
                        {group.data.map(item => renderItem(item))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
    },
    headerSide: {
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
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginTop: 22,
        marginBottom: 12,
    },
    notifRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarsContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E5E5EA',
    },
    stackedAvatars: {
        width: 44 + 18 * 2, // room for 3 stacked
        height: 44,
        position: 'relative',
    },
    stackedAvatar: {
        position: 'absolute',
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#FFF',
        top: 4,
        backgroundColor: '#E5E5EA',
    },
    notifContent: {
        flex: 1,
        paddingRight: 8,
    },
    notifText: {
        fontSize: 14,
        color: '#3A3A3C',
        lineHeight: 20,
    },
    boldText: {
        fontWeight: '700',
        color: '#1C1C1E',
    },
    timeText: {
        fontSize: 13,
        color: '#AEAEB2',
    },
    thumbnail: {
        width: 46,
        height: 46,
        borderRadius: 6,
        backgroundColor: '#E5E5EA',
        flexShrink: 0,
    },
    followBtn: {
        backgroundColor: '#2B8BFA',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexShrink: 0,
    },
    followingBtn: {
        backgroundColor: '#EBEBF0',
    },
    followBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    followingBtnText: {
        color: '#1C1C1E',
    },
});
