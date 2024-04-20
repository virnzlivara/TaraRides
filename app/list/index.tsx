import { Link, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { RideRequest } from '../../mockdata/data';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { ReactNode } from 'react';
import { DetailItem } from './item';
 const List = () => {
  
  const router = useRouter();
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
    setData(RideRequest)
  }, [currentLocation])

  useEffect(()=> { 
     
    const tempData = [...data];
    if (tempData.length > 1 && currentLocation) {
      let newData = []; 
      
      tempData.map(async (userInfo, index)=> {  
        
        const distance =  getDistance2( {latitude: userInfo.pickupLocation.latitude, longitude: userInfo.pickupLocation.longitude }) 
        newData.push({...userInfo, distance: distance})
        setFormattedData(newData)
      })  
    }
     
     
   
  },[data, currentLocation])
 
  
  const getDistance2 = (destination: { latitude: any; longitude: any; })=> {   
    return getDistance(
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        { latitude: destination.latitude, longitude: destination.longitude } 
        
      ); 
  }



  const sortByDistance = () => {
    const newData = [...formattedData];
    setFormattedData([]); 
    const sorted = newData.sort((first, second) => { 
      return first.distance - second.distance})  
      setFormattedData(sorted); 
  }
   
   
  // if (!formattedData){
  //   return <Text>Loading...</Text>
  // }
  return (
    <SafeAreaView > 
      <View style={{padding: 10}}>
        <View style={{margin: "10px", flexDirection: "row", gap: 20  }}>
        <TouchableOpacity onPress={()=>router.back()} >
          <Image source={require("../../assets/back.png")}  style={{ width: 75, height: 75 }}/>
            
        </TouchableOpacity>
        <View style={{justifyContent:"center"}}>
          <Text style={{fontSize: 29}}>Customer List</Text>
        </View>
        </View>
        <ScrollView style={{marginBottom: 100, marginTop: 20}}>
           <View style={{margin: 10, flexDirection: "row", justifyContent: "flex-end"} }>
              <TouchableOpacity style={{padding: 10, backgroundColor: "grey", borderRadius: 20, width: 150}} onPress={sortByDistance}>
                <Text style={{textAlign: "center", color: "white", fontWeight: "bold"}}>Sort by nearest</Text>
              </TouchableOpacity>
          </View>
          { 
            formattedData.map((d, index)=> 
               <View key = {`${index}-details-${d.distance}`}>
                <DetailItem user={d} />
              </View>
            )
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default List;