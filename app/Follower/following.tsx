import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Person = {
    id: string;
    username: string;
    name: string;
    avatar: string;
    isFollowing: boolean;
};

const INITIAL_FOLLOWING: Person[] = [
    { id: '1', username: 'janesmith', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=47', isFollowing: true },
    { id: '2', username: 'alex_doe', name: 'Alex Doe', avatar: 'https://i.pravatar.cc/150?img=12', isFollowing: true },
    { id: '3', username: 'sarah_creative', name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?img=32', isFollowing: false },
    { id: '4', username: 'mike_travels', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=53', isFollowing: true },
    { id: '5', username: 'elena_design', name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?img=44', isFollowing: true },
    { id: '6', username: 'lucas_photo', name: 'Lucas Pham', avatar: 'https://i.pravatar.cc/150?img=15', isFollowing: true },
    { id: '7', username: 'nina_art', name: 'Nina Petrov', avatar: 'https://i.pravatar.cc/150?img=25', isFollowing: false },
    { id: '8', username: 'tom_wave', name: 'Tom Waverly', avatar: 'https://i.pravatar.cc/150?img=60', isFollowing: true },
];

export default function Following() {
    const [people, setPeople] = useState<Person[]>(INITIAL_FOLLOWING);
    const [search, setSearch] = useState('');

    const filteredPeople = people.filter(p =>
        p.username.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleFollow = (id: string) => {
        setPeople(prev =>
            prev.map(p => p.id === id ? { ...p, isFollowing: !p.isFollowing } : p)
        );
    };

    const renderItem = ({ item }: { item: Person }) => (
        <View style={styles.personRow}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} contentFit="cover" />
            <View style={styles.personInfo}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <TouchableOpacity
                style={[styles.followBtn, item.isFollowing && styles.followingBtn]}
                onPress={() => toggleFollow(item.id)}
            >
                <Text style={[styles.followBtnText, item.isFollowing && styles.followingBtnText]}>
                    {item.isFollowing ? 'Following' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerSide}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Following</Text>
                <TouchableOpacity style={styles.headerSide}>
                    <Feather name="more-vertical" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Feather name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search following"
                    placeholderTextColor="#8E8E93"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* List */}
            <FlatList
                data={filteredPeople}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No results found</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F8F9FA',
    },
    headerSide: {
        width: 36,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
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
    username: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    name: {
        fontSize: 13,
        color: '#8E8E93',
    },
    followBtn: {
        backgroundColor: '#2B8BFA',
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    followingBtn: {
        backgroundColor: '#EBEBF0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    followBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    followingBtnText: {
        color: '#1C1C1E',
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
