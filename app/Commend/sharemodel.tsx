import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const SUGGESTED_PEOPLE = [
    { id: '1', name: 'Alex Rivers', username: 'alex_rivers', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: '2', name: 'Jordan Smith', username: 'jordy_s', avatar: 'https://i.pravatar.cc/150?u=jordan' },
    { id: '3', name: 'Casey Miller', username: 'casey_m', avatar: 'https://i.pravatar.cc/150?u=casey' },
    { id: '4', name: 'Taylor Reed', username: 'tay_read', avatar: 'https://i.pravatar.cc/150?u=taylor' },
    { id: '5', name: 'Morgan Lane', username: 'morgan_lane_creative', avatar: 'https://i.pravatar.cc/150?u=morgan' },
];

const FOLLOWING_USERS = [
    { id: 'f1', name: 'Liam Foster', username: 'liam_foster', avatar: 'https://i.pravatar.cc/150?u=liam' },
    { id: 'f2', name: 'Ava Thompson', username: 'ava.t', avatar: 'https://i.pravatar.cc/150?u=ava' },
    { id: 'f3', name: 'Noah Carter', username: 'n_carter', avatar: 'https://i.pravatar.cc/150?u=noah' },
    { id: 'f4', name: 'Isabella Wright', username: 'bella_w', avatar: 'https://i.pravatar.cc/150?u=isabella' },
    { id: 'f5', name: 'Elijah Brooks', username: 'eli.brooks', avatar: 'https://i.pravatar.cc/150?u=elijah' },
    { id: 'f6', name: 'Sophia Harris', username: 'sophiaharris', avatar: 'https://i.pravatar.cc/150?u=sophia' },
    { id: 'f7', name: 'William Green', username: 'will.green', avatar: 'https://i.pravatar.cc/150?u=william' },
    { id: 'f8', name: 'Mia Scott', username: 'mia_scott', avatar: 'https://i.pravatar.cc/150?u=mia' },
];

const QUICK_ACTIONS = [
    { id: 'story', label: 'Your Story', icon: 'plus', iconSet: 'feather', bgColor: '#2B8BFA' },
    { id: 'link', label: 'Copy link', icon: 'link', iconSet: 'feather', bgColor: '#F2F2F7' },
    { id: 'share', label: 'Share to...', icon: 'share', iconSet: 'feather', bgColor: '#F2F2F7' },
    { id: 'threads', label: 'Threads', icon: 'message-square', iconSet: 'feather', bgColor: '#F2F2F7' },
];

export default function ShareModel() {
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState<string[]>(['2']); // Jordan Smith selected by default

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const query = searchText.toLowerCase();
    const filteredPeople = SUGGESTED_PEOPLE.filter(p =>
        p.name.toLowerCase().includes(query) || p.username.toLowerCase().includes(query)
    );
    const filteredFollowing = FOLLOWING_USERS.filter(p =>
        p.name.toLowerCase().includes(query) || p.username.toLowerCase().includes(query)
    );

    return (
        <View style={styles.modalOverlay}>
            <Stack.Screen options={{ headerShown: false, presentation: 'transparentModal' }} />

            {/* Tapping the dark backdrop closes the modal */}
            <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={() => router.back()} />

            <SafeAreaView edges={['bottom']} style={styles.sheetContainer}>
                {/* Drag Handle */}
                <View style={styles.dragHandle} />

                {/* Title */}
                <Text style={styles.title}>Share</Text>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Feather name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for people"
                        placeholderTextColor="#8E8E93"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Quick Actions Row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsRow}>
                    {QUICK_ACTIONS.map(action => (
                        <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                            <View style={[styles.quickActionBg, { backgroundColor: action.bgColor }]}>
                                {action.id === 'story' ? (
                                    <Feather name="plus" size={22} color="#FFFFFF" />
                                ) : action.id === 'link' ? (
                                    <Feather name="link" size={20} color="#1C1C1E" />
                                ) : action.id === 'share' ? (
                                    <Feather name="upload" size={20} color="#1C1C1E" />
                                ) : (
                                    <MaterialCommunityIcons name="chat-outline" size={22} color="#1C1C1E" />
                                )}
                            </View>
                            <Text style={styles.quickActionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView style={styles.peopleList} showsVerticalScrollIndicator={false}>
                    {/* Suggested Section */}
                    {filteredPeople.length > 0 && <Text style={styles.sectionTitle}>Suggested</Text>}
                    {filteredPeople.map(person => {
                        const isSelected = selected.includes(person.id);
                        return (
                            <TouchableOpacity key={person.id} style={styles.personRow} onPress={() => toggleSelect(person.id)}>
                                <Image source={{ uri: person.avatar }} style={styles.personAvatar} contentFit="cover" />
                                <View style={styles.personInfo}>
                                    <Text style={styles.personName}>{person.name}</Text>
                                    <Text style={styles.personUsername}>{person.username}</Text>
                                </View>
                                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                                    {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    {/* Following Section */}
                    {filteredFollowing.length > 0 && <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Following</Text>}
                    {filteredFollowing.map(person => {
                        const isSelected = selected.includes(person.id);
                        return (
                            <TouchableOpacity key={person.id} style={styles.personRow} onPress={() => toggleSelect(person.id)}>
                                <Image source={{ uri: person.avatar }} style={styles.personAvatar} contentFit="cover" />
                                <View style={styles.personInfo}>
                                    <Text style={styles.personName}>{person.name}</Text>
                                    <Text style={styles.personUsername}>{person.username}</Text>
                                </View>
                                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                                    {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Send Button */}
                <View style={styles.sendContainer}>
                    <TouchableOpacity style={styles.sendButton} onPress={() => router.back()}>
                        <Text style={styles.sendButtonText}>Send</Text>
                        {selected.length > 0 && (
                            <View style={styles.sendBadge}>
                                <Text style={styles.sendBadgeText}>{selected.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    sheetContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '88%',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    dragHandle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D1D6',
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 40,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    quickActionsRow: {
        gap: 20,
        paddingBottom: 20,
        paddingRight: 8,
    },
    quickActionItem: {
        alignItems: 'center',
        width: 70,
    },
    quickActionBg: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        // Subtle border for light-bg buttons
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    quickActionLabel: {
        fontSize: 12,
        color: '#3A3A3C',
        textAlign: 'center',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    peopleList: {
        flex: 1,
    },
    personRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    personAvatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#E5E5EA',
        marginRight: 14,
    },
    personInfo: {
        flex: 1,
    },
    personName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    personUsername: {
        fontSize: 13,
        color: '#8E8E93',
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#C7C7CC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleSelected: {
        backgroundColor: '#2B8BFA',
        borderColor: '#2B8BFA',
    },
    sendContainer: {
        paddingVertical: 16,
    },
    sendButton: {
        backgroundColor: '#2B8BFA',
        borderRadius: 14,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    sendBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
});
