import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Pressable, Text, SafeAreaView, Dimensions, PermissionsAndroid, Alert, Platform, Modal, ActivityIndicator } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles'
import { LocationModalMultiple } from './locationModal';
import CreatePinModal from './createPinModal';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import IIcon from 'react-native-vector-icons/Ionicons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'
import { scale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import { PERMISSIONS, checkMultiple, openSettings, requestMultiple } from 'react-native-permissions';
import { useAppState } from '@react-native-community/hooks'
import LocationPermissionModal from './locationPermissionModal';
import useGeolocation from './useGeolocation';

function MapDisplay({ navigation }) {
  const currentAppState = useAppState()
  const { position, error, startWatching, stopWatching } = useGeolocation();

  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [multipleModalDisplay, setMultipleModalDisplay] = useState(false);
  const [createPinModalDisplay, setCreatePinModalDisplay] = useState(false)
  const [pins, setPins] = useState()
  const [msgCount, setMsgCount] = useState(0)
  const [canCreatePin, setCanCreatePin] = useState(true)
  const [buttonPressed, setButtonPressed] = useState(false)
  const { messageDisplay, setMessageDisplay, setSelectedPinId, user } = useContext(LoggedInContext);
  const [havePermissions, setHavePermission] = useState(false)
  const [showPermissionModal, setShowPermissionModal] = useState()
  const [watchId, setWatchId] = useState(null)


  useEffect(()=>{
    if(position){
      //console.log('position updated', position);
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    }
  },[position])

  async function requestLocationPermission() {
    //console.log('requestLocationPermission')
    try {
      if (Platform.OS === 'android') {

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Socialyse would like access to your location x',
            buttonPositive: 'Yep sounds good',
            buttonNegative: 'No thanks'
          });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          Alert.alert(
            'Location Denied',
            "Without location permissions, you're unable to access/create an channels and pins :(",
            [
              { text: 'Got it' }
            ]
          )
          setCanCreatePin(false)

        }

      } else if (Platform.OS === 'ios') {
        checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS])
          .then(async (result) => {
            //console.log('checking location permissions', result)
            if (result[PERMISSIONS.IOS.LOCATION_ALWAYS] !== 'granted' && result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== 'granted') {
              requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS]).then(res => {
                if (res[PERMISSIONS.IOS.LOCATION_ALWAYS] !== 'granted' && res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== 'granted') {
                  setHavePermission(false);
                  setCanCreatePin(false)
                  setShowPermissionModal(true)
                } else {
                  // we have permission
				          // startWatching()
                
                  setCanCreatePin(true)
                  setHavePermission(true)
                  setShowPermissionModal(false)
                }
              })

            } else {
				// startWatching()
              setCanCreatePin(true)
              setHavePermission(true)
              setShowPermissionModal(false)
            }
          })
        await Geolocation.requestAuthorization("whenInUse");
      }

    } catch (err) {
      //console.warn(err)
    }
  }

  useEffect(() => {
    
    (async ()=>{
      //console.log('currentAppState',currentAppState)
      if (currentAppState === 'active') {
        await getPermissionAndLocation();
		    // await GetmyLocation()
        if(havePermissions){
          startWatching();
        }
        // const id = subWatchPosition();
        // setWatchId(id);
      } else {
         if(havePermissions){
          stopWatching();
         }
      }
    })()
    
  }, [currentAppState])

  useEffect(()=>{
    if(havePermissions){
      GetmyLocation();
    }
  },[havePermissions])

  const GetmyLocation = async () => {
    //console.log('GetmyLocation')
    try {
      if (havePermissions) {
        Geolocation.getCurrentPosition(info => {
          setLatitude(info.coords.latitude)
          setLongitude(info.coords.longitude)
        })
      }

    } catch (err) {
      //console.log('GetmyLocation', err)
    }

  }

  // const ClearLocationFocus = (id) => {
  //   console.log('id', id)
  //   try {
  //     if (id) {
  //       Geolocation.clearWatch(id);
  //     }
  //   } catch (err) {
  //     //console.log('ClearLocation', err)
  //   }
  // }

  // const ClearLocation = () => {
  //   try {
  //     console.log('ClearLocation', watchId)
  //     // Geolocation.stopObserving();
  //     if (watchId != null) {
  //       Geolocation.clearWatch(watchId);
  //       console.log('Watch position cleared')
  //     }
  //   } catch (err) {
  //     //console.log('ClearLocation', err)
  //   }

  // }

  async function getPermissionAndLocation() {
    try {
      await requestLocationPermission()
      // await GetmyLocation()
    } catch (err) {
      //console.log('getPermissionAndLocation',err)
    }

  }

  useFocusEffect(
    React.useCallback(() => {
      // console.log('focuseffct', havePermissions)
     
      if (havePermissions === true) {
        // id = subWatchPosition();
        // console.log('watchId', id)
        // setWatchId(id);
        startWatching();
      }
      return () => {
        stopWatching();
      }
    }, [multipleModalDisplay, havePermissions])
  );

  useEffect(() => {
    getPermissionAndLocation()
  }, [])

  useEffect(() => {
    let start = new Date();

    function subtractHours(numOfHours, date = new Date()) {
      date.setHours(date.getHours() - numOfHours);
      return date;
    }

    let test = subtractHours(24, start)

    const subscriber = firestore()
      .collection('Pins')
      .where('LastActive', '>', test)
      .onSnapshot((querySnapshot) => {
        let pinsArray = []
        querySnapshot.forEach(snapshot => {
          let data = {
            Location: {},
            PinID: '',
            Verified: null
          };

          data.Location = snapshot.data().Location,
            data.PinID = snapshot.data().PinID,
            data.Verified = snapshot.data().Verified
          pinsArray.push(data)
        })
        setPins(pinsArray)
      })

    return () => subscriber()
  })

  // const subWatchPosition = ()=>{
  //   console.log('watching postion')
  //   let id = null
  //   if(havePermissions){
  //     id =Geolocation.watchPosition(
  //       info => {
  //         setLatitude(info.coords.latitude)
  //         setLongitude(info.coords.longitude)
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         distanceFilter: 0,
  //         interval: 5000,
  //         fastestInterval: 2000,
  //       }
  //     )
  //   }
  //   return id;
  // }

  // get messages count
  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .doc(user.uid)
      .onSnapshot(docSnapshot => {
        let messageCount = docSnapshot.data().UnopenedMessages;
        setMsgCount(messageCount)
      })

    return () => subscriber()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setButtonPressed(false)
    }, 100)
  }, [buttonPressed])

  if (!pins)
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <Text style={styles.loadingSocialyseText}>
          SOCIALYSE
        </Text>
      </SafeAreaView>
    );

    if(latitude == 0 && longitude == 0) {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    }

  return (
    <View style={styles.fullScreen}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}    
        
        showsUserLocation={true}>
        {
          pins.map((pin) => {
			//console.log(pin)
            return (
              <Marker coordinate={{ latitude: pin.Location.latitude, longitude: pin.Location.longitude }}

                onPress={() => {
                  setSelectedPinId(pin.PinID);
                  setTimeout(() => {
                    setMultipleModalDisplay(true); setMessageDisplay(false);;
                  }, 250)

                }}>
                <IIcon name='ios-location-sharp' size={scale(30)} color={pin.Verified ? 'black' : '#96B9FE'} />

              </Marker>
            )
          })
        }
      </MapView>

      <LocationPermissionModal havePermissions={havePermissions} showPermissionModal={showPermissionModal} setShowPermissionModal={setShowPermissionModal} />

      <LocationModalMultiple multipleModalDisplay={multipleModalDisplay} setMultipleModalDisplay={setMultipleModalDisplay} setMessageDisplay={setMessageDisplay} />

      {messageDisplay ?
        <View style={styles.messageCreatePinButtonContainer}>
          <View style={styles.messageIconContainer}>
            <Pressable style={styles.messageButton} onPress={() => { navigation.navigate('Dms'); setButtonPressed(true) }}>
              <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(28)} color={buttonPressed ? 'grey' : 'white'} />
            </Pressable>
            <View style={styles.messageCountContainerMap}>
              <Text style={styles.notifCountText}>
                {msgCount}
              </Text>
            </View>
          </View>

          <View style={styles.createPinButton}>
            <Pressable disabled={!canCreatePin} style={styles.messageButton} onPress={() => { setCreatePinModalDisplay(true); setButtonPressed(true) }}>
              <SLIcon style={[styles.createPinIcon, { color: canCreatePin ? buttonPressed ? 'grey' : 'white' : '#727272' }]} name='location-pin' size={scale(28)} />
            </Pressable>
          </View>

        </View>

        : null}

      <CreatePinModal createPinModalDisplay={createPinModalDisplay} setCreatePinModalDisplay={setCreatePinModalDisplay}
        setMultipleModalDisplay={setMultipleModalDisplay}
      />
    </View>
  );
};

const mapStyle =
  [
    {
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "color": "#aac4e6"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#aac4e6"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#aac4e6"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]

export default MapDisplay;