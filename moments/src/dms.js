import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, SafeAreaView, Image, FlatList } from 'react-native';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'

function DmDisplay({navigation}) {

	const [newFriendsArray, setNewFriendsArray] = useState()
	const [messagesArray, setMessagesArray] = useState()
	const [dataLoaded1, setDataLoaded1] = useState(false)
	const [dataLoaded2, setDataLoaded2] = useState(false)
	const [backButtonPressed, setBackButtonPressed] = useState(false)

	const { user, dpURL } = useContext(LoggedInContext);

	useEffect(() => {
        const subscriber = firestore()
        .collection('Messages')
        .doc(user.uid)
        .collection('Chats')
        .orderBy('LastMessageTime', 'desc')
        .limit(30)
        .onSnapshot(async (querySnapshot) => {
			let DMs = []
			if (querySnapshot !== null) {
				for (let i = 0; i < querySnapshot.size; i++) {
					let snapshot = querySnapshot.docs[i]
					let data = snapshot.data()

					let dataObj = {
						LastMessage: '',
						LastMessageSender: '',
						LastMessageSendTime: null,
						Opened: null,
						ProfilePic: '',
						RecipientID: '',
						Username: ''
					}
					
					const docSnapshot = await firestore()
					.collection("UsernameAndDP")
					.doc(data.RecipientID)
					.get()
					dataObj.ProfilePic = docSnapshot.data().ProfilePic
					dataObj.LastMessage = data.LastMessage
					dataObj.LastMessageSender = data.LastMessageSender
					dataObj.LastMessageSendTime = data.LastMessageSendTime
					dataObj.Opened = data.Opened
					dataObj.RecipientID = data.RecipientID
					dataObj.Username = docSnapshot.data().Username
					DMs.push(dataObj)
				}
			}
            
			setMessagesArray(DMs)
            setDataLoaded1(true)
        });
        return () => subscriber()
    }, [])

    useEffect(() => {
        const subscriber = firestore()
        .collection('Friends')
        .doc(user.uid)
        .collection('FriendsWith')
        .where('Messaged', '==', false)
        .onSnapshot(async (querySnapshot) => {
            let unmessagedFriends = []
			if (querySnapshot !== null) {
				for (let i = 0; i < querySnapshot.size; i++) {
					let snapshot = querySnapshot.docs[i]
					let data = snapshot.data()
					let friend = {
						ProfilePic: '',
						Username: '',
						Uid: '',
					};
					const docSnapshot = await firestore()
					.collection('UsernameAndDP')
					.doc(data.Uid)
					.get()
					friend.ProfilePic = docSnapshot.data().ProfilePic
					friend.Username = docSnapshot.data().Username;
					friend.Uid = snapshot.data().Uid
					unmessagedFriends.push(friend)
				}
			}
            setNewFriendsArray(unmessagedFriends)
            setDataLoaded2(true)
        });
        return () => subscriber()
    })

	useEffect(() => {
		setTimeout(() => {
			setBackButtonPressed(false)
		}, 100)
	}, [backButtonPressed])

	if (dataLoaded1 == false && dataLoaded2 == false) {
		return (
			<SafeAreaView style={styles.loadingScreen}>
				<Text style={styles.loadingSocialyseText}>
				SOCIALYSE
				</Text>
			</SafeAreaView>
		)
	}
 
	return (
		<SafeAreaView style={styles.DMScreen}>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')}>
					<Image source={{uri: dpURL}} style={{height: '100%', width: '100%', borderRadius: 100,}}/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={scale(37)} color='white'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => {navigation.goBack(); setBackButtonPressed(true)}}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color={backButtonPressed ? 'grey' : 'white'}/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={styles.newFriendsText}>
					New Friends
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
				Messages
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
									<OIcon style={{marginLeft: '40%'}}name='dot-fill' size={scale(18)} color='#96B9FE'/>															
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
										<Text style={styles.lastMessage}>
											{item.LastMessage}
										</Text> 
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
