 
// import { Stack } from 'expo-router/stack';
import { Fragment  } from 'react'; 
import { Stack } from 'expo-router';
export default function RootLayout() { 
 

  return (
    <Fragment> 
      <Stack
        screenOptions={{ 
          headerShown: false,
        }}
      >
      
      </Stack>
    </Fragment>
  );
}
