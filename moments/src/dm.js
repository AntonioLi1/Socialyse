import React, { useEffect, useState, useContext} from 'react';
import { View, Pressable, Text, FlatList, TextInput, Image, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { LoggedInContext } from '../App'
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
const screenHeight = Dimensions.get("window").height

async function SendMessage(UserID, FriendID, Text) {
    // first check if messaged is false

    const messageSendTime = new Date();
  
    // make the messaged: false into true for both
	// check if messaged already
	let messagedCheck = false
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.collection('FriendsWith')
	.doc(FriendID)
	.get()
	.then(docSnapshot => {
		messagedCheck = docSnapshot.data().Messaged
	})

	if (messagedCheck === false) {
		await firestore()
		.collection('Friends')
		.doc(UserID)
		.collection('FriendsWith')
		.doc(FriendID)
		.update({
			Messaged: true
		});
		//console.log('update my friendswit')
		await firestore()
		.collection('Friends')
		.doc(FriendID)
		.collection('FriendsWith')
		.doc(UserID)
		.update({
			Messaged: true
		});
		// reduce unopened msg count
		let unopenedMsgCount = 0
		await firestore()
		.collection('Messages')
		.doc(UserID)
		.get()
		.then(docSnapshot => {
			unopenedMsgCount = docSnapshot.data().UnopenedMessages
		})
		unopenedMsgCount = unopenedMsgCount - 1
		await firestore()
		.collection('Messages')
		.doc(UserID)
		.update({
			UnopenedMessages: unopenedMsgCount
		})
	}
	
    // and then send the actual message
	await firestore()
	.collection('Messages')
	.doc(UserID)
	.collection('Chats')
	.doc(FriendID)
	.collection('IndividualMessages')
	.add({
		Sender: UserID,
		Text: Text,
		TimeSent: messageSendTime,
		Receiver: FriendID
	})

	// update messages for other person
	await firestore()
	.collection('Messages')
	.doc(FriendID)
	.collection('Chats')
	.doc(UserID)
	.collection('IndividualMessages')
	.add({
		Sender: UserID,
		Text: Text,
		TimeSent: messageSendTime,
		Receiver: FriendID
	})

  	// update the contents of the collection for yourself

	// check if Last... details exist
	let ownLastDetailsExist = false;
	await firestore()
	.collection('Messages')
	.doc(UserID)
	.collection('Chats')
	.doc(FriendID)
	.get()
	.then(docSnapshot => {
		if (docSnapshot.exists) {
			ownLastDetailsExist = true;
		}
	})
	// last details already exist, update
	if (ownLastDetailsExist == true) {
		await firestore()
		.collection('Messages')
		.doc(UserID)
		.collection('Chats')
		.doc(FriendID)
		.update({
			LastMessage: Text,
			LastMessageTime: messageSendTime, 
			LastMessageSender: UserID
		});

	}
	// last details dont exist, set
	else {
		await firestore()
		.collection('Messages')
		.doc(UserID)
		.collection('Chats')
		.doc(FriendID)
		.set({
			LastMessage: Text,
			LastMessageSender: UserID,
			LastMessageTime: messageSendTime,
			Opened: true,
			RecipientID: FriendID,
			OwnerID: UserID
		})
	}

	// update the contents of the collection for the other person
	// check if other person's last... details are written already
	let friendLastDetailsExist = false;

	await firestore()
	.collection('Messages')
	.doc(FriendID)
	.collection('Chats')
	.doc(UserID)
	.get()
	.then(docSnapshot => {
		if (docSnapshot.exists) {
			friendLastDetailsExist = true
		}
	})

	// if last... details exist, update them
	if (friendLastDetailsExist == true) {
		// check if recipient has opened the dm previously
		let hasRecipientOpenedDM = false
		await firestore()
		.collection('Messages')
		.doc(FriendID)
		.collection('Chats')
		.doc(UserID)
		.get()
		.then(docSnapshot => {
			if (docSnapshot.data().Opened == true) {
				hasRecipientOpenedDM = true	
			}
		})
		if (hasRecipientOpenedDM == true) {
			// get the other person's unopened messages count
			let friendUnopenedMessageCount = 0;
			await firestore()
			.collection('Messages')
			.doc(FriendID)
			.get()
			.then (docSnapshot => {
				if(docSnapshot.exists) {
				friendUnopenedMessageCount = docSnapshot.data().UnopenedMessages;
				}
			});

			friendUnopenedMessageCount += 1;

			// update the other person's unopened messages count
			await firestore()
			.collection('Messages')
			.doc(FriendID)
			.update({
				UnopenedMessages: friendUnopenedMessageCount
			});
		}
		
		await firestore()
		.collection('Messages')
		.doc(FriendID)
		.collection('Chats')
		.doc(UserID)
		.update({
			LastMessage: Text,
			LastMessageTime: messageSendTime,
			LastMessageSender: UserID,
			Opened: false
		})
  	} 
	// last... details dont exist, set
	else {
		await firestore()
		.collection('Messages')
		.doc(FriendID)
		.collection('Chats')
		.doc(UserID)
		.set({
			LastMessage: Text,
			LastMessageSender: UserID,
			LastMessageTime: messageSendTime,
			Opened: false,
			RecipientID: UserID,
			OwnerID: FriendID
		})
	}
}

async function reduceUnopenedMessageCount(UserID, OtherUid) {
	
	// check if dm is already opened before opening
	// check if this is a new friend first
	//console.log('Otheruid', OtherUid)
	let newFriendCheck = false
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.collection('FriendsWith')
	.doc(OtherUid)
	.get() 
	.then(docSnapshot => {
		let data = docSnapshot.data()
		newFriendCheck = data.Messaged
	})

	// have already messaged
	if (newFriendCheck == true) {
		let dmAlreadyOpenedCheck = false
		await firestore()
		.collection('Messages')
		.doc(UserID)
		.collection('Chats')
		.doc(OtherUid)
		.get()
		.then(docSnapshot => {
			dmAlreadyOpenedCheck = docSnapshot.data().Opened
		})

		if (dmAlreadyOpenedCheck == false) {
			let unopenedMessagesCount = 0
			await firestore()
			.collection('Messages')
			.doc(UserID)
			.get()
			.then(docSnapshot => {
				unopenedMessagesCount = docSnapshot.data().UnopenedMessages
			})

			// decrement count
			unopenedMessagesCount -= 1
			await firestore()
			.collection('Messages')
			.doc(UserID)
			.update({
				UnopenedMessages: unopenedMessagesCount
			})

			// make true
			await firestore()
			.collection('Messages')
			.doc(UserID)
			.collection('Chats')
			.doc(OtherUid)
			.update({
				Opened: true
			})
		}
	}
}

async function UnmatchWithUser(UserID, FriendID) {
	

	// remove from peopleliked
	await firestore()
	.collection('PeopleLiked')
	.doc(UserID)
	.collection('Users')
	.doc(FriendID)
	.delete()

	// remove from friends
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.collection('FriendsWith')
	.doc(FriendID)
	.delete()

	// remove from messages
	await firestore()
	.collection('Messages')
	.doc(UserID)
	.collection('Chats')
	.doc(FriendID)
	.delete()

	//console.log('removed from messages1')

	// reduce friend count
	let friendCount = 0
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.get()
	.then(docSnapshot => {
		friendCount = docSnapshot.data().FriendCount
	})

	friendCount = friendCount - 1
	await firestore()
	.collection('Friends')
	.doc(UserID)
	.update({
		FriendCount: friendCount
	})

	// change time of messages
	// const userMessages = await firestore()
	// .collection('Messages')
	// .doc(UserID)
	// .collection('Chats')
	// .doc(FriendID)
	// .collection('IndividualMessages')
	// .get()

	// const batch = firestore().batch()

	// userMessages.forEach(docSnapshot => {
	// 	batch.update(docSnapshot.ref, {
	// 		TimeSent: 0
	// 	})
	// })
	/////////////////////////////////

	// remove from peopleliked
	await firestore()
	.collection('PeopleLiked')
	.doc(FriendID)
	.collection('Users')
	.doc(UserID)
	.delete()

	// remove from friends
	await firestore()
	.collection('Friends')
	.doc(FriendID)
	.collection('FriendsWith')
	.doc(UserID)
	.delete()

	// remove from messages
	await firestore()
	.collection('Messages')
	.doc(FriendID)
	.collection('Chats')
	.doc(UserID)
	.delete()
	//console.log('removed from messages2')


	// reduce friend count
	let friendCount2 = 0
	await firestore()
	.collection('Friends')
	.doc(FriendID)
	.get()
	.then(docSnapshot => {
		friendCount2 = docSnapshot.data().FriendCount
	})
	
	friendCount2 = friendCount2 - 1
	await firestore()
	.collection('Friends')
	.doc(FriendID)
	.update({
		FriendCount: friendCount2
	})

	// change time of messages
	// const friendMessages = await firestore()
	// .collection('Messages')
	// .doc(FriendID)
	// .collection('Chats')
	// .doc(UserID)
	// .collection('IndividualMessages')
	// .get()

	// const batch2 = firestore().batch()

	// friendMessages.forEach(docSnapshot => {
	// 	batch2.update(docSnapshot.ref, {
	// 		TimeSent: 0
	// 	})
	// })
}

function Dm ({route, navigation}) {

    const {OtherUid, OtherUsername, OtherUserDP} = route.params;
    const { setMessageDisplay, setNotifDisplay, user } = useContext(LoggedInContext);
    const [textInput, setTextInput] = useState('')
    const [messages, setMessages] = useState()
	const [pressedSend, setPressedSend] = useState(false)

	useEffect(() => {
		reduceUnopenedMessageCount(user.uid, OtherUid)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setPressedSend(false)
		}, 80)
	}, [pressedSend])

    useEffect(() => {

		let start = new Date();

		function subtractHours(numOfHours, date = new Date()) {
			date.setHours(date.getHours() - numOfHours);
			return date;
		}

		let test = subtractHours(24, start)
        
        const subscriber = firestore()
        .collection('Messages')
        .doc(user.uid)
        .collection('Chats')
        .doc(OtherUid)
        .collection('IndividualMessages')
        .orderBy('TimeSent', 'desc')
        .where('TimeSent', '>', test)
        .onSnapshot((querySnapshot) => {
            let messagesArr = []
			if (querySnapshot !== null) {
				querySnapshot.forEach(snapshot => {
					let data = snapshot.data()
					let timeSent = new Date((data.TimeSent.nanoseconds / 1000000) + data.TimeSent.seconds * 1000)
					let hours = timeSent.getHours()
					let hoursString = ('0' + hours).slice(-2)
					let mins = timeSent.getMinutes().toString()
					let minsString = ('0' + mins).slice(-2)
					let displayTime = hoursString.concat(":",minsString)
					let TimeInSeconds = timeSent/1000
					let obj = {
						Sender: data.Sender,
						Text: data.Text, 
						DisplayTime: displayTime,
						TimeInSeconds: TimeInSeconds
					} 
					messagesArr.push(obj)
				})
			}
            setMessages(messagesArr) 
        });
        return () => subscriber()
    }, [])

	async function UnmatchAndLeave() {
		await UnmatchWithUser(user.uid, OtherUid);
		navigation.goBack()
	}

	async function UnMatchAlert() {
		Alert.alert(
			'Unmatch',
			`Are you sure you want to unmatch with ${OtherUsername}`,
			[
				{
					text: `Yes`, 
					onPress: () => {UnmatchAndLeave()}
				},
				{
					text: 'No',
					//onPress: () => console.log('Cancel Pressed'),
				},
			],
			{cancelable: false},
		);
	}

    return (
      <View style={styles.messagesScreen}>
        <View style={styles.messagesHeader}>
			<Pressable style={{}} onPress={() => {UnMatchAlert()}}>
				<IIcon name='ios-shield-sharp' size={scale(30)} color='white'/>
			</Pressable>

			<Pressable onPress={() => {navigation.navigate('OtherProfile', {FriendID: OtherUid})}}>
				<View style={{ alignItems: 'center', justifyContent: 'center'}}>
					<Image source={{uri: OtherUserDP}} style={styles.DMOtherDP}/>
					<Text style={styles.messagesHeaderUsername}>
						{OtherUsername}
					</Text> 
				</View>
			</Pressable>
			
			<Pressable style={styles.messagesBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>
			
			     
		</View>

		<View style={styles.messagesBody}>
			<FlatList
				data={messages}
				inverted={true}
				
				renderItem={({item, index}) => {
					// for one message
					if (messages.length === 1) {
						// one message by me
						if (item.Sender === user.uid) {
							// speech and time
							return (
								<View>
									<View style={{alignItems: 'center', marginBottom: '2%'}}>
										<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
											{item.DisplayTime}
										</Text>
									</View>
								
									<View style={styles.rightSpeech}>
										<Text style={styles.messageText}>
											{item.Text} 
										</Text>
									</View>
								</View>
							)
						} 
						// one message by other
						else {
							// dp and time
							return (
								<View style={{}}>
									<View style={{alignItems: 'center', marginBottom: '2%'}}>
										<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
											{item.DisplayTime}
										</Text>
									</View>
									<View style={{flexDirection: 'row'}}>
										<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
										<View style={styles.messageLeftWithDPContainer}>
											<Text style={styles.messageText}>
												{item.Text}
											</Text>
										</View>
									</View>
								</View>	
							)
						}
					} 
					// more than 1 message
					else {
						// if message sent by other
						if (item.Sender !== user.uid) {
							// message is at the top
							if (index === messages.length - 1) {
								// if message below is sent by me
								if (messages[index - 1].Sender === user.uid) {
									// show time and show dp
									return (
										<View style={{}}>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
													{item.DisplayTime}
												</Text>
											</View>
											<View style={{flexDirection: 'row'}}>
												<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
												<View style={styles.messageLeftWithDPContainer}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										</View>
									)
									
								}
								// else message below is sent by other
								else {
									// if message below send time is < 3mins
									if (messages[index - 1].TimeInSeconds - item.TimeInSeconds < 180) {
										// no dp, yes time
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={{flexDirection: 'row'}}>
													<View style={styles.messageOtherDP}/>
													<View style={[styles.messageLeftContainer]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
												
											</View>
										) 
									} 
									// else message below send time is >= 3mins
									else {
										// dp NSA, time
										return (
											<View style={{}}>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									}
								}
							}
							// else if message is bottom
							else if (index === 0) {
								// if msg above is sent by me
								if (messages[1].Sender === user.uid) {
									// if message above time >= 30min
									if (messages[0].TimeInSeconds - messages[1].TimeInSeconds >= 1800) {
										// show dp, show time
										//console.log('here')
										return (	
											<View style={{}}>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.022}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									} 
									// else message above time < 30mins
									else {
										// show dp, no time
										return (
											<View style={{}}>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									}
								} 
								// else message above sent by other
								else {
									// if message above time >= 30mins
									if (messages[0].TimeInSeconds - messages[1].TimeInSeconds >= 1800) {
										// show dp SA, show time
										return (
											<View style={{marginTop: '2%'}}>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									} 
									// else if message above time < 30mins && >= 3mins
									else if (messages[0].TimeInSeconds - messages[1].TimeInSeconds < 1800 && messages[0].TimeInSeconds - messages[1].TimeInSeconds >= 180) {
										// show dp SA, no time
										return (
											<View style={{marginTop: '2%'}}>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									} 
									// else message above time < 3mins
									else {
										// show dp NSA, no time
										return (
											<View style={{}}>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											</View>		
										)
									}
								}
							} 
							// else middle
							else {
								// if message above sent by other
								if (messages[index + 1].Sender !== user.uid) {
									// if message above time >= 30mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										// if message below sent by me
										if (messages[index - 1].Sender === user.uid) {
											// show dp SA, yes time
											return (
												<View style={{marginTop: '2%'}}>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
															{item.DisplayTime}
														</Text>
													</View>
													<View style={{flexDirection: 'row'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												</View>		
											)
										} 
										// else message below sent by other
										else {
											// if message below time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// show dp SA, yes time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
														<View style={{flexDirection: 'row'}}>
															<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
															<View style={styles.messageLeftWithDPContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											} 
											// else message below time < 3mins
											else {
												// no dp SA, yes time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
														<View style={{flexDirection: 'row'}}>
															<View style={styles.messageLeftContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
										}
									}
									// else if message above time < 30mins && >= 3mins
									else if (item.TimeInSeconds - messages[index + 1].TimeInSeconds < 1800 && item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 180) {
										// if message below sent by me
										if (messages[index - 1].Sender === user.uid) {
											// show dp SA, no time
											return (
												<View style={{marginTop: '2%'}}>
													<View style={{flexDirection: 'row'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												</View>		
											)
										}
										// else message below sent by other
										else {
											// if message below time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// show dp SA, no time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{flexDirection: 'row'}}>
															<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
															<View style={styles.messageLeftWithDPContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											} 
											// else message below time < 3mins
											else {
												// no dp SA, no time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{flexDirection: 'row'}}>
															<View style={styles.messageOtherDP}/>
															<View style={styles.messageLeftContainerNoSpace}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
										} 
									}
									// else message above time < 3mins
									else {
										// if message below sent by me
										if (messages[index - 1].Sender === user.uid) {
											// show dp NSA, no time
											return (
												<View style={{}}>
													<View style={{flexDirection: 'row'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												</View>		
											)
										}
										// else message below sent by other
										else {
											// if message below time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// show dp NSA, no time
												return (
													<View style={{}}>
														<View style={{flexDirection: 'row'}}>
															<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
															<View style={styles.messageLeftWithDPContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											} else {
												// no dp NSA, no time
												return (
													<View style={{}}>
														<View style={{flexDirection: 'row'}}>
															<View style={styles.messageOtherDP}/>
															<View style={styles.messageLeftContainerNoSpace}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
										}
									}
								}
								// else message above sent by me
								else {
									// if message above time >= 30mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										// if message below sent by me
										if (messages[index - 1].Sender === user.uid) {
											// show dp NSA, show time
											return (
												<View style={{}}>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
															{item.DisplayTime}
														</Text>
													</View>
													<View style={{flexDirection: 'row'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												</View>		
											)
										} 
										// else message below send by other
										else {
											// if message below time >= 3mins
											if (messages[index - 1].TimeInSeconds - index.TimeInSeconds >= 180) {
												// show dp NSA, no time
												return (
													<View style={{}}>
														<View style={{flexDirection: 'row'}}>
															<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
															<View style={styles.messageLeftWithDPContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
											// else message below time < 3mins
											else {
												// no dp, show time
												return (
													<View style={{}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
														<View style={{flexDirection: 'row'}}>
															<View style={styles.messageLeftContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
										}
									}
									// else message above time < 30mins
									else {
										// if message below sent by me
										if (messages[index - 1].Sender === user.uid) {
											// show dp NSA, no time
											return (
												<View style={{}}>
													<View style={{flexDirection: 'row'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												</View>		
											)
										}
										// else message below sent by other
										else {
											// if message below time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// show dp NSA, no time
												return (
													<View style={{}}>
														<View style={{flexDirection: 'row'}}>
															<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
															<View style={styles.messageLeftWithDPContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
											// else message below time < 3mins
											else {
												// no dp, no time
												return (
													<View style={{}}>
														<View style={{flexDirection: 'row'}}>
															<View style={styles.messageOtherDP}/>
															<View style={styles.messageLeftContainer}>
																<Text style={styles.messageText}>
																	{item.Text}
																</Text>
															</View>
														</View>
													</View>		
												)
											}
										}
									}
								}
							} 
						}
						// if message sent by me
						else {
							// if message is top
							if (index === messages.length - 1) {
								// if message below sent by me
								if (messages[index - 1].Sender === user.uid) {
									// if message below time < 3mins
									if (messages[index - 1].TimeInSeconds - item.TimeInSeconds < 180) {
										// normal, yes time
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={styles.messageRightContainer}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)
									} 
									// else message below time >= 3mins
									else {
										// speech, yes time
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
														{item.DisplayTime}
													</Text>
												</View>
											
												<View style={[styles.rightSpeech, { marginBottom: '2%'}]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)
									}
								}
								// else message below is sent by other
								else {
									// speech, yes time
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
													{item.DisplayTime}
												</Text>
											</View>
										
											<View style={[styles.rightSpeech, { marginBottom: '2%'}]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
											</View>
										</View>
									)
								}
							}
							// else if message is on the bottom
							else if (index === 0) {
								// if message above sent by me
								if (messages[index + 1].Sender === user.uid) {
									// if message above time < 3mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds < 180) {
										// speech NSA, no time
										return (
											<View style={[styles.rightSpeech]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
											</View>
										)
									}
									// else if message above time < 30mins && >= 3mins
									else if (item.TimeInSeconds - messages[index + 1].TimeInSeconds < 1800 && item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 180) {
										// speech SA, no time
										return (
											<View style={{marginTop: '2%'}}>
												<View style={[styles.rightSpeech]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)
									} 
									// else message above time > 30mins
									else {
										// speech SA, time
										// console.log('time',item.TimeInSeconds - messages[index + 1].TimeInSeconds)
										// console.log('item seconds', item.TimeInSeconds)
										// console.log('above seonds', messages[index + 1])
										return (
											<View style={{marginTop: '2%'}}>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
														{item.DisplayTime}
													</Text>
												</View>
											
												<View style={[styles.rightSpeech]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)
									}
								}
								// else message above sent by other
								else {
									// if message above time >= 30mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										// speech, yes time
										return (
											<View style={{}}>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
														{item.DisplayTime}
													</Text>
												</View>
											
												<View style={[styles.rightSpeech]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)
									} 
									// else message above time < 30mins
									else {
										// speech no time
										return (
											<View style={{}}>
												<View style={[styles.rightSpeech, { marginBottom: '2%'}]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
												</View>
											</View>
										)

									}
								}
							}
							// else mesage is in middle
							else {
								// if mesage above sent by other
								if (messages[index + 1].Sender !== user.uid) {
									// if message above send time >= 30mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										// if message below snet by other
										if (messages[index - 1].Sender !== user.uid) {
											// speech, yes time
											return (
												<View style={{}}>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
															{item.DisplayTime}
														</Text>
													</View>
												
													<View style={[styles.rightSpeech]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											)
										}
										// else message below sent by me
										else {
											// if message below send time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// speech SA, show time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
													
														<View style={[styles.rightSpeech]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											} 
											// else message below send time < 3mins
											else {
												// no speech SA, show time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
													
														<View style={[styles.messageRightContainer]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
										}
									}
									// else message aove sned time < 30mins
									else {
										// if message below sent by other
										if (messages[index - 1].Sender !== user.uid) {
											//speech no time
											return (
												<View style={{}}>
													<View style={[styles.rightSpeech]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											)
										}
										// else message below sent by me
										else {
											// if message below send time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// speech, no time
												return (
													<View style={{}}>
														<View style={[styles.rightSpeech]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)

											}
											// else message below send time < 3mins
											else {
												// normal, no time
												return (
													<View style={{}}>
														<View style={[styles.messageRightContainer]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
										}
									}
										
								}
								// else message above sent by me
								else {
									// if message above time >= 30mins
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										// if mesage below sent by other
										if (messages[index - 1].Sender !== user.uid) {
											// speech NSA, show time
											return (
												<View style={{}}>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
															{item.DisplayTime}
														</Text>
													</View>
												
													<View style={[styles.rightSpeech]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											)
										}
										// if message below sent by me
										else {
											// if message below send time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// speech SA, show time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
													
														<View style={[styles.rightSpeech]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
											// else message below send time < 3mins
											else {
												// normal SA, show time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={{alignItems: 'center', marginBottom: '2%'}}>
															<Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: screenHeight * 0.02}}>
																{item.DisplayTime}
															</Text>
														</View>
													
														<View style={[styles.messageRightContainer]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
										}
									}
									// else if message above time < 30mins && >= 3mins
									else if (item.TimeInSeconds - messages[index + 1].TimeInSeconds < 1800 && item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 180) {
										// if mesage below sent by other
										if (messages[index - 1].Sender !== user.uid) {
											// speech NSA, no time
											return (
												<View style={{}}>
													<View style={[styles.rightSpeech]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											)
										}
										// else message below sent by me
										else {
											// if message belwo send time >= 3mins
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// speech SA, no time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={[styles.rightSpeech]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
											// else message below send time < 3mins
											else {
												// normal SA, no time
												return (
													<View style={{marginTop: '2%'}}>
														<View style={[styles.messageRightContainer]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
										}
									}
									// else mesage above time < 3mins
									else {
										// if mesage below sent by other
										if (messages[index - 1].Sender !== user.uid) {
											// speech NSA, no time
											return (
												<View style={{}}>
													<View style={[styles.rightSpeech]}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
													</View>
												</View>
											)
										} 
										// else message below sent by me
										else {
											// if message below snet time >= 3mins	
											if (messages[index - 1].TimeInSeconds - item.TimeInSeconds >= 180) {
												// speech NSA, no time
												return (
													<View style={{}}>
														<View style={[styles.rightSpeech]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
											// else message below sent time < 3mins
											else {
												// normal NSA, no time
												return (
													<View style={{}}>
														<View style={[styles.messageRightContainer]}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
														</View>
													</View>
												)
											}
										}
									}
								}
							}
						}
						
					}
				}}
				> 
				</FlatList>
            </View>
			
			<KeyboardAvoidingView behavior='padding' style={{marginBottom: '5%'}}>
				<View style={styles.messagesFooter}>
					<TextInput
					style={styles.messageInput}
					placeholder='Send a message'
					onChangeText={(text) => {setTextInput(text)}}
					value={textInput}
					/> 
					<Pressable style={styles.messageSendButton} onPress={() => {SendMessage(user.uid, OtherUid, textInput); setTextInput(''); setPressedSend(true)}}>
						<IIcon name="ios-send" size={scale(23)} color={pressedSend ? 'grey' : 'white'}/>
					</Pressable>
					
				</View>
			</KeyboardAvoidingView>
        </View>
    )
}
export default Dm;

                    

