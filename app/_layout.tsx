import 'react-native-reanimated';

import { store } from '@/redux/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { CommentSheetProvider } from './context/CommentSheetContext';
import Main from './Main';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <CommentSheetProvider>
            <Main /> {/* or <Slot /> */}
          </CommentSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
