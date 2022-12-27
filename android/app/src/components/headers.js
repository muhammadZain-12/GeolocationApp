import React from "react";
import { View,Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';


function Header (Prop) {
    let {back,navigation,light}  = Prop
    return (
        back && 
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Icon color={light?"white":"black"} size={20} name="arrowleft" />
        </TouchableOpacity>
    )
    
}


export default Header