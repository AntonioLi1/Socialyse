import React, { useEffect, useState, useContext, useTransition} from 'react';
import { View, Pressable, Text, FlatList, TextInput, SafeAreaView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { LoggedInContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { PROVIDER_DEFAULT } from 'react-native-maps';


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
  // this part
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
  // check if other person
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
  });

   // get the other person's unopened messages count
   // this part not getting run?
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


function Dm ({route, navigation}) {

    const {OtherUid, OtherUsername} = route.params;
    //console.log(OtherUid)
    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user } = useContext(LoggedInContext);
    const [textInput, setTextInput] = useState('')
    
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
                {/* <FlatList
                data={data}
                inverted={true}
                keyExtractor={item => item.key}
                renderItem={({item, index}) => {
                    if (item.sentBy === 0) {
                        if (index > 0) {
                            if (data[index - 1].sentBy === 0) {
                                return (

                                    <View key={item.key} style={styles.messageLeftContainer}>
                                        <Text style={styles.messageText}>
                                            {item.message}
                                        </Text>
                                        <Text style={styles.messageTime}>
                                            {item.timeSent}
                                        </Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={item.key} style={styles.messageLeftContainer}>
                                        <Text style={styles.messageText}>
                                            {item.message}
                                        </Text>
                                        <Text style={styles.messageTime}>
                                            {item.timeSent}
                                        </Text>
                                    </View>
                                )
                            }
                        } else if (index === 0) {
                            return (
                                <View key={item.key} style={styles.messageLeftContainer}>
                                    <Text style={styles.messageText}>
                                        {item.message}
                                    </Text>
                                    <Text style={styles.messageTime}>
                                        {item.timeSent}
                                    </Text>
                                </View>
                            )
                        }

                    } else {
                        return (
                            <View key={item.key} style={styles.messageRightContainer}>
                                <Text style={styles.messageText}>
                                    {item.message}
                                </Text>
                                <Text style={styles.messageTime}>
                                    {item.timeSent}
                                </Text>
                            </View>
                        )
                    }
                }}
                > 
                </FlatList> */}
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
/*
                    <View style={styles.messageLeftContainer}>
                        <Text style={styles.messages}>
                            hello jim!
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                        
                    
                    <View style={styles.messageRightContainer}>
                        <Text style={{color: 'white'}}>
                            hello jac!qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                        
                    <View style={styles.messageLeftContainer}>
                        <Text style={{color: 'white', }}>
                            hello hello hello hello hello hello hello hello hello hello hello 
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                    <View style={styles.messageRightContainer}>
                        <Text style={{color: 'white', }}>
                            hello hello hello
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>

*/
