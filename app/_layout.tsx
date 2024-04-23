import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { Stack} from 'expo-router';
import { useAppDispatch } from '../src/hooks/useReduxHooks';

// Import your page/screen components 

export default function RootLayout() {
   
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Define your screens here */}
        
      </Stack>
    </Provider>
  );
}
