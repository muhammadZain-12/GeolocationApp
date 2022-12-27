import { useCallback, useEffect, useState } from "react";
import { View,Text, TouchableOpacity,Image } from "react-native";
import bike from "../Assets/bike.jpg"
import car from "../Assets/car.jpg"
import bus from "../Assets/bus.jpg"
import wagon from "../Assets/hiroof.jpg"
import DatePicker from "./datePicker";
import AppModal from "./modal";

function VehicleCard (Prop) {
    const {data,navigation,modal,selectedData} = Prop
    const [isDateTimePickerVisible,setIsDateTimePicker] = useState(false)
    
    const [VehicleType,setVehicleType] = useState('')
    

    useEffect(()=>{
        setVehicleType(data.VehicleType.toLowerCase())
    },[])
    




const showData = () => {
    selectedData(data)
   modal(true)
}
      



const images = useCallback(()=>{

    if(VehicleType=="bus"){
        return   <Image source={bus} style={{width:'100%',height:150,borderTopLeftRadius:20,borderTopRightRadius:20}} resizeMode="cover" />
    }
    else if (VehicleType=="bigcar"){
        
        return    <Image source={car} style={{width:'100%',height:150,borderTopLeftRadius:20,borderTopRightRadius:20}} resizeMode="cover" />
    }
    else if (VehicleType=="minicar"){
        
        return    <Image source={car} style={{width:'100%',height:150,borderTopLeftRadius:20,borderTopRightRadius:20}} resizeMode="cover" />
    }
    else if (VehicleType=="bike"){
        
        return  <Image source={bike} style={{width:'100%',height:150,borderTopLeftRadius:20,borderTopRightRadius:20}} resizeMode="cover" />
    }
    else{
        return  <Image source={wagon} style={{width:'100%',height:150,borderTopLeftRadius:20,borderTopRightRadius:20}} resizeMode="cover" />
    }

},[VehicleType])    



    return (
        
        <TouchableOpacity  onPress = {showData} style={{width:"90%",padding:10,borderWidth:1,borderColor:"black",alignItems:"center",marginTop:10,backgroundColor:'rgba(100,100,100,0.4)',borderTopLeftRadius:20,borderBottomRightRadius:20,borderTopRightRadius:30,borderBottomLeftRadius:30}} >
           
           {images()}

            <View style={{width:"100%",backgroundColor:"white",paddingVertical:10,paddingHorizontal:8,borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'rgba(100,100,100,0.4)'}} >
            <Text style={{color:"white",fontSize:18,fontWeight:"600",textTransform:"uppercase",width:"95%",letterSpacing:3 }}>{data.vehicleName}</Text>
            <Text style={{color:"white",fontSize:16,fontWeight:"800",textTransform:"uppercase" }} numberOfLines={1} >Destination: {data.StartDestination} To {data.endDestination} </Text>
            <Text style={{color:"white",fontSize:18,fontWeight:"600",textTransform:"uppercase",letterSpacing:1 }} numberOfLines={1} >No Of Seats : {data.noOfSeats}</Text>
            <Text style={{color:"white",fontSize:16,fontWeight:"800",textTransform:"uppercase" }} numberOfLines={1} >Min Time Duration:- {data.TimeDuration} Minutes </Text>
            </View>
        </TouchableOpacity>
        
    )
}

export default VehicleCard