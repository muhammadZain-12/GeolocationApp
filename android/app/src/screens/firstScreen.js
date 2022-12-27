import React, { useCallback, useEffect, useState } from "react"
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native"
import image from "../Assets/travel.png"


function FirstScreen ({route,navigation}) {
const [data,setData] = useState([])
    
let userData = route.params

useEffect(()=>{
    
    setData(userData)
},[])



    return (
        <View>
            <Image resizeMode="cover" source={image} style={{width:'100%',height:400}} />
            <View style={{width:"100%",alignItems:"center",height:'100%',marginTop:40}} >
            <Text style={{color:"black",fontSize:20,fontWeight:'700'}} >
                    Hello {data  && data.map((e,i)=>e.username)}
                </Text>
                <Text style={{color:"black",marginTop:10,textAlign:"center"}} >
                    Providing safe and sound journey and take you to your destination is our only motive 
                </Text>
                <Text style={{color:"black",marginTop:10}} >
                    Want to reach at your destination?
                </Text>
                <Text style={{color:"black",marginTop:10}} >
                    Let's book your ride then
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('mainScreen',data)}  style={{width:"80%",backgroundColor:"lightblue",padding:15,marginTop:30,borderRadius:10,alignItems:"center"}} >
                    <Text style={{color:"black",fontWeight:'700',fontSize:18}} >
                        Let's Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FirstScreen

