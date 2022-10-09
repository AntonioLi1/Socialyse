import React, { useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function LocationModal({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true)
	const navigation = useNavigation();
	
	return (
		<Modal visible={modalDisplay} transparent={true}>
			<View style={styles.locationModal}>
			
				<View style={styles.locationImagePlaceholder}/>
				
				<View style={styles.locationNameActiveAndJoinButtonContainer}>
					<Text style={styles.locationNameModal}>
						UNSW Roundhouse
					</Text> 
					<Text style={{color: 'white', marginBottom: '3%'}}>
						60 people active
					</Text>

					<Pressable style={[{ backgroundColor: isPressed ? '#3765BD' : '#4681F4' }, styles.checkInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MB'); setModalDisplay(false)}}>
						{channelStatus ? 
						<Text style={styles.checkInText}>Join</Text> 
						: <Text style={styles.checkInText}>Leave</Text>}					
					</Pressable>
				</View>
				
				<IIcon style={styles.locationModalClose} name='close-outline' size={30}
				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/>
			</View>
		</Modal>
	);
}

export default LocationModal;
