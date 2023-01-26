import { Text, View, SafeAreaView, Pressable, ScrollView, Image } from 'react-native'
import React, {useContext, useState, useEffect}from 'react';
import {LoggedInContext} from '../App'
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
// STYLES
import styles from './styles';

// ICONS
import MIIcon from 'react-native-vector-icons/MaterialIcons';


async function ReduceNotifCount(UserID) {
	await firestore()
	.collection('Notifications')
	.doc(UserID)
	.update({
		NotificationCount: 0
	})
}

const NotificationDisplay = ({navigation}) => {
	const {setMessageDisplay, setNotifDisplay, user} = useContext(LoggedInContext);

	const [notifData, setnotifData] = useState(null)
	const [dataLoaded, setDataLoaded] = useState(false)
	const [backButtonPressed, setBackButtonPressed] = useState(false)

	useEffect(() => {
		console.log('uid', user.uid)
		const subscriber = firestore()
		.collection('Notifications')
		.doc(user.uid) 
		.collection('Notifs')
		.orderBy('TimeNotified', 'desc')
		.where('TimeNotified', '!=', 0)
		.onSnapshot(async (querySnapshot) => {
			let returnArray = [];
			for (let i = 0; i < querySnapshot.size; i++) {
				let snapshot = querySnapshot.docs[i]
				let data = snapshot.data()
				console.log('data', data)
				let matchObj = {
					username: '',
					timeNotif: '',
					profilePic: ''
				}
				let timeDiff = ((Math.round(Date.now() / 1000)) - Math.round((data.TimeNotified.nanoseconds / 1000000000) + data.TimeNotified.seconds))
				if (timeDiff < 3600) {
					let minutes = Math.ceil(timeDiff / 60)
					matchObj.timeNotif = `${minutes}m`
				}
				// under a day
				else if (timeDiff < 86400) {
					let hours = Math.ceil(timeDiff / 3600)
					matchObj.timeNotif = `${hours}h`
				} 
				// under a week
				else if (timeDiff >= 86400 && timeDiff < 604800) {
					// how many days
					let days = Math.ceil(timeDiff / 86400)
					matchObj.timeNotif = `${days}d`
				} 
				// more than a week
				else {
					let weeks = Math.ceil(timeDiff / 604800)
					matchObj.timeNotif = `${weeks}w`
				}
				//matchObj.profilePic = data.ProfilePic
				const docSnapshot = await firestore()
				.collection("UsernameAndDP")
				.doc(data.OtherUid)
				.get()
				//console.log(docSnapshot)
				matchObj.profilePic = docSnapshot.data().ProfilePic
				matchObj.username = docSnapshot.data().Username
				returnArray.push(matchObj)
			}
			setnotifData(returnArray)
			setDataLoaded(true)
		})
		return () => subscriber()
	}, [])

	useEffect(() => {
		ReduceNotifCount(user.uid)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setBackButtonPressed(false)
		}, 100)
	}, [backButtonPressed])

	if (dataLoaded === false) {
		return (
			<SafeAreaView style={styles.loadingScreen}>
				<Text style={styles.loadingSocialyseText}>
				SOCIALYSE
				</Text>
			</SafeAreaView>
		)
	};

	return (
		<SafeAreaView style={styles.notifFullScreen}>   
			<View style={styles.notifHeader}>
				<View style={styles.notifInnerHeaderContainer}>
					<Pressable style={styles.notifBackButton} 
					onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true); setBackButtonPressed(true)}}>
						<MIIcon name='arrow-forward-ios' size={26} color={backButtonPressed ? 'grey' : 'black'}/>
					</Pressable>
					<Text style={styles.notificationText}>
						Notifications
					</Text>
				</View>
				
			</View>

			<View style={styles.notificationsList}>
				<ScrollView>
					{notifData.map((notif) =>
						{
						return (
							<View style={styles.notif1}>
								<Text style={styles.notifMessage}> 
									You and 
									<Text style={{fontWeight: 'bold'}}> {notif.username} </Text>
									can now socialyse
								</Text>

								<Image source={{uri: notif.profilePic}} style={styles.notifProfile}/>
								
								<Text style={styles.notifTime}>
								{notif.timeNotif}
								</Text> 
							</View>
						)					
					})}
				</ScrollView>	
			</View>	
		</SafeAreaView>
	)
}

export default NotificationDisplay
