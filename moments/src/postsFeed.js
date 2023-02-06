import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, FlatList, SafeAreaView, ImageBackground, Alert } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoggedInContext } from '../App';
import PostModal from './postModal';
import OwnPosts from './ownPostModal';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function ViewChannelFeed(userUId, selectedChannelID) {
    return await new Promise(async (resolve, reject) => {
        // check if user is still checked into this channel
        // by checking the channel and time
        let start = new Date();

        function subtractHours(numOfHours, date = new Date()) {
            date.setHours(date.getHours() - numOfHours);

            return date;
        }

        let test = subtractHours(1, start)

        let Posts = [];
        const querySnapshot = await firestore()
            .collection('Channels')
            .doc(selectedChannelID)
            .collection('Posts')
            .where('TimeUploaded', '>', test)
            .orderBy('TimeUploaded', 'desc')
            .limit(100)
            .get()

        for (let i = 0; i < querySnapshot.size; i++) {
            const snapshot = querySnapshot.docs[i];
            let obj = {
                Caption: '',
                ImageURL: '',
                PostID: '',
                PostOwner: '',
                TimeUploaded: null,
                UserLiked: false,
            }
            const docID = snapshot.id
            const likedQuerySnapshot = await firestore()
                .collection('Channels')
                .doc(selectedChannelID)
                .collection('Posts')
                .doc(docID)
                .collection('LikedBy')
                .get();            
            for (let j = 0; j < likedQuerySnapshot.size; j++) {
                const likedBy = likedQuerySnapshot.docs[j];
                
                if (likedBy.data().LikerID == userUId) {
                    
                    obj.UserLiked = true;
                }
            }
            let data = snapshot.data()
            obj.Caption = data.Caption
            obj.ImageURL = data.ImageURL
            obj.PostID = data.PostID
            obj.PostOwner = data.PostOwner
            obj.TimeUploaded = data.TimeUploaded
            Posts.push(obj)

        } 
        resolve(Posts);
    });
}

async function getChannelName(selectedChannelID) {
    let channelName = ''
    await firestore()
        .collection('Channels')
        .doc(selectedChannelID)
        .get()
        .then(docSnapshot => {
            let data = docSnapshot.data()
            channelName = data.ChannelName
        })
    return channelName

}

function PostsFeed({ navigation }) {
    const { setMessageDisplay, user, selectedPost, setSelectedPost, selectedPinId, channelPosts, setChannelPosts, justUnliked, setJustUnliked, selectedChannelId, setSelectedChannelId } = useContext(LoggedInContext);
    const [openPost, setOpenPost] = useState(false);
    const [ownPost, setOwnPost] = useState(false);
    const [messageCount, setMessageCount] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [postOwner, setPostOwner] = useState()
    const [selectPostIndex, setSelectedPostIndex] = useState()
    const [doubleTapped, setDoubleTapped] = useState(false)
    // in seconds
    const [lastPostedTime, setLastPostedTime] = useState()
    const [canPostAnother, setCanPostAnother] = useState(false)
    const [messageButtonPressed, setMessageButtonPressed] = useState(false)
    const [notifButtonPressed, setNotifButtonPressed] = useState(false)
    const [ownPostsButtonPressed, setOwnPostsButtonPressed] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMessageButtonPressed(false)
            setNotifButtonPressed(false)
            setOwnPostsButtonPressed(false)
        }, 100)
    }, [messageButtonPressed, notifButtonPressed, ownPostsButtonPressed])
 
    useEffect(() => {
        //console.log('selectPostIndex', selectPostIndex)
        if (selectPostIndex >= 0 && doubleTapped == true) {
            let trial = channelPosts 
            setDoubleTapped(false)
            //console.log('selectPostIndex', selectPostIndex)
            trial[selectPostIndex].UserLiked = true
            setChannelPosts(trial) 
        }
        //console.log('justUnliked',justUnliked)
        if (justUnliked == true) {
            let temp = channelPosts
            temp[selectPostIndex].UserLiked = false
            setChannelPosts(temp)
            setJustUnliked(false)
        } 
    }, [doubleTapped, justUnliked])

    const formatData = (data) => { 
        data.push({ empty: true, key: 'blank' })
        return data;
    } 

    async function PullToRefresh() {

        setRefresh(true)

        let userLastPostedTime = 0
        let isUserCheckedIn = true

        // check what time user checked in. Throw error if user is not checked in
        await firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(docSnapshot => {
                if (docSnapshot.data().LastPosted) {
                    //console.log(docSnapshot.data().ChannelJoined)
                    let seconds = docSnapshot.data().LastPosted.nanoseconds / 1000000000 + docSnapshot.data().LastPosted.seconds
                    userLastPostedTime = seconds
                }
            })

        // curr time in seconds
        let currSeconds = new Date().getTime() / 1000;

        // if user is not checked in throw errors (more than an hour since posting)
        if (currSeconds - userLastPostedTime >= 3600) {
            // throw error
            //console.log('errorinsde')
            isUserCheckedIn = false
            
        }

        if (isUserCheckedIn === true) {
            let start = new Date();

            function subtractHours(numOfHours, date = new Date()) {
                date.setHours(date.getHours() - numOfHours);

                return date;
            }

            let test = subtractHours(1, start)
            let Posts = []
            const querySnapshot = await firestore()
                .collection('Channels')
                .doc(selectedChannelId)
                .collection('Posts')
                .where('TimeUploaded', '>', test)
                .orderBy('TimeUploaded', 'desc')
                .limit(100)
                .get()

            for (let i = 0; i < querySnapshot.size; i++) {
                const snapshot = querySnapshot.docs[i];
                let obj = {
                    Caption: '',
                    ImageURL: '',
                    PostID: '',
                    PostOwner: '',
                    TimeUploaded: null,
                    UserLiked: false,
                }
                const docID = snapshot.id
                const likedQuerySnapshot = await firestore()
                    .collection('Channels')
                    .doc(selectedChannelId)
                    .collection('Posts')
                    .doc(docID) 
                    .collection('LikedBy')
                    .get();
                
                for (let j = 0; j < likedQuerySnapshot.size; j++) {
                    const likedBy = likedQuerySnapshot.docs[j];
                    //console.log('refresh liked', likedBy.data().LikerID)
                    if (likedBy.data().LikerID == user.uid) {
                        
                        obj.UserLiked = true;
                    }
                }
                let data = snapshot.data()
                obj.Caption = data.Caption
                obj.ImageURL = data.ImageURL
                obj.PostID = data.PostID
                obj.PostOwner = data.PostOwner
                obj.TimeUploaded = data.TimeUploaded  
                Posts.push(obj) 

            } 
            //console.log(Posts) 
            if (Posts.length % 2 !== 0) {
                formatData(Posts);
            }
            setChannelPosts(Posts)
        }
        setRefresh(false)
    }

    async function checkLastPostedTime() {
        let lastPostedTime
        await firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(docSnapshot => {
                let data = docSnapshot.data()
                lastPostedTime = (data.LastPosted.nanoseconds / 1000000000) + data.LastPosted.seconds
            }) 
        //console.log('lastpostedtime',lastPostedTime) WORKS
        return lastPostedTime
    }

    async function getData() {
        // const lastPostedTime = await checkLastPostedTime()
        // setLastPostedTime(lastPostedTime)
        // console.log('lastpostedtime getdata', lastPostedTime)
        const data = await ViewChannelFeed(user.uid, selectedChannelId)
        if (data.length % 2 !== 0) {
            formatData(data);
        }
        setChannelPosts(data)
        //console.log(channelPosts)
        const channelNameGet = await getChannelName(selectedChannelId)
        setChannelName(channelNameGet)
        setDataLoaded(true)
    }

    async function checkIfUserCanPost() {
        // curr time in seconds
        const time = new Date().getTime() / 1000;
        //console.log('current time', time)

        const lastPostedTime = await checkLastPostedTime()
        setLastPostedTime(lastPostedTime)
        //console.log('lastpostedtime check', lastPostedTime)

        if (time - lastPostedTime >= 300) {
            setCanPostAnother(true)
            //console.log('canpostanother true')
        } else {
            setCanPostAnother(false)
            //console.log('canpostanother false')
        }
    }

    async function firstTimeAlert() {
        const firstTimeCheck = await AsyncStorage.getItem('firstTime')
        if (firstTimeCheck === null) {
            Alert.alert(
                'Hey Newbie!',
                "You must wait at least 5mins before you can post again. Otherwise, we're gonna get spammed!",
                [
                  {text: 'Got it!', onPress: () => AsyncStorage.setItem('firstTime', 'true'), style: 'cancel'},
                ],
            );
        }
        
    }



    useEffect(() => {
        firstTimeAlert()
        getData()
        //console.log(channelPosts)
        checkIfUserCanPost()
        const interval = setInterval(checkIfUserCanPost, 1000 * 60);
        return () => {
            clearInterval(interval)
        }
    }, [])

    // get messages count
    useEffect(() => {
        const subscriber = firestore()
            .collection('Messages')
            .doc(user.uid)
            .onSnapshot(docSnapshot => {
                let messageCount = docSnapshot.data().UnopenedMessages;
                setMessageCount(messageCount)
            })

        return () => subscriber()
    }, [])

    if (dataLoaded == false) return null

 
    return (
        <SafeAreaView style={styles.MBBackground}>

            <View style={styles.postsFeedHeader}>
                <View style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {
                        setMessageDisplay(true); navigation.navigate('Map');
                        setChannelPosts(); setSelectedChannelId();
                    }}>
                        <MIIcon name='arrow-forward-ios' size={scale(30)} color='black' />
                    </Pressable>
                    <View style={{ justifyContent: 'center', height: '110%'}}>
                        <Text style={styles.socialTextWhite30}>
                            Socialyse
                        </Text>
                        <Text style={styles.channelNameInPostFeed}>
                            @{channelName}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 9, width: '100%', paddingBottom: '5%' }}>
                <FlatList
                    contentContainerStyle={{ alignItems: 'center' }}
                    numColumns={2}
                    data={channelPosts}
                    onRefresh={() => PullToRefresh()}
                    refreshing={refresh}
                    renderItem={({ item, index }) => {
                        //console.log('item,', item)
                        if (item.empty === true) {

                            return <View style={styles.blank} /> 
                        }  
                        return (
                            
                            <View>
                                <Pressable    
                                onPress={() => { setSelectedPost(item); setPostOwner(item.PostOwner); setSelectedPostIndex(index); setOpenPost(true) }}>
                                    <View style={styles.postContainer}>
                                        <View style={styles.fullPost}>
                                            <View style={{height: '85%'}}>
                                                <ImageBackground source={{ uri: item.ImageURL }} style={styles.postPhoto}>
                                                    {
                                                        item.UserLiked == true ?
                                                        <Pressable style={{position: 'absolute', bottom: scale(5), left: scale(5)}}>
                                                            <IIcon name='ios-heart' color='red' size={scale(14)}
                                                        />
                                                        </Pressable>
                                                        : 
                                                        null
                                                    } 
                                                </ImageBackground> 
                                            </View>
                                            
                                            <Text numberOfLines={1} style={styles.postCaption}>
                                                {item.Caption}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    }}>
                </FlatList>
                <PostModal openPost={openPost} setOpenPost={setOpenPost} selectedChannelID={selectedChannelId} channelPosts={channelPosts} selectPostIndex={selectPostIndex}/>
            </View>

            <View style={styles.postsFeedFooter}>
                <Pressable style={styles.messageButtonPostsFeed} onPress={() => {setMessageButtonPressed(true);navigation.navigate('Dms')}}>
                    <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(28)} color={messageButtonPressed ? 'grey' : 'white'}/>
                    <View style={styles.messageCountContainerFeed}>
                        <Text style={styles.notifCountText}>
                            {messageCount}
                        </Text>
                    </View>
                </Pressable>

                <Pressable disabled={!canPostAnother} onPress={() => navigation.navigate('MakeAPost', { selectedChannelID: selectedChannelId })}>
                    <View style={[styles.takePhotoButtonPostFeed, { borderColor: canPostAnother ? 'white' : 'grey' }]}>
                        <IIcon name="ios-camera-outline" size={scale(28)} color={canPostAnother ? 'white' : 'grey'} />
                    </View>
                </Pressable>

                <Pressable style={styles.ownPostsButton} onPress={() => { setOwnPost(true); setOwnPostsButtonPressed(true) }}>
                    <MCIcon name='account-details' size={scale(28)} color={ownPostsButtonPressed ? 'grey' : 'white'} />
                </Pressable>
            </View>

            <OwnPosts ownPost={ownPost} setOwnPost={setOwnPost} selectedChannelID={selectedChannelId}/>

        </SafeAreaView>
    );


}

export default PostsFeed;
