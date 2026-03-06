import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Mock Data
const COMMENTS = [
    {
        id: '1',
        username: 'alex_rivera',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        text: 'This is absolutely incredible! Love the transitions between the shots. How did you color grade this? 🔥',
        time: '2h',
        likes: '1,240',
        isAuthor: false,
    },
    {
        id: '2',
        username: 'sarah_j_design',
        avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
        text: 'Where was this filmed? The lighting is perfect. Reminds me of Tokyo at night!',
        time: '5h',
        likes: '842',
        isAuthor: false,
    },
    {
        id: '3',
        username: 'm_chen_visuals',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        text: 'What lens was used for the closeups? The bokeh is stunning.',
        time: '8h',
        likes: '315',
        isAuthor: false,
    },
    {
        id: '4',
        username: 'creator_official',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        text: "It's a 35mm f/1.4! Glad you liked it!",
        time: '7h',
        likes: '42',
        isAuthor: true,
        isReply: true, // Example of adding a small indent if needed later, though design shows it flat here
    },
    {
        id: '5',
        username: 'nina_travels',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026025d',
        text: 'Need more of this content! Keep going ✨',
        time: '12h',
        likes: '154',
        isAuthor: false,
    },
];

const EMOJIS = ['❤️', '🙌', '🔥', '👏', '😍', '😮', '😢', '💯'];

export default function CommendModel() {
    const [inputText, setInputText] = useState('');

    return (
        <View style={styles.modalOverlay}>
            <Stack.Screen options={{ headerShown: false, presentation: 'transparentModal' }} />

            {/* Invisible top area to close modal on tap */}
            <TouchableOpacity
                style={styles.dismissArea}
                activeOpacity={1}
                onPress={() => router.back()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.sheetContainer}
            >
                <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.dragHandle} />
                        <View style={styles.headerRow}>
                            <View style={styles.headerSpacer} />
                            <Text style={styles.headerTitle}>Comments</Text>
                            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                                <Feather name="x" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Comment List */}
                    <ScrollView
                        style={styles.commentsList}
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={styles.commentsContent}
                    >
                        {COMMENTS.map((comment) => (
                            <View key={comment.id} style={[styles.commentRow, comment.isReply && styles.replyIndent]}>
                                <Image source={{ uri: comment.avatar }} style={styles.avatar} contentFit="cover" />

                                <View style={styles.commentContent}>
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.username}>{comment.username}</Text>
                                        {comment.isAuthor && (
                                            <View style={styles.authorBadge}>
                                                <Text style={styles.authorText}>AUTHOR</Text>
                                            </View>
                                        )}
                                        <Text style={styles.timeText}>{comment.time}</Text>
                                    </View>

                                    <Text style={styles.commentText}>{comment.text}</Text>

                                    <View style={styles.commentFooter}>
                                        <TouchableOpacity>
                                            <Text style={styles.replyText}>Reply</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.likeAction}>
                                            <Feather name="heart" size={12} color="#8E8E93" />
                                            <Text style={styles.likeCount}>{comment.likes}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Bottom Input Area */}
                    <View style={styles.inputSection}>
                        <View style={styles.inputRow}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} // Current user avatar mock
                                style={styles.currentUserAvatar}
                                contentFit="cover"
                            />

                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Add a comment..."
                                    placeholderTextColor="#8E8E93"
                                    value={inputText}
                                    onChangeText={setInputText}
                                    multiline
                                />
                                <TouchableOpacity style={styles.inputIcon}>
                                    <Feather name="smile" size={20} color="#8E8E93" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.inputIcon}>
                                    <Ionicons name="send" size={20} color={inputText.length > 0 ? "#2B8BFA" : "#A1C9F7"} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Quick Emoji Bar */}
                        <View style={styles.emojiBar}>
                            {EMOJIS.map((emoji, idx) => (
                                <TouchableOpacity key={idx} style={styles.emojiBtn}>
                                    <Text style={styles.emojiText}>{emoji}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    sheetContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '85%', // Prevent it from taking entire screen
        minHeight: '50%',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
        alignItems: 'center',
    },
    dragHandle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D1D6',
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    headerSpacer: {
        width: 24, // Matches close button size to keep title centered
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    closeButton: {
        width: 24,
        alignItems: 'flex-end',
    },
    commentsList: {
        flex: 1,
    },
    commentsContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    commentRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    replyIndent: {
        marginLeft: 30, // example indent for replies if needed
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E5E5EA',
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    username: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1C1C1E',
        marginRight: 6,
    },
    authorBadge: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    authorText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#2B8BFA',
    },
    timeText: {
        fontSize: 13,
        color: '#8E8E93',
    },
    commentText: {
        fontSize: 14,
        color: '#3A3A3C',
        lineHeight: 20,
        marginBottom: 6,
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        marginRight: 16,
    },
    likeAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 4,
    },
    inputSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E5EA',
        backgroundColor: '#FFFFFF',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    currentUserAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 20,
        paddingHorizontal: 12,
        minHeight: 40,
        maxHeight: 100,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 10,
        paddingRight: 8,
    },
    inputIcon: {
        padding: 4,
        marginLeft: 4,
    },
    emojiBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    emojiBtn: {
        padding: 4,
    },
    emojiText: {
        fontSize: 22,
    },
});
