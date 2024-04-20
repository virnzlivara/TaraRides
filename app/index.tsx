import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import * as Location from 'expo-location';
import {useRouter} from 'expo-router'
import { RideRequest } from '../mockdata/data';
export default function Page() {

  const [location, setLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState({});
  const [region, setRegion] = useState({})
  const router = useRouter();
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: 6});
      setLocation(location);
      setRegion({
      latitude: location.coords.latitude ,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      }) 
      setCurrentLocation({
        latlng: {
          latitude:location?.coords.latitude,
          longitude: location?.coords.longitude
          
        },
        title: 'You are here',
        description: 'desc'
    
      })
      console.log(location)
    })();
  }, []);

  let text: any = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } 
  // const currentLocation = 
  const markers = [
     
    {
      latlng: {
        latitude: 14.384019949999999,
        longitude: 120.97697465101861
        
      },
      title: 'SM MOLINO',
      description: 'desc'

    },
    {
      latlng: {
        latitude: 14.3754474 ,
        longitude: 121.0117115,
        
      },
      title: 'Evia Mall',
      description: 'desc'

    },
    {
      latlng: {
        latitude: 14.40,
        longitude: 120.974795,
        
      },
      title: 'Melrose',
      description: 'desc'

    },
    
     
  ]
  // const markers = RideRequest;

  return(
    <View style={styles.container}>
      <MapView style={styles.map} 
        region={region}
        onRegionChange={setRegion}>
          {/* Current Location */}
          {currentLocation && 
          <Marker
            key={"current"}
            coordinate={
              
              currentLocation.latlng
            }
            title={currentLocation.title}
            description={currentLocation.description}
          />}
        
      {/* Rides to pickup */}
        { markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={
            // {
            //   latitude: marker.pickupLocation.latitude,
            //   longitude: marker.pickupLocation.longitude
            // }
            marker?.latlng
          }
          title={marker.title}
          description={marker.description}
        />
      ))}
     
        </MapView>
          <View style={styles.menuButton}>
            <Pressable onPress={()=>router.push('/details')}>
              <Text>Go to List</Text>
          </Pressable>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute'
  }
});
