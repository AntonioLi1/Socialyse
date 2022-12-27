import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'
import storage from '@react-native-firebase/storage';


// const dms = [
// 	{
// 		username: 'fwqei',
// 		lastMessage: 'weih',
// 		key: 1
// 	},
// 	{
// 		username: 'wef',
// 		lastMessage: 'refbh',
// 		key: 2
// 	},
// 	{
// 		username: 'qwd',
// 		lastMessage: 'fytnj',
// 		key: 3
// 	},
// 	{
// 		username: 'e5rh',
// 		lastMessage: 'ersbg',
// 		key: 4
// 	},
// 	{
// 		username: 'tyuk',
// 		lastMessage: 'we',
// 		key: 5
// 	},
// 	{
// 		username: 'wfq',
// 		lastMessage: 'wqwe',
// 		key: 6
// 	},
// 	{
// 		username: 'tyweuk',
// 		lastMessage: 'wewerg',
// 		key: 7
// 	},
// 	{
// 		username: 'tyweuk',
// 		lastMessage: 'wewerg',
// 		key: 8
// 	},
// 	{
// 		username: 'tyweuk',
// 		lastMessage: 'wewerg',
// 		key: 9
// 	},
// 	{
// 		username: 'tyweuk',
// 		lastMessage: 'wewerg',
// 		key: 10
// 	},
	
// ]

async function ViewNewFriends(UserID) {
	let unmessagedFriends = [];
  
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.collection('FriendsWith')
	.where('Messaged', '==', false)
	.get()
	.then(querySnapshot => {
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
	});
	//console.log('unmessagedFriends', unmessagedFriends)
	return unmessagedFriends;
}

async function ViewDMs(UserID) {
	// seeing your list of messages to view
	let DMs = [];
  
	await firestore()
	.collection('Messages')
	.doc(UserID)
	.collection('Chats')
	.orderBy('LastMessageTime', 'desc')
	.limit(30)
	.get()
	.then((querySnapshot) => {
	  	querySnapshot.forEach(snapshot => {
		  let data = snapshot.data()
		  //console.log('messages data', data)
		  DMs.push(data)
	  })
	});
	//console.log('dms', DMs)
	return DMs;
}



function DmDisplay({navigation}) {

	const [newFriendsArray, setNewFriendsArray] = useState()
	const [messagesArray, setMessagesArray] = useState()
	const [dataLoaded, setDataLoaded] = useState(false)

	const { user, dpURL } = useContext(LoggedInContext);

	async function getData() {
		const newFriendsData = await ViewNewFriends(user.uid)
		setNewFriendsArray(newFriendsData)
		const messagesData = await ViewDMs(user.uid)
		setMessagesArray(messagesData)
		setDataLoaded(true)
	}

	useEffect(() => {
		getData()
	}, [])

	//console.log(newFriendsArray)
	if (dataLoaded != true) return null;

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

				<ScrollView horizontal>
					{newFriendsArray.map((dm)=>
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: dm.Uid, OtherUsername: dm.Username, OtherUserDP: dm.ProfilePic})}}>
							<View style={styles.newConnectionProfile}>
								
								<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: dm.Uid})}}>
									<Image source={{uri: dm.ProfilePic}} style={styles.newConnectionProfilePic}/>
								</Pressable>
									
								
								
								<Text style={styles.newConnectionUsername} >
									{dm.Username}
								</Text>
							</View>
						</Pressable> 
						)		
					}
				</ScrollView>
			</View>

			<Text style={styles.messagesText}>
				MESSAGES
			</Text>
		
			<View style={styles.allDmsContainer}>
				<ScrollView>
					{messagesArray.map((dm) => 					
						<Pressable onPress={() => {navigation.navigate('Dm', {OtherUid: dm.RecipientID, OtherUsername: dm.Username, OtherUserDP: dm.ProfilePic})}}>
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
						</Pressable>
						)
					}
				</ScrollView>	
			</View>
			
		</SafeAreaView>
	)
}

export default DmDisplay;
/*

*/