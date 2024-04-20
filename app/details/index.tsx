import { Link, useRouter } from 'expo-router'
import React from 'react'
import { View,Text, Pressable } from 'react-native'
import { RideRequest } from '../../mockdata/data';

 const CustomerDetails = () => {
  const router = useRouter();
  const data = RideRequest
  return (
    <View style={{margin: "10px"}}>
       <Pressable onPress={()=>router.back()}>
       <Text>Go back</Text>
       </Pressable>
      <Text>CustomerDetails</Text>
      <View>
        {
          data.map((d)=> {
            return <View>
              <Text>{d.id}</Text>
              <Text>{d.pickupLocation.latitude}</Text>
              <Text>{d.pickupLocation.longitude}</Text>
              </View>
          })
        }
      </View>
      </View>
  )
}

export default CustomerDetails;