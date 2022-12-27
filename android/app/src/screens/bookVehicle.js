import { useEffect, useState } from "react";
import { View,Text,ScrollView,Image } from "react-native";
import database from '@react-native-firebase/database';
import VehicleCard from "../components/cards";
import Header from "../components/headers";


function BookVehicle ({navigation}) {

const [Vehicledata,setVehicleData] = useState([])


useEffect(()=>{

database().ref('vehicles/').once('value',e=>{
    let val = e.val()
    const data = Object.values(val)
    setVehicleData(data)
})

},[Vehicledata])


    return (
        !Vehicledata && !Vehicledata.length>0?

        <Image source={require('../Assets/loaderImage.gif')} style={{width:"100%",height:"100%"}}  />
        :
        <View style={{width:"100%",height:"100%",padding:15}} >
        <Header navigation={navigation} back />
            <Text style={{color:"black",fontSize:20,textAlign:"center",textTransform:"capitalize",fontWeight:"700",marginVertical:20}} >
                Select Your Desired Vehicle to approach safe and sound journey
            </Text>
            <ScrollView style={{width:"100%",height:"100%"}} >
        {Vehicledata && Vehicledata.length>0 && Vehicledata.map((e,i)=>{
            return (
                <View>
                    <VehicleCard navigation={navigation} data={e} />
                </View>
            )
        })}         
        </ScrollView>   
        </View>
    )
}


export default BookVehicle