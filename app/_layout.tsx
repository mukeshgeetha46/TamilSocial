import 'react-native-reanimated';

import { store } from '@/redux/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { CommentSheetProvider } from './context/CommentSheetContext';
import Main from './Main';
import ErrorBoundary from './Pages/ErrorBoundary';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <CommentSheetProvider>
              <Main /> {/* or <Slot /> */}
            </CommentSheetProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>

    </Provider>
  );
}
