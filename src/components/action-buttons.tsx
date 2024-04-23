import React from 'react'
import { TouchableOpacity,View, Text } from 'react-native'

export const ActionButtons = () => {
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", gap: 5, marginTop: 20}}>
        <TouchableOpacity style={{width: "50%", backgroundColor: "green", borderRadius: 20, padding: 20}}>
        <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: "50%", backgroundColor: "red", borderRadius: 20, padding: 20}}>
        <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Decline</Text>
        </TouchableOpacity>
    </View>
  )
}
