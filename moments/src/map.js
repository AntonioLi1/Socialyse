import React, { useEffect, useState } from 'react';
import { View, Image, Button, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MTIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons'

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

  useEffect(() => {
		GetmyLocation();
  }, []);

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}
	return (
		<View>
			
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
			</MapView>

			<View style={styles.messageIconContainer}>
				<TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Dms')}>
					<MTIcon style={styles.messageIcon} name='message-text-outline' size={33}/>
				</TouchableOpacity>				
			</View>
			
			<View style={styles.profileIconContainer}>
				<TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</TouchableOpacity>	
			</View>

			<View style={styles.notificationContainer}>
				<TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
					<IIcon name='notifications-outline' size={32} color='black'/>
				</TouchableOpacity>
			</View>

			<View style={styles.mapPinContaner}>
				<TouchableOpacity style={styles.mapPinButton}>
					<MIIcon name='person-pin' size={32} color='black'/>
				</TouchableOpacity>

			</View>

		</View>
	);
};

export default MapDisplay;