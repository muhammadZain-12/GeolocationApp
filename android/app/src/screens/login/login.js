import React, { useState } from 'react'
import {View,Text,StyleSheet,Image, TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import transportBackgroundImage from "../../Assets/transportBackgroundImage.webp"
import Header from '../../components/headers';

import loaderButton from "../../Assets/loaderButton.gif"
function Login ({navigation}) {
    const [loader,setLoader] = useState(false)
const [loginData,setLoginData] = useState({
    email:"",
    password:"",
    
})

    const login = () => {

        const {email,password} = loginData
            setLoader(true)
        auth().signInWithEmailAndPassword(email,password).then((success)=>{
            setLoader(false)
            const {user} = success
            const val = []
            database().ref(`users/`+ user.uid).once('value',(e)=>{
                let value  = e.val()
                value.id = user.uid
                val.push(value)
            }).then(()=>{
                navigation.navigate('showMap',val)
            })
            
        }).catch((error)=>{
            setLoader(false)
            console.log(error.code)
        })


    }


    return ( 
        <View style={styles.container} >
         <ImageBackground source={transportBackgroundImage} style={{width:"100%",height:"100%"}} resizeMode="cover" >   

         <View style={{width:"100%",height:"100%",justifyContent:"center",backgroundColor:"rgba(130,130,130,0.7)"}} >
        <View style={{width:"90%",alignItems:"center"}} >
        <Text style={{color:"white",textAlign:"left",width:"87%",fontSize:24}} >
            Welcome User!
        </Text>
        <Text style={{color:"white",textAlign:"left",width:"87%",fontSize:16}} >
            Login to enjoy safe and sound journey
        </Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",marginTop:30}} >
       
        <TextInput onChangeText={(e)=>setLoginData({...loginData,email:e})} placeholder='Enter Your Email' placeholderTextColor="white" style={[styles.textInput,{width:"90%"}]} />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",marginTop:30}} >
       
        <TextInput secureTextEntry={true}  onChangeText={(e)=>setLoginData({...loginData,password:e})} placeholder='Enter Your Password' placeholderTextColor="white" style={[styles.textInput,{width:"90%"}]} />
        </View>
        <TouchableOpacity onPress={login} style={styles.TouchableOpacity} >
        {loader?<Image source={loaderButton} style={{width:50,height:30}} />
        :
        <Text style={styles.text} >Login</Text>}
        </TouchableOpacity>
        <View style={{width:"100%",alignItems:"center",marginTop:20,flexDirection:"row",justifyContent:"center"}} >
        <Text style={{color:"rgba(180,180,810,1)",fontSize:16,textAlign:"center",justifyContent:"flex-end",fontWeight:"800"}} >
            Don't have an account?  
        </Text>
        <TouchableOpacity style={{justifyContent:"flex-end",marginLeft:4}} onPress={()=>navigation.navigate('SignUp')}  >
        
                <Text style={{color:"white",fontWeight:"700",fontSize:16}} >SignUp</Text>
        
            </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>
        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    container:{
            width:"100%",
            height:"100%",
            flex:1,
            borderColor:"black",
            borderWidth:2,
            backgroundColor:"white",
            alignItems:"center",
            justifyContent:"center"
    },

    image : {
        height:200,
        width:'100%',

    },
    text : {
        color :"white",
        fontSize:16,
        fontWeight:"700"
    },
    textInput:{
        borderColor:"white",
        borderWidth:1,
        padding:10,
        borderRadius:20,
        color:"white",
        textAlign:"center",
        height:60,
        fontSize:18
    },
    TouchableOpacity:{
        marginTop:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(180,180,810,0.7)",
        padding:15,
        width:"100%"

    }

})
