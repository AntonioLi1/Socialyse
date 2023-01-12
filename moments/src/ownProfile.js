import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView, ImageBackground, Image  } from 'react-native';
import styles from './styles';
import DPModal from './DPModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { LoggedInContext } from '../App'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


function OwnProfile ({navigation}) {

	const [DPModalDisplay, setDPModalDisplay] = useState(false);
	const { editProfileModal, setEditProfileModal, testing, setTesting, user, dpURL } = useContext(LoggedInContext);
	const [userDetails, setUserDetails] = useState('')
	const [FBImageURL, setFBImageURL] = useState(null)
	const [friendCount, setFriendCount] = useState()
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')

	useEffect(() => {
		const subscriber = firestore()
		.collection('Friends')
		.doc(user.uid)
		.onSnapshot(docSnapshot => {
			let FriendCount = docSnapshot.data().FriendCount;
			setFriendCount(FriendCount)
		})

		return () => subscriber()
	},[])

	useEffect(() => {
		const subscriber = firestore()
		.collection('Users')
		.doc(user.uid)
		.onSnapshot(docSnapshot => {
			let dataName = docSnapshot.data().Name;
			setName(dataName)
		})

		return () => subscriber()
	},[])

	useEffect(() => {
		const subscriber = firestore()
		.collection('Users')
		.doc(user.uid)
		.onSnapshot(docSnapshot => {
			let dataUsername = docSnapshot.data().Username;
			setUsername(dataUsername)
		})

		return () => subscriber()
	},[])

	return (
	<SafeAreaView style={styles.profileScreen}>
		<View style={styles.profilePageDPContainer}>
			<ImageBackground  source={{uri: dpURL}} style={styles.profilePageDP}>
				<Pressable style={styles.profilePicEdit} onPress={() => {setEditProfileModal(true)}}>
					<FIcon name="edit" size={scale(32)} color='white'/>
				</Pressable>
			</ImageBackground>   
		</View>
			
		
		<View style={styles.profilePageUsernameNameSettingsContainer}>
			<View style={styles.usernameAndNameContainer}>
				<Text style={styles.profilePageName}>
					{/* {userDetails.Name} */}
					{name}
					
				</Text>
				<Text style={styles.profilePageUsername}>
					{/* {userDetails.Username} */}
					{username}
				</Text>
			</View>
			<Pressable onPress={() => {navigation.navigate('Settings')}}>
				<IIcon style={styles.settingsIcon} name='ios-settings-outline' color='white' size={scale(32)}/>
			</Pressable>
			
				
		</View>

		<View style={styles.profilePageFooter}>
			<View style={{flexDirection: 'row', marginTop: '10%', justifyContent: 'center'}}>
				<Text style={styles.socialyseCounter}>
					SOCIALYSED: {friendCount}
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

