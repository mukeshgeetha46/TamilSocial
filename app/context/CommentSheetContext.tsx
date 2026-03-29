// context/CommentSheetContext.tsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import CommendModelComponent from '../Commend/PostMCommand';

const CommentSheetContext = createContext<{
    openSheet: (postId: string) => void;
    closeSheet: () => void;
}>({ openSheet: () => { }, closeSheet: () => { } });

export const useCommentSheet = () => useContext(CommentSheetContext);

export const CommentSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const openSheet = useCallback((postId: string) => {
        setSelectedPostId(postId);
        sheetRef.current?.snapToIndex(0);
    }, []);

    const closeSheet = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    return (
        <CommentSheetContext.Provider value={{ openSheet, closeSheet }}>
            {children}
            {/* Rendered at root level — above everything including tab bar */}
            <BottomSheet
                ref={sheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: '#fff' }}
                handleIndicatorStyle={{ backgroundColor: '#ccc' }}
                style={{ zIndex: 9999, elevation: 9999 }}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    <CommendModelComponent id={selectedPostId} />
                </BottomSheetView>
            </BottomSheet>
        </CommentSheetContext.Provider>
    );
};