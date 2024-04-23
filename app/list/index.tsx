import { Link, useRouter, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
 
import { getDistance } from 'geolib';  
import { DetailItem } from './item';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import { Header } from '../../src/components/header';
 const List = () => {
  const riders = useSelector((state: RootState)=>state.ride)
  const driverInfo = useSelector((state: RootState)=>state.user)
  const router = useRouter(); 
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([])
   
  
  useEffect(()=> {
    setData(riders.rideList) 
  }, [driverInfo.currentLocation])

  useEffect(()=> { 
     
    const tempData = [...data];
    if (tempData.length > 1 && driverInfo.currentLocation) {
      let newData = []; 
      
      tempData.map(async (userInfo, index)=> {  
        
        const distance =  getDistance2( {latitude: userInfo.pickupLocation.latitude, longitude: userInfo.pickupLocation.longitude }) 
        newData.push({...userInfo, distance: distance})
        setFormattedData(newData)
      })  
    }
     
     
   
  },[data, driverInfo.currentLocation])
 
  
  const getDistance2 = (destination: { latitude: any; longitude: any; })=> {   
    return getDistance(
        { latitude: driverInfo.currentLocation.latitude, longitude: driverInfo.currentLocation.longitude },
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
   
   
  if (!formattedData){
    return <View><Text>No Data to Display</Text></View>
  }
  return (
    <SafeAreaView > 
      <View style={{padding: 10}}>
        <Header/>
        <ScrollView style={{marginBottom: 100, marginTop: 20}}>
           <View style={{margin: 10, flexDirection: "row", justifyContent: "flex-end", gap: 5} }>
              <TouchableOpacity style={{padding: 10, backgroundColor: "grey", borderRadius: 20, width: 150}} onPress={sortByDistance}>
                <Text style={{textAlign: "center", color: "white", fontWeight: "bold"}}>Sort by nearest</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{padding: 10, backgroundColor: "grey", borderRadius: 20, width: 150}} onPress={sortByDistance}>
                <Text style={{textAlign: "center", color: "white", fontWeight: "bold"}}>Sort by pickup time</Text>
              </TouchableOpacity> */}
          </View>
          { 
            formattedData.length !== 0 ? formattedData.map((d, index)=> 
               <View key = {`${index}-details-${d.distance}`}>
                <DetailItem user={d} />
              </View>
            ) : <Text> No Item to display</Text>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default List;