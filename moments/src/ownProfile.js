import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable,  } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const GradientText = (props) => {
	return (
	  <MaskedView maskElement={<Text {...props} />}>
		<LinearGradient
		  colors={["#AD00FF", "#00FFA3"]}
		  start={{ x: 0, y: 0.35 }}
		  end={{ x: 0, y: 0.7 }}
		>
		  <Text {...props} style={[props.style, { opacity: 0.3 }]} />
		</LinearGradient>
	  </MaskedView>
	);
  };

function OwnProfile ({navigation}) {

	return (
	<View style={styles.profileScreen}>
		<View style={styles.profilePageProfile}>
			<Pressable onPress={() => {navigation.navigate('SignUp')}}>
				<Text>
					go to signup
				</Text>
			</Pressable>
			<Pressable style={styles.profilePicEdit}>
				<FIcon name="edit" size={32} color='white'/>
			</Pressable>
		</View>   
		
		<View style={styles.profilePageUsernameAndSettingsContainer}>
			<Text style={styles.profilePageUsername}>
				dababy_leshgo
			</Text>

			<Pressable style={styles.profilePageSettings} onPress={() => {navigation.navigate('Settings')}}>
				<IIcon name="ios-settings-outline" size={35} color="white"/>
			</Pressable>
		</View>

		<View style={styles.profilePageHeader}>
			<Text style={{color: 'white', flexDirection: 'row', fontSize: 20, }}>
				You've {'\u00A0'}							
				<View style={{alignItems: 'center'}}>
					<Text style={styles.socialTextYellow}>
						SOCIALYSED
					</Text>
					<GradientText style={styles.socialTextGradient}>
						SOCIALYSED
					</GradientText>
				</View>				
				{'\u00A0'} with {'\n'}
			</Text>
				
			
		</View>
		
		<Pressable style={styles.profileBackButton} onPress={() => navigation.navigate('Dms')}>
					<MIIcon name='arrow-forward-ios' size={32} color='white'/>
		</Pressable>
		
	</View>

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