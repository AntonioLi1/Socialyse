import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import { template } from '@babel/core';
import { LoggedInContext } from '../App'
import { getDrawerStatusFromState } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';


// have a property that checks if use is checked in when openng the location modal again
// const pinData = [
// 	{
// 		name: 'Law Lib',
// 		selected: false
// 	},
// 	{
// 		name: 'BSOC',
// 		selected: false
// 	},
// 	{
// 		name: 'Main',
// 		selected: false
// 	},
// 	{
// 		name: 'Roundhouse',
// 		selected: false
// 	},
// 	{
// 		name: 'Room32932',
// 		selected: false
// 	},
// 	{
// 		name: 'igre',
// 		selected: false
// 	},
// 	{
// 		name: 'sum',
// 		selected: false
// 	},
// 	{
// 		name: 'ting',
// 		selected: false
// 	},
// 	{
// 		name: 'wong',
// 		selected: false
// 	},
// ]
async function ViewPinChannelOne(PinID) {
	let channel = {
		Name: '',
		ActiveUsers: 0,
	}
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.doc(PinID)
	.get()
	.then(docSnapshot => {
		if (docSnapshot.exists) {
			channel.Name = docSnapshot.data().Name;
			channel.ActiveUsers = docSnapshot.data().ActiveUsers;
		}
		
	})
	return channel;
}

export function LocationModalOne({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const navigation = useNavigation();
	const [channelInfo, setChannelInfo] = useState()
	const [dataLoaded, setDataLoaded] = useState(false)
	
	const {selectedPinId} = useContext(LoggedInContext)

	async function getData() {
		const data = await ViewPinChannelOne(selectedPinId)
		setChannelInfo(data)
		setDataLoaded(true)
	}

	useEffect(() => {
		getData()
	}, [modalDisplay])

	if(dataLoaded === false) return null
	
	return (
		<Modal visible={modalDisplay} transparent={true}>
			<View style={styles.locationModal}>
				<View style={styles.locationImagePlaceholderSingle}/>
			
				<View style={styles.locationNameActiveAndJoinButtonContainer}>
					<Text style={styles.locationNameModal}>
						{channelInfo.Name}
					</Text> 
					<View style={styles.locationModalActiveDotContainer}>
						<Text style={styles.locationModalActive}>
							{channelInfo.ActiveUsers} people active
							
						</Text>
						<IIcon style={styles.locationModalDot} name='person' size={scale(14)} color='black'/>
					</View>
					

					<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost') : setModalDisplay(false)} setModalDisplay(false)}}>
						{channelStatus ? 
						<Text style={styles.checkInText}>Join</Text> 
						: <Text style={styles.checkedInText}>Leave</Text>}					
					</Pressable>
				</View>
				
				<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true);}}/> 
			</View>	
		</Modal>
	);
}

async function ViewPinChannelsMultiple(PinID) {
	let Channels = [];

	//console.log(PinID)
  
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.get()
	.then((querySnapshot) => {
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
			Channels.push(channel)
		})
	})
	//console.log(Channels)
	return Channels;
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

	const {selectedPinId} = useContext(LoggedInContext)

	async function getData() {
		const data = await ViewPinChannelsMultiple(selectedPinId)
		setChannels(data)
		setDataLoaded(true)
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

	return (
		<Modal visible={multipleModalDisplay} transparent={true}>
			<View style={styles.multipleLocationModal}>
				<View style={styles.multiLocationModalHeader}>
					<View style={styles.locationImagePlaceholderMulti}/>
					
					<View style={styles.locationNameActiveAndJoinButtonContainer}>
						<Text style={styles.locationNameModal}>
							UNSW Roundhouse
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
									<Pressable>
										<MIIcon name='arrow-forward-ios' size={scale(20)} color='white'/>
									</Pressable>
								</View>
							</Pressable>
								
						)
					}}>
					
					</FlatList>
				</View>
				<View style={{flex: 1, justifyContent: 'center'}}>
					<Pressable disabled={joinEnable} style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.multiCheckInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); {channelStatus ? navigation.navigate('MakeAPost', {selectedChannelID: selectedChannelID}) : setMultipleModalDisplay(false)} setMultipleModalDisplay(false)}}>
					{channelStatus ? 
					
					<Text style={[{color: channelSelected ? 'white' : '#727272'},styles.multiCheckInText]}>Join</Text> 
					: <Text style={styles.checkedInText}>Leave</Text>}					
					</Pressable> 
				</View>
					

				
			</View>	
		</Modal>
	)
}







/*
{
					multipleChannels ?  
					null
					: 
					<View style={styles.locationModal}>
						<View style={styles.locationImagePlaceholder}/>
					
						<View style={styles.locationNameActiveAndJoinButtonContainer}>
							<Text style={styles.locationNameModal}>
								UNSW Roundhouse
							</Text> 
							<Text style={{color: 'black', marginBottom: '3%', fontWeight: '600'}}>
								60 people active
							</Text>

							<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
							onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MakeAPost'); setModalDisplay(false)}}>
								{channelStatus ? 
								<Text style={styles.checkInText}>Join</Text> 
								: <Text style={styles.checkedInText}>Leave</Text>}					
							</Pressable>
						</View>
						
						<IIcon style={styles.locationModalClose} name='close-outline' size={30}
						onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/> 
					</View>
				}
*/
