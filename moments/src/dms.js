import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, ScrollView, SafeAreaView, Image, FlatList } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'
import storage from '@react-native-firebase/storage';

// async function ViewDMs(UserID) {
// 	// seeing your list of messages to view
// 	let DMs = [];
  
// 	await firestore()
// 	.collection('Messages')
// 	.doc(UserID)
// 	.collection('Chats')
// 	.orderBy('LastMessageTime', 'desc')
// 	.limit(30)
// 	.get()
// 	.then((querySnapshot) => {
// 	  	querySnapshot.forEach(snapshot => {
// 		  let data = snapshot.data()
// 		  console.log('messages data', data)
// 		  DMs.push(data)
// 	  })
// 	});
// 	//console.log('dms', DMs)
// 	return DMs;
// }

function DmDisplay({navigation}) {

	const [newFriendsArray, setNewFriendsArray] = useState()
	const [messagesArray, setMessagesArray] = useState()
	const [dataLoaded1, setDataLoaded1] = useState(false)
	const [dataLoaded2, setDataLoaded2] = useState(false)

	const { user, dpURL } = useContext(LoggedInContext);

	// async function getData() {
	// 	const newFriendsData = await ViewNewFriends(user.uid)
	// 	setNewFriendsArray(newFriendsData)
	// 	setDataLoaded(true)
	// }

	useEffect(() => {
		firestore()
		.collection('Messages')
		.doc(user.uid)
		.collection('Chats')
		.orderBy('LastMessageTime', 'desc')
		.limit(30)
		.onSnapshot((querySnapshot) => {
			let DMs = []
			querySnapshot.forEach(snapshot => {
			let data = snapshot.data()
			//console.log('messages data', data)
			DMs.push(data)
			})
			setMessagesArray(DMs)
			setDataLoaded1(true)
		});
	}, [])

	useEffect(() => {
		firestore()
		.collection('Friends')
		.doc(user.uid)
		.collection('FriendsWith')
		.where('Messaged', '==', false)
		.onSnapshot((querySnapshot) => {
			let unmessagedFriends = []
			querySnapshot.forEach(snapshot => {
				let friend = {
					ProfilePic: '',
					Username: '',
					Uid: '',
				};
				friend.ProfilePic = snapshot.data().ProfilePic
				friend.Username = snapshot.data().Username;
				friend.Uid = snapshot.data().Uid
				unmessagedFriends.push(friend)
			})
			setNewFriendsArray(unmessagedFriends)
			setDataLoaded2(true)
		});
	})

	//console.log(newFriendsArray)

	if (dataLoaded1 == false && dataLoaded2 == false) return null
 
	return (
		<SafeAreaView style={styles.DMScreen}>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')}>
					<Image source={{uri: dpURL}} style={{height: '100%', width: '100%', borderRadius: 100,}}/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={scale(37)} color='white'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={styles.newFriendsText}>
					NEW FRIENDS
				</Text> 

				<FlatList
				numColumns={1} 
                data={newFriendsArray} 
				horizontal={true}
				renderItem={({item}) => 
				{
                    return (
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: item.Uid, OtherUsername: item.Username, OtherUserDP: item.ProfilePic})}}>
							<View style={styles.newConnectionProfile}>
								<Image source={{uri: item.ProfilePic}} style={styles.newConnectionProfilePic}/>
								<Text style={styles.newConnectionUsername} numberOfLines={1}>
									{item.Username}
								</Text>
							</View>
						</Pressable> 
					)
				}}>

				</FlatList>
			</View>

			<Text style={styles.messagesText}>
				MESSAGES
			</Text>
		
			<View style={styles.allDmsContainer}>
				<FlatList
				numColumns={1} 
                data={messagesArray} 
				renderItem={({item}) => 
				{
                    return (
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: item.RecipientID, OtherUsername: item.Username, OtherUserDP: item.ProfilePic})}}>
							{
								item.Opened === false && item.LastMessageSender !== user.uid ?
								// unopened message from other user
								<View style={styles.dm}>
									<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: item.RecipientID})}}>
										<Image source={{uri: item.ProfilePic}} style={styles.messagesProfilePic}/>
									</Pressable>
								
									<View style={styles.usernameAndLastMessageContainer}>
										<Text style={styles.usernameUnread}>
											{item.Username}
										</Text>									
										<Text style={styles.lastMessageUnread}>
											{item.LastMessage}		
										</Text> 																																			
									</View>	
									<OIcon style={{marginLeft: '30%'}}name='dot-fill' size={scale(18)} color='#96B9FE'/>															
								</View>
								:
								// all other instances
								<View style={styles.dm}>
									<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: item.RecipientID})}}>
										<Image source={{uri: item.ProfilePic}} style={styles.messagesProfilePic}/>
									</Pressable>

									<View style={styles.usernameAndLastMessageContainer}>
										<Text style={styles.username}>
											{item.Username}
										</Text>									
									{
										item.LastMessageSender === user.uid ? 
										<View style={{flexDirection: 'row', alignItems: 'center'}}>
											<ADIcon name="back" size={scale(12)} color="white"/>
											<Text style={styles.myLastMessage}>
												{item.LastMessage}
											</Text>
										</View>
										: 
										<Text style={styles.lastMessage}>
											{item.LastMessage}
										</Text> 
									}
									</View>
												
								</View>
							}
						</Pressable>
					)
				}}>

				</FlatList>
			</View>
			
		</SafeAreaView>
	)
}

export default DmDisplay;

				{/* <ScrollView horizontal>
					{newFriendsArray.map((dm)=>
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: dm.Uid, OtherUsername: dm.Username, OtherUserDP: dm.ProfilePic})}}>
							<View style={styles.newConnectionProfile}>
								
								<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: dm.Uid})}}>
									<Image source={{uri: dm.ProfilePic}} style={styles.newConnectionProfilePic}/>
								</Pressable>
									
								
								
								<Text style={styles.newConnectionUsername} numberOfLines={1}>
									{dm.Username}
								</Text>
							</View>
						</Pressable> 
						)		
					}
				</ScrollView> */}

{/* <ScrollView>
					{messagesArray.map((dm) => 					
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: dm.RecipientID, OtherUsername: dm.Username, OtherUserDP: dm.ProfilePic})}}>
							{
								dm.Opened === false && dm.LastMessageSender !== user.uid ?
								// unopened message from other user
								<View style={styles.dm}>
									<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: dm.RecipientID})}}>
										<Image source={{uri: dm.ProfilePic}} style={styles.messagesProfilePic}/>
									</Pressable>
								
									<View style={styles.usernameAndLastMessageContainer}>
										<Text style={styles.usernameUnread}>
											{dm.Username}
										</Text>									
										<Text style={styles.lastMessageUnread}>
											{dm.LastMessage}		
										</Text> 																																			
									</View>	
									<OIcon style={{marginLeft: '30%'}}name='dot-fill' size={scale(18)} color='#96B9FE'/>															
								</View>
								:
								// all other instances
								<View style={styles.dm}>
									<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: dm.RecipientID})}}>
										<Image source={{uri: dm.ProfilePic}} style={styles.messagesProfilePic}/>
									</Pressable>

									<View style={styles.usernameAndLastMessageContainer}>
										<Text style={styles.username}>
											{dm.Username}
										</Text>									
									{
										dm.LastMessageSender === user.uid ? 
										<View style={{flexDirection: 'row', alignItems: 'center'}}>
											<ADIcon name="back" size={scale(12)} color="white"/>
											<Text style={styles.myLastMessage}>
												{dm.LastMessage}
											</Text>
										</View>
										: 
										<Text style={styles.lastMessage}>
											{dm.LastMessage}
										</Text> 
									}
									</View>
												
								</View>
							}
						</Pressable>
						)
					}
				</ScrollView>	 */}