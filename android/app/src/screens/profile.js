import React from "react"
import {View,Text, TouchableOpacity} from "react-native"

import Icon from "react-native-vector-icons/AntDesign"

function Profile ({route}) {
    let data  = route.params


let [user] = data
    
    return (
        <View style={{width:"100%",height:"100%",padding:10}} >
        <View style={{flexDirection:"row"}} >
            <Icon size={100} color="black" name="user" />
            <View>
                <Text style={{color:"black",fontSize:24,fontWeight:"700",marginTop:10}} >
                    {user.username}
                </Text>
                <Text style={{color:"black",fontSize:16,fontWeight:"400",color:"gray"}} >
                    {user.email}
                </Text>
            </View>
        </View>
        <View>
            <Text style={{color:"black",margin:10,fontSize:16,color:"gray"}} >
                PROFILE
            </Text>
            <TouchableOpacity style={{margin:5,marginTop:0,flexDirection:"row",backgroundColor:"rgba(280,280,280,0.6)",padding:15,justifyContent:"space-between"}}  >
            <View style={{flexDirection:"row"}} > 
                <Icon name="user" color="blue" size={25} />
                <View style={{marginHorizontal:20}}>
                    <Text style={{color:"black",fontWeight:"700",fontSize:18}} >
                        Profile Details,
                    </Text>
                    <Text style={{fontWeight:"400",fontSize:15,color:"gray"}} >View Details</Text>
                </View>
                </View>
                <TouchableOpacity style={{marginTop:10}} >
                    <Icon name="right" color="blue" size={20} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
        </View>
    )
}

export default Profile