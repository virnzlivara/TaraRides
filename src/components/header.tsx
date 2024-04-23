import { router } from 'expo-router'
import React from 'react'
import { View, TouchableOpacity,Image, Text } from 'react-native'

export const Header = () => {
  return (
    <View style={{margin: 10, flexDirection: "row", gap: 20  }}>
        <TouchableOpacity onPress={()=>router.back()} >
        <Image source={require("../../assets/back.png")}  style={{ width: 75, height: 75 }}/>
            
        </TouchableOpacity>
        <View style={{justifyContent:"center"}}>
        <Text style={{fontSize: 29}}>Customer Details</Text>
        </View>
    </View>
  )
}
