import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import { LocationModalOne, LocationModalMultiple } from './locationModal';
import { GettingStartedContext } from '../App'

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { PinchGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/pinchGesture';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const pin = [
	{
		channelName: 'Law Library',
		activeUsers: 40,
		key: 1
	},
	{
		channelName: 'Main Library',
		activeUsers: 10,
		key: 2
	},
	{
		channelName: 'Some Library',
		activeUsers: 90,
		key: 3
	},
]

function MapDisplay({ navigation }) {

	const [longitude, setLongitude] = useState(0)
	const [latitude, setLatitude] = useState(0)
	const [modalDisplay, setModalDisplay] = useState(false);
    const [multipleModalDisplay, setMultipleModalDisplay] = useState(false);

	const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay } = useContext(GettingStartedContext);

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}
	useEffect(() => {
		GetmyLocation();
	}, [])
    //console.log(modalDisplay)
	return (
		<View style={styles.fullScreen}>
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
				<Marker coordinate={{ latitude: latitude, longitude: longitude }}
					onPress={() => { 
                        if (pin.length > 1) {                           
                            setMultipleModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);
                        } else {
                            setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);
                        }
                        // setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);
                        }} />
			</MapView>


			<LocationModalOne modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay} />
            
            <LocationModalMultiple multipleModalDisplay={multipleModalDisplay} setMultipleModalDisplay={setMultipleModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay}/>
			
            {messageDisplay ?
				<View style={styles.messageIconContainer}>
					<TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Dms')}>
						<IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(31)} />
					</TouchableOpacity>
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


		</View>
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