import { useFollowMutation, useGetFollowSuggestionsQuery } from '@/redux/api/followApi';
import { useLikeMutation, useUnlikeMutation } from '@/redux/api/likesSaveFeedExploreApi';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetHomeFeedQuery } from '../../redux/api/feedApi';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { saveApi, useSavePostMutation, useUnsavePostMutation } from '../../redux/api/saveApi';
import { useCommentSheet } from '../context/CommentSheetContext';
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
    id: 'p2',
    type: 'post',
    user: { username: 'elena_r', location: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
    image: 'https://i.ytimg.com/vi/hk1QjhtIE9s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDEYl7DoZNJ-UCcw4Y9viLBLArVXw',
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
    id: 'p3',
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

const getAvatarColor = (name: string) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const UserAvatar = ({ image, name, size, style }: { image?: any; name: string; size: number; style?: any }) => {
  const initial = name.charAt(0).toUpperCase();
  const backgroundColor = getAvatarColor(name);

  if (image && (typeof image === 'string' ? image.trim() !== '' : true)) {
    return <Image source={image} style={[{ width: size, height: size, borderRadius: size / 2 }, style]} />;
  }

  return (
    <View style={[{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center'
    }, style]}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: size * 0.4 }}>{initial}</Text>
    </View>
  );
};

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

const StoryItem = ({ item }: { item: any }) => (
  <View style={styles.storyContainer}>
    <View style={[styles.storyImageRing, item.hasStory && styles.storyImageRingActive]}>
      <UserAvatar image={item.image} name={item.username} size={60} />
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

const SuggestedItem = ({ item, handleFollow }: { item: any, handleFollow: (id: string) => void }) => (
  <TouchableOpacity style={styles.suggestedCard} onPress={() => router.push(`/Profile/${item.id}`)}>
    <TouchableOpacity style={styles.suggestedClose}>
      <Feather name="x" size={16} color="#8e8e8e" />
    </TouchableOpacity>
    <UserAvatar image={item.image} name={item.username} size={60} style={{ marginBottom: 10 }} />
    <Text style={styles.suggestedUsername} numberOfLines={1}>{item.username}</Text>
    <Text style={styles.suggestedSubtitle} numberOfLines={1}>{item.subtitle}</Text>
    <TouchableOpacity style={styles.followButton} onPress={() => handleFollow(item.id)}>
      <Text style={styles.followButtonText}>{item.isVerified ? 'Unfollow' : 'Follow'}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const SuggestedBlock = ({ user, handleFollow }: { user: any, handleFollow: (id: string) => void }) => (
  <View style={styles.suggestedBlockContainer}>
    <View style={styles.suggestedBlockHeader}>
      <Text style={styles.suggestedBlockTitle}>Suggested for You</Text>
      <TouchableOpacity>
        <Text style={styles.suggestedBlockSeeAll}>See All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={user}
      renderItem={({ item }) => <SuggestedItem item={item} handleFollow={handleFollow} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.suggestedListStyle}
    />
  </View>
);

const EmptyState = ({ user, handleFollow }) => (
  <View style={styles.emptyStateContainer}>
    <View style={styles.emptyIllustrationContainer}>
      <View style={styles.emptyIllustrationCircle}>
        <Ionicons name="images-outline" size={40} color="#8e8e8e" />
        <View style={styles.emptyIllustrationPlus}>
          <Feather name="plus" size={14} color="white" />
        </View>
      </View>
    </View>

    <Text style={styles.emptyTitle}>Welcome to InstaClone</Text>
    <Text style={styles.emptySubtitle}>
      When you follow people, you'll see the photos and videos they post here.
    </Text>

    <TouchableOpacity style={styles.findPeopleButton}>
      <Text style={styles.findPeopleButtonText}>Find People to Follow</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.createPostButton}>
      <Text style={styles.createPostButtonText}>Create Your First Post</Text>
    </TouchableOpacity>

    <View style={styles.suggestedSection}>
      <View style={styles.suggestedHeader}>
        <Text style={styles.suggestedTitle}>Suggested for you</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={user}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.suggestedUserCard} onPress={() => router.push(`/Profile/${item.id}`)}>
            <UserAvatar image={item.image} name={item.username} size={60} style={{ marginBottom: 10 }} />
            <Text style={styles.suggestedUsername} numberOfLines={1}>{item.username}</Text>
            <TouchableOpacity style={styles.suggestedFollowButton} onPress={() => handleFollow(item.id)}>
              <Text style={styles.suggestedFollowText}>Follow</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestedUserList}
      />
    </View>
  </View>
);

const CommentItem = ({ comment }) => {
  return (
    <View style={styles.container1}>
      {/* Avatar */}
      <Image source={{ uri: comment.avatar }} style={styles.avatar} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.username}>{comment.user}</Text>
          <Text style={styles.time}> • {comment.time}</Text>
        </View>

        <Text style={styles.text}>{comment.text}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.likeBtn}>
            <Ionicons name="heart-outline" size={16} color="#555" />
            <Text style={styles.likes}>{comment.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.reply}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const PostItem = ({ item, onLike, openSheet }: { item: any; onLike: (id: string) => void; openSheet: () => void }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const dispatch = useDispatch();
  const [savePost, { isLoading, error }] = useSavePostMutation();
  const [unsavePost, { isLoading: unsaveLoading, error: unsaveError }] = useUnsavePostMutation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const playAnimation = () => {
    scale.value = 0;
    opacity.value = 1;
    scale.value = withSequence(
      withSpring(1, { damping: 10, stiffness: 100 }),
      withDelay(500, withSpring(0))
    );
    opacity.value = withDelay(1000, withTiming(0));
  };

  const handleLike = () => {
    onLike(item.id, item.user.id, item.type);
    playAnimation();
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(handleLike)();
    });

  const HandleSave = async () => {
    // 1. Call API first
    try {
      if (item.isSaved) {
        await unsavePost(item.id);
      } else {
        await savePost({ postId: item.id });
      }

      // 2. Only update cache after API succeeds
      dispatch(
        saveApi.util.updateQueryData('getHomeFeed', { limit: 10 }, (draft) => {
          const post = draft.feed.find((i) => i.type === 'post' && i.id === item.id);
          if (post) post.isSaved = !post.isSaved;
        })
      );
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity style={styles.postHeaderLeft} onPress={() => router.push(`/Profile/${item.user.id}`)}>
          <UserAvatar image={item.user.image} name={item.user.username} size={36} />
          <View style={styles.postUserInfo}>
            <Text style={styles.postUsername}>{item.user.username}</Text>
            <Text style={styles.postLocation}>{item.user.location}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image with Double Tap */}
      <GestureDetector gesture={doubleTapGesture}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.postImage} contentFit="cover" />
          <Animated.View style={[styles.heartOverlay, animatedStyle]}>
            <Ionicons name="heart" size={100} color="white" />
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity style={styles.actionIcon} onPress={handleLike}>
            <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={26} color={item.isLiked ? "#ff3040" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon} onPress={openSheet}>
            <Ionicons name="chatbubble-outline" size={24} color="black" style={{ transform: [{ scaleX: -1 }] }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon} onPress={() => router.push('/Commend/sharemodel')}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionIconRight} onPress={HandleSave}>
          <Ionicons
            name={item.isSaved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="black"
          />
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
            <UserAvatar image={STORIES[0].image} name={STORIES[0].username} size={24} />
            <Text style={styles.addCommentPlaceholder}>Add a comment...</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


// --- MAIN SCREEN ---

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [cursor, setCursor] = useState(undefined);
  const { openSheet } = useCommentSheet();
  const { data, isFetching, isLoading, isError, refetch } = useGetHomeFeedQuery({ cursor, limit: 10 });

  const { data: suggestedData } = useGetFollowSuggestionsQuery();
  const [follow, { isLoading: followLoading, error: followError, data: followData }] = useFollowMutation();
  const [like, { isLoading: likeLoading, error: likeError, data: likeData }] = useLikeMutation();
  const [unlike, { isLoading: unlikeLoading, error: unlikeError, data: unlikeData }] = useUnlikeMutation();
  const [feedData, setFeedData] = React.useState([]);
  const [suggestedUsers, setSuggestedUsers] = React.useState([]);

  React.useEffect(() => {
    if (data?.feed) {
      setFeedData(data.feed);
    }
    if (suggestedData?.suggestions) {
      setSuggestedUsers(suggestedData.suggestions);
    }
  }, [data]);


  const HandleFollow = async (userId) => {
    await follow(userId);
    setSuggestedUsers((suggestedUsers = []) => {
      if (suggestedUsers.find(user => user.id === userId)) {
        return suggestedUsers.map(user =>
          user.id === userId ? { ...user, isVerified: true } : user
        );
      }
      return suggestedUsers;
    });

  };

  const onRefresh = () => {
    refetch();
  };





  const handleLike = async (postId: string, userId: string, targetType: string) => {
    try {
      setFeedData(prevData => prevData.map(post => {
        if (post.id === postId && post.type === 'post') {
          return { ...post, isLiked: !post.isLiked } as any;
        }
        return post;
      }));
      const post = feedData.find(p => p.id === postId);

      if (post?.isLiked) {
        await unlike({ targetId: postId, targetType });
      } else {
        await like({ targetId: postId, targetType });
      }
    } catch (error) {
      console.log(error);
    }
  };




  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'post') {
      return <PostItem item={item} onLike={handleLike} openSheet={() => openSheet(item.id)} />;
    } else if (item.type === 'suggested' && suggestedUsers.length > 0) {
      return <SuggestedBlock user={suggestedUsers} handleFollow={HandleFollow} />;
    }
    return null;
  };
  const comments = [
    {
      id: '1',
      user: 'sarah_jones',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'This is absolutely stunning! 😍',
      time: '2h',
      likes: 24,
    },
    {
      id: '2',
      user: 'mike.wilson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      text: 'Where is this place?? Need to visit ASAP 🏔️',
      time: '1h',
      likes: 12,
    },
    {
      id: '3',
      user: 'jen_captures',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'The lighting here is absolutely perfect. What camera did you use?',
      time: '45m',
      likes: 8,
    },
    {
      id: '4',
      user: 'alex.travels',
      avatar: 'https://i.pravatar.cc/150?img=7',
      text: 'Fire 🔥🔥🔥 dropping a follow!',
      time: '30m',
      likes: 5,
    },
    {
      id: '5',
      user: 'priya_designs',
      avatar: 'https://i.pravatar.cc/150?img=9',
      text: 'Love the composition on this one 🎨',
      time: '20m',
      likes: 17,
    },
    {
      id: '6',
      user: 'tom.adventures',
      avatar: 'https://i.pravatar.cc/150?img=11',
      text: 'Been to this exact spot! Brings back memories 🥹',
      time: '15m',
      likes: 31,
    },
    {
      id: '7',
      user: 'nina_foodie',
      avatar: 'https://i.pravatar.cc/150?img=13',
      text: 'Your feed is goals honestly 👏',
      time: '10m',
      likes: 9,
    },
    {
      id: '8',
      user: 'raj.clicks',
      avatar: 'https://i.pravatar.cc/150?img=15',
      text: 'Incredible shot bro! What editing app? 📸',
      time: '5m',
      likes: 3,
    },
  ];

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }
  if (isError) {
    return <Text>Error</Text>
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { paddingBottom: 85 }]} edges={['top', 'left', 'right']}>
        <Header />
        <FlatList
          data={feedData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<StoriesMap />}
          ListEmptyComponent={<EmptyState user={suggestedUsers} handleFollow={HandleFollow} />}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      </SafeAreaView>



    </GestureHandlerRootView>
  );
}

// --- STYLES ---

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#ffffff',
  },
  container1: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  likes: {
    marginLeft: 4,
    fontSize: 12,
    color: "#555",
  },
  reply: {
    fontSize: 12,
    color: "#888",
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
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartOverlay: {
    position: 'absolute',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
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

  // Empty State Styles
  emptyStateContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyIllustrationContainer: {
    marginBottom: 20,
  },
  emptyIllustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyIllustrationPlus: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#0095f6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8e8e8e',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
    marginBottom: 30,
  },
  findPeopleButton: {
    backgroundColor: '#0095f6',
    width: '85%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  findPeopleButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createPostButton: {
    backgroundColor: '#ffffff',
    width: '85%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    marginBottom: 40,
  },
  createPostButtonText: {
    color: '#262626',
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestedSection: {
    width: '100%',
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
  },
  suggestedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  suggestedTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  seeAllText: {
    color: '#0095f6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  suggestedUserList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  suggestedUserCard: {
    width: 130,
    padding: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 8,
    alignItems: 'center',
  },
  suggestedUserAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  suggestedUsername: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#262626',
    marginBottom: 10,
  },
  suggestedFollowButton: {
    backgroundColor: '#0095f6',
    width: '100%',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  suggestedFollowText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

});
