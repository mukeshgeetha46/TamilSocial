import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Follower = {
    id: string;
    username: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    isFollowingBack: boolean; // true = show "Remove", false = show "Follow back"
};

const INITIAL_FOLLOWERS: Follower[] = [
    { id: '1', username: 'alex_j', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=12', isVerified: false, isFollowingBack: true },
    { id: '2', username: 'sarah.design', name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=32', isVerified: true, isFollowingBack: false },
    { id: '3', username: 'mike_codes', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=53', isVerified: false, isFollowingBack: true },
    { id: '4', username: 'sam_smith', name: 'Sam Smith', avatar: 'https://i.pravatar.cc/150?img=17', isVerified: false, isFollowingBack: false },
    { id: '5', username: 'em_adventures', name: 'Emily Rodriguez', avatar: 'https://i.pravatar.cc/150?img=44', isVerified: false, isFollowingBack: true },
    { id: '6', username: 'jordan_flw', name: 'Jordan Flowers', avatar: 'https://i.pravatar.cc/150?img=60', isVerified: false, isFollowingBack: false },
    { id: '7', username: 'priya_k', name: 'Priya Kapoor', avatar: 'https://i.pravatar.cc/150?img=25', isVerified: true, isFollowingBack: true },
    { id: '8', username: 'ben_wander', name: 'Ben Wanderlust', avatar: 'https://i.pravatar.cc/150?img=15', isVerified: false, isFollowingBack: false },
];

const FOLLOWER_COUNT = '2,482';

export default function Followers() {
    const [followers, setFollowers] = useState<Follower[]>(INITIAL_FOLLOWERS);
    const [search, setSearch] = useState('');

    const filtered = followers.filter(f =>
        f.username.toLowerCase().includes(search.toLowerCase()) ||
        f.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleAction = (id: string) => {
        // "Follow back" toggles to "Remove" (meaning now followed), "Remove" removes from local list
        setFollowers(prev =>
            prev.map(f =>
                f.id === id ? { ...f, isFollowingBack: !f.isFollowingBack } : f
            )
        );
    };

    const renderItem = ({ item }: { item: Follower }) => (
        <View style={styles.personRow}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} contentFit="cover" />

            <View style={styles.personInfo}>
                <View style={styles.usernameRow}>
                    <Text style={styles.username}>{item.username}</Text>
                    {item.isVerified && (
                        <Ionicons name="checkmark-circle" size={15} color="#2B8BFA" style={styles.verifiedIcon} />
                    )}
                </View>
                <Text style={styles.name}>{item.name}</Text>
            </View>

            <TouchableOpacity
                style={[styles.actionBtn, item.isFollowingBack ? styles.removeBtn : styles.followBackBtn]}
                onPress={() => toggleAction(item.id)}
            >
                <Text style={[styles.actionBtnText, !item.isFollowingBack && styles.followBackBtnText]}>
                    {item.isFollowingBack ? 'Remove' : 'Follow back'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Followers</Text>
                <Text style={styles.followerCount}>{FOLLOWER_COUNT}</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Feather name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search followers"
                    placeholderTextColor="#8E8E93"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Followers List */}
            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No followers found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 14,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    followerCount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2B8BFA',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBEBF0',
        borderRadius: 12,
        marginHorizontal: 16,
        paddingHorizontal: 12,
        height: 40,
        marginBottom: 14,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#E5E5EA',
        marginRight: 14,
    },
    personInfo: {
        flex: 1,
    },
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    verifiedIcon: {
        marginLeft: 4,
        marginBottom: 2,
    },
    name: {
        fontSize: 13,
        color: '#8E8E93',
    },
    actionBtn: {
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    removeBtn: {
        backgroundColor: '#EBEBF0',
    },
    followBackBtn: {
        backgroundColor: '#2B8BFA',
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    followBackBtnText: {
        color: '#FFFFFF',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
    },
    emptyState: {
        paddingTop: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: '#8E8E93',
        fontSize: 15,
    },
});
