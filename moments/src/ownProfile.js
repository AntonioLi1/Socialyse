import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function OwnProfile ({navigation}) {

	return (
	<View style={styles.profileScreen}>
		<View style={styles.profilePageHeader}>
			<Text style={{fontSize: 20, color: 'black',}}>
				Moments
			</Text>
			<Pressable style={styles.profileBackButton} onPress={() => navigation.navigate('Dms')}>
					<MIIcon name='arrow-forward-ios' size={32} color='black'/>
			</Pressable>
		</View>

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

	)	
}

export default OwnProfile;

/* 
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