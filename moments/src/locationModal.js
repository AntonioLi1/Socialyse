import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase, Keyboard, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
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

async function ViewPinChannelsMultiple(PinID) {
	let Channels = [];

	console.log('pinid',PinID)
  
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	//.orderBy('ActiveUsers', 'desc')
	.get()
	.then((querySnapshot) => {
		console.log('querySnapshot', querySnapshot)
		querySnapshot.forEach(snapshot => {
			let channel = {
			  ChannelName: '',
			  ActiveUsers: 0,
			  ChannelID: '',
			  selected: false 
			};
			console.log('snapshots', snapshot)
			channel.ChannelName = snapshot.data().Name;
			channel.ActiveUsers = snapshot.data().ActiveUsers;
			channel.ChannelID = snapshot.data().ChannelID;
			Channels.push(channel)
			console.log('lol')
		})
	})
	//console.log(Channels)
	return Channels;
}

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
		  ChannelLongitude = docSnapshot.data().Location.latitude;
		  ChannelLatitude = docSnapshot.data().Location.longitude;
		}
	})
	ChannelLongitude =  ChannelLongitude * Math.PI / 180;
	ChannelLatitude =  ChannelLatitude * Math.PI / 180;
	userLatitude =  userLatitude * Math.PI / 180;
	userLongtitude =  userLongtitude * Math.PI / 180;
  
	// Haversine formula
	let dlon = userLongtitude - ChannelLongitude;
	let dlat = userLatitude - ChannelLatitude;
	let a = Math.pow(Math.sin(dlat / 2), 2)
			+ Math.cos(ChannelLatitude) * Math.cos(userLatitude)
			* Math.pow(Math.sin(dlon / 2),2);
		   
	let c = 2 * Math.asin(Math.sqrt(a));
	let r = 6371;
  
	// calculate the result
	let distance = c * r;
  
	// Check user is within range
	distance = distance/1000;
	if (distance > 50) {
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
			LastTime = new Date((data.LastCreated.nanoseconds / 1000000000) + data.LastCreated.seconds)
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
		//console.log(data)
		channelName = data.Name
	})

	return channelName
}

async function CreateChannel(UserID, PinID, ChannelName) {
  
	const currTime = new Date();
  
	// Check channel of same name doesn't exist 
	// YOU NEED TO DIFFERENTIATE ERROR FOR USER AND CHANNEL NAME EXISTING ALREADY
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.where('ChannelName', '==', ChannelName)
	.get()
	.then(docSnapshot => {
	  if (docSnapshot.exists) {
		throw error;
	  }
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
	  Name: ChannelName,
	  Location: Location
	})
	.then(function(docRef) {
	  ChannelID = docRef.id;
	});
  
	// add under pins
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.doc(ChannelID)
	.set({
	  ActiveUsers: 0,
	  ChannelID: ChannelID, 
	  ChannelName: ChannelName
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
	const [canCreateChannel, setCanCreateChannel] = useState(false)

	const {selectedPinId, user} = useContext(LoggedInContext)

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

	async function getData() {
		const data = await ViewPinChannelsMultiple(selectedPinId)
		setChannels(data)
		GetmyLocation();
		if(selectedPinId) {
			const pinName = await getPinName(selectedPinId)
			setPinName(pinName)
			const canCreateCheck = await checkIfUserCanCreateChannel(user.uid, selectedPinId, userLatitude, userLongitude)
			setCanCreateChannel(canCreateCheck)
			
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
	if (dataLoaded === false) return null;

	// console.log('channelstatus',channelStatus)
	// console.log('channelselected', channelSelected)
	// console.log('viewCheck', viewCheck)

	if (createChannelModel == true) 
		return (
			<Modal visible={createChannelModel} transparent={true}>
				
				<SafeAreaView style={styles.createChannelModelFullScreen}>
					
					<View style={styles.locationModal}>
						<View style={styles.locationImagePlaceholderSingle}/>
					
						<View style={styles.locationNameActiveAndJoinButtonContainer}>
							<Text style={styles.locationNameModal}>
								{pinName}
							</Text> 
							
							<TextInput style={styles.newChannelModelPLaceholder} placeholderTextColor='#585858' placeholder="New channel name..." autoFocus={true}
							onChangeText={(text) => setCreateChannelName(text)} multiline={true}
							/>

							<Pressable style={styles.createChannelButton} 
							onPress={() => {CreateChannel(user.uid, selectedPinId, createChannelName); 
								navigation.navigate('MakeAPost', {selectedChannelID: selectedChannelID})}}
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



	return (
		<Modal visible={multipleModalDisplay} transparent={true}>
			<View style={styles.multipleLocationModal}>
				<View style={styles.multiLocationModalHeader}>
					<View style={styles.locationImagePlaceholderMulti}/>
					
					<View style={styles.locationNameActiveAndJoinButtonContainer2}>
						<Text style={styles.locationNameModal}>
							{pinName}
							{/* UNSW Roundhouse */}
						</Text> 
					</View>
					
					<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
					onPress={() => {setMultipleModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true);}}/>
				</View>

				<View style={{flex: 5}}>
					<FlatList
					numColumns={1} 
                	data={channels} 
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
				<View style={styles.locationModalFooter}>

					{/* create channel button */}
					<Pressable disabled={false} style={styles.multiCreateChannelButton}
					onPress={() => {setMultipleModalDisplay(false); setCreateChannelModel(true)}}
					> 
					
						<Text style={[{color: canCreateChannel ? 'white' : '#727272' },styles.multiCheckInText]}>Create new</Text> 			
					</Pressable> 


					<Pressable disabled={joinEnable} style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.multiCheckInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost', {selectedChannelID: selectedChannelID}) : setMultipleModalDisplay(false)} setMultipleModalDisplay(false)
					{viewCheck ? navigation.navigate('PostsFeed', {selectedChannelID: selectedChannelID}) : null}
					}}>
					{viewCheck ? 
					
						<Text style={[{color: channelSelected ? 'white' : 'white'},styles.multiCheckInText]}>View</Text> 
						: 
						<Text style={[{color: channelSelected ? 'white' : '#727272'}, styles.checkedInText]}>Join</Text>}					
					</Pressable> 
					
					
				</View>
					

				
			</View>	
		</Modal>
	)
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