import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';



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
				<TouchableOpacity onPress={() => navigation.navigate('Dms')}>
					<Icon2 style={styles.messageIcon} name='forum' size={40}/>
				</TouchableOpacity>				
			</View>

			<View style={styles.profileIconContainer}>
				<Button title='profile'/>
			</View>

		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%'
	},
	container: {
		height: '100%',
		width: '100%',
	},
	messageIconContainer: {
		backgroundColor: '#C1C1C1',
		height: 70, 
		width: 70, 
		borderRadius: 35,
		justifyContent: 'center',
		position: 'absolute',
		bottom: '8%',
		left: '6%',
	},
	messageIcon: {
		color: 'black',
		width: 60,	
		height: 60,
	},
	profileIconContainer: {
		position: 'absolute',
		top: '8%',
		left: '6%'
	}
})

export default MapDisplay;