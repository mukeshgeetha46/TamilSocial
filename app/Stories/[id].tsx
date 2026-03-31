import InstagramStories from '@birdwingo/react-native-instagram-stories';
import React, { useRef } from 'react';
import { View } from 'react-native';

const stories = [
    {
        id: 'user1',           // must be unique
        name: 'John',
        avatarSource: { uri: 'https://i.pravatar.cc/100?img=1' },
        stories: [
            { id: 'story1', source: { uri: 'https://picsum.photos/400/700?random=1' } },
            { id: 'story2', source: { uri: 'https://picsum.photos/400/700?random=2' } },
        ],
    },
    {
        id: 'user2',
        name: 'Sara',
        avatarSource: { uri: 'https://i.pravatar.cc/100?img=2' },
        stories: [
            { id: 'story3', source: { uri: 'https://picsum.photos/400/700?random=3' } },
        ],
    },
];

export default function HomeScreen() {
    const ref = useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <InstagramStories
                ref={ref}
                stories={stories}
            // saves which stories user has seen
            />
        </View>
    );
}