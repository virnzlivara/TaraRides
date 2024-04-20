import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text} from 'react-native'

export const DetailItem = ({user}) => {
    
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBO3wZ4Qr4CZpaxklsSlHx1GCdmgMi8pa4'; 
    const [data, setData] = useState(user);
    useEffect( ()=> { 
        const fetchAddress = async (data) => {
            // use promise all
            const pickupAddress =  await retrieveAddressName(data.pickupLocation.latitude, data.pickupLocation.longitude) || "Address"
            const destinationAddress =  await retrieveAddressName(data.destination.latitude, data.destination.longitude) || "Address"
            return {pickupAddress, destinationAddress }
          }
        if (data){
            fetchAddress(data) 
            .then((response)=>  {
                
                  setData({...data, destinationAddress: response.destinationAddress, pickUpAddress: response.pickupAddress})
            })
            
        }
    }, [])
    const retrieveAddressName = async (myLat: string, myLon: string)=> { 
        const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${myLat},${myLon}&key=${GOOGLE_MAPS_APIKEY}`
        let address = 'No Address found'
        const res = await fetch(URL);
        const data = await res.json();
        
        
        address = data.results[0].formatted_address;
        return address;
        
        // const responseJson = await result.json()   
        // const formattedAddress = responseJson.results[0]?.formatted_address;
        
    }
  return (
    <View  style={{backgroundColor: "pink", borderRadius: 20, padding: 20, margin: 10}}>
        <View style={{flexDirection: "row"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Distance from me: </Text> 
            <Text style={{fontWeight: "bold", fontSize: 20}}> 
            {data.distance}
            </Text>
        </View> 
        <View style={{flexDirection: "row"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>User ID: </Text> 
            <Text style={{fontWeight: "bold", fontSize: 20}}>{data.userId}</Text>
        </View> 
        <View style={{flexDirection: "row"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Pickup  </Text>  
        </View> 
        <View style={{flexDirection: "row", paddingLeft: 20}}>
            {/* <Text style={{fontWeight: "bold", fontSize: 20}}>Address:  </Text>  */}
            <Text style={{flexWrap: "wrap", fontWeight: "bold", fontSize: 20}}>{data.pickUpAddress}</Text>
            
        </View> 
        {/* <View style={{flexDirection: "row", paddingLeft: 20}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Latitude:  </Text> 
            <Text style={{fontWeight: "bold", fontSize: 20}}>{data.pickupLocation.latitude}</Text>
        </View> 

        <View style={{flexDirection: "row", paddingLeft: 20}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Longitude:  </Text> 
            <Text style={{fontWeight: "bold", fontSize: 20}}>{data.pickupLocation.longitude}</Text>
        </View>  */}
        <View style={{flexDirection: "row"}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Destination  </Text>  
        </View> 
        <View style={{flexDirection: "row", paddingLeft: 20}}>
            {/* <Text style={{fontWeight: "bold", fontSize: 20}}>Destination:  </Text>  */}
            <Text style={{flexWrap: "wrap", fontWeight: "bold", fontSize: 20}}>{data.destinationAddress}</Text>
            </View>
            {/* <View style={{flexDirection: "row", paddingLeft: 20}}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>Latitude:  </Text> 
                <Text style={{fontWeight: "bold", fontSize: 20}}>{data.pickupLocation.latitude}</Text>
            </View> 

            <View style={{flexDirection: "row", paddingLeft: 20}}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>Longitude:  </Text> 
                <Text style={{fontWeight: "bold", fontSize: 20}}>{data.pickupLocation.longitude}</Text>
            </View> 
             */}
        
        
        <View style={{flexDirection: "row", justifyContent: "space-between", gap: 5, marginTop: 20}}>
            <TouchableOpacity style={{width: "50%", backgroundColor: "green", borderRadius: 20, padding: 20}}>
            <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: "50%", backgroundColor: "red", borderRadius: 20, padding: 20}}>
            <Text style={{fontSize: 25, textAlign: "center", color: "white", fontWeight: "bold"}}>Decline</Text>
            </TouchableOpacity>
        </View>
        </View>
    ) 
}