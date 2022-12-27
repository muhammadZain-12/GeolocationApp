import React, { useState } from 'react'
import {View,Text, TextInput, TouchableOpacity,StyleSheet, Alert} from 'react-native' 
import database from '@react-native-firebase/database';
import { ToastAndroid } from 'react-native';
import Header from '../components/headers';



function TodoApp ({navigation}) {

const initialData = {
    vehicleName:"",
    VehicleType:"",
    StartDestination:"",
    endDestination:"",
    TimeDuration:0,
    noOfSeats:0,
}

    const [registrationData,setRegistrationData] = useState(initialData)

console.log(registrationData,"register")

let model = {};

const sendDatatoDb = () => {

    let flag1 = Object.values(registrationData)

   let flag = flag1.some((e,i)=>e=="")

    if(flag){
        Alert.alert("Error Alert",'Write Empty Input Fields',[{text:"Cancel",onPress:()=>console.log('cancel Pressed')}])
    }
    else{
    model.id = database().ref().push().key
    database().ref(`vehicles/` + model.id).set(registrationData).then((success)=>{
        
        ToastAndroid.show('Vehicle is successfully Registered',ToastAndroid.SHORT)
        setRegistrationData(initialData)

    }).catch((error)=>{
        console.log(error)
    })
}
}



    return (
        <View style={[styles.shadowProp,{height:"100%",width:"100%",justifyContent:"space-around"}]} >
        <View style={{paddingHorizontal:15,height:"3%"}} >
        <Header back navigation={navigation} />
        </View>
        <View style={{borderColor:"black",borderWidth:1,margin:15,paddingVertical:20,borderRadius:10,backgroundColor:'white'}} >
            <Text style={{color:"black",textAlign:"center",fontSize:28,fontWeight:"700"}} >
            REGISTER VEHICLE
            </Text>
            <TextInput value={registrationData.vehicleName} onChangeText={(e)=>setRegistrationData({...registrationData,vehicleName:e})}  style={[{color:"black",borderColor:"black",borderWidth:1,marginTop:30,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}]} placeholder="Vehicle Name" placeholderTextColor="black" />
            <TextInput value={registrationData.VehicleType} onChangeText={(e)=>setRegistrationData({...registrationData,VehicleType:e})} style={{color:"black",borderColor:"black",borderWidth:1,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}} placeholder="Type Of Vehicle" placeholderTextColor="black" />
            <TextInput value={registrationData.StartDestination}  onChangeText={(e)=>setRegistrationData({...registrationData,StartDestination:e})}  style={[{color:"black",borderColor:"black",borderWidth:1,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}]} placeholder="Start Destination" placeholderTextColor="black" />
            <TextInput value={registrationData.endDestination}  onChangeText={(e)=>setRegistrationData({...registrationData,endDestination:e})} style={{color:"black",borderColor:"black",borderWidth:1,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}} placeholder="End Destination" placeholderTextColor="black" />
            <TextInput value={registrationData.TimeDuration} keyboardType='numeric' onChangeText={(e)=>setRegistrationData({...registrationData,TimeDuration:e})} style={{color:"black",borderColor:"black",borderWidth:1,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}} placeholder="Time (in Minutes)" placeholderTextColor="black" />
            <TextInput value={registrationData.noOfSeats} keyboardType='numeric' onChangeText={(e)=>setRegistrationData({...registrationData,noOfSeats:e})} style={{color:"black",borderColor:"black",borderWidth:1,marginVertical:10,marginHorizontal:20,borderRadius:10,padding:10}} placeholder="No Of Seats" placeholderTextColor="black" />
            <TouchableOpacity onPress={sendDatatoDb} style={{marginTop:20,borderWidth:1,borderRadius:10,backgroundColor:"black",alignItems:"center",padding:10,margin:10,justifyContent:"center"}} >
                <Text style={{color:"white",fontSize:18,fontWeight:"700"}} >REGISTER VEHICLE</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoApp


const styles = StyleSheet.create({
    shadowProp: {
            shadowColor: '#128aee',
            elevation: 160,

                 },  
})

