import {  useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
 
import { getDistance } from 'geolib';  
import { DetailItem } from './item';
import { RootState } from '../../src/store';
import { useSelector } from 'react-redux';
import { Header } from '../../src/components/header';
import { pendingRideSelector } from '../../src/slicers/ride.slicer';
 const Details = () => {
  const riders = useSelector((state: RootState)=>state.ride)
  const state = useSelector((state:RootState) => state);
  // const riders = pendingRideSelector(state) 
  const driverInfo = useSelector((state: RootState)=>state.user); 
  const params = useLocalSearchParams();
   
  const [data, setData] = useState(riders.rideList);
  const [formattedData, setFormattedData] = useState([]);
  
 

  useEffect(()=> {   
    if (driverInfo.currentLocation) {   
      const rider = data.find((rider)=>rider.id==params.id) 
      const distance =  getDistance2( {latitude: rider.pickupLocation.latitude, longitude: rider.pickupLocation.longitude }) 
        const newData = {...rider, distance: distance} 
        setFormattedData(newData) 
    } 
  },[])
 
  
  const getDistance2 = (destination: { latitude: any; longitude: any; })=> {   
    return getDistance(
        { latitude: driverInfo.currentLocation.latitude, longitude: driverInfo.currentLocation.longitude },
        { latitude: destination.latitude, longitude: destination.longitude } 
        
      ); 
  } 
  if (formattedData.length === 0){
  
    return <View><Text>No Data to Display</Text></View>
  }
  
  return (
    <SafeAreaView >  
        <Header/>
        {
          formattedData.length ===0 ?  <Text>No data</Text>  : <DetailItem user={formattedData} /> 
        } 
      
    </SafeAreaView>
  )
}

export default Details;