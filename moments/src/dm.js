import React, { useEffect, useState, useContext, useTransition} from 'react';
import { View, Pressable, Text, FlatList, TextInput, SafeAreaView, Image, Keyboard, Animated } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { LoggedInContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import { ComposedGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
//import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
//import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

async function SendMessage(UserID, FriendID, Text) {
    // first check if messaged is false
    let messaged = false;
    // console.log(FriendID)
    // console.log('text',Text)

    // get FriendID's username
    let friendUsername = ''
    await firestore()
    .collection('Users')
    .doc(FriendID)
    .get()
    .then(docSnapshot => {
        friendUsername = docSnapshot.data().Username
    })

    // get own username
    let ownUsername = ''
    await firestore()
    .collection('Users')
    .doc(UserID)
    .get()
    .then (docSnapshot => {
        ownUsername = docSnapshot.data().Username
    })
    
    const messageSendTime = new Date();
  
    // if false turn true
    await firestore()
    .collection('Friends')
    .doc(UserID)
    .collection('FriendsWith')
    .doc(FriendID)
    .get()
    .then (docSnapshot => {
      if(docSnapshot.exists) {
        if (docSnapshot.data().Messaged == false) {
            messaged = true;
        }
      }
    });
    // update the true if needed
    if (messaged == true) {
      await firestore()
      .collection('Friends')
      .doc(UserID)
      .collection('FriendsWith')
      .doc(FriendID)
      .update({
        Messaged: true
      });
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
    TimeSent: messageSendTime 
  })
  // this part
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
        Opened: false,
        ProfilePic: 'https://firebasestorage.googleapis.com/v0/b/socialyse-dcb8b.appspot.com/o/ProfilePics%2F16a2066d261a38a5ba3bff2e101acb93.jpg?alt=media&token=99f5de0d-6f91-499e-8aaf-f7b3e226c341',
        Username: friendUsername
    })
  }

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
    TimeSent: messageSendTime
  })

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
				//console.log('friendUnopenedMessageCount', friendUnopenedMessageCount)
				}
			});

			friendUnopenedMessageCount += 1;

			// update the other person's unopened messages count
			// ERROR
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
		//console.log('friendLastDetailsExist', friendLastDetailsExist)
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
			ProfilePic: 'https://firebasestorage.googleapis.com/v0/b/socialyse-dcb8b.appspot.com/o/ProfilePics%2F16a2066d261a38a5ba3bff2e101acb93.jpg?alt=media&token=99f5de0d-6f91-499e-8aaf-f7b3e226c341',
			Username: ownUsername
		})
	}

	
}

async function reduceUnopenedMessageCount(UserID, OtherUid) {
	
	// check if dm is already opened before opening
	//console.log('OtherUid', OtherUid)
	let dmAlreadyOpenedCheck = false
	await firestore()
	.collection('Messages')
	.doc(UserID)
	.collection('Chats')
	.doc(OtherUid)
	.get()
	.then(docSnapshot => {
		//console.log('docSnapshot.data().Opened', docSnapshot.data().Opened)
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

function Dm ({route, navigation}) {

    const {OtherUid, OtherUsername, OtherUserDP} = route.params;
    //console.log(OtherUid)
    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user } = useContext(LoggedInContext);
    const [textInput, setTextInput] = useState('')
    const [messages, setMessages] = useState()
	const [viewMessageSendTime, setViewMessageSendTime] = useState(false)

    //console.log(user)
	useEffect(() => {
		//console.log('useeffect otheruid', OtherUid)
		reduceUnopenedMessageCount(user.uid, OtherUid)
	}, [])

    useEffect(() => {
        
        const subscriber = firestore()
        .collection('Messages')
        .doc(user.uid)
        .collection('Chats')
        .doc(OtherUid)
        .collection('IndividualMessages')
        .orderBy('TimeSent', 'desc')
        .limit(100)
        .onSnapshot((querySnapshot) => {
            let messagesArr = []
            querySnapshot.forEach(snapshot => {
				//console.log('snapdata', snapshot.data())
                let data = snapshot.data()
                let timeSent = new Date((data.TimeSent.nanoseconds / 1000000) + data.TimeSent.seconds * 1000)
                let hours = timeSent.getHours()
                let hoursString = ('0' + hours).slice(-2)
                let mins = timeSent.getMinutes().toString()
                let minsString = ('0' + mins).slice(-2)
                let displayTime = hoursString.concat(":",minsString)
                let timeInSeconds = timeSent/1000
                let obj = {
                    Sender: data.Sender,
                    Text: data.Text, 
                    DisplayTime: displayTime,
                    TimeInSeconds: timeInSeconds
                } 
                //console.log('obj',obj)
                messagesArr.push(obj)
				//console.log('messagesARR', messagesArr)
            })
            setMessages(messagesArr) 
        });
        
        return () => subscriber()
    }, [])



    
    return (
      <SafeAreaView style={styles.messagesScreen}>
        <View style={styles.messagesHeader}>
			<Text style={styles.messagesHeaderUsername}>
				{OtherUsername}
			</Text>  
			<Pressable style={styles.messagesBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>     
		</View>
            {/* put flatlist inside the view below */}
		<View style={styles.messagesBody}>
			<FlatList
				data={messages}
				inverted={true}
				
				renderItem={({item, index}) => {
					// console.log('flatlist', item)
					// console.log('messages', messages)
					// if only 1 message
					if (messages.length == 1) {
						// sent by other
						if (item.Sender != user.uid) {
							{console.log('you')}
							return (
								<View>
									<View style={{alignItems: 'center', marginBottom: '2%'}}>
										<Text style={{color: 'white'}}>
											{item.DisplayTime}
										</Text>
									</View>
									<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
									<View style={styles.messageLeftContainer}>
										<Text style={styles.messageText}>
											{item.Text}
										</Text>
										{/* <Text style={styles.messageTime}>
											{item.DisplayTime}
										</Text> */}
									</View>
								</View>		
							)
								
						} 
						// sent by me
						else {
							{console.log('me')}
							{console.log('item',item)}
							return (
								<View>
									<View style={{alignItems: 'center', marginBottom: '2%'}}>
										<Text style={{color: 'white'}}>
											{item.DisplayTime}
										</Text>
									</View>
								
									<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
										<Text style={styles.messageText}>
											{item.Text} 
										</Text>
									</View>
								</View>
							)
								
						}
					} else {
						// sent by other person 
						if (item.Sender != user.uid) {
							// when message is at top
							if (index === messages.length - 1) {
								
								// if message below is from me, show dp
								if(messages[messages.length - 2] == user.uid) {
									return (
										
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
											<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
											<View style={styles.messageLeftContainer}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
										
									)                                
								} 
								// if message below is from other in > 3mins, show dp                            
								else if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
									return (
										
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
											<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
											<View style={styles.messageLeftContainer}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>									
									)
								} 
								// normal
								else {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
											<View style={styles.messageLeftContainer}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>										
									)
								}                  
							} 
							// when message is at bottom and from other
							else if (index === 0) {
								// above message is more than 30mins earlier
								if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
											<View style={{flexDirection: 'row', backgroundColor: 'red'}}>
												<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
												<View style={styles.messageLeftWithDPContainer}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
													{/* <Text style={styles.messageTime}>
														{item.DisplayTime}
													</Text> */}
												</View>
											</View>
										</View>
									)	         
								} else {
									return (
										<View style={{flexDirection: 'row', backgroundColor: 'red'}}>
											<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
											<View style={styles.messageLeftWithDPContainer}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
									)         
								}
								
							} 
							
							// message is in the middle somewhere
							else {
								// if message below is from me
								if (messages[index - 1].Sender === user.uid) {
									// above message is more than 30mins earlier
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white'}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={{flexDirection: 'row'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
														{/* <Text style={styles.messageTime}>
															{item.DisplayTime}
														</Text> */}
													</View>
												</View>
											</View>
										)
										
									} else {
										return (													
											<View style={{flexDirection: 'row'}}>
												<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
												<View style={styles.messageLeftWithDPContainer}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
													{/* <Text style={styles.messageTime}>
														{item.DisplayTime}
													</Text> */}
												</View>
											</View>
										)        
									}
									
								}
								// if message below is from other
								else {
									// message below is more than 3mins away
									if ((messages[index - 1].TimeInSeconds - item.TimeInSeconds) >= 180) {
										// above message is more than 30mins earlier
										if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
											return (
												<View>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white'}}>
															{item.DisplayTime}
														</Text>
													</View>
													<View style={{flexDirection: 'row', marginBottom: viewMessageSendTime ? '0%' : '2%'}}>
														<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
														<View style={styles.messageLeftWithDPContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
															{/* <Text style={styles.messageTime}>
																{item.DisplayTime}
															</Text> */}
														</View>
													</View>	
												</View>
											)
										} else {
											return (
											
												<View style={{flexDirection: 'row', marginBottom: viewMessageSendTime ? '0%' : '2%'}}>
													<Image source={{uri: OtherUserDP}} style={styles.messageOtherDP}/>
													<View style={styles.messageLeftWithDPContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
														{/* <Text style={styles.messageTime}>
															{item.DisplayTime}
														</Text> */}
													</View>
												</View>	
											)
										}
										
									} else {
										// above message is 30mins earlier
										if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
											return (
												<View>
													<View style={{alignItems: 'center', marginBottom: '2%'}}>
														<Text style={{color: 'white'}}>
															{item.DisplayTime}
														</Text>
													</View>
													<View style={{flexDirection: 'row', marginBottom: '0.5%'}}>
														<View style={styles.messageLeftContainer}>
															<Text style={styles.messageText}>
																{item.Text}
															</Text>
															{/* <Text style={styles.messageTime}>
																{item.DisplayTime}
															</Text> */}
														</View>
													</View>
												</View>
											)
										} else {
											return (
												<View style={{flexDirection: 'row', marginBottom: '0.5%'}}>
													
													<View style={styles.messageLeftContainer}>
														<Text style={styles.messageText}>
															{item.Text}
														</Text>
														{/* <Text style={styles.messageTime}>
															{item.DisplayTime}
														</Text> */}
													</View>
												</View>
											)
										}
										
									}
												
								}
								
							}                       
						} 
						// sent by me
						else {                       
							// bottom message, no space underneath
							if (index === 0) {
								// above message was more than 30mins earlier
								if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
										
											<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
									)
								} else {
									return (
										<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
											<Text style={styles.messageText}>
												{item.Text}
											</Text>
											{/* <Text style={styles.messageTime}>
												{item.DisplayTime}
											</Text> */}
										</View>
									)
								}
							}
							// top message
							else if (index === messages.length - 1) {
								// top message, but below is from other
								if (messages[messages.length - 2] != user.uid) {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
										
											<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
									)
								} 
								// top message, below is from me but after 3 mins
								else if ((messages[messages.length - 2].TimeInSeconds - item.TimeInSeconds) >= 180) {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
										
											<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
									)
								} 
								// top message, below is from me within 3mins
								else {
									return (
										<View>
											<View style={{alignItems: 'center', marginBottom: '2%'}}>
												<Text style={{color: 'white'}}>
													{item.DisplayTime}
												</Text>
											</View>
										
											<View style={styles.messageRightContainer}>
												
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										</View>
									)
								}
								
							}
							// if not bottom message, 
							// if true, space underneath
							else {
								// check if below is by other or by me after 3mins
								if ((messages[index - 1].TimeInSeconds - item.TimeInSeconds) >= 180) {
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white'}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
													{/* <Text style={styles.messageTime}>
														{item.DisplayTime}
													</Text> */}
												</View>
											</View>
										)
									} else {
										return (								
											<View style={[styles.messageRightContainerWithSpace, { marginBottom: viewMessageSendTime ? '0%' : '2%'}]}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime}
												</Text> */}
											</View>
										)
									}
								} else {
									if (item.TimeInSeconds - messages[index + 1].TimeInSeconds >= 1800) {
										return (
											<View>
												<View style={{alignItems: 'center', marginBottom: '2%'}}>
													<Text style={{color: 'white'}}>
														{item.DisplayTime}
													</Text>
												</View>
												<View style={styles.messageRightContainer}>
													<Text style={styles.messageText}>
														{item.Text}
													</Text>
													{/* <Text style={styles.messageTime}>
														{item.DisplayTime}
													</Text> */}
												</View>
											</View>
										)
									} else {
										return (
											<View style={styles.messageRightContainer}>
												<Text style={styles.messageText}>
													{item.Text}
												</Text>
												{/* <Text style={styles.messageTime}>
													{item.DisplayTime} 
												</Text> */}
											</View>
										)
									}
									
								}                           
							}
						}
					}


					
				}}
				> 
				</FlatList>
            </View>

            <View style={styles.messagesFooter}>
                <TextInput
                style={styles.messageInput}
                placeholder='Send a message'
                onChangeText={(text) => {setTextInput(text)}}
                value={textInput}
                /> 
                <Pressable onPress={() => {SendMessage(user.uid, OtherUid, textInput); Keyboard.dismiss(); setTextInput('')}}>
                    <IIcon name="ios-send" size={scale(23)} color='white'/>
                </Pressable>
                
            </View>
            
        </SafeAreaView>

        
            
    )
}
export default Dm;

                    

//getData()
        // const subscriber = firestore()
        // .collection('Messages')
        // .doc('wKASOUF1CGW7vFaWuoW9bzCERd53')
        // .collection('Chats')
        // .doc('J6kNuPPoUzVe4I3b3yTAfqwcWY32')
        // .collection('IndividualMessages')
        // .onSnapshot((querySnapshot) => {
        //     querySnapshot.forEach(snapshot => {
        //         console.log('User data: ', snapshot.data());
        //     })
            
        // });

    //    


    // for(let doc in querySnapshot.docs){
    //     console.log("size",querySnapshot.size)
    //     //console.log('doc',doc.data())
    //     //let data = snapshot.data()

    //     let timeSent = new Date((doc.TimeSent.nanoseconds / 1000000) + doc.TimeSent.seconds * 1000)
    //     let hours = timeSent.getHours()
    //     let hoursString = ('0' + hours).slice(-2)
    //     let mins = timeSent.getMinutes().toString()
    //     let minsString = ('0' + mins).slice(-2)
    //     let displayTime = hoursString.concat(":",minsString)
    //     let timeInSeconds = timeSent/1000
    //     let obj = {
    //         Sender: doc.Sender,
    //         Text: doc.Text, 
    //         DisplayTime: displayTime,
    //         TimeInSeconds: timeInSeconds
    //     }
    //     //console.log(obj)
    //     messagesArr.push(obj)
    // }
    // setMessages(messages)

    // <GestureHandlerRootView style={{backgroundColor: 'red', width: '100%', height: '100%'}}>
    //                 <GestureDetector gesture={handlerTest}>
    //                     <Animated.View style={[{backgroundColor: 'green', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}, animatedThing]}>
    //                         <Text>
    //                             hello
    //                         </Text>
    //                         <Text>
    //                             hello2
    //                         </Text>
    //                     </Animated.View>
    //                 </GestureDetector>         
    //             </GestureHandlerRootView>


        