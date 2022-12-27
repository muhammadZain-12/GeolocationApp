import React from 'react'
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Login from '../screens/login/login';
import SignUp from '../screens/signUp/signup';
import TodoApp from '../screens/todoApp';
import Home from '../screens/Home';
import StartApp from "../screens/start"
import BookVehicle from '../screens/bookVehicle';
import SelectedBooking from '../screens/selectedBooking';
import FirstScreen from '../screens/firstScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/profile';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawerItem from '@react-navigation/drawer';
import DrawerItemList from '@react-navigation/drawer';
import {createAppContainer} from 'react-navigation' 
import ShowMap from '../screens/map';
import ProfileDetail from '../screens/profileDetail';
import BookingDetail from '../screens/bookingDetails';
import MyVehicleBookings from '../screens/myVehicleBooking';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function AppNavigation () {

    return (
        
        <>
<NavigationContainer>

        <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}}  name="start" component={StartApp} /> 
          <Stack.Screen options={{headerShown:false}}  name="mainScreen" component={Home} />
            <Stack.Screen options={{headerShown:false}}  name="AddTransport" component={TodoApp} />
          <Stack.Screen options={{headerShown:false}}  name="SignUp" component={SignUp} />
          <Stack.Screen options={{headerShown:false}}  name="Login" component={Login} />
          <Stack.Screen options={{headerShown:false}}  name="bookVehicle" component={BookVehicle} />
          <Stack.Screen options={{headerShown:false}}  name="selectedBooking" component={SelectedBooking} />
          <Stack.Screen options={{headerShown:false}}  name="firstScreen" component={FirstScreen} />
          <Stack.Screen options={{headerShown:false}}  name="Profile" component={Profile} />
          <Stack.Screen options={{headerShown:false}}  name="showMap" component={ShowMap} />
          <Stack.Screen options={{headerShown:false}}  name="profileDetail" component={ProfileDetail} />
          <Stack.Screen options={{headerShown:false}}  name="bookingDetail" component={BookingDetail} />
          <Stack.Screen options={{headerShown:false}}  name="myVehicleBooking" component={MyVehicleBookings} />
        </Stack.Navigator>

      </NavigationContainer>

</>
    )

    




  

}

export default AppNavigation