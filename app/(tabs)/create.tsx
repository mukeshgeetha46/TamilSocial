import { useCreatePostMutation } from '@/redux/api/postApi';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Placeholder thumbnail for the selected media
const PREVIEW_IMAGE = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=200';

export default function CreateScreen() {
    const [caption, setCaption] = useState('');
    const [location] = useState('San Francisco, California');
    const [facebook, setFacebook] = useState(true);
    const [twitter, setTwitter] = useState(false);
    const [tumblr, setTumblr] = useState(false);

    const [createPost, { isLoading }] = useCreatePostMutation();

    const handleShare = async () => {
        try {
            const response = await createPost({
                media: [{ url: "https://i.pinimg.com/736x/f8/7f/e8/f87fe89cfc62f71e7097974579b680de.jpg", type: "image" }],
                caption: "Golden hour 🌅 #travel",
                hashtags: ["travel", "photography"],
                location: { name: "Santorini, Greece", latitude: 36.39, longitude: 25.46 },
            }).unwrap();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerSide}>
                    <Ionicons name="close" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Post</Text>
                <TouchableOpacity style={styles.headerSide} onPress={handleShare}>
                    <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Caption Area */}
                <View style={styles.captionContainer}>
                    <Image source={{ uri: PREVIEW_IMAGE }} style={styles.previewImage} contentFit="cover" />
                    <TextInput
                        style={styles.captionInput}
                        placeholder="Write a caption..."
                        placeholderTextColor="#AEAEB2"
                        multiline
                        value={caption}
                        onChangeText={setCaption}
                    />
                </View>

                {/* Icon Shortcuts Row */}
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="at" size={22} color="#3A3A3C" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <MaterialIcons name="tag" size={22} color="#3A3A3C" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="smile" size={22} color="#3A3A3C" />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Tag People */}
                <TouchableOpacity style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <Ionicons name="person-add-outline" size={22} color="#3A3A3C" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Tag People</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <View style={styles.rowDivider} />

                {/* Add Location */}
                <TouchableOpacity style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <Ionicons name="location-outline" size={22} color="#3A3A3C" style={styles.settingIcon} />
                        <View>
                            <Text style={styles.settingLabel}>Add Location</Text>
                            {location ? <Text style={styles.settingSubtext}>{location}</Text> : null}
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <View style={styles.rowDivider} />

                {/* Add Music */}
                <TouchableOpacity style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <Ionicons name="musical-note-outline" size={22} color="#3A3A3C" style={styles.settingIcon} />
                        <Text style={styles.settingLabel}>Add Music</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Also Post To Section */}
                <Text style={styles.sectionHeader}>ALSO POST TO</Text>

                {/* Facebook */}
                <View style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.socialIconBg, { backgroundColor: '#1877F2' }]}>
                            <FontAwesome5 name="facebook-f" size={16} color="#FFF" />
                        </View>
                        <Text style={styles.settingLabel}>Facebook</Text>
                    </View>
                    <Switch
                        value={facebook}
                        onValueChange={setFacebook}
                        trackColor={{ false: '#E5E5EA', true: '#2B8BFA' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#E5E5EA"
                    />
                </View>

                <View style={styles.rowDivider} />

                {/* Twitter */}
                <View style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.socialIconBg, { backgroundColor: '#1DA1F2' }]}>
                            <FontAwesome5 name="twitter" size={15} color="#FFF" />
                        </View>
                        <Text style={styles.settingLabel}>Twitter</Text>
                    </View>
                    <Switch
                        value={twitter}
                        onValueChange={setTwitter}
                        trackColor={{ false: '#E5E5EA', true: '#2B8BFA' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#E5E5EA"
                    />
                </View>

                <View style={styles.rowDivider} />

                {/* Tumblr */}
                <View style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <View style={[styles.socialIconBg, { backgroundColor: '#35465C' }]}>
                            <MaterialCommunityIcons name="tumblr" size={18} color="#FFF" />
                        </View>
                        <Text style={styles.settingLabel}>Tumblr</Text>
                    </View>
                    <Switch
                        value={tumblr}
                        onValueChange={setTumblr}
                        trackColor={{ false: '#E5E5EA', true: '#2B8BFA' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#E5E5EA"
                    />
                </View>

                <View style={styles.divider} />

                {/* Advanced Settings */}
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={styles.advancedText}>Advanced Settings</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <View style={styles.bottomPad} />
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
    },
    headerSide: {
        width: 52,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
    },
    shareText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2B8BFA',
        textAlign: 'right',
        width: 52,
    },
    captionContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'flex-start',
    },
    previewImage: {
        width: 72,
        height: 72,
        borderRadius: 6,
        backgroundColor: '#E5E5EA',
        marginRight: 14,
    },
    captionInput: {
        flex: 1,
        fontSize: 15,
        color: '#1C1C1E',
        minHeight: 72,
        textAlignVertical: 'top',
        paddingTop: 0,
    },
    iconRow: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 12,
        gap: 4,
    },
    iconBtn: {
        padding: 8,
    },
    divider: {
        height: 8,
        backgroundColor: '#F2F2F7',
    },
    rowDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
        marginLeft: 56,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        marginRight: 16,
        width: 24,
    },
    settingLabel: {
        fontSize: 15,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    settingSubtext: {
        fontSize: 13,
        color: '#2B8BFA',
        marginTop: 2,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8E8E93',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    socialIconBg: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    advancedText: {
        fontSize: 15,
        color: '#2B8BFA',
        fontWeight: '500',
    },
    bottomPad: {
        height: 40,
    },
});
