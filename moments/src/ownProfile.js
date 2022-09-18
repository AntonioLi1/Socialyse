import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function OwnProfile ({navigation}) {
	const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80
	};

	return (
	<GestureRecognizer
	onSwipeLeft={() => navigation.navigate('Map')}
	config={config}>
		<View>
			<View style={styles.profileTopContainer}>
				<View style={styles.profilePageProfile}/>

				<View style={styles.UNBEPContainer}>
					<Text style={{fontWeight: 'bold', color: 'black'}}>
						USERNAME
					</Text>
					<Text style={{marginTop: 10, color: 'black'}}>
						name
					</Text>
					<Text>
						bio
					</Text>
					<Pressable>
						<Text>
							edit profile
						</Text>
					</Pressable>
				</View>

				<View style={{marginTop: 10}}>
					<IIcon name='ios-settings-outline' size={30} color='black'/>
				</View>

			</View>

			<View style={{alignItems: 'center'}}>
				<Text>
					Thoughts          
				</Text>
			</View>

			<View style={styles.thoughtsContainer}>

			</View>
			
		</View>	
	</GestureRecognizer>
	)	
}

export default OwnProfile;