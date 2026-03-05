import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Mock data for the static UI
const REEL_DATA = {
    url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=600&h=1200', // Vertical city image
    username: 'alex_travels',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    caption: 'Exploring the hidden gems of the city tonight. The vibes are absolutely unmatched! ✨\n#citylife #nightvibes #explore',
    audioTrack: 'Original Audio - Night City Beats (prod. Alex)',
    likes: '12.4k',
    comments: '856',
};

export default function ReelsScreen() {
    return (
        <View style={styles.container}>
            {/* Background Media Placeholder */}
            <Image
                source={{ uri: REEL_DATA.url }}
                style={styles.backgroundImage}
                contentFit="cover"
            />

            {/* Subtle bottom gradient would go here if expo-linear-gradient was confirmed installed, 
          using a dark semi-transparent overlay instead for guaranteed shadow/readability */}
            <View style={styles.darkBottomOverlay} />

            <SafeAreaView style={styles.safeArea}>
                {/* Top Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reels</Text>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="camera-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Main Content Area */}
                <View style={styles.mainContent}>
                    {/* Bottom Left Info Area */}
                    <View style={styles.infoArea}>
                        <View style={styles.userRow}>
                            <Image source={{ uri: REEL_DATA.avatarUrl }} style={styles.avatar} />
                            <Text style={styles.username}>@{REEL_DATA.username}</Text>
                            <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>Follow</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.captionText}>{REEL_DATA.caption}</Text>

                        <View style={styles.audioRow}>
                            <Ionicons name="musical-note" size={16} color="white" />
                            <Text style={styles.audioText} numberOfLines={1}>
                                {REEL_DATA.audioTrack}
                            </Text>
                        </View>
                    </View>

                    {/* Bottom Right Actions Area */}
                    <View style={styles.actionsArea}>
                        <View style={styles.actionItem}>
                            <TouchableOpacity>
                                <Ionicons name="heart" size={36} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.actionText}>{REEL_DATA.likes}</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <TouchableOpacity>
                                <Ionicons name="chatbubble" size={32} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.actionText}>{REEL_DATA.comments}</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <TouchableOpacity>
                                <Ionicons name="share-social-outline" size={34} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.actionText}>Share</Text>
                        </View>

                        <View style={styles.actionItem}>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.actionItem, { marginTop: 10 }]}>
                            <TouchableOpacity style={styles.audioDisk}>
                                {/* Rotating disk effect container placeholder */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            {/* Bottom Progress Bar Placeholder */}
            <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height,
    },
    darkBottomOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(0,0,0,0.3)', // gradient approximation
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    headerIcon: {
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    infoArea: {
        flex: 1,
        marginRight: 20,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 12,
    },
    followButton: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    followButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
    },
    captionText: {
        color: 'white',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    audioRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    audioText: {
        color: 'white',
        fontSize: 13,
        marginLeft: 8,
        flexShrink: 1,
    },
    actionsArea: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    actionItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    audioDisk: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#333',
        borderWidth: 2,
        borderColor: 'white',
    },
    progressBarBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    progressBarFill: {
        height: '100%',
        width: '40%', // Mock progress
        backgroundColor: 'white',
    },
});
