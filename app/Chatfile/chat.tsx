import { useGetInboxQuery } from '@/redux/api/chatNotificationApi';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock Data
const NOTES_DATA = [
    { id: '1', name: 'Your notes', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', isSelf: true, hasBorder: true },
    { id: '2', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', isSelf: false, hasBorder: true },
    { id: '3', name: 'Marcus', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', isSelf: false, hasBorder: true },
    { id: '4', name: 'Elena', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', isSelf: false, hasBorder: false },
    { id: '5', name: 'David', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', isSelf: false, hasBorder: true },
];

const CHAT_DATA = [
    { id: '1', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', message: 'sent a photo', time: '12m', unread: true },
    { id: '2', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', message: "Haha that's actually hilarious! Can't wait fo...", time: '2h', unread: false },
    { id: '3', name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', message: 'Are you joining the call later?', time: '4h', unread: true },
    { id: '4', name: 'Isabella Rodriguez', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', message: 'Thanks for the recommendation!', time: 'Yesterday', unread: false },
    { id: '5', name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', message: 'Sent a reel by @traveler_life', time: 'Yesterday', unread: false },
    { id: '6', name: 'Maya Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150', message: "I'll send the files over tonight.", time: '2d', unread: false },
    { id: '7', name: 'Leo Gomez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150', message: 'Sounds good man.', time: '3d', unread: false },
];

const EmptyChatState = () => (
    <View style={styles.emptyStateContainer}>
        <View style={styles.emptyIllustrationCircle}>
            <Ionicons name="chatbubble-outline" size={50} color="#007AFF" />
        </View>
        <Text style={styles.emptyTitle}>No messages yet</Text>
        <Text style={styles.emptySubtitle}>
            When you start a conversation, it will appear here.
        </Text>
        <TouchableOpacity style={styles.emptyActionButton}>
            <Text style={styles.emptyActionText}>Send a message</Text>
        </TouchableOpacity>
    </View>
);

export default function ChatList() {
    const { data: CHAT_DATA, isLoading, error } = useGetInboxQuery();

    if (isLoading) {
        return <ActivityIndicator size="large" color="#000" />
    }

    console.log('conversations', CHAT_DATA)
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Messages</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="videocam-outline" size={28} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="edit" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#8E8E93"
                        />
                    </View>
                </View>

                {/* Notes / Stories (Horizontal List) */}
                <View style={styles.notesContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.notesList}>
                        {NOTES_DATA.map((note: any) => (
                            <TouchableOpacity key={note.id} style={styles.noteItem}>
                                <View style={[
                                    styles.avatarContainer,
                                    note.hasBorder && (note.isSelf ? styles.avatarBorderSelf : styles.avatarBorderBlue)
                                ]}>
                                    <Image source={{ uri: note.avatar }} style={styles.noteAvatar} contentFit="cover" />
                                    {note.isSelf && (
                                        <View style={styles.activeDot} />
                                    )}
                                </View>
                                <Text style={styles.noteName} numberOfLines={1}>{note.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Chat List (Vertical List) or Empty State */}
                {CHAT_DATA.length > 0 ? (
                    <View style={styles.chatListContainer}>
                        {CHAT_DATA.map((chat: any) => (
                            <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => router.push(`/Chatfile/Message/${chat.userid}`)}>
                                <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} contentFit="cover" />

                                <View style={styles.chatContent}>
                                    <View style={styles.chatHeaderRow}>
                                        <Text style={[styles.chatName, chat.unread && styles.textBold]}>
                                            {chat.name}
                                        </Text>
                                        <Text style={[styles.chatTime, chat.unread && styles.chatTimeUnread]}>
                                            {chat.time}
                                        </Text>
                                    </View>

                                    <View style={styles.chatMessageRow}>
                                        <Text
                                            style={[styles.chatMessage, chat.unread && styles.textBoldBlack]}
                                            numberOfLines={1}
                                        >
                                            {chat.message}
                                        </Text>
                                        {chat.unread && <View style={styles.unreadDot} />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <EmptyChatState />
                )}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: 20,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        paddingVertical: 0, // fix android centering
    },
    notesContainer: {
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
    },
    notesList: {
        paddingHorizontal: 16,
        gap: 16,
    },
    noteItem: {
        alignItems: 'center',
        width: 70, // fixed width to keep names aligned
    },
    avatarContainer: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    avatarBorderBlue: {
        borderWidth: 2,
        borderColor: '#007AFF', // iOS blue
    },
    avatarBorderSelf: {
        borderWidth: 2,
        borderColor: '#E5E5EA', // Light gray for self if no story, or similar
    },
    noteAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E5EA',
    },
    activeDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#34C759', // Green
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    noteName: {
        fontSize: 12,
        color: '#1C1C1E',
        textAlign: 'center',
    },
    chatListContainer: {
        paddingTop: 8,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },
    chatAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E5EA',
        marginRight: 14,
    },
    chatContent: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500', // Default weight
    },
    textBold: {
        fontWeight: '700', // Unread weight
    },
    chatTime: {
        fontSize: 13,
        color: '#8E8E93',
    },
    chatTimeUnread: {
        color: '#007AFF', // Blue time for unread
        fontWeight: '600',
    },
    chatMessageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 2, // small padding for the dot
    },
    chatMessage: {
        fontSize: 15,
        color: '#8E8E93', // Read color
        flex: 1,
        marginRight: 10,
    },
    textBoldBlack: {
        fontWeight: '600',
        color: '#1C1C1E', // Unread color
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF', // Blue dot
    },

    // Empty State
    emptyStateContainer: {
        paddingTop: 40,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIllustrationCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EBF5FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    emptyActionButton: {
        backgroundColor: '#007AFF',
        width: '100%',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyActionText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
