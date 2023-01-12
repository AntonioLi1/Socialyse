import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, TextInput, Image } from 'react-native'
import React, {useContext, useState, useEffect}from 'react';
import {LoggedInContext} from '../App'
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
// STYLES
import styles from './styles';

// ICONS
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { sub } from 'react-native-reanimated';

async function ReduceNotifCount(UserID) {
	await firestore()
	.collection('Notifications')
	.doc(UserID)
	.update({
		NotificationCount: 0
	})
}

const NotificationDisplay = ({navigation}) => {
	const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user, setUser} = useContext(LoggedInContext);

	const [notifData, setnotifData] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const subscriber = firestore()
		.collection('Notifications')
		.doc(user.uid) 
		.collection('Notifs')
		.orderBy('TimeNotified', 'desc')
		.onSnapshot((querySnapshot) => {
			let returnArray = [];
			querySnapshot.forEach(snapshot => {
				let data = snapshot.data()
				console.log(data)
				let matchObj = {
					username: '',
					timeNotif: '',
					profilePic: ''
				}
				let likeObj = {
					postURL: '',
					timeLiked: ''
				}
				// if current doc is a liked notif
				if (data.PostURL) {
					likeObj.postURL = data.PostURL
					let timeDiff = ((Math.round(Date.now() / 1000)) - Math.round((data.TimeNotified.nanoseconds / 1000000000) + data.TimeNotified.seconds))
					// under an hour
					if (timeDiff < 3600) {
						let minutes = Math.ceil(timeDiff / 60)
						likeObj.timeLiked = `${minutes}m`
					}
					// under a day
					else if (timeDiff < 86400 && timeDiff >= 3600) {
						let hours = Math.ceil(timeDiff / 3600)
						likeObj.timeLiked = `${hours}h`
					} 
					// under a week
					else if (timeDiff >= 86400 && timeDiff < 604800) {
						// how many days
						let days = Math.ceil(timeDiff / 86400)
						likeObj.timeLiked = `${days}d`
					} 
					// more than a week
					else {
						let weeks = Math.ceil(timeDiff / 604800)
						likeObj.timeLiked = `${weeks}w`
					}
					returnArray.push(likeObj)
				} 
				// if current doc is a match notif
				else {
					matchObj.username = data.MatchedWith
					let timeDiff = ((Math.round(Date.now() / 1000)) - Math.round((data.TimeNotified.nanoseconds / 1000000000) + data.TimeNotified.seconds))
					if (timeDiff < 3600) {
						let minutes = Math.ceil(timeDiff / 60)
						matchObj.timeLiked = `${minutes}m`
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
					matchObj.profilePic = data.ProfilePic
					returnArray.push(matchObj)
				}
			})
			setnotifData(returnArray)
		})
		return () => subscriber()
	}, [])

	useEffect(() => {
		ReduceNotifCount(user.uid)
	}, [])

	if (!notifData) return null;

	return (
		<SafeAreaView style={styles.notifFullScreen}>   
			<View style={styles.notifHeader}>
				<View style={styles.notifInnerHeaderContainer}>
					<Pressable style={styles.notifBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
						<MIIcon name='arrow-forward-ios' size={26} color='black'/>
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
						if (notif.username) {
							return (
								<View style={styles.notif1}>
									<Text style={styles.notifMessage}> 
										<Text style={{fontWeight: 'bold'}}>{notif.username} </Text>
										caught a glimpse of you
									</Text>
	
									<Image source={{uri: notif.profilePic}} style={styles.notifProfile}/>
									
									<Text style={styles.notifTime}>
									{notif.timeNotif}
									</Text> 
								</View>)
						} 
						else {
							return (
								<View style={styles.notif1}>
									<Text style={styles.notifMessage}> 
										Someone liked your post!
									</Text>
	
									<Image source={{uri: notif.postURL}} style={styles.notifProfile}/>
									
									<Text style={styles.notifTime}>
										{notif.timeLiked}
									</Text> 
								</View>
							)
						}
													
					})}
				</ScrollView>	
			</View>	
		</SafeAreaView>
	)
}

export default NotificationDisplay


// real time db mode
// async function GetNotifsRTDB () {

// 	let notifarr = [];

// 	const p =  new Promise((resolve)=>{
//         database().ref('/notifs/').on('value',snapshot=>{
// 			// console.log('data is:' + snapshot.val())
//             resolve(snapshot.val())
//         })
//     });
// 	const data = await p.then();

	//console.log('notifs',data);

	///////////////////////////////////////////////////////

	// const p2 =  new Promise((resolve)=>{
    //     database().ref('/channels/').on('value',snapshot=>{
	// 		// console.log('data is:' + snapshot.val())
    //         resolve(snapshot.val())
    //     })
    // });

	// const data2 = await p2.then(
	// 	snapshot => {
	// 		snapshot.forEach(
	// 			console.log()
	// 		)
	// 	}
	// );
	//return data;

//}

// async function testFunc () {
// 	const data = new Promise((resolve) => {
// 		firestore().collection('PinRequests').get()
// 	})
// }



// SUPABASE
	// const fetchData = async () => {

	// 	setLoading(true);

	// 	let {error, data} = await supabase
	// 	.from('testChannel')
	// 	.select()
		
	// 	setLoading(false);

	// 	if(error) 
	// 	{
	// 		console.log('gg', error.message)
	// 		return false
	// 	}
		
	// 	if(data) {
			
	// 		return data
	// 	}
	// }

	// useEffect(() => {

	// 	// INITIALIZE
		
	// 	init ()
		
	// 	console.log(notifData)
	// }, [])


	// const init = async () =>
	// {
		
	// 	const result = await fetchData()
	// 	//setLoading(true);
	// 	setnotifData(result)
	// 	console.log("result", result)
	// }

	//if (loading) return null;

	// pushing data
	// const pushItem = async (parameter, param2) => {
	// 	const { data, error } = await supabase
	// 	.from('testChannel')
	// 	.insert([
	// 		{ name: parameter, lastname: param2},
	// 	])
	// 	if(error) 
	// 	{
	// 		console.log('gg', error.message)
	// 		return false
	// 	}
		
	// 	if(data) {
	// 		return data
	// 	}
	// }

	// deleting data
	// const deleteItem = async() => {
	// 	const { data, error } = await supabase
	// 	.from('testChannel')
	// 	.delete()
	// 	.eq('id', 4)
	// }

	// update data
	// const updateData = async() => {
	// 	const { data, error } = await supabase
	// 	.from('testChannel')
	// 	.update({ name: "testies" })
	// 	.eq('id', '2')
	// }
	////////////////////////////////////////////////////////

	// FIREBASE
	// real time db
	// const getData = async () => {
	// 	const data = await GetNotifsRTDB()
	// 	// console.log('data',data)
	// 	setnotifData(data)
	// } 
	// useEffect(() => {
	// 	getData()
	// }, [])


	// firestore db

	// const users = async () => {
	// 	let retArray = [];
	// 	await firestore().collection('Users').get()
	// 	.then((querySnapshot) => {
	// 		querySnapshot.forEach(snapshot => {
	// 			let data = snapshot.data()
	// 			retArray.push(data)
	// 			//console.log("here",data)
	// 		})
	// 	})
	// 	console.log('returned array',retArray[0].FriendCount)
	// 	return retArray;

	// }
	//console.log(users)
	//users();



	// const users2 = async () => {
	// 	let dataRet = {
	// 		Name: '',
	// 		Username: '',
	// 	};
	// 	//console.log('hello')
	// 	await firestore()
	// 	.collection('Users')
	// 	.doc('qwdihqwfhfoqw')
	// 	.collection('Friends')
	// 	.doc('UidOfOtherPerson')
	// 	.get()
	// 	.then (docSnapshot => {
	// 		//console.log('gg')
	// 		//console.log(docSnapshot.data().ProfilePicURL)
	// 		//dataRet.Name = docSnapshot.data().ProfilePicURL;
	// 		//dataRet.Username = docSnapshot.data().Username;
	// 		//console.log('exists: ', docSnapshot.exists);
	// 		//console.log('lol')
	// 		if(docSnapshot.exists) {
	// 			console.log('data', docSnapshot.data())
	// 		}
	// 		else {
	// 			return null;
	// 		}

	// 		// querySnapshot.forEach(queryDocumentSnapshot => {
	// 		// 	console.log(queryDocumentSnapshot.get())
	// 		// })
			
	// 	})
	// 	//console.log(dataRet)

	// }
	// //console.log(users)
	// users2();

	// const users3 = async () => {
	// 	await firestore()
	// 	.collection('Users')
	// 	.doc('pveyvs6ViHYfp1uskHks')
	// 	.collection('Friends')
	// 	.get()
	// 	.then((querySnapshot) => {
	// 		querySnapshot.forEach(snapshot => {
	// 			let data = snapshot.data()
	// 			console.log("here",data)
	// 		})
	// 	})

	// }
	//console.log(users)
	//users3();
	



	// Write data with random ID
	// const writeData = async() => {
	// 	await firestore()
	// 	.collection('PinRequests')
	// 	.add({
	// 	  Name: 'testing',
	// 	  Location: 'testingLocation',
	// 	})
	// 	.then(() => {
	// 	  console.log('User added!');
	// 	});
	// }

	//writeData()

	// Write data with specified ID
	// const writeData2 = async() => {
	// 	await firestore()
	// 	.collection('PinRequests')
	// 	.doc('TestingID')
	// 	.set({
	// 	  Name: 'testing2',
	// 	  Location: 'testingLocation2',
	// 	})
	// 	.then(() => {
	// 	  console.log('User added!');
	// 	});
	// }

	//writeData2()


