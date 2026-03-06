import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from "expo-router";
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA ---

const STORIES = [
  { id: '1', username: 'Your Story', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', isUser: true, hasStory: false },
  { id: '2', username: 'sarah_j', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', isUser: false, hasStory: true },
  { id: '3', username: 'mbloom', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', isUser: false, hasStory: true },
  { id: '4', username: 'nomad_life', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop', isUser: false, hasStory: true },
  { id: '5', username: 'alex_photo', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', isUser: false, hasStory: true },
];

const SUGGESTED_USERS = [
  { id: 's1', username: 'lucas_v', subtitle: 'Suggested for you', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { id: 's2', username: 'art_by_mia', subtitle: 'Followed by mbloom', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop' },
  { id: 's3', username: 'travel_guy', subtitle: 'Suggested for you', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
];

const FEED_DATA = [
  {
    id: 'p1',
    type: 'post',
    user: { username: 'elena_r', location: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=800&fit=crop',
    likes: '1,248',
    caption: 'Golden hour in paradise. ☀️ Taking in every second of this view. #santorini #travelgram #summer2024',
    commentsCount: 42,
    time: '2 HOURS AGO',
    isLiked: false,
  },
  {
    id: 'suggested_block',
    type: 'suggested',
  },
  {
    id: 'p2',
    type: 'post',
    user: { username: 'chef_marco', location: 'The Pasta Lab, Rome', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop' },
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=800&fit=crop',
    likes: '856',
    caption: "Secret ingredient? It's always love... and a lot of pecorino. 🍝",
    commentsCount: 15,
    time: '5 HOURS AGO',
    isLiked: true,
  },
];


// --- COMPONENTS ---

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>InstaClone</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/Notification/notification')}>
        <Feather name="plus-square" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/Chatfile/chat')}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>3</Text>
        </View>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const StoryItem = ({ item }) => (
  <View style={styles.storyContainer}>
    <View style={[styles.storyImageRing, item.hasStory && styles.storyImageRingActive]}>
      <Image source={item.image} style={styles.storyImage} />
    </View>
    {item.isUser && (
      <View style={styles.addStoryIcon}>
        <Feather name="plus" size={14} color="white" />
      </View>
    )}
    <Text style={styles.storyUsername} numberOfLines={1}>
      {item.username}
    </Text>
  </View>
);

const StoriesMap = () => (
  <View style={styles.storiesWrapper}>
    <FlatList
      data={STORIES}
      renderItem={({ item }) => <StoryItem item={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.storiesList}
    />
  </View>
);

const SuggestedItem = ({ item }) => (
  <View style={styles.suggestedCard}>
    <TouchableOpacity style={styles.suggestedClose}>
      <Feather name="x" size={16} color="#8e8e8e" />
    </TouchableOpacity>
    <Image source={item.image} style={styles.suggestedImage} />
    <Text style={styles.suggestedUsername} numberOfLines={1}>{item.username}</Text>
    <Text style={styles.suggestedSubtitle} numberOfLines={1}>{item.subtitle}</Text>
    <TouchableOpacity style={styles.followButton}>
      <Text style={styles.followButtonText}>Follow</Text>
    </TouchableOpacity>
  </View>
);

const SuggestedBlock = () => (
  <View style={styles.suggestedBlockContainer}>
    <View style={styles.suggestedBlockHeader}>
      <Text style={styles.suggestedBlockTitle}>Suggested for You</Text>
      <TouchableOpacity>
        <Text style={styles.suggestedBlockSeeAll}>See All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={SUGGESTED_USERS}
      renderItem={({ item }) => <SuggestedItem item={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.suggestedListStyle}
    />
  </View>
);

const PostItem = ({ item }) => (
  <View style={styles.postContainer}>
    {/* Post Header */}
    <View style={styles.postHeader}>
      <View style={styles.postHeaderLeft}>
        <Image source={item.user.image} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>{item.user.username}</Text>
          <Text style={styles.postLocation}>{item.user.location}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>

    {/* Post Image */}
    <Image source={item.image} style={styles.postImage} contentFit="cover" />

    {/* Post Actions */}
    <View style={styles.postActions}>
      <View style={styles.postActionsLeft}>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={26} color={item.isLiked ? "#ff3040" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={() => router.push('/Commend/postcommend')}>
          <Ionicons name="chatbubble-outline" size={24} color="black" style={{ transform: [{ scaleX: -1 }] }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={() => router.push('/Commend/sharemodel')}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.actionIconRight}>
        <Feather name="bookmark" size={24} color="black" />
      </TouchableOpacity>
    </View>

    {/* Post Details */}
    <View style={styles.postDetails}>
      <Text style={styles.likesText}>{item.likes} likes</Text>

      <Text style={styles.captionText} numberOfLines={2}>
        <Text style={styles.captionUsername}>{item.user.username} </Text>
        {item.caption}
      </Text>

      {item.commentsCount > 0 && (
        <TouchableOpacity onPress={() => router.push('/Commend/postcommend')}>
          <Text style={styles.viewCommentsText}>View all {item.commentsCount} comments</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.timeText}>{item.time}</Text>

      {/* Add Comment */}
      <View style={styles.addCommentContainer}>
        <View style={styles.addCommentLeft}>
          <Image source={STORIES[0].image} style={styles.addCommentAvatar} />
          <Text style={styles.addCommentPlaceholder}>Add a comment...</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


// --- MAIN SCREEN ---

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => {
    if (item.type === 'post') {
      return <PostItem item={item} />;
    } else if (item.type === 'suggested') {
      return <SuggestedBlock />;
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 85 }]} edges={['top', 'left', 'right']}>
      <Header />
      <FlatList
        data={FEED_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<StoriesMap />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- STYLES ---

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066ee', // A blueish color like the screenshot "InstaClone" text
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff3040',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },

  // Stories
  storiesWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 8,
  },
  storiesList: {
    paddingHorizontal: 10,
    gap: 15,
  },
  storyContainer: {
    alignItems: 'center',
    width: 70,
    position: 'relative',
  },
  storyImageRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImageRingActive: {
    borderWidth: 2,
    borderColor: '#e1306c', // Instagram orange/pink gradient approximation
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  addStoryIcon: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#0095f6',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    color: '#262626',
    textAlign: 'center',
  },

  // Feed Post
  postContainer: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  postUserInfo: {
    justifyContent: 'center',
  },
  postUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  postLocation: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 1,
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  postActionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionIcon: {
    // padding area
  },
  actionIconRight: {
    // padding area
  },
  postDetails: {
    paddingHorizontal: 15,
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
    marginBottom: 5,
  },
  captionText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 18,
    marginBottom: 5,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
  viewCommentsText: {
    color: '#8e8e8e',
    fontSize: 14,
    marginBottom: 5,
  },
  timeText: {
    color: '#a8a8a8',
    fontSize: 10,
    marginBottom: 10,
  },
  addCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  addCommentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  addCommentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  addCommentPlaceholder: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  postButtonText: {
    color: '#0095f6', // Light blue
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Suggested For You Block
  suggestedBlockContainer: {
    backgroundColor: '#fafafa', // Slight off-white to distinguish from white posts
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    marginVertical: 10,
  },
  suggestedBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  suggestedBlockTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  suggestedBlockSeeAll: {
    color: '#0095f6',
    fontWeight: 'bold',
    fontSize: 13,
  },
  suggestedListStyle: {
    paddingHorizontal: 15,
    gap: 10,
  },
  suggestedCard: {
    width: 140,
    padding: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    alignItems: 'center',
    position: 'relative',
  },
  suggestedClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  suggestedImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  suggestedUsername: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#262626',
    marginBottom: 4,
  },
  suggestedSubtitle: {
    color: '#8e8e8e',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 12,
  },
  followButton: {
    backgroundColor: '#0095f6',
    width: '100%',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

});
