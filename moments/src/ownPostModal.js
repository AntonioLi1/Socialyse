import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, FlatList, Modal, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App';
import { useNavigation } from '@react-navigation/native';


async function ViewOwnPosts(uid) {
    
    let ownPostsArray = []

    let start = new Date();

    function subtractHours(numOfHours, date = new Date()) {
        date.setHours(date.getHours() - numOfHours);
        return date;
    }

    let test = subtractHours(1, start)

    const querySnapshot = await firestore()
    .collection('Users') 
    .doc(uid)
    .collection('UserPosts')
    .where('TimeUploaded', '>', test ) 
    .orderBy('TimeUploaded', 'desc')
    .get()

    for (let i = 0; i < querySnapshot.size; i++) {
        const snapshot = querySnapshot.docs[i]
        let obj = {
            Id: i,
            ImageURL: '',
            Caption: '',
            PostID: '',
            LikeCount: 0
        }
        const docID = snapshot.id
        const likeCountQuerySnapshot = await firestore()
        .collection('PostLikes').doc(docID).get()

        obj.ImageURL = snapshot.data().ImageURL
        obj.Caption = snapshot.data().Caption
        obj.PostID = snapshot.data().PostID
        obj.LikeCount = likeCountQuerySnapshot.data().LikeCount
        ownPostsArray.push(obj)
    }
    return ownPostsArray;
}

async function DeletePost(UserID, PostID, selectedChannelID) {

    // Delete from channel posts, user posts and posts liked
    await firestore()
    .collection('Channels')
    .doc(selectedChannelID) 
    .collection('Posts')
    .doc(PostID)
    .update({ 
        TimeUploaded: 0
    });
  
    await firestore()
    .collection('Users')
    .doc(UserID)
    .collection('UserPosts')
    .doc(PostID)
    .update({
        TimeUploaded: 0
    });
}

async function ChangeTimeForUserPosts(UserID) {
    const usersPosts = await firestore().collection('Users').doc(UserID).collection('UserPosts').get()
 
 
    const batch = firestore().batch()
 
 
    usersPosts.forEach(docSnapshot => {
        batch.update(docSnapshot.ref, {
            TimeUploaded: 0
        })
    })
    return batch.commit()
 }
 

function OwnPosts({ownPost, setOwnPost, selectedChannelID}) { 
    const navigation = useNavigation()

    const [ownPosts, setOwnPosts] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const {user, selectedChannelId, selectedPinId} = useContext(LoggedInContext)

    async function LeaveChannel(UserID, selectedChannelId) {
        //update users own details
        await firestore()
            .collection('Users')
            .doc(UserID)
            .update({
                CurrentChannel: 0,
                ChannelJoined: 0,
            });

        // change time for userPosts
        await ChangeTimeForUserPosts(UserID)

        // reduce channel users count by one in the pin
        let channelUsersCount;
        await firestore()
            .collection('Pins')
            .doc(selectedPinId)
            .collection('Channels')
            .doc(selectedChannelId)
            .get()
            .then(docSnapshot => {
                channelUsersCount = docSnapshot.data().ActiveUsers;
            })
        channelUsersCount -= 1;

        await firestore()
            .collection('Pins')
            .doc(selectedPinId)
            .collection('Channels')
            .doc(selectedChannelId)
            .update({
                ActiveUsers: channelUsersCount
            })

    }

    async function getData() {
        const data = await ViewOwnPosts(user.uid)
        setOwnPosts(data)
        setDataLoaded(true)
    }
 
    useEffect(() => {
        getData()
    },[])  

    const callback = ()=>{
        navigation.navigate('MakeAPost')
	};

    async function LeaveChannelMakeAPost() {
        await LeaveChannel(user.uid, selectedChannelId)
        callback()
    }

    // if the ownposts becomes empty, close the modal using useeffect
    useEffect(() => { 
        if (ownPosts) {
            if (ownPosts.length == 0) {
                setOwnPost(false) 
                LeaveChannelMakeAPost()
            }
        }
    }, [ownPosts, ownPost])

    

    function updateOwnPosts(itemID) {
        let temp = [...ownPosts]
        temp = temp.filter(post => post.Id !== itemID) 
        setOwnPosts(temp)
    }

    if (dataLoaded == false) return null  

    return (
        <Modal visible={ownPost} transparent={true}>
            <View style={styles.postModalFullScreen2}>
                <View style={styles.ownPostModal}>                  
                    <FlatList 
                        horizontal={true}
                        data={ownPosts}
                        decelerationRate={'fast'}
                        snapToInterval={scale(320)}
                        extraData={ownPosts}
                        keyExtractor={item => item.Id}
                        renderItem={({item}) => {   
                            return(
                                <View style={styles.somewthing}>
                                    <ImageBackground source={{uri: item.ImageURL}} style={styles.ownPostModalPlaceHolder}>
                                        <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={32} color='white'
                                        onPress={() => {setOwnPost(false)}} 
                                        />  
                                    </ImageBackground>
                                    
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                                                <IIcon name='ios-heart' color='red' size={scale(14)}
                                                />
                                                <Text style={styles.ownPostLikeCount}>
                                                    {item.LikeCount}
                                                </Text> 
                                            </View>
                                            <Text style={styles.postModalCaption}>
                                                {item.Caption} 
                                                
                                            </Text>
                                        </View> 
                                            
                                        <Pressable onPress={() => {
                                            DeletePost(user.uid, item.PostID, selectedChannelID);
                                            updateOwnPosts(item.Id);
                                        }}>
                                            <IIcon name='ios-trash' size={scale(16)} color='white'/>
                                        </Pressable>
                                        
                                        
                                        
                                    </View>
                                        
                                </View>
                                    
                            );
                        }}
                        >  
                    </FlatList>
                </View>
            </View>
                
        </Modal> 
    );
    
}

export default OwnPosts;
