import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import LocationModal from './locationModal';
import {GettingStartedContext} from '../App'
//import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons'
//import AIcon from 'react-native-vector-icons/AntDesign'

/*import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';*/

function MapDisplay({ navigation }) {

	const [longitude, setLongitude] = useState(0)
  	const [latitude, setLatitude] = useState(0)
	const [modalDisplay, setModalDisplay] = useState(false);

    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
  /*useEffect(() => {
		GetmyLocation();
  }, []);*/

	const GetmyLocation = async () => {
		Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

	GetmyLocation();
	return (
		<View style={styles.fullScreen}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.007,
					longitudeDelta: 0.007,
				}}
				showsUserLocation={true}>
					<Marker coordinate={{latitude: 37.4221, longitude: -122.0841}} 
					onPress={() => {setModalDisplay(true); setMessageDisplay(false); setNotifDisplay(false);}}/>
			</MapView>
			
			
			<LocationModal modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} setMessageDisplay={setMessageDisplay} setNotifDisplay={setNotifDisplay} />

			{messageDisplay ? 
				<View style={styles.messageIconContainer}>
					<TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Dms')}>
						<MCIcon style={styles.messageIcon} name='message-text-outline' size={33}/>
					</TouchableOpacity>				
				</View> : null}

			{notifDisplay ? 
				<View style={styles.notificationContainerMap}>
					<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
						<IIcon name='notifications-outline' size={32} color='black'/>
					</Pressable>
					<View style={styles.notificationCountContainer}>
						<Text style={{fontSize:10, color: 'white'}}>
							5
						</Text>
					</View>
				</View>
				: null}
			

		</View>
	);
};

export default MapDisplay;