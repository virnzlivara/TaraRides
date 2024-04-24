import { Link, useRouter, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
 
import { getDistance } from 'geolib';  
import { DetailItem } from './item';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import { Header } from '../../src/components/header';
import { IRide } from '../../types/IRide';
import { IRider, pendingRideSelector, within1KMSelector } from '../../src/slicers/ride.slicer';
 const List = () => {
  // const riders = useSelector((state: RootState)=>state.ride)
  const driverInfo = useSelector((state: RootState)=>state.user)
  const state = useSelector((state:RootState) => state);
  const riders = pendingRideSelector(state) 
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState<IRide[]>([])
  const within1KM = within1KMSelector(state)
  useEffect(()=> { 
    setData(riders)  
    
  }, [driverInfo, riders])

  useEffect(()=> { 
    setFormattedData([])
    const tempData = [...data];
    
    let newData : IRide[] = []; 
    if (tempData.length >= 0 && driverInfo.currentLocation) { 
      tempData.map(async (userInfo:IRide, index: number)=> {
        const distance =  getDistance2( {latitude: userInfo.pickupLocation.latitude, longitude: userInfo.pickupLocation.longitude }) 
        newData.push({...userInfo, distance: distance})
       
        setFormattedData(newData)
      })  
    }  
  },[driverInfo.currentLocation, riders, data])
 
  
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

  const filterNearest = () => {
    const newData = [...formattedData];
   
    setFormattedData([]); 
    const filtered = newData.filter((data) => { 
      return data.distance < 5000 })  
      
      setFormattedData(filtered); 
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
              <TouchableOpacity style={{padding: 10, backgroundColor: "grey", borderRadius: 20, width: 150}} onPress={filterNearest}>
                <Text style={{textAlign: "center", color: "white", fontWeight: "bold"}}>Filter within 1KM</Text>
              </TouchableOpacity>
          </View>

          { 
             formattedData.length > 0 ? formattedData.map((d, index)=> 
               <View key = {`${index}-details-${d.distance}`}>
                <DetailItem user={d} />
              </View>) : <View>
                <Text style={{fontSize: 30, textAlign: 'center'}}> No Data to Display</Text>
              </View>
            
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default List;