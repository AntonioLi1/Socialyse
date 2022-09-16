import React, { useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function LocationModal({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

	const [isPressed, setIsPressed] = useState(false);
	const navigation = useNavigation();
	return (
		<Modal visible={modalDisplay} transparent={true}>
			<View style={styles.locationModal}>
				<IIcon style={styles.locationModalClose} name='close-outline' size={30} 
				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/>

				<Pressable style={[{ backgroundColor: isPressed ? '#3765BD' : '#4681F4' }, styles.checkInButton ]} 
				onPress={() => {setIsPressed(!isPressed); navigation.navigate('MB'); setModalDisplay(false)}}>
					<Text style={styles.checkInText}>Join Channel</Text>
				</Pressable>

				<Text style={styles.locationNameModal}>
					Location Name
				</Text> 
			</View>
		</Modal>
	);
}

export default LocationModal;
