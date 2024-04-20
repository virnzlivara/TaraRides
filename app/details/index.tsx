import { Link, useRouter } from 'expo-router'
import React from 'react'
import { View,Text, Pressable, Image } from 'react-native'
import { RideRequest } from '../../mockdata/data';

 const CustomerDetails = () => {
  const router = useRouter();
  const data = RideRequest
  return (
    <View style={{padding: 10}}> 
      <View style={{margin: "10px", flexDirection: "row", gap: 20  }}>
       <Pressable onPress={()=>router.back()} >
        <Image source={require("../../assets/back.png")}  style={{ width: 75, height: 75 }}/>
           
       </Pressable>
       <View style={{justifyContent:"center"}}>
        <Text style={{fontSize: 29}}>Customer Details</Text>
      </View>
      </View>
      <View>
        {
          data.map((d)=> {
            return (
            <View style={{backgroundColor: "pink", borderRadius: 20, padding: 20, margin: 10}}>
              <Text>{d.id}</Text>
              <Text>{d.pickupLocation.latitude}</Text>
              <Text>{d.pickupLocation.longitude}</Text>
              <View style={{flexDirection: "row", justifyContent: "space-between", gap: 5, marginTop: 20}}>
                <Pressable style={{width: "50%", backgroundColor: "green", borderRadius: 20, padding: 20}}>
                  <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Accept</Text>
                </Pressable>
                <Pressable style={{width: "50%", backgroundColor: "red", borderRadius: 20, padding: 20}}>
                  <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Decline</Text>
                </Pressable>
              </View>
            </View>)
          })
        }
      </View>
      </View>
  )
}

export default CustomerDetails;