import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import * as Location from 'expo-location';
import {useRouter} from 'expo-router'
import { RideRequest } from '../mockdata/data';

import MapViewDirections from 'react-native-maps-directions';
export default function Page() {

  const [location, setLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState({});
  const [region, setRegion] = useState({})
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA9K0haHvBiS3WlAhd_SQ5pyNlzGvMP8iI'
// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};


  const router = useRouter();
  const mapRef = useRef()
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
      setOrigin({
        latitude:location?.coords.latitude,
        longitude: location?.coords.longitude
        
      }) 
      
    })();
  }, []);

  let text: any = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }  
  const markers = RideRequest;
  const onFocusMap = () => {
    const newRegion =
    {
      latitude: 14.3754474,
      longitude: 121.0117115,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      }
    mapRef.current?.animateCamera({center:newRegion, zoom: 10 }, {duration: 1000})
    setDestination({latitude: 14.3754474,
      longitude: 121.0117115,})
  }

  const onFocusMyLocationMap = () => {
    const newRegion =
    {
      latitude:location?.coords.latitude,
      longitude: location?.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      }
    mapRef.current?.animateCamera({center:newRegion, zoom: 10 }, {duration: 1000})
    setDestination({latitude: 14.3754474,
      longitude: 121.0117115,})
  }

  return(
    <View style={styles.container}>
      <MapView style={styles.map} 
        // showsMyLocationButton
        // showsUserLocation= {true}
        showsCompass={true}
        ref={mapRef}
        region={region}
        onRegionChange={setRegion}>
          {
            origin && destination &&  
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="green"
              lineCap={"bevel"}
            />
          }
         
          {/* Current Location */}
          {currentLocation && 
          <Marker
            key={"current"}
            coordinate={
              
              currentLocation.latlng
            }
            title={currentLocation.title}
            description={currentLocation.description}
          >
              <Text>im here</Text>
              <Image source={require("../assets/rider.png")}  style={{ width: 50, height: 50 }}/>
           
          </Marker>}
        
      {/* Rides to pickup */}
        { markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={
            {
              latitude: marker.pickupLocation.latitude,
              longitude: marker.pickupLocation.longitude
            }
            // marker?.latlng
          }
          title={marker.id}
          description={marker.id}
        >
          {/* <Text style={{backgroundColor:"pink"}}>Hello</Text> */}
          <Image source={require("../assets/customer.png")}  style={{ width: 50, height: 50 , opacity: 0.3}}/>

          </Marker>
      ))}
     
      </MapView>
      <View style={styles.menuButton}>
          <Pressable onPress={()=>router.push('/details')}>
            {/* Badge */}
            <View style={{borderRadius: 50, backgroundColor: "red", width: 30, height: 30, position: "absolute", right: 5, zIndex: 2}}>
              <Text style={{color: "white", textAlign: "center", padding: 6, fontWeight: "bold"}} >7</Text>
            </View>
         
            <Image source={require("../assets/menu.png")}  style={{ width: 75, height: 75 }}/>
           
          </Pressable>
          
      </View>
      <View style={{position: "absolute", bottom: 50, right: 20}}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 4}}>
            <Pressable onPress={onFocusMyLocationMap} style={{opacity: 0.4}}>
              <Image source={require("../assets/prev.png")}  style={{ width: 75, height: 75 }}/>
            </Pressable> 
            <Pressable onPress={onFocusMap}>
              <Image source={require("../assets/next.png")}  style={{ width: 75, height: 75 }}/>
            </Pressable> 
           
          </View>
      </View>
      <View style={{position: "absolute", bottom: 50, left: 20}}>
          
          <Pressable onPress={onFocusMyLocationMap}>
            <Image source={require("../assets/current-location.png")}  style={{ width: 75, height: 75 }}/>
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute',
    right: 10
  }
});
