import React, {useCallback, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import backgroundImage from '../Assets/backgroundImage.jpg';
import {SceneMap} from 'react-native-tab-view';
import {TabView} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
import {useWindowDimensions} from 'react-native';
import database from '@react-native-firebase/database';
import VehicleCard from '../components/cards';
import Header from '../components/headers';
import Icon from 'react-native-vector-icons/AntDesign';
import carImage from '../Assets/carImage.jpg';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AppModal from '../components/modal';



function Home({navigation, route}) {


  const [index, setIndex] = useState(0);
  const [Vehicledata, setVehicleData] = useState([]);
  const [userData, setUserData] = useState('');

  const [routes] = useState([
    {key: 'first', title: 'Booking'},
    {key: 'second', title: 'Vehicle'},
    {key: 'third', title: 'Profile'},
  ]);

  useEffect(() => {
    setUserData(route.params);
    database()
      .ref('vehicles/')
      .once('value', e => {
        let val = e.val();
        const data = Object.values(val);
        setVehicleData(data);
      });
  }, []);

  let model = {};

  const FirstRoute = useCallback(() => {


    const [modalVisible, setModalVisible] = useState(false);
    const [dataPickerVisibility, setDatePickerVisibility] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [mode, setMode] = useState('');
    const openModal = showModal => {
      setModalVisible(showModal);
    };

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
      console.warn('A time has been picked: ', date);
      mode == 'date' ? setDate(date) : setTime(date);
      hideDatePicker();
    };

    const [user] = userData;

    const navigateToSelectedBooking = () => {
      if (!date || !time) {
        Alert.alert('Error Alert', 'Pick Date & Time', [
          {text: 'Cancel', onPress: () => console.log('cancel Pressed')},
        ]);
      } else {
        const selectData = {
          data: selectedData,
          date: date,
          time: time,
          userId: user.id,
        };

        console.log(selectData, 'select');

        navigation.navigate('selectedBooking', selectData);
      }
    };



    
    const close = () => {
      setModalVisible(false);
    };

    return !Vehicledata ? (
      <Image
        source={require('../Assets/loaderImage.gif')}
        style={{width: '100%', height: 500}}
      />
    ) : (
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingVertical: 15,
          backgroundColor: 'rgba(100,100,100,0.1)',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            textAlign: 'center',
            textTransform: 'capitalize',
            fontWeight: '400',
            marginVertical: 15,
          }}>
          Select & Book Your Desired Vehicle to approach safe and sound journey
        </Text>
        <View
          style={{
            width: '100%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
            flex: 0.5,
          }}>
          {modalVisible && (
            <AppModal
              date={date}
              time={time}
              navigate={navigateToSelectedBooking}
              mode={setMode}
              showDatePicker={showDatePicker}
              close={close}
              text={'Pick Date Of Booking'}
              text1={'Pickup Time'}
              visible={modalVisible}
              title={'Pick Date & Time'}
            />
          )}
          <DateTimePicker
            mode={mode}
            isVisible={dataPickerVisibility}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <ScrollView style={{width: '100%', height: '100%'}}>
          {Vehicledata &&
            Vehicledata.length > 0 &&
            Vehicledata.map((e, i) => {
              return (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <VehicleCard
                    selectedData={setSelectedData}
                    modal={openModal}
                    navigation={navigation}
                    data={e}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }, [Vehicledata]);

  const SecondRoute = useCallback(() => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');



    const initialData = {
      vehicleName: '',
      VehicleType: '',
      StartDestination: '',
      endDestination: '',
      TimeDuration: 0,
      noOfSeats: 0,
      isBooking: 'false',
      id: '',
      bookingDate: [''],
      userId : ''
      
    };

    const [registrationData, setRegistrationData] = useState(initialData);

    const [vehicleCategory, setVehicleCategory] = useState([
      {
        label: 'Bus',
        value: 'Bus',
      },
      {
        label: 'mini Car',
        value: 'miniCar',
      },
      {
        label: 'Big Car',
        value: 'bigCar',
      },
      {
        label: 'Bike',
        value: 'Bike',
      },
      {
        label: 'Wagon',
        value: 'Wagon',
      },
    ]);

    const sendDatatoDb = () => {



let [user] = userData

      registrationData.VehicleType = value;
      registrationData.userId = user.id

      let registration = {...registrationData};

      delete registration.isBooking;
      delete registration.bookingDate;
      delete registration.id;

      let flag1 = Object.values(registration);

      let flag = flag1.some((e, i) => e == '');

      if (flag) {
        Alert.alert('Error Alert', 'Write Empty Input Fields', [
          {text: 'Cancel', onPress: () => console.log('cancel Pressed')},
        ]);
      } else {
        model.id = database().ref().push().key;
        registrationData.id = model.id;
        database()
          .ref(`vehicles/` + model.id)
          .set(registrationData)
          .then(success => {
            ToastAndroid.show(
              'Vehicle is successfully Registered',
              ToastAndroid.SHORT,
            );
            setRegistrationData(initialData);
            setValue('');
          })
          .catch(error => {
            console.log(error);
          });
      }
    };



    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(100,100,100,0.2)',
        }}>
        <ScrollView>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              margin: 15,
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: '700',
              }}>
              REGISTER VEHICLE
            </Text>
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{width: '86%', marginTop: 20}}>
                <DropDownPicker
                  items={vehicleCategory}
                  value={value}
                  open={open}
                  setOpen={setOpen}
                  setValue={setValue}
                />
              </View>
            </View>
            <TextInput
              value={registrationData.vehicleName}
              onChangeText={e =>
                setRegistrationData({...registrationData, vehicleName: e})
              }
              style={[
                {
                  color: 'black',
                  borderColor: 'black',
                  borderWidth: 1,
                  marginTop: 15,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  padding: 10,
                },
              ]}
              placeholder="Vehicle Name"
              placeholderTextColor="black"
            />
            <TextInput
              value={registrationData.StartDestination}
              onChangeText={e =>
                setRegistrationData({...registrationData, StartDestination: e})
              }
              style={[
                {
                  color: 'black',
                  borderColor: 'black',
                  borderWidth: 1,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  padding: 10,
                },
              ]}
              placeholder="Start Destination"
              placeholderTextColor="black"
            />
            <TextInput
              value={registrationData.endDestination}
              onChangeText={e =>
                setRegistrationData({...registrationData, endDestination: e})
              }
              style={{
                color: 'black',
                borderColor: 'black',
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                padding: 10,
              }}
              placeholder="End Destination"
              placeholderTextColor="black"
            />
            <TextInput
              value={registrationData.TimeDuration}
              keyboardType="numeric"
              onChangeText={e =>
                setRegistrationData({...registrationData, TimeDuration: e})
              }
              style={{
                color: 'black',
                borderColor: 'black',
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                padding: 10,
              }}
              placeholder="Time (in Minutes)"
              placeholderTextColor="black"
            />
            <TextInput
              value={registrationData.noOfSeats}
              keyboardType="numeric"
              onChangeText={e =>
                setRegistrationData({...registrationData, noOfSeats: e})
              }
              style={{
                color: 'black',
                borderColor: 'black',
                borderWidth: 1,
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                padding: 10,
              }}
              placeholder="No Of Seats"
              placeholderTextColor="black"
            />
            <TouchableOpacity
              onPress={sendDatatoDb}
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'black',
                alignItems: 'center',
                padding: 10,
                margin: 10,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
                REGISTER VEHICLE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }, []);

  const ThirdRoute = useCallback(() => {
    const [user] = userData
    return (
      <View style={{width:"100%",height:"100%",padding:10}} >
      <ScrollView>
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
          <TouchableOpacity onPress={()=>navigation.navigate('profileDetail')}  style={{margin:5,marginTop:0,flexDirection:"row",backgroundColor:"rgba(280,280,280,0.6)",padding:15,justifyContent:"space-between"}}  >
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
      <View>
          <Text style={{color:"black",margin:10,fontSize:16,color:"gray"}} >
              Booking 
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('bookingDetail')} style={{margin:5,marginTop:0,flexDirection:"row",backgroundColor:"rgba(280,280,280,0.6)",padding:15,justifyContent:"space-between"}}  >
          <View style={{flexDirection:"row"}} > 
              <Icon name="car" color="blue" size={25} />
              <View style={{marginHorizontal:20}}>
                  <Text style={{color:"black",fontWeight:"700",fontSize:18}} >
                      Booking Details,
                  </Text>
                  <Text style={{fontWeight:"400",fontSize:15,color:"gray"}} >View Details</Text>
              </View>
              </View>
              <TouchableOpacity style={{marginTop:10}} >
                  <Icon name="right" color="blue" size={20} />
              </TouchableOpacity>
          </TouchableOpacity>
      </View>
      <View>
          <Text style={{color:"black",margin:10,fontSize:16,color:"gray"}} >
              My Vehicle Bookings
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('myVehicleBooking')} style={{margin:5,marginTop:0,flexDirection:"row",backgroundColor:"rgba(280,280,280,0.6)",padding:15,justifyContent:"space-between"}}  >
          <View style={{flexDirection:"row"}} > 
              <Icon name="car" color="blue" size={25} />
              <View style={{marginHorizontal:20}}>
                  <Text style={{color:"black",fontWeight:"700",fontSize:18}} >
                       My Vehicle Bookings
                  </Text>
                  <Text style={{fontWeight:"400",fontSize:15,color:"gray"}} >View Details </Text>
              </View>
              </View>
              <TouchableOpacity style={{marginTop:10}} >
                  <Icon name="right" color="blue" size={20} />
              </TouchableOpacity>
          </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
  )
  }, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={{flexGrow: 1, backgroundColor: 'white'}}>
      <Image source={carImage} style={{width: '100%', height: 200}} />
      <View style={{padding: 10, position: 'absolute'}}>
        <Header back navigation={navigation} />
      </View>
      <View style={{flexGrow: 1, alignItems: 'center'}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={state => {
            let {
              navigationState: {routes},
            } = state;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderBottomWidth: 1,
                  justifyContent: 'space-around',
                  borderBottomColor: '#424359',
                }}>
                {routes.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => setIndex(i)}
                    style={{
                      height: 40,
                      paddingHorizontal: 20,
                      marginBottom: -2.5,
                      borderBottomColor: '#424359',
                      flexDirection: 'row',
                      borderBottomWidth: index == i ? 5 : 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    key={i}>
                    {i == 2 ? (
                      <Icon name="user" size={15} color="black" />
                    ) : (
                      <Icon name="car" size={15} color="black" />
                    )}
                    <Text
                      style={{
                        marginLeft: 10,
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '600',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
          onIndexChange={setIndex}
          style={{width: '100%'}}
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
        />
      </View>
    </View>
  );
}

export default Home;
