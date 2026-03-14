import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSendMessageMutation } from '../../redux/api/messageApi';

const { width } = Dimensions.get('window');

// Mock Data
const CONTACT = {
    name: 'Alex Johnson',
    status: 'Online',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    isOnline: true,
};

const MESSAGES = [
    { type: 'date', text: 'YESTERDAY', id: 'd1' },
    {
        id: 'm1',
        sender: 'alex',
        avatar: CONTACT.avatar,
        text: 'Hey! Did you see the photos from the hike yesterday? The view from the summit was absolutely incredible.',
        time: '10:42 AM',
        isSelf: false
    },
    {
        id: 'm2',
        sender: 'me',
        text: 'I just saw them! That landscape is breathtaking. Send more if you have any!',
        time: '10:45 AM',
        isSelf: true,
        isRead: true,
        replyTo: {
            name: 'Alex Johnson',
            text: 'The view from the summit was absolutely incredible.'
        }
    },
    {
        id: 'm3',
        sender: 'alex',
        avatar: CONTACT.avatar,
        imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400', // Mock mountain view
        text: 'Here is my favorite shot of the day.',
        time: '10:46 AM',
        isSelf: false
    },
];

export default function ChatMessage() {
    const [inputText, setInputText] = useState('');
    const [sendMessage] = useSendMessageMutation();

    const handleSend = async () => {
        try {
            const response = await sendMessage({ conversationId: "69b42caa859a654634dc20a8", type: "text", body: 'Hii gi' }).unwrap();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.headerUserInfo}>
                        <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/Chatfile/chatprofile')}>
                            <Image source={{ uri: CONTACT.avatar }} style={styles.avatar} contentFit="cover" />
                            {CONTACT.isOnline && <View style={styles.onlineDot} />}
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerName}>{CONTACT.name}</Text>
                            <Text style={styles.headerStatus}>{CONTACT.status}</Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.headerIcon}>
                            <Ionicons name="videocam-outline" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIcon}>
                            <Ionicons name="call-outline" size={22} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIcon}>
                            <Ionicons name="information-circle-outline" size={26} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Message List */}
                <ScrollView
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {MESSAGES.map((msg, index) => {
                        if (msg.type === 'date') {
                            return (
                                <View key={msg.id} style={styles.dateContainer}>
                                    <View style={styles.datePill}>
                                        <Text style={styles.dateText}>{msg.text}</Text>
                                    </View>
                                </View>
                            );
                        }

                        if (msg.isSelf) {
                            // Outgoing Message (Blue Bubble)
                            return (
                                <View key={msg.id} style={styles.outgoingContainer}>
                                    <View style={styles.outgoingBubble}>
                                        {msg.replyTo && (
                                            <View style={styles.replyBox}>
                                                <Text style={styles.replyName}>{msg.replyTo.name}</Text>
                                                <Text style={styles.replyText} numberOfLines={1}>{msg.replyTo.text}</Text>
                                            </View>
                                        )}
                                        <Text style={styles.outgoingMessageText}>{msg.text}</Text>
                                    </View>
                                    <View style={styles.outgoingMeta}>
                                        <Text style={styles.messageTime}>{msg.time}</Text>
                                        {msg.isRead && <Ionicons name="checkmark-done" size={16} color="#007AFF" style={styles.readTicks} />}
                                    </View>
                                </View>
                            );
                        }

                        // Incoming Message (White Bubble)
                        return (
                            <View key={msg.id} style={styles.incomingContainer}>
                                <Image source={{ uri: msg.avatar }} style={styles.messageAvatar} contentFit="cover" />
                                <View style={styles.incomingContent}>
                                    <View style={styles.incomingBubble}>
                                        {msg.imageUrl && (
                                            <Image source={{ uri: msg.imageUrl }} style={styles.messageImage} contentFit="cover" />
                                        )}
                                        {msg.text && (
                                            <Text style={[styles.incomingMessageText, msg.imageUrl && styles.imageCaptionText]}>
                                                {msg.text}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.incomingMessageTime}>{msg.time}</Text>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Input Bar */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputLeftWrapper}>
                        <TouchableOpacity style={styles.inputIcon}>
                            <Feather name="smile" size={24} color="#8E8E93" />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Type a message..."
                            placeholderTextColor="#8E8E93"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />

                        <TouchableOpacity style={styles.inputIcon}>
                            <Ionicons name="attach-outline" size={28} color="#8E8E93" style={{ transform: [{ rotate: '-45deg' }] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputIconRight}>
                            <Feather name="camera" size={22} color="#8E8E93" />
                        </TouchableOpacity>
                    </View>

                    {/* Blue Mic/Send Button */}
                    <View style={styles.sendButtonWrapper}>
                        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            {inputText.trim().length > 0 ? (
                                <Ionicons name="send" size={20} color="white" style={{ marginLeft: 4 }} /> // slight offset for send icon
                            ) : (
                                <MaterialCommunityIcons name="microphone" size={24} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
        zIndex: 10,
    },
    backButton: {
        marginRight: 16,
    },
    headerUserInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E5E5EA',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#34C759', // Green
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    headerTextContainer: {
        justifyContent: 'center',
    },
    headerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    headerStatus: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: 16,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#F8F9FB', // slight off-white background typical for chats
    },
    messagesContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    datePill: {
        backgroundColor: '#EDF1F7',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 12,
    },
    dateText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7A9B',
    },
    // INCOMING BUBBLE
    incomingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-end',
        paddingRight: 60, // Ensure it doesn't stretch too far right
    },
    messageAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
        marginBottom: 20, // push avatar up slightly compared to bottom of text
    },
    incomingContent: {
        flex: 1,
    },
    incomingBubble: {
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 16,
        borderBottomLeftRadius: 4, // distinct sharp corner
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    incomingMessageText: {
        fontSize: 15,
        color: '#1C1C1E',
        lineHeight: 22,
    },
    messageImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageCaptionText: {
        marginTop: 4,
    },
    incomingMessageTime: {
        fontSize: 11,
        color: '#8E8E93',
        marginTop: 6,
        marginLeft: 4,
    },
    // OUTGOING BUBBLE
    outgoingContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingLeft: 60,
    },
    outgoingBubble: {
        backgroundColor: '#2B8BFA', // iOS/Messenger blue
        padding: 14,
        borderRadius: 16,
        borderBottomRightRadius: 4, // sharp corner
    },
    replyBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // translucent white over the blue
        borderLeftWidth: 3,
        borderLeftColor: '#FFFFFF',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 8,
    },
    replyName: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 2,
    },
    replyText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 13,
    },
    outgoingMessageText: {
        fontSize: 15,
        color: '#FFFFFF',
        lineHeight: 22,
    },
    outgoingMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        marginRight: 4,
    },
    messageTime: {
        fontSize: 11,
        color: '#8E8E93',
        marginRight: 4,
    },
    readTicks: {
        marginLeft: 2,
    },
    // INPUT SECTION
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#F0F0F0',
    },
    inputLeftWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 20,
        minHeight: 44,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    inputIcon: {
        padding: 6,
    },
    inputIconRight: {
        padding: 6,
        marginLeft: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        maxHeight: 100, // stops it from growing too tall
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 4,
        minHeight: 44,
    },
    sendButtonWrapper: {
        justifyContent: 'flex-end',
        paddingBottom: 2, // align with input field visually
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2B8BFA',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2B8BFA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
});
