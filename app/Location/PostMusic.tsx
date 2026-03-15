import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Static song data — no API needed ────────────────────────────────────────
const TRENDING_SONGS = [
    {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        duration: '3:20',
        image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: '2',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        duration: '3:53',
        image: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
        id: '3',
        title: 'Levitating',
        artist: 'Dua Lipa',
        duration: '3:23',
        image: 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        id: '4',
        title: 'Stay',
        artist: 'The Kid LAROI & Justin Bieber',
        duration: '2:21',
        image: 'https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd7793365b',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
        id: '5',
        title: 'As It Was',
        artist: 'Harry Styles',
        duration: '2:37',
        image: 'https://i.scdn.co/image/ab67616d0000b2732e8f592205cb24fef7409228',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
        id: '6',
        title: 'Flowers',
        artist: 'Miley Cyrus',
        duration: '3:20',
        image: 'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    {
        id: '7',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        duration: '2:54',
        image: 'https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
    {
        id: '8',
        title: 'Midnight City',
        artist: 'M83',
        duration: '4:03',
        image: 'https://i.scdn.co/image/ab67616d0000b273468afbbb99bbba6ffc2e0b50',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
    {
        id: '9',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        duration: '3:14',
        image: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
    {
        id: '10',
        title: 'Peaches',
        artist: 'Justin Bieber ft. Daniel Caesar',
        duration: '3:18',
        image: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    },
];

const FOR_YOU_SONGS = [
    {
        id: '11',
        title: 'Heat Waves',
        artist: 'Glass Animals',
        duration: '3:58',
        image: 'https://i.scdn.co/image/ab67616d0000b273fa742b3a54a1f1b77a5c1b4b',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    },
    {
        id: '12',
        title: 'Cruel Summer',
        artist: 'Taylor Swift',
        duration: '2:58',
        image: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    },
    {
        id: '13',
        title: 'Unholy',
        artist: 'Sam Smith & Kim Petras',
        duration: '2:36',
        image: 'https://i.scdn.co/image/ab67616d0000b273107db2a591c625e5b5705b1b',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    },
    {
        id: '14',
        title: 'Anti-Hero',
        artist: 'Taylor Swift',
        duration: '3:20',
        image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    },
    {
        id: '15',
        title: 'Calm Down',
        artist: 'Rema & Selena Gomez',
        duration: '3:59',
        image: 'https://i.scdn.co/image/ab67616d0000b27320d3a8d759e81c95c9db0e2f',
        previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    },
];

const ALL_SONGS = [...TRENDING_SONGS, ...FOR_YOU_SONGS];
const CATEGORIES = ['For You', 'Browse', 'Saved'];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PostMusic() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('For You');
    const [selectedMusic, setSelectedMusic] = useState(null);

    // ── Audio player state
    const soundRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);  // which song is playing
    const [loadingAudioId, setLoadingAudioId] = useState(null);  // which song is buffering
    const [playbackPos, setPlaybackPos] = useState(0);     // 0–1 progress
    const progressRef = useRef(null);

    // ── Stop & unload audio on unmount
    useEffect(() => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        return () => {
            stopAudio();
        };
    }, []);

    const stopAudio = async () => {
        clearInterval(progressRef.current);
        if (soundRef.current) {
            try { await soundRef.current.stopAsync(); } catch { }
            try { await soundRef.current.unloadAsync(); } catch { }
            soundRef.current = null;
        }
        setPlayingId(null);
        setPlaybackPos(0);
    };

    // ── Toggle play/pause for a song
    const handlePlay = async (song) => {
        // If tapping the currently playing song → pause/stop it
        if (playingId === song.id) {
            await stopAudio();
            return;
        }

        // Stop previous song first
        await stopAudio();

        if (!song.previewUrl) return;

        setLoadingAudioId(song.id);

        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: song.previewUrl },
                { shouldPlay: true },
            );
            soundRef.current = sound;
            setPlayingId(song.id);
            setLoadingAudioId(null);

            // Track progress for the mini progress bar
            progressRef.current = setInterval(async () => {
                if (!soundRef.current) return;
                try {
                    const status = await soundRef.current.getStatusAsync();
                    if (status.isLoaded) {
                        setPlaybackPos(status.positionMillis / (status.durationMillis || 1));
                        if (status.didJustFinish) {
                            await stopAudio();
                        }
                    }
                } catch { }
            }, 500);

        } catch (e) {
            console.error('Audio error:', e.message);
            setLoadingAudioId(null);
        }
    };

    // ── Filter songs by search
    const isSearching = searchQuery.trim().length > 0;
    const searchResults = isSearching
        ? ALL_SONGS.filter(
            (s) =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const trendingList = TRENDING_SONGS;
    const forYouList = FOR_YOU_SONGS;

    // ── Render one song row
    const renderMusicItem = ({ item }) => {
        const isPlaying = playingId === item.id;
        const isLoading = loadingAudioId === item.id;
        const isSelected = selectedMusic?.id === item.id;

        return (
            <TouchableOpacity
                style={[styles.musicItem, isSelected && styles.musicItemSelected]}
                onPress={() => setSelectedMusic(item)}
                activeOpacity={0.8}
            >
                {/* Album Art */}
                <View>
                    <Image source={{ uri: item.image }} style={styles.musicImage} />
                    {isPlaying && (
                        <View style={styles.playingOverlay}>
                            <View style={styles.bar} />
                            <View style={[styles.bar, styles.barMid]} />
                            <View style={styles.bar} />
                        </View>
                    )}
                </View>

                {/* Info */}
                <View style={styles.musicInfo}>
                    <Text style={[styles.musicTitle, isSelected && { color: '#3B82F6' }]} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.musicArtist} numberOfLines={1}>{item.artist}</Text>

                    {/* Progress bar — only shows while this song is playing */}
                    {isPlaying && (
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${Math.round(playbackPos * 100)}%` }]} />
                        </View>
                    )}
                </View>

                {/* Play / Loading / Check button */}
                <TouchableOpacity
                    style={[
                        styles.playButton,
                        isPlaying && styles.playButtonPlaying,
                        isSelected && !isPlaying && styles.playButtonSelected,
                    ]}
                    onPress={() => handlePlay(item)}
                >
                    {isLoading
                        ? <ActivityIndicator size="small" color={isPlaying || isSelected ? "#fff" : "#111"} />
                        : <Ionicons
                            name={isPlaying ? 'pause' : isSelected ? 'checkmark' : 'play'}
                            size={20}
                            color={isPlaying || isSelected ? '#fff' : '#111'}
                        />
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { stopAudio(); router.back(); }}>
                    <Text style={styles.headerCancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Music</Text>
                <TouchableOpacity
                    disabled={!selectedMusic}
                    onPress={() => { stopAudio(); router.back(); }}
                >
                    <Text style={[styles.headerDone, !selectedMusic && { opacity: 0.35 }]}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* ── Search ── */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#8E8E93" style={{ marginRight: 10 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search music"
                        placeholderTextColor="#8E8E93"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={18} color="#aaa" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* ── Categories ── */}
                {!isSearching && (
                    <View style={styles.categoriesRow}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[styles.pill, activeCategory === cat && styles.pillActive]}
                                onPress={() => setActiveCategory(cat)}
                            >
                                <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* ── Search Results ── */}
                {isSearching && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Results</Text>
                            <Text style={styles.sectionRight}>{searchResults.length} found</Text>
                        </View>
                        {searchResults.length === 0
                            ? <Text style={styles.emptyText}>No songs matching "{searchQuery}"</Text>
                            : <FlatList data={searchResults} keyExtractor={(i) => i.id} renderItem={renderMusicItem} scrollEnabled={false} contentContainerStyle={styles.list} />
                        }
                    </>
                )}

                {/* ── Trending ── */}
                {!isSearching && (activeCategory === 'Browse' || activeCategory === 'For You') && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Trending</Text>
                            <Text style={styles.sectionRight}>See all</Text>
                        </View>
                        <FlatList
                            data={trendingList}
                            keyExtractor={(i) => i.id}
                            renderItem={renderMusicItem}
                            scrollEnabled={false}
                            contentContainerStyle={styles.list}
                        />
                    </>
                )}

                {/* ── For You ── */}
                {!isSearching && activeCategory === 'For You' && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>For You</Text>
                            <Text style={styles.sectionRight}>See all</Text>
                        </View>
                        <FlatList
                            data={forYouList}
                            keyExtractor={(i) => i.id}
                            renderItem={renderMusicItem}
                            scrollEnabled={false}
                            contentContainerStyle={styles.list}
                        />
                    </>
                )}

                <View style={{ height: 110 }} />
            </ScrollView>

            {/* ── Bottom Footer ── */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    {selectedMusic?.image
                        ? <Image source={{ uri: selectedMusic.image }} style={styles.footerImage} />
                        : <View style={styles.footerIconBox}>
                            <Ionicons name="musical-notes" size={20} color="#8E8E93" />
                        </View>
                    }
                    <View style={{ flex: 1 }}>
                        <Text style={selectedMusic ? styles.footerTitle : styles.footerEmpty} numberOfLines={1}>
                            {selectedMusic ? selectedMusic.title : 'No music selected'}
                        </Text>
                        {selectedMusic && (
                            <Text style={styles.footerArtist} numberOfLines={1}>{selectedMusic.artist}</Text>
                        )}
                    </View>
                </View>

                {/* Play/pause in footer for selected track */}
                {selectedMusic && (
                    <View style={styles.footerActions}>
                        <TouchableOpacity
                            style={styles.footerPlayBtn}
                            onPress={() => handlePlay(selectedMusic)}
                        >
                            {loadingAudioId === selectedMusic.id
                                ? <ActivityIndicator size="small" color="#111" />
                                : <Ionicons
                                    name={playingId === selectedMusic.id ? 'pause' : 'play'}
                                    size={24}
                                    color="#111"
                                />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { stopAudio(); setSelectedMusic(null); }}>
                            <Ionicons name="close" size={26} color="#8E8E93" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
    headerCancel: { fontSize: 16, color: '#333' },
    headerDone: { fontSize: 16, color: '#3B82F6', fontWeight: '700' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
    content: { flex: 1 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 20, marginTop: 16, borderRadius: 12, paddingHorizontal: 12, height: 48 },
    searchInput: { flex: 1, fontSize: 16, color: '#000' },
    categoriesRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 14, marginBottom: 4 },
    pill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 10 },
    pillActive: { backgroundColor: '#3B82F6' },
    pillText: { fontSize: 14, fontWeight: '600', color: '#555' },
    pillTextActive: { color: '#fff' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 22, marginBottom: 10 },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111' },
    sectionRight: { fontSize: 13, color: '#3B82F6' },
    list: { paddingHorizontal: 20 },
    emptyText: { fontSize: 14, color: '#aaa', textAlign: 'center', marginTop: 24 },

    // Song row
    musicItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderRadius: 14, padding: 8 },
    musicItemSelected: { backgroundColor: '#EFF6FF' },
    musicImage: { width: 56, height: 56, borderRadius: 10, backgroundColor: '#eee' },

    // Animated bars overlay on album art (playing indicator)
    playingOverlay: { position: 'absolute', bottom: 4, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 2 },
    bar: { width: 3, height: 10, backgroundColor: '#fff', borderRadius: 2 },
    barMid: { height: 14 },

    musicInfo: { flex: 1, marginLeft: 12 },
    musicTitle: { fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 3 },
    musicArtist: { fontSize: 13, color: '#777' },
    musicDuration: { fontSize: 11, color: '#bbb', marginTop: 2 },

    progressTrack: { height: 2, backgroundColor: '#E5E7EB', borderRadius: 1, marginTop: 6 },
    progressFill: { height: 2, backgroundColor: '#3B82F6', borderRadius: 1 },

    playButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    playButtonPlaying: { backgroundColor: '#3B82F6' },
    playButtonSelected: { backgroundColor: '#DBEAFE' },

    // Footer
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EAEAED' },
    footerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
    footerIconBox: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    footerImage: { width: 42, height: 42, borderRadius: 10, marginRight: 12 },
    footerEmpty: { fontSize: 15, color: '#aaa' },
    footerTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
    footerArtist: { fontSize: 12, color: '#888', marginTop: 2 },
    footerActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    footerPlayBtn: { padding: 2 },
});