import 'react-native-reanimated';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import Main from './Main';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
