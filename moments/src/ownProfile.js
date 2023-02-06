import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView, ImageBackground  } from 'react-native';
import styles from './styles';
import DPModal from './DPModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import { LoggedInContext } from '../App'
import { scale  } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';

function OwnProfile ({navigation}) {

	const { setEditProfileModal, user, dpURL } = useContext(LoggedInContext);
	const [friendCount, setFriendCount] = useState()
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [buttonPressed, setButtonPressed] = useState(false)

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

	useEffect(() => {
		setTimeout(() => {
			setButtonPressed(false)
		}, 100)
	}, [buttonPressed])

	return (
	<SafeAreaView style={styles.profileScreen}>
		<View style={styles.profilePageDPContainer}>
			<ImageBackground  source={{uri: dpURL}} style={styles.profilePageDP}>
				<Pressable style={styles.profilePicEdit} onPress={() => {setEditProfileModal(true)}}>
					<FIcon name="edit" size={scale(32)} color={'white'}/>
				</Pressable>
			</ImageBackground>   
		</View>
			
		
		<View style={styles.profilePageUsernameNameSettingsContainer}>
			<View style={styles.usernameAndNameContainer}>
				<Text adjustsFontSizeToFit numberOfLines={1} style={styles.profilePageName}>
					{name}
					
				</Text>
				<Text style={styles.profilePageUsername}>
					{username}
				</Text>
			</View>
			<Pressable  onPress={() => { navigation.navigate('Settings');setButtonPressed(true)}}>
				<IIcon style={styles.settingsIcon} name='ios-settings-outline' color={buttonPressed ? 'grey' : 'white'} size={scale(32)}/>
			</Pressable>
		</View>

		<View style={styles.profilePageFooter}>
			<View style={{flexDirection: 'row', marginTop: '10%', justifyContent: 'center', alignItems: 'center', }}>
				<Text style={styles.socialyseCounter}>
					Socialysed: {friendCount}
				</Text>
				<IIcon style={{marginLeft: '1%', marginBottom: '1%'}} name="md-people" color='white' size={scale(25)}/>
			</View>
			<View style={{flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', width: '100%', marginBottom: '3%' }}>
				<Pressable style={styles.profileBackButton} onPress={() => {navigation.navigate('Dms'); setEditProfileModal(false); setButtonPressed(true)}}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color={buttonPressed ? 'grey' : 'white'}/>
				</Pressable>
				
			</View>
		</View>

		<DPModal/>
	</SafeAreaView>

	)	
}

export default OwnProfile;


