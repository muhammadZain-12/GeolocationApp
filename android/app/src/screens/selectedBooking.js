import React from 'react';
import {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import bike from '../Assets/bike.jpg';
import car from '../Assets/car.jpg';
import bus from '../Assets/bus.jpg';
import wagon from '../Assets/hiroof.jpg';
import Header from '../components/headers';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {cos} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function SelectedBooking({route, navigation}) {
  let data = route.params;

  let time = data.time.toString().slice(16, 25);
  let date = data.date.toString().slice(0, 15);

  const [bookingData, setBookingData] = useState({
    transportData: data,
    fullName: '',
    email: '',
    mobileNumber: 0,
    address: '',
    bookingDate: 'a',
  });

  let currentDate = new Date().getTime();

  let transportDate = bookingData.transportData.date.getTime();

  const bookVehicle = () => {
    if (transportDate < currentDate) {
      Alert.alert(
        'Error Alert',
        'Booking Date should not be previuos then current date',
      );
    } else {
      let flag = Object.values(bookingData);

      let flag1 = flag.some((e, i) => e == '');

      if (flag1) {
        Alert.alert('Error Alert', 'Fill Empty Input Fields', [
          {text: 'Ok', onPress: () => console.log('Ok Button Pressed')},
        ]);
      } else {
        database()
          .ref('vehicles/' + data.data.id)
          .once('value', e => {
            let val = e.val();
            let flag = val.bookingDate.every((e, i) => e !== date);
            if (flag) {
              data.data.isBooking == 'true';
              data.data.bookingDate.push(date);
              database()
                .ref('vehicles/' + data.data.id)
                .set(data.data)
                .then(() => {
                  delete bookingData.transportData.data.bookingDate;
                  bookingData.bookingDate = date;

                  database()
                    .ref('bookings/')
                    .push(bookingData)
                    .then(() => {
                      Alert.alert(
                        'Booking Successfull',
                        'Your Vehicle has been successfully Booked',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('firstScreen'),
                          },
                        ],
                      );
                    });
                })
                .catch(() => {
                  console.log('data not found');
                });
            } else {
              Alert.alert(
                'Already Booked',
                'Vehicle is already booked on this date',
                [
                  {
                    text: 'cancel',
                    onPress: () => console.log('cancel bUtton Pressed'),
                  },
                ],
              );
            }
          });
      }
    }
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Image
        source={bike}
        style={{
          width: '100%',
          height: 250,
          backgroundColor: 'rgba(100,100,100,0.5)',
        }}
      />

      <View style={{position: 'absolute', top: 10, width: '100%', left: 10}}>
        <Header light navigation={navigation} back />
      </View>
      <View style={{position: 'absolute', top: 10, width: '100%'}}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            fontWeight: '700',
            color: 'purple',
            marginLeft: 15,
          }}>
          Reach your destination?
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '900',
            color: 'purple',
            marginLeft: 15,
          }}>
          Book Ride Now
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'purple',
            width: '50%',
            marginLeft: 15,
          }}>
          Because we think of your comfort
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'purple',
            width: '100%',
            marginTop: 90,
            textAlign: 'center',
          }}>
          Provide You Safe & Sound Journey
        </Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(100,100,0,0.4)',
        }}>
        <Text
          style={{
            fontSize: 24,
            color: 'purple',
            textAlign: 'center',
            fontWeight: '800',
            marginTop: 10,
          }}>
          Booked Vehicle Detail
        </Text>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <TextInput
            value={'Vehicle Type: ' + data.data.VehicleType}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
            }}
          />

          <TextInput
            value={'Vehicle Name: ' + data.data.vehicleName}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'Time Duration: ' + data.data.TimeDuration + ' Minutes'}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'Start Destination: ' + data.data.StartDestination}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'End Destination: ' + data.data.endDestination}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'No Of Seats: ' + data.data.noOfSeats + ' Seat'}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'Booking Date: ' + date}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
          <TextInput
            value={'Pickup Time: ' + time}
            editable={false}
            style={{
              color: 'green',
              backgroundColor: 'white',
              width: '80%',
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
            }}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 24,
              color: 'purple',
              textAlign: 'center',
              fontWeight: '800',
              marginTop: 10,
            }}>
            Fill Personal Details{' '}
          </Text>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <TextInput
              onChangeText={e => setBookingData({...bookingData, fullName: e})}
              placeholder="Full Name"
              placeholderTextColor="green"
              style={{
                color: 'green',
                backgroundColor: 'white',
                width: '80%',
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                fontWeight: '700',
              }}
            />
            <TextInput
              onChangeText={e => setBookingData({...bookingData, email: e})}
              textContentType="emailAddress"
              placeholder="Email"
              placeholderTextColor="green"
              style={{
                color: 'green',
                backgroundColor: 'white',
                width: '80%',
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                fontWeight: '700',
                marginTop: 10,
              }}
            />
            <TextInput
              onChangeText={e =>
                setBookingData({...bookingData, mobileNumber: e})
              }
              keyboardType="numeric"
              placeholder="Mobile Number"
              placeholderTextColor="green"
              style={{
                color: 'green',
                backgroundColor: 'white',
                width: '80%',
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                fontWeight: '700',
                marginTop: 10,
              }}
            />
            <TextInput
              onChangeText={e => setBookingData({...bookingData, address: e})}
              placeholder="Address"
              placeholderTextColor="green"
              style={{
                color: 'green',
                backgroundColor: 'white',
                width: '80%',
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                fontWeight: '700',
                marginTop: 10,
              }}
            />
            <TouchableOpacity
              onPress={bookVehicle}
              style={{
                backgroundColor: 'white',
                width: '90%',
                marginTop: 20,
                padding: 15,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'green',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SelectedBooking;
