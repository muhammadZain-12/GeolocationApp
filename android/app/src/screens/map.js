import React, { useEffect } from 'react'
import {View,Text} from "react-native"
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';




function ShowMap () {
    
    const [currentLocation,setCurrentLocation] = React.useState('')


    useEffect(()=>{
        Geolocation.getCurrentPosition((info) => setCurrentLocation(info));
    },[])
    


    return (
        <View style={{height:'100%',width:'100%'}} >
             <MapView
             style={{height:600,width:'100%'}}
       provider={PROVIDER_GOOGLE} 
       
       region={{
         latitude: currentLocation.coords.latitude,
         longitude: currentLocation.coords.longitude,

       }}
     >
     <Marker
        style={{color:"red",width:200,height:200}}
        coordinate={{
            latitude:currentLocation.coords.latitude,
            longitude:currentLocation.coords.longitude
        }}
     
       />
     </MapView>

        </View>
    )
}

export default ShowMap
