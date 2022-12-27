import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity,TextInput } from "react-native";

import  Icon  from "react-native-vector-icons/AntDesign";
import DatePicker from "./datePicker";


const AppModal = (Props) => {
  const {visible,close,text,title,text1,showDatePicker,mode,navigate,date,time} = Props


  const DatePickerShow = modes => {
    showDatePicker()
    mode(modes)
  }


  const navigateToSelectedBooking = () => {
    close()
    navigate()
  }


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          close()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Icon name="car" size={80} color="white" />
          <Text style={[styles.textStyle,{marginBottom:15,fontSize:24,textTransform:"uppercase"}]} >{title}</Text>

           <TouchableOpacity onPress={()=>DatePickerShow("date")} style={{backgroundColor:"lightblue",width:'90%',borderRadius:10,padding:10,alignItems:"center",marginBottom:15}} >
            <Text style={{color:"black",fontSize:16,fontWeight:"600"}} >
                {text}
            </Text>
            <TextInput editable={false} value={date && date.toString().slice(0,16)} style={{width:"100%",padding:10,marginTop:5,backgroundColor:"white",borderRadius:10,color:"black"}} />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>DatePickerShow("time")} style={{backgroundColor:"lightblue",width:'90%',borderRadius:10,padding:10,alignItems:"center",marginBottom:50}} >
            <Text style={{color:"black",fontSize:16,fontWeight:"600"}} >
                {text1}
            </Text>
            <TextInput editable={false} value={time &&"Time:" +  time.toString().slice(17,25)} style={{width:"100%",padding:10,marginTop:5,backgroundColor:"white",borderRadius:10,color:"black"}} />
           </TouchableOpacity>
           <TouchableOpacity onPress={navigateToSelectedBooking} style={{backgroundColor:"lightblue",width:'100%',borderRadius:20,padding:10,alignItems:"center"}} >
            <Text style={{color:"black",fontSize:16,fontWeight:"600"}} >
                Confirm Booking
            </Text>
           </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:"90%",
    marginTop:40,
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 20,
    padding: 20,
    paddingTop:15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AppModal;