import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { RideRequest } from '../../mockdata/data';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';  
import { DetailItem } from './item';
 const Details = () => {
  
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([])
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: 6});
      
      setCurrentLocation({
        latitude:location?.coords.latitude,
        longitude: location?.coords.longitude
        
      })
     
      
    })();
  }, []);
  
  useEffect(()=> {
    const rider = RideRequest.find((rider)=>rider.id==params.id) 
    setData(rider)
  }, [currentLocation])

  useEffect(()=> { 
     
    
    if (data && currentLocation) { 
       
      const distance =  getDistance2( {latitude: data.pickupLocation.latitude, longitude: data.pickupLocation.longitude }) 
       
        const newData = {...data, distance: distance}
        
        setFormattedData(newData)
        
    }
     
     
   
  },[data, currentLocation])
 
  
  const getDistance2 = (destination: { latitude: any; longitude: any; })=> {   
    return getDistance(
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        { latitude: destination.latitude, longitude: destination.longitude } 
        
      ); 
  } 
  return (
    <SafeAreaView >  
        <View style={{margin: 10, flexDirection: "row", gap: 20  }}>
          <TouchableOpacity onPress={()=>router.back()} >
            <Image source={require("../../assets/back.png")}  style={{ width: 75, height: 75 }}/>
              
          </TouchableOpacity>
          <View style={{justifyContent:"center"}}>
            <Text style={{fontSize: 29}}>Customer Details</Text>
          </View>
        </View>
         
      <DetailItem user={formattedData} />
      
    </SafeAreaView>
  )
}

export default Details;