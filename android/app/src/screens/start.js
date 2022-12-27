import React from "react"
import { ImageBackground,Text } from "react-native"
import { useState } from "react"
import Image from "../Assets/backgroundImage.jpg"

function StartApp ({navigation}) {
const [count,setCount] = useState(3)




setTimeout(()=>{
    if(count){
        setCount(count-1)
    }
},1000)




setTimeout(()=>{
    navigation.navigate('Login')
},4500)

    return (

        <ImageBackground source={Image} style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}} resizeMode="cover" >
        {count==0?<Text style={{fontSize:34,fontWeight:'400',color:"white"}} >
                        Let's Journey Begins
                  </Text>
        :
        <Text style={{color:"white",fontSize:50,fontWeight:"500",textAlign:"center",textTransform:"uppercase",width:"90%"}} >{count}</Text>
        }
          
        </ImageBackground>

    )
}

export default StartApp