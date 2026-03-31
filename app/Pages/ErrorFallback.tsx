// components/ErrorFallback.tsx
import { Feather } from '@expo/vector-icons';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    error: Error | null;
    onReset: () => void;
}

export const ErrorFallback = ({ error, onReset }: Props) => {
    return (
        <SafeAreaView style={[styles.container, { paddingBottom: 85 }]} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onReset}>
                        <Feather name="arrow-left" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Azure Horizon</Text>
                </View>

                <View style={styles.content}>
                    {/* Visual Area */}
                    <View style={styles.imageContainer}>
                        <View style={styles.circleBackground}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop' }}
                                style={styles.innerImage}
                                resizeMode="cover"
                            />
                        </View>
                        {/* Error Badge */}
                        <View style={styles.badge}>
                            <Feather name="wifi-off" size={20} color="#FFFFFF" />
                        </View>
                    </View>

                    {/* Text content */}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Oops! Something went{'\n'}wrong</Text>
                        <Text style={styles.subtitle}>
                            We're having trouble loading this page.{'\n'}Please check your internet connection{'\n'}and try again.
                        </Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.primaryButton} onPress={onReset}>
                            <Feather name="refresh-cw" size={18} color="#FFFFFF" style={styles.btnIcon} />
                            <Text style={styles.primaryButtonText}>Retry</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Check Network Settings</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.linkContainer}>
                        <Text style={styles.linkText}>Go to Status Page</Text>
                        <Feather name="external-link" size={14} color="#3B82F6" style={styles.linkIcon} />
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        ERROR CODE: {error ? 'DEV-ERROR' : 'AZ-503-HZ'}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F6F9',
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 32,
    },
    circleBackground: {
        width: 200,
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    innerImage: {
        width: 130,
        height: 130,
        borderRadius: 4, // Slight rounding or sharp just like mock
    },
    badge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: '#F87171',
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#F4F6F9',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 34,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    actionsContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 32,
    },
    primaryButton: {
        backgroundColor: '#3B82F6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    btnIcon: {
        marginRight: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    secondaryButtonText: {
        color: '#4B5563',
        fontSize: 16,
        fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 'auto',
    },
    linkText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    linkIcon: {
        marginTop: 1,
    },
    footerText: {
        color: '#9CA3AF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 24,
    },
});