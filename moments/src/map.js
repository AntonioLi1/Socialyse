import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
/*import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';*/

function MapDisplay() {

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
		<View style={styles.container}>
			<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					region={{
						latitude: latitude,
						longitude: longitude,
						latitudeDelta: 0.0421,
						longitudeDelta: 0.0421,
					}}
      		showsUserLocation={true}>
			</MapView>
			<View style={styles.messageIconContainer}>
				<Image style={styles.messageIcon} source={require('../Photos/Frame63.png')}/>
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
		position: 'absolute',
		bottom: '3%',
		left: '6%',
	},
	messageIcon: {
		width: 60,	
		height: 60,
	}

	
})

export default MapDisplay;