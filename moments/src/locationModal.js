import React, { useState, useEffect, useContext, useId } from 'react';
import { View, Text, Pressable, Image, Dimensions} from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
const screenHeight = Dimensions.get("window").height

class ChannelNameBlankError extends Error {
    constructor(message) {
        super(message)
        this.name = "ChannelNameBlankError"
    }
}

class TakenChannelNameError extends Error {
    constructor(message) {
        super(message)
        this.name = "TakenChannelNameError"
    }
}

async function checkIfUserCanCreateChannel(uid, selectedPinId) {
	//console.log('cancreatestart')
	
	// check if user has already created a channel in this pin 
	let canCreate = null
	await firestore()
	.collection('ChannelCreations')
	.doc(uid)
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then( docSnapshot => {
		if (!docSnapshot.exists) {
			console.log('deosnt exist')
			canCreate = true
			return canCreate
		} else {
			//console.log('ye exist')
			canCreate = false
		}
	})
	//console.log('here?')

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
			let data = docSnapshot.data()
			// convert firebase storage time into seconds
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
	//console.log('cancreate')
	return canCreate
}

// for when a user is checked into the channel already, they can 'view' instead of 'join'
async function checkIfUserCanViewButton(uid, channelID) {
	console.log('canviewstart')

	let returnBool = false;

	await firestore()
	.collection('Users')
	.doc(uid)
	.get()
	.then(docSnapshot => {
		let data = docSnapshot.data()
		// check if it is a brand new user
		if (data.ChannelJoined ===  null) {
			return returnBool
		}
		let currTimeInSeconds = new Date().getTime() / 1000;
		// get last time joined channel x in seconds
		let LastTimeJoined = new Date((data.ChannelJoined.nanoseconds / 1000000000) + data.ChannelJoined.seconds)

		if (channelID == data.CurrentChannel && currTimeInSeconds - LastTimeJoined < 3600) {
			returnBool = true
		}
	})
	console.log('canview')
	return returnBool
}

async function getPinName(selectedPinId) {
	let channelName = ''
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then(docSnapshot => { 
		let data = docSnapshot.data()
		channelName = data.Name
	})
	//console.log('pinname')
	return channelName
}

async function getPinPicURL (selectedPinId) {
	let pinPicURL = ''
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.get()
	.then(docSnapshot => { 
		let data = docSnapshot.data()
		pinPicURL = data.PinPic
	})
	//console.log('pinpicurl')
	return pinPicURL
}

export function LocationModalMultiple ({multipleModalDisplay, setMultipleModalDisplay, setMessageDisplay, setNotifDisplay}) {
	
	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const [channelSelected, setChannelSelected] = useState(false);
	const navigation = useNavigation();
	const [joinEnable, setJoinEnable] = useState(true)
	const [dataLoaded, setDataLoaded] = useState(false)
	const [viewCheck, setViewCheck] = useState(false)
	const [createChannelModel, setCreateChannelModel] = useState(false)
	const [pinName, setPinName] = useState()
	const [createChannelName, setCreateChannelName] = useState('')
	const [userLongitude, setLongitude] = useState(0)
	const [userLatitude, setLatitude] = useState(0)
	const [channelsLoaded, setChannelsLoaded] = useState(false)
	const [sortedChannels, setSortedChannels] = useState([]);
	const [pinPicURL, setPinPicURL] = useState('')
	const [canCreateChannel, setCanCreateChannel] = useState()
	const [canInteract, setCanInteract] = useState(true)
	const [showError, setShowError] = useState(null)
	const [showErrorMessage, setShowErrorMessage] = useState(false)
	const [blankChannelNameErrorMessage, setBlankChannelNameErrorMessage] = useState(false)
	const [createButtonPressed, setCreateButtonPressed] = useState(false)
	

	const {selectedPinId, user, setSelectedPinId, setSelectedChannelId} = useContext(LoggedInContext)

	useEffect(() => {
		setTimeout(() => {
			setCreateButtonPressed(false)
		}, 1000)
	}, [createButtonPressed])
	
	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

	async function CreateChannel(UserID, PinID, ChannelName) {

		// if ChannelName is ""
		if (ChannelName === '') {
			throw new ChannelNameBlankError('blank channelName')
		}

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
					throw new TakenChannelNameError("channel name taken");
				}
			})
		})
		console.log('read pins channels')
	

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
		console.log('read pins')
	  
		// add to channels
		let ChannelID = '';
		await firestore()
		.collection('Channels')
		.add({
		  ChannelName: ChannelName,
		  Location: Location,
		  PinID: PinID,
		})
		.then(function(docRef) {
		  ChannelID = docRef.id;
		});		
		console.log('write channels')

		const realTime = new Date();

		// add under pins
		await firestore()
		.collection('Pins')
		.doc(PinID)
		.collection('Channels')
		.doc(ChannelID)
		.set({
		  ActiveUsers: 0,
		  ChannelID: ChannelID, 
		  LastActive: realTime,
		  Name: ChannelName
		});
		console.log('write pins channels')
	  
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
		console.log('read from channelcreations pins')
		
	  
		// if user never created a channel at this pin
		if (createdBefore == false) {
			console.log('createdbefore', createdBefore)
			// await firestore()
			// .collection('ChannelCreations')
			// .doc(UserID)
			// .set({
			// 	UserID: UserID
			// })
			// console.log('1')

			await firestore()
			.collection('ChannelCreations')
			.doc(UserID)
			.collection('Pins')
			.doc(PinID)
			.set({
				ChannelID: ChannelID, 
				LastCreated: realTime,
				CreatedBy: UserID
			});
			console.log('2')

	  
		} 
		// if channel does exist, update
		else {
			console.log('createdbefore', createdBefore)
			await firestore()
			.collection('ChannelCreations') 
			.doc(UserID)
			.collection('Pins')
			.doc(PinID)
			.update({
				ChannelID: ChannelID, 
				LastCreated: realTime,
				CreatedBy: UserID
			});
			console.log('3')

	  
		}
		console.log('createchannel')
	  
	}

	async function getChannels(selectedPinId) {

		let start = new Date();

		function subtractHours(numOfHours, date = new Date()) {
			date.setHours(date.getHours() - numOfHours);
			return date;
		}

		let test = subtractHours(24, start)
		//console.log('getchannels1')

		let channelsArr = []
		await firestore()
		.collection('Pins')
		.doc(selectedPinId)
		.collection('Channels')
		.where('LastActive', '>', test)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach(snapshot => {
				let channel = { 
					ChannelName: '',
					ActiveUsers: 0,
					ChannelID: '',
					selected: false 
				};
				channel.ChannelName = snapshot.data().Name;
				channel.ActiveUsers = snapshot.data().ActiveUsers;
				channel.ChannelID = snapshot.data().ChannelID;
				channelsArr.push(channel)
			})
		})
		setSortedChannels(channelsArr.sort((a,b) => b.ActiveUsers - a.ActiveUsers))
		setChannelsLoaded(true)
		//console.log('getchannels2')
	}

	async function CheckIfUserIsWithinDistance(selectedPinId, userLatitude, userLongtitude) {
		let ChannelLongitude = 0;
		let ChannelLatitude = 0;
		let ChannelRadius = 0;
		let canCreate = true;
	  
		await firestore()
		.collection('Pins')
		.doc(selectedPinId)
		.get()
		.then (docSnapshot => {
			if(docSnapshot.exists) {
				ChannelLatitude = docSnapshot.data().Location.latitude;
				ChannelLongitude = docSnapshot.data().Location.longitude;
				ChannelRadius = docSnapshot.data().Radius
			}
		})
		
		const API_KEY = "AIzaSyA1T4rNRR2NoCUglLkTZOtdCExn392_mZE"
		const userLocation = `${userLatitude},${userLongtitude}`
		const pinLocation = `${ChannelLatitude},${ChannelLongitude}`
		console.log('userlocation', userLocation)
		console.log('pinlocation', pinLocation)
		const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=walking&origins=${userLocation}&destinations=${pinLocation}&key=${API_KEY}`
		let distance = null
		await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			distance = parseFloat(data.rows[0].elements[0].distance.text.match(/\d+/)[0]);
			console.log('data', data)
			let unit = data.rows[0].elements[0].distance.text.match(/[a-zA-Z]+/g)[0];
			if (unit == 'km') {
				distance *= 1000
			}
			//console.log('disctance', distance)
			//console.log('radius', ChannelRadius)
			if (distance > ChannelRadius) {
				//console.log('fasle')
				//canCreate = false
				setCanInteract(false)
				//return canCreate
			} else {
				//console.log('true')
				setCanInteract(true)
				//return canCreate
			}
			//console.log('distance check')
		})
		.catch((error) => {
			//console.log('distance check2')

			canCreate = false
			return canCreate
		})

	}
	

	async function getData() {
		await GetmyLocation();
		console.log('selectedpindi', selectedPinId)
		if(selectedPinId) {
			setDataLoaded(false)

			//console.log('dataloaded1', dataLoaded)
			await getChannels(selectedPinId)
			//console.log('here')
			await CheckIfUserIsWithinDistance(selectedPinId, userLatitude, userLongitude)
			//setCanInteract(canInteract1)
			//console.log('canInteract', canInteract)
			const pinName = await getPinName(selectedPinId)
			setPinName(pinName)
			//console.log('again')
			const pinPic = await getPinPicURL(selectedPinId)
			setPinPicURL(pinPic)
			if (canInteract === true) {
				const canCreateCheck = await checkIfUserCanCreateChannel(user.uid, selectedPinId)
				setCanCreateChannel(canCreateCheck)
			}
			setDataLoaded(true)
			//console.log('dataloaded2', dataLoaded)
			

		}
		
	}

	async function viewCheckFunc (channelID) {
		const data = await checkIfUserCanViewButton(user.uid, channelID)
		setViewCheck(data)
	}

	useEffect(() => {
		getData()
	}, [multipleModalDisplay])

	useEffect(() => {
		if (sortedChannels) {
			let counter = 0
			while (counter < sortedChannels.length) {
				if (sortedChannels[counter].selected === true) {
					setSelectedChannelId(sortedChannels[counter].ChannelID)
					setChannelSelected(true)
					setJoinEnable(false)
					return
				} 
				counter++
			}
			setJoinEnable(true)
		}
		
	}, [channelSelected])

	//if (dataLoaded === false) return null;

	const callback = ()=>{
        navigation.navigate('MakeAPost')
	};

	async function createChannelAndJoin() {
		try {
			await CreateChannel(user.uid, selectedPinId, createChannelName)
			setMultipleModalDisplay(false); 
			setCreateChannelModel(false);
			callback()
		} catch(error) {
			console.log('error createchannelandjoin', error)
			if (error.name === 'ChannelNameBlankError') {
				setShowError(true)
				setBlankChannelNameErrorMessage(true)
				setTimeout(() => {
					setBlankChannelNameErrorMessage(false)
					setShowError(false)
				}, 1000)
			}
			if (error.name === 'TakenChannelNameError') {
				setShowError(true)
				setShowErrorMessage(true)
				setTimeout(() => {
					setShowErrorMessage(false)
					setShowError(false)
				}, 1000)
			}			
		}
	}
 
	if (createChannelModel == true) 
		return (
			<Modal isVisible={createChannelModel}>
				{
					pinPicURL === null
					?
					<View style={styles.createChannelModalNoPic}>
					
						<View style={styles.locationNameActiveAndJoinButtonContainerCreate}>
							
							<Text style={styles.locationNameModalNoPic}>
								{pinName}
							</Text> 
							
							{
								showError ?
								<Text style={{color: 'red', fontSize: screenHeight * 0.016, textAlign: 'center', fontFamily: 'Helvetica'}} >
									{showErrorMessage ? "Channel name is already taken!" : null}
									{blankChannelNameErrorMessage ? "You need to enter a channel name!" : null}
								</Text>
								:
								<TextInput style={styles.newChannelModelPLaceholderNoPic} placeholderTextColor='#585858' placeholder="New channel name..." autoFocus={true}
								onChangeText={(text) => setCreateChannelName(text)} maxLength={15}
								/>
								
							}
							
							{
								showErrorMessage ?
								null
								:
								<Pressable style={styles.createChannelButton} 
								onPress={() => {createChannelAndJoin();
									}}
								>
									<Text style={styles.createChannelText}>Create</Text>				
								</Pressable>
							}
							
						</View>
						
						<IIcon style={styles.createChannelModalClose} name='close-outline' size={scale(30)}
						onPress={() => {setCreateChannelModel(false); setMultipleModalDisplay(true); setMessageDisplay(true); setNotifDisplay(true);}}/> 
					</View>
					:
					<View style={styles.createChannelModal}>
						<View style={{flexDirection: 'row', width: '100%', height: '80%', alignItems: 'center'}}>
							<View style={styles.locationImagePlaceholderSingleCreateChannel}/>
						
							<View style={styles.locationNameActiveAndJoinButtonContainerCreateNoPic}>
								
								<Text style={styles.locationNameModalCreateChannel}>
									{pinName}
								</Text> 
								
								{
									showError ?
									<Text style={{color: 'red', fontSize: screenHeight * 0.018, textAlign: 'center',fontFamily: 'Helvetica'}} numberOfLines={1}>
										{showErrorMessage ? "Channel name is already taken!" : null}
										{blankChannelNameErrorMessage ? "You need to enter a channel name!" : null}
									</Text>
									:
									<TextInput style={styles.newChannelModelPLaceholderNoPic} placeholderTextColor='#585858' placeholder="New channel name..." autoFocus={true}
									onChangeText={(text) => setCreateChannelName(text)} multiline={true} maxLength={15}
									/>
									
								}
								
								{
									showErrorMessage ?
									null
									:
									<Pressable style={styles.createChannelButton} 
									onPress={() => {createChannelAndJoin();
										}}
									>
										<Text style={styles.createChannelText}>Create</Text>				
									</Pressable>
								}
								
							</View>
						</View>
						<IIcon style={styles.createChannelModalClose} name='close-outline' size={scale(30)}
						onPress={() => {setCreateChannelModel(false); setMultipleModalDisplay(true); setMessageDisplay(true); setNotifDisplay(true);}}/> 
					</View>
				}
			</Modal>
		)
		
	if (dataLoaded === true) {
		//console.log('cantineract in return', canInteract)
		return (
			<Modal isVisible={multipleModalDisplay} >
				<View style={styles.multipleLocationModal}>
					{
						pinPicURL ?
						<View style={styles.multiLocationModalHeader}>
							<Image source={{uri: pinPicURL}} style={styles.locationImagePlaceholderSingle}/>
							
							<View style={styles.locationNameActiveAndJoinButtonContainer2}>
								<Text style={styles.locationNameModal}>
									{pinName}
								</Text> 
							</View>
							
							<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
							onPress={() => {setMultipleModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true); setSelectedPinId(null)}}/>
						</View>
						:
						<View style={styles.multiLocationModalHeaderNoPic}>
							
							<View style={styles.locationNameActiveAndJoinButtonContainerNoPic}>
								<Text style={styles.locationNameModalNoPic}>
									{pinName}
									
								</Text> 
							</View>
							
							<IIcon style={styles.locationModalCloseNoPic} name='close-outline' size={scale(32)}
							onPress={() => {setMultipleModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true); setSelectedPinId(null)}}/>
						</View>

					}
	
					<View style={{flex: 5, marginTop: '1%'}}>	
						{
							channelsLoaded ?
							<FlatList
							numColumns={1} 
							data={sortedChannels} 
							renderItem={({item, index}) => 
							{
								
								return (
									
									<Pressable onPress={() => {setChannelSelected(!channelSelected); item.selected = !item.selected;
										console.log('channelSelected', channelSelected)
										viewCheckFunc(sortedChannels[index].ChannelID)
										{
										// make all other channels unselected
										let counter = 0
										while (counter < sortedChannels.length) {
											if (counter !== index) {
												sortedChannels[counter].selected = false
											}
											counter++
										}
									}}}>
										<View style={[{backgroundColor: item.selected ? '#729BEB':'#96B9FE'}, styles.multiLocationModalChannelContainer]}>
											<Text style={{color: 'white', fontWeight: '600', fontSize: screenHeight * 0.022, fontFamily: 'Helvetica' }}>
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
							: 
							null
						}	
						
					</View>
	
					{
						
						canInteract ?
						<View style={styles.locationModalFooter}>
	
							<Pressable style={styles.multiCreateChannelButton}
							disabled={!canCreateChannel}
							onPress={() => {setCreateButtonPressed(true); setMultipleModalDisplay(false); setCreateChannelModel(true); }}
							> 
							
								<Text style={[{color: canCreateChannel ? createButtonPressed ? 'grey' : 'white' : 'grey'},styles.multiCheckInText]}>Create new</Text> 			
							</Pressable> 
	
	
							<Pressable disabled={joinEnable} style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.multiCheckInButton ]} 
							onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost') : setMultipleModalDisplay(false)}; setMultipleModalDisplay(false)
							{viewCheck ? navigation.navigate('PostsFeed') : navigation.navigate('MakeAPost')}
							}}>
							{viewCheck ? 
							
								<Text style={[{color: channelSelected ? 'white' : '#727272'},styles.multiCheckInText]}>View</Text> 
								: 
								<Text style={[{color: channelSelected ? 'white' : '#727272'}, styles.checkedInText]}>Join</Text>}					
							</Pressable> 
						</View>
						:
						// cant join or create
						<View style={[styles.locationModalFooter, {justifyContent: 'center'}]}>
							<Text style={styles.noJoinCreateChannelText}>
								You're too far to join or create a channel at this pin!
							</Text>

						</View>
					}
				</View>	
			</Modal>
		)
	}
}