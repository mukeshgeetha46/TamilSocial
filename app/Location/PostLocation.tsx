import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// ─── Replace with your actual Google API Key ───────────────────────────────
const GOOGLE_API_KEY = 'AIzaSyDTzQotI9jT4hhPYu1Wp5xUUcDR2mpzf_4';

const { width } = Dimensions.get('window');

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function PostLocation({ navigation, onDone, onCancel }) {
    const router = useRouter();
    const mapRef = useRef(null);
    const debounceRef = useRef(null);

    const [region, setRegion] = useState({
        latitude: 40.7831,
        longitude: -73.9712,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // UI state from API
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [loadingNearby, setLoadingNearby] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    // ── Request location & load nearby on mount ──────────────────────────────
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required.');
                fetchNearbyPlaces(region.latitude, region.longitude);
                return;
            }
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = loc.coords;
            const newRegion = { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
            setRegion(newRegion);
            mapRef.current?.animateToRegion(newRegion, 800);
            fetchNearbyPlaces(latitude, longitude);
        })();
    }, []);

    // ── Nearby Places (Google Places Nearby Search) ──────────────────────────
    const fetchNearbyPlaces = async (lat, lng) => {
        setLoadingNearby(true);
        try {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&key=${GOOGLE_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.status === 'OK') {
                // Ensure proper formatting to map easily
                const places = data.results.slice(0, 6).map(p => ({
                    place_id: p.place_id,
                    name: p.name,
                    vicinity: p.vicinity,
                    types: p.types || []
                }));
                setNearbyPlaces(places);
            }
        } catch (e) {
            console.warn('Nearby fetch error:', e);
        } finally {
            setLoadingNearby(false);
        }
    };

    // ── Autocomplete Search (Places Autocomplete) ────────────────────────────
    const handleSearch = useCallback((text) => {
        setSearchQuery(text);
        clearTimeout(debounceRef.current);
        if (!text.trim()) { setSearchResults([]); return; }
        debounceRef.current = setTimeout(async () => {
            setLoadingSearch(true);
            try {
                const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_API_KEY}`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.status === 'OK') {
                    const formatted = data.predictions.map(p => ({
                        place_id: p.place_id,
                        name: p.structured_formatting.main_text,
                        vicinity: p.structured_formatting.secondary_text,
                        types: p.types || []
                    }));
                    setSearchResults(formatted.slice(0, 5));
                }
                else setSearchResults([]);
            } catch (e) {
                console.warn('Autocomplete error:', e);
            } finally {
                setLoadingSearch(false);
            }
        }, 350);
    }, []);

    // ── Place Details (get lat/lng from place_id) ────────────────────────────
    const fetchPlaceDetails = async (placeId, placeName) => {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name,formatted_address&key=${GOOGLE_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.status === 'OK') {
                const { lat, lng } = data.result.geometry.location;
                const newRegion = { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 };
                setRegion(newRegion);
                mapRef.current?.animateToRegion(newRegion, 800);
                setSelectedPlace({
                    placeId,
                    name: data.result.name,
                    address: data.result.formatted_address,
                    latitude: lat,
                    longitude: lng,
                });
                setSearchQuery(data.result.name);
                setSearchResults([]);
            }
        } catch (e) {
            console.warn('Place details error:', e);
        }
    };

    const handleSelectPrediction = (item) => {
        fetchPlaceDetails(item.place_id, item.name);
    };

    const handleSelectNearby = (place) => {
        // for near by places that already has lat lng we can just use detail API anyway to be safe or use what we have if it exists
        if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat;
            const lng = place.geometry.location.lng;
            const newRegion = { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 };
            setRegion(newRegion);
            mapRef.current?.animateToRegion(newRegion, 800);
            setSelectedPlace({
                placeId: place.place_id,
                name: place.name,
                address: place.vicinity,
                latitude: lat,
                longitude: lng,
            });
        } else {
            fetchPlaceDetails(place.place_id, place.name);
        }
    };

    const handleCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = loc.coords;
        const newRegion = { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 800);
        setSelectedPlace({ name: 'Current Location', latitude, longitude, address: 'Using GPS' });
        fetchNearbyPlaces(latitude, longitude);
    };

    const handleDone = () => {
        if (!selectedPlace) { Alert.alert('No location', 'Please select a location first.'); return; }
        if (onDone) onDone(selectedPlace);
        else router.back();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        else router.back();
    };

    // ── Icon mapping for place types ──────────────────────────────────────────
    const getIconForType = (typesList) => {
        const types = typesList || [];
        if (types.includes('park') || types.includes('natural_feature')) return <MaterialCommunityIcons name="map" size={20} color="#4B5563" />;
        if (types.includes('museum') || types.includes('art_gallery')) return <MaterialCommunityIcons name="bank" size={20} color="#4B5563" />;
        if (types.includes('bakery') || types.includes('restaurant') || types.includes('food')) return <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#4B5563" />;
        if (types.includes('establishment')) return <MaterialCommunityIcons name="office-building" size={20} color="#4B5563" />;
        return <Ionicons name="location-outline" size={20} color="#4B5563" />;
    };

    // Use mock data until search results populate anything
    const displayPlaces = (searchResults.length > 0) ? searchResults :
        (nearbyPlaces.length > 0) ? nearbyPlaces :
            [
                { id: '1', name: 'Central Park', vicinity: 'Manhattan, New York, NY', types: ['park'] },
                { id: '2', name: 'The Metropolitan Museum of Art', vicinity: '1000 5th Ave, New York', types: ['museum'] },
                { id: '3', name: 'Levain Bakery', vicinity: 'Upper West Side, NY', types: ['bakery'] },
                { id: '4', name: 'Rockefeller Center', vicinity: 'Midtown, New York, NY', types: ['establishment'] },
            ];

    const renderPlaceItem = ({ item }) => (
        <TouchableOpacity style={styles.placeItem} onPress={() => searchResults.length > 0 ? handleSelectPrediction(item) : handleSelectNearby(item)}>
            <View style={styles.placeIconContainer}>
                {getIconForType(item.types)}
            </View>
            <View style={styles.placeTextContainer}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeAddress}>{item.vicinity}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel} style={styles.headerLeft}>
                        <Ionicons name="close" size={22} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Select Location</Text>
                    <TouchableOpacity onPress={handleDone} style={styles.headerRight}>
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    {/* Map Section */}
                    <View style={styles.mapContainer}>
                        <MapView
                            ref={mapRef}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={region}
                            onRegionChangeComplete={(reg) => setRegion(reg)}
                        />
                        <View style={styles.markerFixed}>
                            <View style={styles.markerCircle}>
                                <Ionicons name="location" size={16} color="white" />
                            </View>
                        </View>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for a location"
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {loadingSearch && <ActivityIndicator size="small" color="#3B82F6" />}
                    </View>

                    {/* Nearby Places Header */}
                    <View style={styles.nearbyHeaderContainer}>
                        <Text style={styles.nearbyTitle}>NEARBY PLACES</Text>
                        <TouchableOpacity onPress={() => fetchNearbyPlaces(region.latitude, region.longitude)}>
                            <Text style={styles.refreshText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Current Location Option */}
                    <TouchableOpacity
                        style={styles.placeItem}
                        onPress={handleCurrentLocation}
                    >
                        <View style={[styles.placeIconContainer, { backgroundColor: '#E0F2FE' }]}>
                            <MaterialIcons name="my-location" size={20} color="#3B82F6" />
                        </View>
                        <View style={styles.placeTextContainer}>
                            <Text style={styles.placeName}>Current Location</Text>
                            <Text style={styles.placeAddress}>Using GPS</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                    </TouchableOpacity>

                    {/* Places List */}
                    {loadingNearby ? (
                        <ActivityIndicator style={{ marginTop: 20 }} color="#3B82F6" />
                    ) : (
                        displayPlaces.map((item, index) => (
                            <React.Fragment key={item.place_id || item.id || index.toString()}>
                                {renderPlaceItem({ item })}
                            </React.Fragment>
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
    },
    cancelText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 80,
        alignItems: 'flex-end',
    },
    doneText: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '600',
    },
    mapContainer: {
        margin: 16,
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#E5E7EB',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerFixed: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -14,
        marginTop: -28,
    },
    markerCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    nearbyHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    nearbyTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        letterSpacing: 0.8,
    },
    refreshText: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
    },
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    placeIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    placeTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    placeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    placeAddress: {
        fontSize: 14,
        color: '#6B7280',
    },
});