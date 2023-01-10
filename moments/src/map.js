import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, SafeAreaView, TurboModuleRegistry, Image, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles'
import { LocationModalMultiple } from './locationModal';
import CreatePinModal from './createPinModal';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import ADIcon from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { sub } from 'react-native-reanimated';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

async function ViewPins() {
    let Pins = [];
    await firestore()
    .collection('Pins')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
  
            let data = {
              Location: {},
              PinID: '',
              ChannelCount: 0
            };
  
            data.Location = snapshot.data().Location,
            data.PinID = snapshot.data().PinID
            data.ChannelCount = snapshot.data().ChannelCount
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
    const [multipleModalDisplay, setMultipleModalDisplay] = useState(false);
    const [createPinModalDisplay, setCreatePinModalDisplay] = useState(false)
    const [pins, setPins] = useState()
    const [notificationCount, setNotificationCount] = useState(0)
    const [msgCount, setMsgCount] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)
	const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, selectedPinId, setSelectedPinId, user } = useContext(LoggedInContext);

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

    // async function getData() {
    //     const pins = await ViewPins()
    //     setPins(pins)
    //     setDataLoaded(true)
    // }
	useEffect(() => {
		GetmyLocation();
        //getData();
	}, [])

    //console.log(zoom)

    useEffect(() => {
        const subscriber = firestore()
        .collection('Pins')
        .onSnapshot((querySnapshot) => {
            let pinsArray = []
            querySnapshot.forEach(snapshot => {
                let data = {
                Location: {},
                PinID: '',
                ChannelCount: 0
                };
    
                data.Location = snapshot.data().Location,
                data.PinID = snapshot.data().PinID
                data.ChannelCount = snapshot.data().ChannelCount
                pinsArray.push(data)
            })
            setPins(pinsArray)
        })

        return () => subscriber()
    })


    // get notifCount
    useEffect(() => {
		const subscriber = firestore()
		.collection('Notifications')
		.doc(user.uid)
		.onSnapshot(docSnapshot => {
			let notifCount = docSnapshot.data().NotificationCount;
			setNotificationCount(notifCount)
		})

		return () => subscriber()
	},[])

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
	},[])

    //console.log('map pinId',selectedPinId)

    if (!pins) return null;

    //console.log('createPinModalDisplay',createPinModalDisplay)
    //console.log(modalDisplay)

	return (
		<SafeAreaView style={styles.fullScreen}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				customMapStyle={mapStyle}
                // onRegionChangeComplete={event => {
                //     const zoomLevel = event.nativeEvent.zoomLevel
                //     setZoom(zoomLevel)
                // }}
                //proportional={true}
                
				region={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.004,
					longitudeDelta: 0.004,
				}}
				showsUserLocation={true}>
                {
                    pins.map((pin) => {
                        return (
                            <Marker coordinate={{ latitude: pin.Location.latitude, longitude: pin.Location.longitude }}
                            
					        onPress={() => { 
                                setSelectedPinId(pin.PinID);
                                setMultipleModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false); 
                            }}>
                                <IIcon name='ios-location-sharp' size={scale(30)} color='red'/>
                                
                            </Marker>
                        )
                    })
                }
			</MapView>

            <LocationModalMultiple multipleModalDisplay={multipleModalDisplay} setMultipleModalDisplay={setMultipleModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay} />
			
            {messageDisplay ?
				<View style={styles.messageIconContainer}>
					<Pressable style={styles.messageButton} onPress={() => navigation.navigate('Dms')}>
						<IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(25)} />
					</Pressable>
                    <View style={styles.messageCountContainerMap}>
						<Text style={styles.notifCountText}>
                            {msgCount}
						</Text>
					</View>
				</View> : null}

			{notifDisplay ?
				<View style={styles.notificationContainerMap}>
					<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
						<IIcon name='notifications-outline' size={scale(28)} color='white' />
					</Pressable>
					<View style={styles.notificationCountContainerMap}>
						<Text style={styles.notifCountText}>
                            {notificationCount}
						</Text>
					</View>
				</View>
				: null}
            
            {messageDisplay ?
				<View style={styles.createPinButton}>
					<Pressable style={styles.messageButton} onPress={() => setCreatePinModalDisplay(true)}>
						<ADIcon style={styles.messageIcon} name='plus' size={scale(25)} />
					</Pressable>
				</View> : null}
            <CreatePinModal createPinModalDisplay={createPinModalDisplay} setCreatePinModalDisplay={setCreatePinModalDisplay}
            multipleModalDisplay={multipleModalDisplay} setMultipleModalDisplay={setMultipleModalDisplay}
            />

            
			


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