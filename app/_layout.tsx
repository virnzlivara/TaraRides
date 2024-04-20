 
// import { Stack } from 'expo-router/stack';
import { Fragment, useEffect  } from 'react'; 
import { Stack } from 'expo-router';
export default function RootLayout() { 
 
  useEffect(()=> {
    setInterval(()=>{
      console.log("ADD HERE")
    }, 10000)
  })
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
