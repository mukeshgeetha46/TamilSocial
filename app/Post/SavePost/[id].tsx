import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const IMAGE_SIZE = width / COLUMN_COUNT;

const CATEGORIES = ['All Posts', 'Travel', 'Design', 'Architecture', 'Photography'];

// Mock data to match the provided image grid
const GRID_DATA = [
  { id: '1', type: 'gallery', uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' }, 
  { id: '2', type: 'video', uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600' }, 
  { id: '3', type: 'image', uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' }, 
  { id: '4', type: 'image', uri: 'https://plus.unsplash.com/premium_photo-1673356301535-224a0f16e4cb?auto=format&fit=crop&q=80&w=600' }, 
  { id: '5', type: 'gallery', uri: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=600' }, 
  { id: '6', type: 'image', uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' }, 
  { id: '7', type: 'image', uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' }, 
  { id: '8', type: 'video', uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600' }, 
  { id: '9', type: 'image', uri: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600' }, 
  { id: '10', type: 'image', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600' }, 
  { id: '11', type: 'image', uri: 'https://plus.unsplash.com/premium_photo-1661502444605-e415ad82fa08?auto=format&fit=crop&q=80&w=600' }, 
  { id: '12', type: 'video', uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600' }, 
];

export default function SavePost() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const renderGridItem = ({ item }: { item: typeof GRID_DATA[0] }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.gridItemContainer}>
        <Image
          source={{ uri: item.uri }}
          style={styles.gridImage}
          contentFit="cover"
          transition={200}
        />
        {item.type === 'video' && (
          <View style={styles.iconOverlay}>
            <Ionicons name="play" size={18} color="#FFFFFF" style={styles.shadowIcon} />
          </View>
        )}
        {item.type === 'gallery' && (
          <View style={styles.iconOverlay}>
            <Ionicons name="images" size={16} color="#FFFFFF" style={styles.shadowIcon} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.categoryChip, isActive && styles.activeCategoryChip]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.cardsRow}>
        <TouchableOpacity style={styles.cardContainer}>
          <Text style={styles.cardSubtitle}>Quick Access</Text>
          <View style={styles.cardSpaceBetween}>
            <Text style={styles.cardTitle}>Favorites</Text>
            <Ionicons name="star" size={20} color="#3B82F6" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cardContainer}>
          <Text style={styles.cardSubtitle}>42 Items</Text>
          <View style={styles.cardSpaceBetween}>
            <Text style={styles.cardTitle}>Collections</Text>
            <MaterialCommunityIcons name="folder-star" size={22} color="#4B5563" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Fixed Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved</Text>
        <TouchableOpacity style={styles.headerIconButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={GRID_DATA}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
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
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerIconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContent: {
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  categoriesContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  activeCategoryChip: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  cardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  cardSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  gridItemContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  shadowIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
