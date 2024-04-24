import React, { useState } from 'react'
import { TouchableOpacity,View, Text } from 'react-native'
import { useAppDispatch } from '../hooks/useReduxHooks'
import { inProgressRideSelector, updateDetails } from '../slicers/ride.slicer'
import { useRouter } from 'expo-router'
import { IRide } from '../../types/IRide'
import { driverIdSelector } from '../slicers/user.slicer'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
interface IProps {
  data: IRide
}
export const ActionButtons = ({data}: IProps) => {
  const [isAcceptDisable, setIsAcceptDisable]= useState(false)
  const [isDeclineDisable, setIsDeclineDisable]= useState(false)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const state = useSelector((state:RootState) => state);
  const driverId = driverIdSelector(state);
  const inProgressRide = inProgressRideSelector(state)
  const onApprove = (status) => {  
    dispatch(updateDetails({id: data.userId, status: status, driverId: driverId }))
    setIsAcceptDisable(true)
    router.back();
  }
  const onDecline = (status: string) => {
    dispatch(updateDetails({id: data.userId, status: status }))
    setIsDeclineDisable(true)
  }

  const getButtonText = (status: string) => { 
    if (status === "accepted") {
      return "Start"
    } else if (status === "started") {
      return "Pick-up"
    } else if (status === "picked-up") {
      return "Drop-off" 
    } else if (status === "dropped-off") {
      return "Completed" 
    } else {
      return "Accepted"
    } 
  }

  const getStatusText = (status: string) => { 
    if (status === "accepted") {
      return "started"
    } else if (status === "started") {
      return "picked-up"
    } else if (status === "picked-up") {
      return "dropped-off"
    } else if (status === "dropped-off") {
      return "completed"
    } else {
      return "accepted"
    } 
  }
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", gap: 5, marginTop: 20}}>
       {
          data.status !== "dropped-off" && <>
            <TouchableOpacity disabled = {isAcceptDisable || getButtonText(data.status) === "Completed"} style={{width: "50%", backgroundColor: isAcceptDisable ? "gray" : "green", borderRadius: 20, padding: 20}} 
            onPress={()=>onApprove(getStatusText(data.status))}>
            <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>{getButtonText(data.status)}</Text>
            </TouchableOpacity>
          
            <TouchableOpacity  disabled = {isDeclineDisable || inProgressRide }style={{width: "50%", backgroundColor: isDeclineDisable || inProgressRide ? "gray" : "red", borderRadius: 20, padding: 20}}
            onPress={()=>onDecline("declined")}>
            <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Decline</Text>
            </TouchableOpacity>
          </>
        }

        
    </View>
  )
}
