import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const IMAGE_SIZE = width / COLUMN_COUNT;

// --- MOCK DATA ---

const PROFILE_DATA = {
    name: 'Alex Rivera',
    username: 'alex_explorer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop', // Simulating the illustrated avatar
    posts: '142',
    followers: '12.5K',
    following: '842',
    bio: 'Digital Nomad & Adventure Photographer 📸\nExploring the world one pixel at a time.\n📍 Currently: Bali, Indonesia 🌴',
    link: 'linktr.ee/alex_explorer',
};

const GRID_IMAGES = [
    { id: '1', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop' },
    { id: '2', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop' },
    { id: '3', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop' },
    { id: '4', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop' },
    { id: '5', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop' },
    { id: '6', url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400&h=400&fit=crop' },
    { id: '7', url: 'https://images.unsplash.com/photo-1470071131384-001b85755b36?w=400&h=400&fit=crop' },
    { id: '8', url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop' },
    { id: '9', url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop' },
    { id: '10', url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop' },
    { id: '11', url: 'https://images.unsplash.com/photo-1418065462211-576483bdafb6?w=400&h=400&fit=crop' },
    { id: '12', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=400&fit=crop' },
];

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    const handleLinkPress = () => {
        Linking.openURL('https://' + PROFILE_DATA.link);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerUsername}>{PROFILE_DATA.username}</Text>
            <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/setting/setting')}>
                <Ionicons name="settings-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    const renderProfileInfo = () => (
        <View style={styles.infoContainer}>
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarRing}>
                    <Image source={PROFILE_DATA.avatar} style={styles.avatar} />
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{PROFILE_DATA.posts}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <TouchableOpacity style={styles.statItem} onPress={() => router.push('/Follower/follower')}>
                    <Text style={styles.statNumber}>{PROFILE_DATA.followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem} onPress={() => router.push('/Follower/following')}>
                    <Text style={styles.statNumber}>{PROFILE_DATA.following}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderBio = () => (
        <View style={styles.bioContainer}>
            <Text style={styles.bioName}>{PROFILE_DATA.name}</Text>
            <Text style={styles.bioText}>{PROFILE_DATA.bio}</Text>
            <TouchableOpacity onPress={handleLinkPress}>
                <Text style={styles.bioLink}>{PROFILE_DATA.link}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderActions = () => (
        <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('/Follower/editprofile')}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addPersonButton}>
                <Feather name="user-plus" size={18} color="black" />
            </TouchableOpacity>
        </View>
    );

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <MaterialIcons name="grid-on" size={24} color="#0095f6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Feather name="film" size={24} color="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <Feather name="user" size={24} color="#8e8e8e" />
            </TouchableOpacity>
        </View>
    );

    const renderTopContent = () => (
        <View>
            {renderProfileInfo()}
            {renderBio()}
            {renderActions()}
            {renderTabs()}
        </View>
    );

    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={styles.gridItem}>
            <Image source={item.url} style={styles.gridImage} contentFit="cover" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: 85 }]} edges={['top', 'left', 'right']}>
            {renderHeader()}
            <FlatList
                data={GRID_IMAGES}
                renderItem={renderGridItem}
                keyExtractor={(item) => item.id}
                numColumns={COLUMN_COUNT}
                ListHeaderComponent={renderTopContent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    listContent: {
        paddingBottom: 20,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
    },
    headerIcon: {
        padding: 5,
    },
    headerUsername: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },

    // Profile Info
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    avatarWrapper: {
        marginRight: 25,
    },
    avatarRing: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#e1306c', // Instagram-like colorful border
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    statLabel: {
        fontSize: 13,
        color: '#8e8e8e',
        marginTop: 2,
    },

    // Bio
    bioContainer: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
    bioName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        marginBottom: 2,
    },
    bioText: {
        fontSize: 14,
        color: '#4a4a4a',
        lineHeight: 20,
    },
    bioLink: {
        fontSize: 14,
        color: '#0095f6', // Blueprint link color
        marginTop: 2,
    },

    // Actions
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
        gap: 8,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#0095f6',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
    shareButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareButtonText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 14,
    },
    addPersonButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dbdbdb',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#0095f6',
    },

    // Grid
    gridItem: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderWidth: 0.5,
        borderColor: '#ffffff', // Create the tiny white gap between images
    },
    gridImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
});
