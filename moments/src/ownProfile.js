import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView  } from 'react-native';
import styles from './styles';
import DPModal from './DPModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { GettingStartedContext } from '../App'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function OwnProfile ({navigation}) {

	const [DPModalDisplay, setDPModalDisplay] = useState(false);
	const { editProfileModal, setEditProfileModal } = useContext(GettingStartedContext);

	return (
	<SafeAreaView style={styles.profileScreen}>
		<View style={styles.profilePageProfile}>
			<Pressable onPress={() => {navigation.navigate('SignUp')}}>
				<Text>
					go to signup
				</Text>
			</Pressable>
			<Pressable style={styles.profilePicEdit} onPress={() => {setEditProfileModal(true)}}>
				<FIcon name="edit" size={scale(32)} color='white'/>
			</Pressable>
		</View>   
		
		<View style={styles.profilePageUsernameNameSettingsContainer}>
			<View style={styles.usernameAndNameContainer}>
				<Text style={styles.profilePageName}>
					Dababy
				</Text>
				<Text style={styles.profilePageUsername}>
					dababy_leshgo
				</Text>
			</View>
			<Pressable onPress={() => {navigation.navigate('Settings')}}>
				<IIcon style={styles.settingsIcon} name='ios-settings-outline' color='white' size={scale(32)}/>
			</Pressable>
			
				
		</View>

		<View style={styles.profilePageFooter}>
			<View style={{flexDirection: 'row', marginTop: '10%', justifyContent: 'center'}}>
				<Text style={styles.socialyseCounter}>
					SOCIALYSED: 10 
				</Text>
				<IIcon style={{marginLeft: '1%'}} name="md-people" color='white' size={25}/>
			</View>
			<View style={{flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', width: '100%', marginBottom: '3%' }}>
				<Pressable style={styles.profileBackButton} onPress={() => {navigation.navigate('Dms'); setEditProfileModal(false)}}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
				
			</View>
		</View>

		<DPModal/>
	</SafeAreaView>

	)	
}

export default OwnProfile;

/* 




		<View style={styles.profilePageHeader}>
				<Text style={styles.socialTextYellow}>
					SOCIALYSE
				</Text>
				<GradientText style={styles.socialTextGradient}>
					SOCIALYSE
				</GradientText>
		</View>

const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80
	};

	return (
	<GestureRecognizer
	onSwipeLeft={() => navigation.navigate('Dms')}
	config={config}>
		<View style={styles.profileScreen}>
			<View style={styles.profilePageProfile}>
				<View style={styles.profilePageNameAndBioContainer}>
					<Text style={styles.profilePageName}>
							kazi
					</Text>
					<Text style={styles.profilePageBio}>
						disd is my bio
					</Text>
				</View>
					
			</View>   

			<View style={styles.settingEditProfileContainer}>
				<View style={styles.editProfileButton}>
					<Text>
						edit profile
					</Text>
				</View>
				<View style={styles.settingsButton}>
					<Text>
						settings
					</Text>
				</View>
			</View>
		</View>
	</GestureRecognizer>
	)	
*/