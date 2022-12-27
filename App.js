
import {View,Text} from 'react-native'
import 'react-native-gesture-handler';
navigator.geolocation = require('@react-native-community/geolocation');
import AppNavigation from './android/app/src/config/appNavigation'

const App = () => {
  return (
    <View style={{backgroundColor:"white",width:"100%",height:"100%"}} >
      <AppNavigation/>
    </View>
  )
}



export default App

