import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, SafeAreaViewBase } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'; 
import * as Location from 'expo-location';
import {Link, useRouter} from 'expo-router'
import { RideRequest } from '../mockdata/data';

import MapViewDirections from 'react-native-maps-directions';
import { useAppDispatch } from '../src/hooks/useReduxHooks';
import { setupDriverDetail } from '../src/slicers/user.slicer';
import { useSelector } from 'react-redux';
import { addRides, approveSelector, droppedOffSelector, inProgressRideSelector, mockGoToDropOff, pendingRideSelector, pickedUpSelector, startedSelector, within1KMSelector, within5KMSelector } from '../src/slicers/ride.slicer';
import { RootState } from '../src/store';
import { ICoordinates, IRide } from '../types/IRide';
import { getDistance } from 'geolib';
export default function Page() {

  // const [location, setLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState({});
  const [region, setRegion] = useState({}) 
  const [destination, setDestination] = useState<ICoordinates>();
  const [currentIndex, setCurrentIndex] = useState<number>(0) 
  const GOOGLE_MAPS_APIKEY = process.env.REACT_APP_GOOGLE_API_KEY_MAP || ''; 
  const state = useSelector((state:RootState) => state);
  const driversInfoSelector = useSelector((state:RootState)=>state.user) 
  
  const acceptedRide = approveSelector(state);
  const startedRide = startedSelector(state)
  const inProgressRide = inProgressRideSelector(state);
  const pickupRide = pickedUpSelector(state);
  const dropOffRide = droppedOffSelector(state)
  const marker = pendingRideSelector(state) 
  
  // const marker = useSelector((state:RootState)=>state.ride) 
  const router = useRouter();
  const mapRef = useRef()
  const dispatch = useAppDispatch()
  const [formattedData, setFormattedData] = useState<IRide[]>([]);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: 6});
      // setLocation(location); 
      setCurrentLocation({
        latlng: {
          latitude:location?.coords.latitude,
          longitude: location?.coords.longitude
          
        },
        title: 'You are here',
        description: 'desc'
    
      })
     
     
      
    })();
  }, []);
 
  useEffect(()=>{
    
    if (currentLocation)
    {
      initializeDataWithDistance()
     
      dispatch(setupDriverDetail({
        driverId: "1",
        currentLocation: {
          latitude: currentLocation?.latlng.latitude,
          longitude: currentLocation?.latlng.longitude
        }
      }))
    }
   
  }, [currentLocation])

  const initializeDataWithDistance = () => {  
    let newData : IRide[] = []; 
    if (RideRequest.length >= 0 && driversInfoSelector.currentLocation) { 
      RideRequest.map(async (userInfo)=> {
        const distance =  getDistanceMeter( {latitude: userInfo.pickupLocation.latitude, longitude: userInfo.pickupLocation.longitude }) 
        newData.push({...userInfo, distance: distance}) 
      }) 
      dispatch(addRides({rideList: newData}))
    }  
  }
  
  const getDistanceMeter = (destination: { latitude: any; longitude: any; })=> {   
    return getDistance(
        { latitude: driversInfoSelector.currentLocation.latitude, longitude: driversInfoSelector.currentLocation.longitude },
        { latitude: destination.latitude, longitude: destination.longitude } 
        
      ); 
  }

  
  const markers: IRide[] = marker || null
  let text: any = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }  

  const onFocusMap = (marker?: Pick<IRide, "pickupLocation" | "destination" | "id">, number: number = 0) => { 
    const current = marker ? parseInt(marker?.id) : currentIndex===null ? 0  : currentIndex + number;
     
    setCurrentIndex(current)
    const newRegion =
    {
      latitude: marker?.pickupLocation?.latitude || markers[current].pickupLocation.latitude,
      longitude: marker?.pickupLocation?.longitude ||  markers[current].pickupLocation.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      }
    mapRef.current?.animateCamera({center:newRegion, zoom: 10 }, {duration: 1000})
    setDestination(
      {
        latitude: marker?.pickupLocation?.latitude  || markers[current].pickupLocation.latitude,
         longitude: marker?.pickupLocation?.longitude  || markers[current].pickupLocation.longitude,
      })
  } 

  useEffect(()=> {
    if (acceptedRide) {
      const marker = {
        pickupLocation: {
          latitude: acceptedRide.pickupLocation.latitude,
          longitude: acceptedRide.pickupLocation.longitude
        } 

      }
      
      onFocusMap(marker);
    }
  }, [acceptedRide])

  useEffect(()=> {
    if (startedRide) {
      const marker = {
        pickupLocation: {
          latitude: startedRide.pickupLocation.latitude,
          longitude: startedRide.pickupLocation.longitude
        } 
      }
      
      onFocusMap(marker);
    }
  }, [startedRide])

   
  

  useEffect(()=> {
    if (dropOffRide) {
       
      const marker = {
        pickupLocation: {
          latitude: dropOffRide.destination.latitude,
          longitude: dropOffRide.destination.longitude
        } 
      }
      onFocusMap(marker);
    }
  }, [dropOffRide])

  const onFocusMyLocationMap = () => {
    const newRegion =
    {
      latitude: driversInfoSelector.currentLocation.latitude,
      longitude: driversInfoSelector.currentLocation.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
      }
    mapRef.current?.animateCamera({center:newRegion, zoom: 10 }, {duration: 1000})
    setDestination({latitude: driversInfoSelector.currentLocation.latitude,
      longitude:driversInfoSelector.currentLocation.longitude})
  } 

  const goToPickup = () => { 
    if (startedRide) {
      dispatch(setupDriverDetail({
        driverId: "1",
        currentLocation: {
          latitude: startedRide.pickupLocation.latitude,
          longitude: startedRide.pickupLocation.longitude
        }
      }))
    }
    
     
  }

  const goToDestination = () => {
    if (pickupRide) {
      dispatch(setupDriverDetail({
        driverId: "1",
        currentLocation: {
          latitude: pickupRide.destination.latitude,
          longitude: pickupRide.destination.longitude
        }
      }))
      dispatch(mockGoToDropOff({id: pickupRide.userId, pickupLocation: {
        latitude: pickupRide.destination.latitude,
        longitude: pickupRide.destination.longitude
      }}))

    }
  }

  return(
    <View style={styles.container}>
      <MapView style={styles.map} 
        // showsMyLocationButton
        // showsUserLocation= {true}
        showsCompass={true}
        ref={mapRef}
        region={{
          latitude: driversInfoSelector?.currentLocation.latitude ,
          longitude: driversInfoSelector?.currentLocation.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421
        }}
        onRegionChange={setRegion}
        >
          {
            driversInfoSelector.currentLocation && destination &&  
            <MapViewDirections
              origin={driversInfoSelector.currentLocation}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="green"
              lineCap={"bevel"}
            />
          }
         
          {/* Current Location */}
          {driversInfoSelector?.currentLocation && 
          <Marker
            key={"current"}
            coordinate={
              
              driversInfoSelector?.currentLocation
            }
            title={"You are here!"}
            description={"You are here!"}
          >
              {/* <Text>You are here!</Text> */}
              <Image source={require("../assets/rider.png")}  style={{ width: 50, height: 50 }}/>
           
          </Marker>}
        
      {/* Rides to pickup */}
        { markers?.map((marker: IRide, index: number) => (
        <Marker
        onPress={()=>onFocusMap(marker, index)}
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
          <Image source={require("../assets/customer.png")}  style={{ width: 50, height: 50}}/>
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
       {
        !inProgressRide && <View style={styles.menuButton}>
        <TouchableOpacity onPress={()=>router.push('/list')}>
          {/* Badge */}
          <View style={{borderRadius: 50, backgroundColor: "red", width: 30, height: 30, position: "absolute", right: 5, top: 5, zIndex: 2}}>
            <Text style={{color: "white", textAlign: "center", padding: 6, fontWeight: "bold"}} >{markers.length}</Text>
          </View>
      
          <Image source={require("../assets/menu.png")}  style={{ width: 75, height: 75 }}/>
        
        </TouchableOpacity>
        
    </View>
       }
        
        <View style={{position: "absolute", bottom: 20, right: 20}}>
            <View style={{gap:5, marginVertical: 20, flexDirection: 'row', justifyContent: "ju"}}>
              { startedRide && <TouchableOpacity onPress={goToPickup} style={{ padding: 10, borderRadius: 100, backgroundColor: "green"}}> 
                <Text style={{color: "white", fontWeight: 'bold'}}>P</Text>
              </TouchableOpacity> }
              {pickupRide && <TouchableOpacity onPress={goToDestination}style={{padding: 10, borderRadius: 100, backgroundColor: "blue"}}> 
                <Text style={{color: "white", fontWeight: 'bold'}}>D</Text>
              </TouchableOpacity>}
              
            </View>
            {/* { !inProgressRide && <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 4}}>
              <TouchableOpacity onPress={()=>onFocusMap(null, -1)}  
               disabled={currentIndex === 0}>
                {
                  currentIndex !== 0 && currentIndex !== null &&  <Image source={require("../assets/prev.png")}  style={{ width: 75, height: 75 }}/>
                }
               
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>onFocusMap(null, +1)}
              disabled={currentIndex === markers.length}>
                 {
                  currentIndex !== markers.length-1 && markers.length !== 0 &&  <Image source={require("../assets/next.png")}  style={{ width: 75, height: 75 }}/>
                }
                
              </TouchableOpacity> 
            
            </View>} */}
            
        </View>
        <View style={{position: "absolute", bottom: 20, left: 20}}>
          
          <TouchableOpacity onPress={()=>onFocusMyLocationMap()}>
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
 

