import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, SafeAreaViewBase } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'; 
import * as Location from 'expo-location';
import {Link, useRouter} from 'expo-router'
import { RideRequest } from '../mockdata/data';

import MapViewDirections from 'react-native-maps-directions';
export default function Page() {

  const [location, setLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState({});
  const [region, setRegion] = useState({})
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA9K0haHvBiS3WlAhd_SQ5pyNlzGvMP8iI'; 
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

  // const getDistance = ()=> {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //         console.log(
  //             'You are ',
  //             geolib.getDistance(position.coords, {
  //                 latitude: 51.525,
  //                 longitude: 7.4575,
  //             }),
  //             'meters away from 51.525, 7.4575'
  //         );
  //     },
  //     () => {
  //         alert('Position could not be determined.');
  //     }
  // );
  // }

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
          key={marker.id}
          coordinate={
            {
              latitude: marker.pickupLocation.latitude,
              longitude: marker.pickupLocation.longitude
            }
          }
          // title={marker.id}
          // description={marker.id}
        > 
          <Image source={require("../assets/customer.png")}  style={{ width: 50, height: 50 , opacity: 0.3}}/>
            <Callout style={{width: 300}}>
              <View style={{flexDirection: "row", justifyContent: "start", padding: 10}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {marker.userId} : 
                </Text>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {marker.note}
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: "end", padding: 10}}>
                <Link href={`/details/${marker.id}`}>
                  <Text style={{fontWeight: 'bold', color: '#000', fontStyle: "italic", color: "blue"}}>
                    View More
                  </Text>
                </Link>
                 
              </View>
            </Callout>
          </Marker>
      ))}
     
      </MapView>
      
        <View style={styles.menuButton}>
            <TouchableOpacity onPress={()=>router.push('/list')}>
              {/* Badge */}
              <View style={{borderRadius: 50, backgroundColor: "red", width: 30, height: 30, position: "absolute", right: 5, top: 5, zIndex: 2}}>
                <Text style={{color: "white", textAlign: "center", padding: 6, fontWeight: "bold"}} >{markers.length}</Text>
              </View>
          
              <Image source={require("../assets/menu.png")}  style={{ width: 75, height: 75 }}/>
            
            </TouchableOpacity>
            
        </View>
        <View style={{position: "absolute", bottom: 20, right: 20}}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 4}}>
              <TouchableOpacity onPress={onFocusMyLocationMap} style={{opacity: 0.4}}>
                <Image source={require("../assets/prev.png")}  style={{ width: 75, height: 75 }}/>
              </TouchableOpacity> 
              <TouchableOpacity onPress={onFocusMap}>
                <Image source={require("../assets/next.png")}  style={{ width: 75, height: 75 }}/>
              </TouchableOpacity> 
            
            </View>
        </View>
        <View style={{position: "absolute", bottom: 20, left: 20}}>
          
          <TouchableOpacity onPress={onFocusMyLocationMap}>
            <Image source={require("../assets/current-location.png")}  style={{ width: 75, height: 75 }}/>
          </TouchableOpacity> 
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
    right: 10,
    top: 50
  }
});
