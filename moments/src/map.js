import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, SafeAreaView, TurboModuleRegistry } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles'
import { LocationModalOne, LocationModalMultiple } from './locationModal';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { PinchGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/pinchGesture';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


// const pin = [
// 	{
// 		channelName: 'Law Library',
// 		activeUsers: 40,
// 		key: 1
// 	},
// 	{
// 		channelName: 'Main Library',
// 		activeUsers: 10,
// 		key: 2
// 	},
// 	{
// 		channelName: 'Some Library',
// 		activeUsers: 90,
// 		key: 3
// 	},
// ]

async function ViewPins() {
    let Pins = [];
    await firestore()
    .collection('Pins')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
  
            let data = {
              Location: {},
              PinID: ''
            };
  
            data.Location = snapshot.data().Location,
            data.PinID = snapshot.data().PinID
            Pins.push(data)
        })
    })
    //console.log('Pins',Pins)
    //console.log(Pins[0].Location.latitude)
    return Pins;
  }

function MapDisplay({ navigation }) {

	const [longitude, setLongitude] = useState(0)
	const [latitude, setLatitude] = useState(0)
	const [modalDisplay, setModalDisplay] = useState(false);
    const [multipleModalDisplay, setMultipleModalDisplay] = useState(false);
    const [pins, setPins] = useState()
    const [pinsLoaded, setPinsLoaded] = useState(false)
	const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, selectedPinId, setSelectedPinId } = useContext(LoggedInContext);

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

    async function getPins() {
        const data  = await ViewPins()
        setPins(data)
        setPinsLoaded(true)
    }
	useEffect(() => {
		GetmyLocation();
        getPins();
	}, [])

    //console.log('map pinId',selectedPinId)

    if (pinsLoaded == false) return null;
    //console.log(modalDisplay)
	return (
		<SafeAreaView style={styles.fullScreen}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				customMapStyle={mapStyle}
				region={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.007,
					longitudeDelta: 0.007,
				}}
				showsUserLocation={true}>
                {
                    pins.map((pin) => {
                        return (
                            <Marker coordinate={{ latitude: pin.Location.latitude, longitude: pin.Location.longitude }}
					        onPress={() => { 
                                console.log("pinId",pin.PinID)
                                setSelectedPinId(pin.PinID);
                            if (pin.length > 1) {                           
                                setMultipleModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false); 
                            } else {
                                setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false); 
                            }
                        // setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);
                        }} />
                        )
                    })
                }
				{/* <Marker coordinate={{ latitude: latitude, longitude: longitude }}
					onPress={() => { 
                        if (pin.length > 1) {                           
                            setMultipleModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false); 
                        } else {
                            setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false); 
                        }
                        // setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);
                }} /> */}
			</MapView>


			<LocationModalOne modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay} />
            
            <LocationModalMultiple multipleModalDisplay={multipleModalDisplay} setMultipleModalDisplay={setMultipleModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay} />
			
            {messageDisplay ?
				<View style={styles.messageIconContainer}>
					<Pressable style={styles.messageButton} onPress={() => navigation.navigate('Dms')}>
						<IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(31)} />
					</Pressable>
                    <View style={styles.messageCountContainerMap}>
						<Text style={styles.notifCountText}>
							5
						</Text>
					</View>
				</View> : null}

			{notifDisplay ?
				<View style={styles.notificationContainerMap}>
					<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
						<IIcon name='notifications-outline' size={scale(30)} color='white' />
					</Pressable>
					<View style={styles.notificationCountContainerMap}>
						<Text style={styles.notifCountText}>
							5
						</Text>
					</View>
				</View>
				: null}
			


		</SafeAreaView>
	);
};

const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#96b9fe"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text",
        "stylers": [
            {
                "saturation": "58"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": "-100"
            },
            {
                "gamma": "0.00"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#96b9fe"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#b0d7e6"
            },
            {
                "visibility": "on"
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
    }
]

export default MapDisplay;