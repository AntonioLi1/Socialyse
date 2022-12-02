import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView, SnapshotViewIOSComponent, SliderComponent  } from 'react-native';
import styles from './styles';
import DPModal from './DPModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { GettingStartedContext } from '../App'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import database from '@react-native-firebase/database';


async function GetUsername () {

	const p =  new Promise((resolve)=>{
        database().ref('/users/-NE0w02LZXrMYjEZ7TQG').on('value',snapshot=>{
			//console.log('data is:' + snapshot.val())
            resolve(snapshot.val())
        })
    });
	const data = await p.then();
	
	console.log('data****',data);
	
	return data;

	
	// let data = new Promise((resolve)=>{
    //     database().ref('/users/prathik1').on('value',snapshot=>{
	// 		//console.log('data is:' + snapshot.val())
    //         resolve(snapshot.val())
    //     })
    // })
	// console.log(data)

	// return data 


}

function OwnProfile ({navigation}) {

	const [DPModalDisplay, setDPModalDisplay] = useState(false);
	const { editProfileModal, setEditProfileModal, testing, setTesting } = useContext(GettingStartedContext);
	const [userDetails, setUserDetails] = useState('')

	const getData = async () => {
		const data = await GetUsername()
		// console.log('data',data)
		setUserDetails(data)
	} 
	useEffect(() => {
		getData()
	}, [])

	console.log(userDetails)

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
					{userDetails.name}
					
				</Text>
				<Text style={styles.profilePageUsername}>
					{userDetails.username}
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
	// useEffect(() => {
	// 	database()
	// 	.ref('/channels/test3')
	// 	.once('value')
	// 	.then(snapshot => {
	// 		console.log('User data: ', snapshot.val());
	// 	});
	// 	}, [])



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

	function GetUsername(){
	return new Promise((resolve)=>{
		database().ref('/users/prathikl').on('value',snapshot=>{
		resolve(snapshot.val())
		})
	})
}
*/

/*
function GetUsername () {
	// reading data from firebase
	
	database()
	.ref('/users/prathik1')
	.on('value', snapshot => {
		// return retrieved data
		return snapshot.val()
	});
}

return new Promise((resolve)=>{
        database().ref('/users/prathik1').on('value',snapshot=>{
			console.log('data is:' + snapshot.val())
            resolve(snapshot.val())
        })
    })	  



*/

// function GetUsername2 () {
	
// 	database()
// 	.ref('/users/prathik1')
// 	.once('value', snapshot => {
// 		//console.log(snapshot)
// 		if (snapshot.exists()) {
// 			//console.log('here')
// 			//console.log(snapshot.val())
// 			return snapshot.val()
// 		}
// 	})


// }


