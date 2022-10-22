import React, { useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function LocationModal({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const [multipleChannels, setMultipleChannels] = useState(false);
	const navigation = useNavigation();
	
	
	return (
		<Modal visible={modalDisplay} transparent={true}>
			<View style={styles.locationModal}>
				<View style={styles.locationImagePlaceholder}/>
			
				<View style={styles.locationNameActiveAndJoinButtonContainer}>
					<Text style={styles.locationNameModal}>
						UNSW Roundhouse
					</Text> 
					<Text style={styles.locationModalActive}>
						60 people active
					</Text>

					<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MakeAPost'); setModalDisplay(false)}}>
						{channelStatus ? 
						<Text style={styles.checkInText}>Join</Text> 
						: <Text style={styles.checkedInText}>Leave</Text>}					
					</Pressable>
				</View>
				
				<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/> 
			</View>	
				
				
			
		</Modal>
	);
}

export default LocationModal;
/*
{
					multipleChannels ?  
					null
					: 
					<View style={styles.locationModal}>
						<View style={styles.locationImagePlaceholder}/>
					
						<View style={styles.locationNameActiveAndJoinButtonContainer}>
							<Text style={styles.locationNameModal}>
								UNSW Roundhouse
							</Text> 
							<Text style={{color: 'black', marginBottom: '3%', fontWeight: '600'}}>
								60 people active
							</Text>

							<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
							onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MakeAPost'); setModalDisplay(false)}}>
								{channelStatus ? 
								<Text style={styles.checkInText}>Join</Text> 
								: <Text style={styles.checkedInText}>Leave</Text>}					
							</Pressable>
						</View>
						
						<IIcon style={styles.locationModalClose} name='close-outline' size={30}
						onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/> 
					</View>
				}
*/
