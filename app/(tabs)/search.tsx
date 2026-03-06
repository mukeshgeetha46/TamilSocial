import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 4) / 2; // 2px gap between columns

const CATEGORIES = ['For You', 'Photography', 'Travel', 'Architecture', 'Art', 'Food'];

const MASONRY_DATA = [
    { id: '1', url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400', height: 200, type: 'image' },
    { id: '2', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', height: 180, type: 'image' },
    { id: '3', url: 'https://images.unsplash.com/photo-1510018572596-a403bcedb266?auto=format&fit=crop&q=80&w=400', height: 280, type: 'image' },
    { id: '4', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400', height: 220, type: 'video' },
    { id: '5', url: 'https://images.unsplash.com/photo-1502481851512-ca6d15b135bb?auto=format&fit=crop&q=80&w=400', height: 240, type: 'location', location: 'Alps, Switzerland' },
    { id: '6', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400', height: 300, type: 'collection' },
    { id: '7', url: 'https://images.unsplash.com/photo-1515446134809-993c501ca304?auto=format&fit=crop&q=80&w=400', height: 160, type: 'image' },
    { id: '8', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&q=80&w=400', height: 250, type: 'image' },
    { id: '9', url: 'https://images.unsplash.com/photo-1621570273837-7f93deb3b61c?auto=format&fit=crop&q=80&w=400', height: 200, type: 'video' },
    { id: '10', url: 'https://images.unsplash.com/photo-1498837167922-41c54b310a42?auto=format&fit=crop&q=80&w=400', height: 180, type: 'image' },
    { id: '11', url: 'https://images.unsplash.com/photo-1555513813-f865f32cb71a?auto=format&fit=crop&q=80&w=400', height: 260, type: 'image' },
    { id: '12', url: 'https://images.unsplash.com/photo-1513346940221-6f673d962e97?auto=format&fit=crop&q=80&w=400', height: 220, type: 'image' },
];

// Split data into two columns for masonry layout
const getMasonryColumns = (data: any[]) => {
    const leftColumn = data.filter((_, index) => index % 2 === 0);
    const rightColumn = data.filter((_, index) => index % 2 !== 0);
    return { leftColumn, rightColumn };
};

const EmptySearchState = () => (
    <View style={styles.emptyStateContainer}>
        <View style={styles.emptyIllustrationContainer}>
            <View style={styles.emptyIllustrationCircle}>
                <View style={styles.globeIconContainer}>
                    <Ionicons name="globe-outline" size={50} color="#E5E5EA" />
                    <View style={styles.searchBadge}>
                        <Ionicons name="search" size={24} color="#8E8E93" />
                    </View>
                </View>
            </View>
        </View>

        <Text style={styles.emptyTitle}>Explore New Creators</Text>
        <Text style={styles.emptySubtitle}>
            Start searching for people, hashtags, or topics to see posts here.
        </Text>
    </View>
);

export default function SearchScreen() {
    const [activeCategory, setActiveCategory] = useState('For You');

    const renderMasonryItem = (item: any) => (
        <View key={item.id} style={[styles.masonryItem, { height: item.height }]}>
            <Image
                source={{ uri: item.url }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            {item.type === 'video' && (
                <View style={styles.iconOverlayTopRight}>
                    <Ionicons name="play-circle" size={24} color="white" />
                </View>
            )}
            {item.type === 'collection' && (
                <View style={styles.iconOverlayTopRight}>
                    <Ionicons name="layers" size={20} color="white" />
                </View>
            )}
            {item.type === 'location' && (
                <View style={styles.locationOverlay}>
                    <Ionicons name="location-sharp" size={14} color="white" style={{ marginRight: 4 }} />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Search Bar */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search creators, topics, or trends"
                        placeholderTextColor="#8E8E93"
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={24} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryPill,
                                activeCategory === category && styles.categoryPillActive,
                            ]}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    activeCategory === category && styles.categoryTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Masonry Grid or Empty State */}
            {MASONRY_DATA.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.masonryScroll}>
                    <View style={styles.masonryContainer}>
                        <View style={styles.masonryColumn}>
                            {getMasonryColumns(MASONRY_DATA).leftColumn.map(renderMasonryItem)}
                        </View>
                        <View style={styles.masonryColumn}>
                            {getMasonryColumns(MASONRY_DATA).rightColumn.map(renderMasonryItem)}
                        </View>
                    </View>
                    <View style={{ height: 20 }} /> {/* Bottom padding */}
                </ScrollView>
            ) : (
                <EmptySearchState />
            )}
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
        paddingTop: 12,
        paddingBottom: 16,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        height: 38,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#000000',
        paddingVertical: 0, // important for Android to center text vertically
    },
    filterButton: {
        marginLeft: 16,
        padding: 4,
    },
    categoriesWrapper: {
        paddingBottom: 12,
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 10,
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
    },
    categoryPillActive: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    masonryScroll: {
        flex: 1,
    },
    masonryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 1, // small padding to avoid clipping
        gap: 2, // Space between columns
    },
    masonryColumn: {
        flex: 1,
        gap: 2, // Space between items vertically
    },
    masonryItem: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#E5E5EA', // placeholder color
    },
    image: {
        width: '100%',
        height: '100%',
    },
    iconOverlayTopRight: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    locationOverlay: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    locationText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },

    // Empty State Styles
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyIllustrationContainer: {
        marginBottom: 30,
    },
    emptyIllustrationCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    globeIconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#FFFFFF',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        // Subtle shadow for the badge
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 22,
    },
});
