import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoggedInContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import PostModal from './postModal';
import OwnPosts from './ownPostModal';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';

const formatData = (data) => {
    data.push({empty: true, key: 'blank'})
    return data;
}

async function ViewChannelFeed(userUId, selectedChannelID) {

    // check if user is still checked into this channel
    // by checking the channel and time
    let userCheckedInTime = null
    let userCheckedInChannelID = ''


    await firestore()
    .collection('Users')
    .doc(userUId)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            userCheckedInChannelID = docSnapshot.data().CurrentChannel
            //console.log(docSnapshot.data().ChannelJoined)
            let seconds = docSnapshot.data().ChannelJoined.nanoseconds / 1000000000 + docSnapshot.data().ChannelJoined.seconds
            userCheckedInTime = seconds
        }
        else {
            //throw error
            console.log('error')
        } 
    })

    // curr time in seconds
    let currSeconds = new Date().getTime() / 1000;

    // if user is not checked in throw errors
    // if (currSeconds - userCheckedInTime >= 3600 || userCheckedInChannelID != selectedChannelID) {
    //     throw error;
    // }

    let Posts = [];
    await firestore()
    .collection('Channels')
    .doc(selectedChannelID)
    .collection('Posts')
    .orderBy('TimeUploaded', 'desc')
    .limit(100)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            let data = snapshot.data()
            Posts.push(data)
        })
    })
    //console.log(Posts)
    return Posts;
  
}

async function getNotifCount(uid) {
    let notifCount = 0;
    await firestore()
    .collection('Notifications')
    .doc(uid)
    .get()
    .then(docSnapshot => {
        let data = docSnapshot.data()
        notifCount = data.NotificationCount;
    })
    return notifCount;

}

async function getMessagesCount(uid) {
    let messagesCount = 0;
    await firestore()
    .collection('Messages')
    .doc(uid)
    .get()
    .then(docSnapshot => {
        let data = docSnapshot.data()
        messagesCount = data.UnopenedMessages;
    })
    return messagesCount;
}

function PostsFeed ({navigation, route}) {
    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user, selectedPost, setSelectedPost} = useContext(LoggedInContext);
    const [openPost, setOpenPost] = useState(false);
    const [ownPost, setOwnPost] = useState(false);
    const [channelPosts, setChannelPosts] = useState()
    const [notiCount, setNotiCount] = useState()
    const [messageCount, setMessageCount] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const {selectedChannelID} = route.params;



    async function getData() {
        const data = await ViewChannelFeed(user.uid, selectedChannelID)
        if (data.length % 2 !== 0) {
            formatData(data);
        }
        setChannelPosts(data)
        const notifCount = await getNotifCount(user.uid)
        setNotiCount(notifCount)
        const msgCount = await getMessagesCount(user.uid)
        setMessageCount(msgCount)
        setDataLoaded(true)
    }

    useEffect(() => {
        getData()
        //console.log(channelPosts)
    }, [])

    if (dataLoaded == false) return null
    
    return (
        <SafeAreaView style={styles.MBBackground}>

            <View style={styles.postsFeedHeader}>
                <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {setMessageDisplay(true); navigation.navigate('Map'); setNotifDisplay(true) }}>
                        <MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
                    </Pressable>
                    
                    <Text style={styles.socialTextWhite30}>
                        SOCIALYSE
                    </Text>
                    
                    <View style={styles.notificationContainerPostsFeed}>
                        <Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
                            <IIcon name='notifications-outline' size={scale(28)} color='white' />
                            <View style={styles.notificationCountContainer}>
                                <Text style={styles.notifCountText}>
                                    {notiCount}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.timeRemaining}>
                    2min remaining
                </Text>
            </View>

            <View style={{flex: 9 , width: '100%', paddingBottom: '5%'}}>
                <FlatList 
                contentContainerStyle={{alignItems: 'center'}} 
                numColumns={2} 
                data={channelPosts} 
                renderItem={({item, index}) => 
				{
                    if (item.empty === true) {
                        
                        return <View style={styles.blank}/>
                    }
					return (
                        <View>
                            <Pressable onPress={() => {setSelectedPost(item); setOpenPost(true)}}>
                                <View style={styles.postContainer}>
                                    <View style={styles.fullPost}>
                                        <Image source={{uri: item.ImageURL}} style={styles.postPhoto}/>

                                        <Text style={styles.postCaption}>
                                            {item.Caption}
                                        </Text>     
                                    </View>
                                      
                                </View>
						    </Pressable>
                            <PostModal openPost={openPost} setOpenPost={setOpenPost}/>
                        </View>
					)
				}}>
				</FlatList>
            </View>

            <View style={styles.postsFeedFooter}>
                <Pressable style={styles.messageButtonPostsFeed} onPress={() => navigation.navigate('Dms')}>
                    <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(25)} />
                    <View style={styles.messageCountContainerFeed}>
						<Text style={styles.notifCountText}>
                            {messageCount}
						</Text>
					</View>
                </Pressable>

                <Pressable style={styles.ownPostsButton} onPress={() => {setOwnPost(true)}}>
                    
                </Pressable>
            </View>

            <OwnPosts ownPost={ownPost} setOwnPost={setOwnPost}/>

        </SafeAreaView>
    );
    
    
}

export default PostsFeed;

/*
                    
*/