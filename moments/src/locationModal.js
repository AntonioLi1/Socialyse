import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import { template } from '@babel/core';

// have a property that checks if use is checked in when openng the location modal again
const pinData = [
	{
		name: 'Law Lib',
		selected: false
	},
	{
		name: 'BSOC',
		selected: false
	},
	{
		name: 'Main',
		selected: false
	},
	{
		name: 'Roundhouse',
		selected: false
	},
	{
		name: 'Room32932',
		selected: false
	},
	{
		name: 'igre',
		selected: false
	},
	{
		name: 'sum',
		selected: false
	},
	{
		name: 'ting',
		selected: false
	},
	{
		name: 'wong',
		selected: false
	},
]

export function LocationModalOne({modalDisplay, setModalDisplay, setMessageDisplay, setNotifDisplay}) {

	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const [multipleChannels, setMultipleChannels] = useState(false);
	const navigation = useNavigation();
	

	
	return (
		<Modal visible={modalDisplay} transparent={true}>
			<View style={styles.locationModal}>
				<View style={styles.locationImagePlaceholderSingle}/>
			
				<View style={styles.locationNameActiveAndJoinButtonContainer}>
					<Text style={styles.locationNameModal}>
						UNSW Roundhouse
					</Text> 
					<Text style={styles.locationModalActive}>
						60 people active
						<EIcon name='dot-single' size={50}/>
					</Text>

					<Pressable style={[{ backgroundColor: isPressed ? 'white' : 'black' }, styles.checkInButton ]} 
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MakeAPost'); setModalDisplay(false)}}>
						{channelStatus ? 
						<Text style={styles.checkInText}>Join</Text> 
						: <Text style={styles.checkedInText}>Leave</Text>}					
					</Pressable>
				</View>
				
				<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
				onPress={() => {setModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/> 
			</View>	
				
				
			
		</Modal>
	);
}

export function LocationModalMultiple ({multipleModalDisplay, setMultipleModalDisplay, setMessageDisplay, setNotifDisplay}) {
	
	const [isPressed, setIsPressed] = useState(false);
	const [channelStatus, setChannelStatus] = useState(true);
	const [channelSelected, setChannelSelected] = useState(false);
	const navigation = useNavigation();
	const [joinEnable, setJoinEnable] = useState(true)

	useEffect(() => {
		let counter = 0
		while (counter < pinData.length) {
			if (pinData[counter].selected === true) {
				setChannelSelected(true)
				setJoinEnable(false)
			}
			counter++
		}
	}, [channelSelected])

	console.log(joinEnable)
	return (
		<Modal visible={multipleModalDisplay} transparent={true}>
			<View style={styles.multipleLocationModal}>
				<View style={styles.multiLocationModalHeader}>
					<View style={styles.locationImagePlaceholderMulti}/>
					
					<View style={styles.locationNameActiveAndJoinButtonContainer}>
						<Text style={styles.locationNameModal}>
							UNSW Roundhouse
						</Text> 
						<Text style={styles.locationModalActive}>
							60 people active
							<EIcon name='dot-single' size={scale(11)} color='#28FD15'/>
						</Text>

						
					</View>
					
					<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
					onPress={() => {setMultipleModalDisplay(false); setMessageDisplay(true); setNotifDisplay(true)}}/>
				</View>
				<View style={{flex: 5}}>
					<FlatList
					numColumns={1} 
                	data={pinData} 
					renderItem={({item, index}) => 
					{
						//console.log(item.selected, item.channel)
						return (
							<Pressable onPress={() => {setChannelSelected(!channelSelected); item.selected = !item.selected; 
								{
								let counter = 0
								while (counter < pinData.length) {
									if (counter !== index) {
										pinData[counter].selected = false
									}
									counter++
								}
							}}}>
								<View style={[{backgroundColor: item.selected ? '#729BEB':'#96B9FE'}, styles.multiLocationModalChannelContainer]}>
									<Text style={{color: 'white', fontWeight: '600'}}>
										{item.name}
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
					onPress={() => {setIsPressed(!isPressed); setChannelStatus(!channelStatus); navigation.navigate('MakeAPost'); setMultipleModalDisplay(false)}}>
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
