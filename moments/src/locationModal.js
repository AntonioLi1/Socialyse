import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase, Keyboard, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';


async function checkIfUserCanCreateChannel(uid, selectedPinId, userLatitude, userLongtitude) {
	
	// check for distance from pin
	let ChannelLongitude = 0;
	let ChannelLatitude = 0;
	let canCreate = false;
  
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then (docSnapshot => {
		if(docSnapshot.exists) {
			ChannelLatitude = docSnapshot.data().Location.latitude;
			ChannelLongitude = docSnapshot.data().Location.longitude;
		}
	})
	// console.log('ChannelLongitude', ChannelLongitude)
	// console.log('ChannelLatitude', ChannelLatitude)
	// console.log('userLatitude', userLatitude)
	// console.log('userLongtitude', userLongtitude)
	
	const API_KEY = "AIzaSyA1T4rNRR2NoCUglLkTZOtdCExn392_mZE"
	const userLocation = `${userLatitude},${userLongtitude}`
	const pinLocation = `${ChannelLatitude},${ChannelLongitude}`

	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=walking&origins=${userLocation}&destinations=${pinLocation}&key=${API_KEY}`
	let distance = 0
	// await fetch(url)
	// .then((response) => response.json())
	// .then((data) => {
	// 	distance = parseFloat(data.rows[0].elements[0].distance.text.match(/\d+/)[0]);
	// 	console.log('the distance', distance)
	// 	let unit = data.rows[0].elements[0].distance.text.match(/[a-zA-Z]+/g)[0];
	// 	if (unit == 'km') {
	// 		distance *= 1000
	// 		console.log('distanceif', distance)
	// 	}
	// })
	// .catch((error) => {
	// 	console.log('ggbaited', error)
	// })


	if (distance > 50) {
		console.log('too far')
		canCreate = false
		return canCreate
	}
	
	// check if user has already created a channel in this pin 
	await firestore()
	.collection('ChannelCreations')
	.doc(uid)
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then( docSnapshot => {
		if (!docSnapshot.exists) {
			canCreate = true
			return canCreate
		} else {
			canCreate = false
		}
	})

	//over an hour ago
	let LastTime = 0;
	await firestore()
	.collection('ChannelCreations') 
	.doc(uid)
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then( docSnapshot => {
		if (docSnapshot.exists) {
			// convert firebase storage time into seconds
			let data = docSnapshot.data()
			LastTime = (data.LastCreated.nanoseconds / 1000000000) + data.LastCreated.seconds
		}
	})
	// current time in seconds
	const time = new Date().getTime() / 1000;

	// curr time is more than an hour since the last time user created the channel
	if (time - LastTime > 3600) {
		canCreate  = true
	} else {
		canCreate = false
	} 
	//console.log(canCreate)
	return canCreate
}

// for when a user is checked into the channel already, they can 'view' instead of 'join
async function checkIfUserCanViewButton(uid, channelID) {
	let returnBool = false;

	await firestore()
	.collection('Users')
	.doc(uid)
	.get()
	.then(docSnapshot => {
		let data = docSnapshot.data()
		
		let currTimeInSeconds = new Date().getTime() / 1000;
		// get last time joined channel x in seconds
		let LastTimeJoined = new Date((data.ChannelJoined.nanoseconds / 1000000000) + data.ChannelJoined.seconds)

		if (channelID == data.CurrentChannel && currTimeInSeconds - LastTimeJoined < 3600) {
			returnBool = true
		}
	})
	//console.log('infunction',returnBool)

	return returnBool

}

// error with pin far away??
async function getPinName(selectedPinId) {
	//console.log(selectedPinId)
	let channelName = ''
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then(docSnapshot => { 
		//console.log(docSnapshot)
		let data = docSnapshot.data()
		//console.log('size',docSnapshot.size)

		//console.log('data',data)
		channelName = data.Name
	})

	return channelName
}




export function LocationModalMultiple ({multipleModalDisplay, setMultipleModalDisplay, setMessageDisplay, setNotifDisplay}) {
	
	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const [channelSelected, setChannelSelected] = useState(false);
	const navigation = useNavigation();
	const [joinEnable, setJoinEnable] = useState(true)
	const [channels, setChannels] = useState()
	const [dataLoaded, setDataLoaded] = useState(false)
	const [selectedChannelID, setSelectedChannelID] = useState()
	const [viewCheck, setViewCheck] = useState(false)
	const [createChannelModel, setCreateChannelModel] = useState(false)
	const [pinName, setPinName] = useState()
	const [createChannelName, setCreateChannelName] = useState('')
	const [userLongitude, setLongitude] = useState(0)
	const [userLatitude, setLatitude] = useState(0)
	const [channelsLoaded, setChannelsLoaded] = useState(false)
	
	const [canCreateJoinChannel, setCanCreateJoinChannel] = useState(false)
	const [error, setError] = useState(null)
	const [showErrorMessage, setShowErrorMessage] = useState(false)

	const {selectedPinId, user} = useContext(LoggedInContext)

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			console.log('geolocation latitude', info.coords.latitude)
			console.log('geolocation longitude', info.coords.longitude)
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

	async function CreateChannel(UserID, PinID, ChannelName) {
  
		const currTime = new Date();
		

        function subtractHours(numOfHours, date = new Date()) {
            date.setHours(date.getHours() - numOfHours);

            return date;
        }

        let test = subtractHours(24, currTime)
	  
		// Check channel of same name doesn't exist 
		await firestore()
		.collection('Pins')
		.doc(PinID)
		.collection('Channels')
		.where('LastActive', '>', test)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach(snapshot => {
				let data = snapshot.data()
				if (ChannelName == data.Name) {
					//console.log('infunction error')
					throw error
				}
			})
		})
		// Create channel
		// Get location of pin
		let Location = {};
		await firestore()
		.collection('Pins')
		.doc(PinID)
		.get()
		.then(docSnapshot => {
		  if (docSnapshot.exists) {
			Location = docSnapshot.data().Location;
		  }
		});
	  
		// add to channels
		let ChannelID = '';
		await firestore()
		.collection('Channels')
		.add({
		  ChannelName: ChannelName,
		  Location: Location
		})
		.then(function(docRef) {
		  ChannelID = docRef.id;
		});

		//console.log('ChannelID',ChannelID)
		setSelectedChannelID(ChannelID)
	  
		// add under pins
		await firestore()
		.collection('Pins')
		.doc(PinID)
		.collection('Channels')
		.doc(ChannelID)
		.set({
		  ActiveUsers: 0,
		  ChannelID: ChannelID, 
		  LastActive: null,
		  Name: ChannelName
		});
	  
		// increment channel count inside of pin by 1
		let channelCount = 0;
		await firestore() 
		.collection('Pins')
		.doc(PinID)
		.get()
		.then(docSnapshot => {
		  if (docSnapshot.exists) {
			channelCount = docSnapshot.data().ChannelCount;
		  }
		});
	  
		channelCount += 1;
		// update pin field
		await firestore()
		.collection('Pins')
		.doc(PinID)
		.update({
		  ChannelCount: channelCount
		});
	  
		// add to channel creations
		let createdBefore = false
		await firestore()
		.collection('ChannelCreations')
		.doc(UserID)
		.collection('Pins')
		.doc(PinID)
		.get()
		.then(docSnapshot => {
		  if (docSnapshot.exists) {
			createdBefore = true
		  }
		})
	  
		// if channel doesnt exist, set a new one
		if (createdBefore == false) {
		  await firestore()
		  .collection('ChannelCreations')
		  .doc(UserID)
		  .collection('Pins')
		  .doc(PinID)
		  .set({
			ChannelID: ChannelID, 
			LastCreated: currTime
		  });
	  
		} 
		// if channel does exist, update
		else {
		  await firestore()
		  .collection('ChannelCreations')
		  .doc(UserID)
		  .collection('Pins')
		  .doc(PinID)
		  .update({
			ChannelID: ChannelID, 
			LastCreated: currTime
		  });
	  
		}
	  
	}

	useEffect(() => {

		
		let start = new Date();

		function subtractHours(numOfHours, date = new Date()) {
			date.setHours(date.getHours() - numOfHours);

			return date;
		}

		let test = subtractHours(24, start)
		
		const subscriber = firestore()
		.collection('Pins')
		.doc(selectedPinId)
		.collection('Channels')
		.where('LastActive', '>', test)
		.onSnapshot((querySnapshot) => {
			let channels = []
			querySnapshot.forEach(snapshot => {
				let channel = {
					ChannelName: '',
					ActiveUsers: 0,
					ChannelID: '',
					selected: false 
				};
				//console.log('snapshots', snapshot)
				channel.ChannelName = snapshot.data().Name;
				channel.ActiveUsers = snapshot.data().ActiveUsers;
				channel.ChannelID = snapshot.data().ChannelID;
				channels.push(channel)
			})
			
			//console.log('channels', channels)
			
			setChannels(channels)
			setChannelsLoaded(true)
		})
		return () => subscriber()
		
	}, [])
	

	async function getData() {
		await GetmyLocation();
		if(selectedPinId) {
			const pinName = await getPinName(selectedPinId)
			setPinName(pinName)
			const canCreateCheck = await checkIfUserCanCreateChannel(user.uid, selectedPinId, userLatitude, userLongitude)
			setCanCreateJoinChannel(canCreateCheck)
		}
		
		setDataLoaded(true)
	}

	async function viewCheckFunc (channelID) {
		const data = await checkIfUserCanViewButton(user.uid, channelID)
		setViewCheck(data)
	}

	useEffect(() => {
		getData()
	}, [multipleModalDisplay])

	useEffect(() => {
		if (channels) {
			let counter = 0
			while (counter < channels.length) {
				if (channels[counter].selected === true) {
					setSelectedChannelID(channels[counter].ChannelID)
					setChannelSelected(true)
					setJoinEnable(false)
					return
				} 
				counter++
			}
			setJoinEnable(true)
		}
		
	}, [channelSelected])

	//console.log("channelstatus", channelStatus)
	if (dataLoaded === false && channelsLoaded === false) return null;

	// console.log('channelstatus',channelStatus)
	// console.log('channelselected', channelSelected)
	// console.log('viewCheck', viewCheck)
	//console.log('createChannelModel', createChannelModel)

	async function createChannelAndJoin() {
		try {
			await CreateChannel(user.uid, selectedPinId, createChannelName)
			navigation.navigate('MakeAPost', {selectedChannelID: selectedChannelID})
		} catch(err) {
			//console.log('error createchannelandjoin')
			setError(err)
			setShowErrorMessage(true)
		}
	}

	function CantCreateChannelAlert() {
		Alert.alert(
			"Cannot Create Channel",
			"You need to be within 50m of the pin to create a channel xo",
			[
				{text: "Got it!"}
			]
		)
	}

	function CantJoinChannelAlert() {
		Alert.alert(
			"Cannot Join Channel",
			"You need to be within 50m of the pin to join a channel xo",
			[
				{text: "Got it!"}
			]
		)
	}


	if (createChannelModel == true) 
		return (
			<Modal visible={createChannelModel} transparent={true}>
				
				<SafeAreaView style={styles.createChannelModelFullScreen}>
					
					<View style={styles.createChannelModal}>
						<View style={styles.locationImagePlaceholderSingle}/>
					
						<View style={styles.locationNameActiveAndJoinButtonContainerCreate}>
							
							<Text style={styles.locationNameModal}>
								{pinName}
							</Text> 
							
							{
								showErrorMessage ?
								<Text>
									error
								</Text>:
								<TextInput style={styles.newChannelModelPLaceholder} placeholderTextColor='#585858' placeholder="New channel name..." autoFocus={true}
								onChangeText={(text) => setCreateChannelName(text)} multiline={true} maxLength={15}
								/>
							}
							
							
							<Pressable style={styles.createChannelButton} 
							onPress={() => {setMultipleModalDisplay(false); setCreateChannelModel(false);createChannelAndJoin();
								}}
							>
								<Text style={styles.createChannelText}>Create</Text>				
							</Pressable>
						</View>
						
						<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
						onPress={() => {setCreateChannelModel(false); setMultipleModalDisplay(true);}}/> 
					</View>	
						
				</SafeAreaView>
					
			</Modal>
		)

	if (channelsLoaded == true && channels) {
		return (
			<Modal visible={multipleModalDisplay} transparent={true}>
				<View style={styles.multipleLocationModal}>
					<View style={styles.multiLocationModalHeader}>
						<View style={styles.locationImagePlaceholderMulti}/>
						
						<View style={styles.locationNameActiveAndJoinButtonContainer2}>
							<Text style={styles.locationNameModal}>
								{pinName}
								 
							</Text> 
						</View>
						
						<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
						onPress={() => {setMultipleModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true);}}/>
					</View>
	
					<View style={{flex: 5}}>		
						{/* {console.log('flatlist channels', channels)}			 */}
						<FlatList
						numColumns={1} 
						extraData={channels.sort((a,b) => b.ActiveUsers - a.ActiveUsers)}
						data={channels.sort((a,b) => b.ActiveUsers - a.ActiveUsers)} 
						renderItem={({item, index}) => 
						{
							
							return (
								
								<Pressable onPress={() => {setChannelSelected(!channelSelected); item.selected = !item.selected;
									//setViewCheck(checkIfUserCanViewButton(user.uid, channels.ChannelID));
									console.log('press channelID', channels[index].ChannelID)
									viewCheckFunc(channels[index].ChannelID)
									{
									// make all other channels unselected
									let counter = 0
									while (counter < channels.length) {
										if (counter !== index) {
											channels[counter].selected = false
										}
										counter++
									}
								}}}>
									<View style={[{backgroundColor: item.selected ? '#729BEB':'#96B9FE'}, styles.multiLocationModalChannelContainer]}>
										<Text style={{color: 'white', fontWeight: '600'}}>
											{item.ChannelName}
										</Text>
	
										<View style={{flexDirection: 'row'}}>
											<Text style={styles.multipleChannelLocationActiverUsers}>
												{item.ActiveUsers}
											</Text>
											<IIcon style={styles.locationModalDot} name='person' size={scale(14)} color='black'/>
										</View>
									</View>
								</Pressable>
									
							)
						}}>
						</FlatList>
					</View>
	
					{
						canCreateJoinChannel ?
						<View style={styles.locationModalFooter}>
	
							{/* create channel button */}
							<Pressable style={styles.multiCreateChannelButton}
							onPress={() => {setMultipleModalDisplay(false); setCreateChannelModel(true)}}
							> 
							
								<Text style={[{color: 'white'},styles.multiCheckInText]}>Create new</Text> 			
							</Pressable> 
	
	
							<Pressable disabled={joinEnable} style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.multiCheckInButton ]} 
							onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost', {selectedChannelID: selectedChannelID}) : setMultipleModalDisplay(false)}; setMultipleModalDisplay(false)
							{viewCheck ? navigation.navigate('PostsFeed', {selectedChannelID: selectedChannelID}) : null}
							}}>
							{viewCheck ? 
							
								<Text style={[{color: channelSelected ? 'white' : 'white'},styles.multiCheckInText]}>View</Text> 
								: 
								<Text style={[{color: channelSelected ? 'white' : '#727272'}, styles.checkedInText]}>Join</Text>}					
							</Pressable> 
						</View>
						:
						// cant join or create
						<View style={styles.locationModalFooter}>
	
							{/* create channel button */}
							<Pressable style={styles.multiCreateChannelButton}
							onPress={() => {CantCreateChannelAlert()}}
							> 
							
								<Text style={[{color: canCreateJoinChannel ? 'white' : '#727272' },styles.multiCheckInText]}>Create new</Text> 			
							</Pressable> 
	
	
							<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.multiCheckInButton ]} 
							onPress={() => {CantJoinChannelAlert()}}>
								<Text style={[{color: '#727272'}, styles.checkedInText]}>Join</Text>				
							</Pressable> 
						</View>
						
	
					}
	
					
						
	
					
				</View>	
			</Modal>
		)
	}
	
}










// have a property that checks if use is checked in when openng the location modal again
// async function ViewPinChannelOne(PinID) {
// 	let channel = {
// 		Name: '',
// 		ActiveUsers: 0,
// 	}
// 	await firestore()
// 	.collection('Pins')
// 	.doc(PinID)
// 	.collection('Channels')
// 	.doc(PinID)
// 	.get()
// 	.then(docSnapshot => {
// 		if (docSnapshot.exists) {
// 			channel.Name = docSnapshot.data().Name;
// 			channel.ActiveUsers = docSnapshot.data().ActiveUsers;
// 		}
		
// 	})
// 	return channel;
// }

// export function LocationModalOne({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

// 	const [isPressed, setIsPressed] = useState(false);
// 	const [channelStatus, setChannelStatus] = useState(true);
// 	const navigation = useNavigation();
// 	const [channelInfo, setChannelInfo] = useState()
// 	const [dataLoaded, setDataLoaded] = useState(false)
	
// 	const {selectedPinId} = useContext(LoggedInContext)

// 	async function getData() {
// 		const data = await ViewPinChannelOne(selectedPinId)
// 		setChannelInfo(data)
// 		setDataLoaded(true)
// 	}

// 	useEffect(() => {
// 		getData()
// 	}, [modalDisplay])

// 	if(dataLoaded === false) return null
	
// 	return (
// 		<Modal visible={modalDisplay} transparent={true}>
// 			<View style={styles.locationModal}>
// 				<View style={styles.locationImagePlaceholderSingle}/>
			
// 				<View style={styles.locationNameActiveAndJoinButtonContainer}>
// 					<Text style={styles.locationNameModal}>
// 						{channelInfo.Name}
// 					</Text> 
// 					<View style={styles.locationModalActiveDotContainer}>
// 						<Text style={styles.locationModalActive}>
// 							{channelInfo.ActiveUsers} people active
							
// 						</Text>
// 						<IIcon style={styles.locationModalDot} name='person' size={scale(14)} color='black'/>
// 					</View>
					

// 					<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
// 					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost') : setModalDisplay(false)} setModalDisplay(false)}}>
// 						{channelStatus ? 
// 						<Text style={styles.checkInText}>Join</Text> 
// 						: <Text style={styles.checkedInText}>Leave</Text>}					
// 					</Pressable>
// 				</View>
				
// 				<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
// 				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true);}}/> 
// 			</View>	
// 		</Modal>
// 	);
// }