import React, { useEffect, useState, useContext, useTransition} from 'react';
import { View, Pressable, Text, FlatList, TextInput, SafeAreaView, Image } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { LoggedInContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { useDrawerProgress } from '@react-navigation/drawer';


// const data = [
//     {
//         key: 1,
//         message: 'hello jim',
//         timeSent: '09:32',
//         sentBy: 0
//     },
//     {
//         key: 2,
//         message: 'hello jac!qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:33',
//         sentBy: 1
//     },
//     {
//         key: 3,
//         message: 'hello hello ehllo ehleoefjowejefwejfw',
//         timeSent: '09:34',
//         sentBy: 0
//     },
//     {
//         key: 4,
//         message: 'wegweg',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 5,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 6,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 7,
//         message: 'wegweg',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 8,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 9,
//         message: 'wegweg',
//         timeSent: '09:35',
//         sentBy: 0
//     },
//     {
//         key: 10,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 11,
//         message: 'wegweg',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 12,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 13,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 0
//     },
//     {
//         key: 14,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 1
//     },
//     {
//         key: 15,
//         message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
//         timeSent: '09:35',
//         sentBy: 0
//     },
// ]

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
  // ERROR
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
    console.log('friendLastDetailsExist', friendLastDetailsExist)
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
    console.log('friendLastDetailsExist', friendLastDetailsExist)
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

   // get the other person's unopened messages count
   // ERROR
  let friendUnopenedMessageCount = 0;
  await firestore()
  .collection('Messages')
  .doc(FriendID)
  .get()
  .then (docSnapshot => {
    if(docSnapshot.exists) {
      friendUnopenedMessageCount = docSnapshot.data().UnopenedMessages;
      console.log('friendUnopenedMessageCount', friendUnopenedMessageCount)
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

async function ViewMessage(UserID, FriendID) {
    // you getting all the individual messages in a dm
   let messages = [];
 
   await firestore()
   .collection('Messages')
   .doc(UserID)
   .collection('Chats')
   .doc(FriendID)
   .collection('IndividualMessages')
   .orderBy('TimeSent', 'desc')
   .limit(100)
   .get()
   .then((querySnapshot) => {
     querySnapshot.forEach(snapshot => {
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
        messages.push(obj)
     })
   });
 
   // check if the dm being opened has already been opened
    let dmOpenedCheck = false;
    await firestore()
    .collection('Messages')
    .doc(UserID)
    .collection('Chats')
    .doc(FriendID)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            dmOpenedCheck = docSnapshot.data().Opened
        }
    }) 

   // if it hasn't been opened
    if (dmOpenedCheck == false) {
        await firestore()
        .collection('Messages')
        .doc(UserID)
        .collection('Chats')
        .doc(FriendID)
        .update({
            Opened: true
        })
        // get the unopened message count and decrease it by 1
        let unopenedMessageCount = 0;
        await firestore()
        .collection('Messages')
        .doc(UserID)
        .get()
        .then(docSnapshot => {
            if(docSnapshot.exists) {
                unopenedMessageCount = docSnapshot.data().UnopenedMessages;
            }
        }) 
   
        if (unopenedMessageCount > 0) {
        unopenedMessageCount -= 1;
        }
        // update the unopened message count
        await firestore()
        .collection('Messages')
        .doc(UserID)
        .update({
            UnopenedMessages: unopenedMessageCount
        });
    }
   
   return messages;
}


function Dm ({route, navigation}) {

    const {OtherUid, OtherUsername, OtherUserDP} = route.params;
    //console.log(OtherUid)
    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user } = useContext(LoggedInContext);
    const [textInput, setTextInput] = useState('')
    const [messages, setMessages] = useState()

    async function getData() {
        const data = await ViewMessage(user.uid, OtherUid)
        setMessages(data)
    }

    useEffect(() => {
       getData()
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

            <View style={styles.messagesBody}>
                <FlatList
                data={messages}
                inverted={true}
                
                renderItem={({item, index}) => {
                    // sent by other person 
                    if (item.Sender != user.uid) {
                        // when message is at top
                        if (index === messages.length - 1) {
                            // if message below is from me, show dp
                            if(messages[messages.length - 2] == user.uid) {
                                return (
                                    <View>
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
                            else if ((messages[messages.length - 2].TimeInSeconds - item.TimeInSeconds) >= 180) {
                                return (
                                    <View>
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
                        
                        // message is in the middle somewhere
                        else {
                            // if message below is from me
                            if (messages[index - 1].Sender === user.uid) {
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
                            // if message below is from other
                            else {
                                // message below is more than 3mins away
                                if ((messages[index - 1].TimeInSeconds - item.TimeInSeconds) >= 180) {
                                    return (
                                        <View style={{flexDirection: 'row', marginBottom: '2%'}}>
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
                    // sent by me
                    else {                       
                        // bottom message, no space underneath
                        if (index === 0) {
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
                        // if not bottom message, 
                        // if true, space underneath
                        else {
                            // check if below is by other or by me after 3mins
                            if ((messages[index - 1].TimeInSeconds - item.TimeInSeconds) >= 180) {
                                return (
                                    <View style={styles.messageRightContainerWithSpace}>
                                        <Text style={styles.messageText}>
                                            {item.Text}
                                        </Text>
                                        {/* <Text style={styles.messageTime}>
                                            {item.DisplayTime}
                                        </Text> */}
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
                }}
                > 
                </FlatList>
            </View>

            <View style={styles.messagesFooter}>
                <TextInput
                style={styles.messageInput}
                placeholder='Send a message'
                onChangeText={(text) => {setTextInput(text)}}
                />
                <Pressable onPress={() => {SendMessage(user.uid, OtherUid, textInput)}}>
                    <IIcon name="ios-send" size={scale(23)} color='white'/>
                </Pressable>
                
            </View>
        </SafeAreaView>
            
    )
}
export default Dm;

                    