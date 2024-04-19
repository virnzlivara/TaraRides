import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import * as Location from 'expo-location';
export default function Page() {
 
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState({})
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: 6}); 
      setRegion({
      latitude: location.coords.latitude ,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      })
       
      console.log(location)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
   
  const markers = [
    {
      latlng: {
        latitude: 14.402406 ,
        longitude: 120.974795,
        
      },
      title: 'test',
      description: 'desc'

    },
    {
      latlng: {
        latitude: 14.4029 ,
        longitude: 120.974795,
        
      },
      title: 'test',
      description: 'desc'

    },
    {
      latlng: {
        latitude: 14.40,
        longitude: 120.974795,
        
      },
      title: 'test',
      description: 'desc'

    },
    
     
  ]
  return(
    <View style={styles.container}>
      <MapView style={styles.map} 
        region={region}
        onRegionChange={setRegion}>
       {
        markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
