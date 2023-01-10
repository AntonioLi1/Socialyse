import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Image, Text, Pressable, FlatList, SafeAreaView, RefreshControl, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoggedInContext } from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import PostModal from './postModal';
import OwnPosts from './ownPostModal';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { TapGestureHandler, Gesture, GestureDetector, GestureHandlerRootView, Directions } from 'react-native-gesture-handler';

async function ViewChannelFeed(userUId, selectedChannelID) {
    return await new Promise(async (resolve, reject) => {
        // check if user is still checked into this channel
        // by checking the channel and time
        let userCheckedInTime = null


        await firestore()
            .collection('Users')
            .doc(userUId)
            .get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
                    let seconds = docSnapshot.data().ChannelJoined.nanoseconds / 1000000000 + docSnapshot.data().ChannelJoined.seconds
                    userCheckedInTime = seconds
                }
                else {
                    //throw error
                    console.log('error')
                }
            })

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
                .collection('Likedby')
                .get();
            
            for (let j = 0; j < likedQuerySnapshot.size; j++) {
                const likedBy = likedQuerySnapshot.docs[j];
                
                if (likedBy.data().UserID == userUId) {
                    
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
        resolve(Posts);


    });
}



async function getChannelName(selectedChannelID) {
    let channelName = ''
    //console.log(selectedChannelID)
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

async function ChangeTimeForChannelPosts(UserID, ChannelID) {
    const channelPostsByUser = await firestore().collection('Channels').doc(ChannelID)
        .collection('Posts').where('PostOwner', '==', UserID).get()

    const batch = firestore().batch()

    channelPostsByUser.forEach(docSnapshot => {
        batch.update(docSnapshot.ref, {
            TimeUploaded: 0,
        })
    })

    return batch.commit() 

}
// MATCH MADED
async function LikePost(UserID, PostID, selectedChannelID, postOwner) {
    let PostLikeCount = 0;

    // get the like count on the post
    await firestore()
        .collection('PostLikes')
        .doc(PostID)  
        .get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                PostLikeCount = docSnapshot.data().LikeCount;
            }
        });

    // add 1 to the like count and update
    PostLikeCount += 1;

    await firestore()
        .collection('PostLikes')
        .doc(PostID)
        .update({
            LikeCount: PostLikeCount
        });

    // check if person is added to user's liked people already
    let alreadyLiked = false;
    await firestore()
        .collection('PeopleLiked')  
        .doc(UserID)
        .collection('Users')
        .doc(postOwner)
        .get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                alreadyLiked = true;
            }
        });
    const time = new Date();

    // add user to liked people if not liked already
    // else just update the time they were liked
    if (alreadyLiked == false) {
        await firestore()
            .collection('PeopleLiked')
            .doc(UserID)
            .collection('Users')
            .doc(postOwner)
            .set({
                TimeLiked: time,
                UserID: postOwner
            });
    }
    // else {
    //   await firestore()
    //   .collection('PeopleLiked')
    //   .doc(UserID)
    //   .collection('Users')
    //   .doc(PostOwner)
    //   .set({
    //     TimeLiked: time,
    //     UserID: PostOwner
    //   });
    // }

    // add user to the posts likedby collection
    await firestore()
        .collection('Channels')
        .doc(selectedChannelID)
        .collection('Posts')
        .doc(PostID)
        .collection('Likedby')
        .doc(UserID)
        .set({
            UserID: UserID
        })

    await firestore()
    .collection('UserLikedPosts')
    .doc(UserID)
    .collection('Posts')
    .doc(PostID)
    .set({
        Channel: selectedChannelID,
        PostID: PostID,
        TimeLiked: time
    })

    let postLikedCount = 0
    let postsLikedCountExists = false
    await firestore()
    .collection('UserLikedPosts')
    .doc(UserID)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            postLikedCount = docSnapshot.data().PostsLikedCount
            postsLikedCountExists = true
        }
    })
    postLikedCount += 1
    if (postsLikedCountExists == true) {
        await firestore()
        .collection('UserLikedPosts')
        .doc(UserID)
        .update({
            PostsLikedCount: postLikedCount
        }) 
    } else {
        await firestore()
        .collection('UserLikedPosts')
        .doc(UserID)
        .set({
            PostsLikedCount: postLikedCount
        }) 
    }
}

function PostsFeed({ navigation, route }) {
    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user, selectedPost, setSelectedPost, selectedPinId, channelPosts, setChannelPosts, justUnliked, setJustUnliked } = useContext(LoggedInContext);
    const [openPost, setOpenPost] = useState(false);
    const [ownPost, setOwnPost] = useState(false);
    //const [channelPosts, setChannelPosts] = useState()
    const [notiCount, setNotiCount] = useState()
    const [messageCount, setMessageCount] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [channelName, setChannelName] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [postOwner, setPostOwner] = useState()
    const [selectPostIndex, setSelectedPostIndex] = useState()
    const [doubleTapped, setDoubleTapped] = useState(false)
    //const [unlikePost, setUnlikePost] = useState(false)
    const [postIsLiked, setPostIsLiked] = useState(false)
    // in seconds
    const [lastPostedTime, setLastPostedTime] = useState()
    const [canPostAnother, setCanPostAnother] = useState(false)

    const { selectedChannelID } = route.params;

    async function LeaveChannel(UserID, ChannelID) {
        //update users own details
        await firestore()
            .collection('Users')
            .doc(UserID)
            .update({
                CurrentChannel: 0,
                ChannelJoined: 0,
            });

        // change time for userPosts
        ChangeTimeForUserPosts(UserID)


        // delete posts from from user, postLikes, channels
        ChangeTimeForChannelPosts(UserID, ChannelID)

        // reduce channel users count by one in the pin
        let channelUsersCount;
        await firestore()
            .collection('Pins')
            .doc(selectedPinId)
            .collection('Channels')
            .doc(ChannelID)
            .get()
            .then(docSnapshot => {
                channelUsersCount = docSnapshot.data().ActiveUsers;
            })
        channelUsersCount -= 1;

        await firestore()
            .collection('Pins')
            .doc(selectedPinId)
            .collection('Channels')
            .doc(ChannelID)
            .update({
                ActiveUsers: channelUsersCount
            })

    }

    const singleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            //openPostLikeCheck(selectedPost.PostID, selectedChannelID, user.uid)
            setOpenPost(true)
            //console.log('singletap doubletap check', doubleTapped)

        })
        .onFinalize(() => {
        }).runOnJS(true)

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            //console.log(item) 

            //console.log(selectedPostId)

            console.log('doubles')
            console.log('postOwner', postOwner)
            console.log('selectedChannelID', selectedChannelID)
            if (selectedPost) {
                console.log('selectedPostId', selectedPost.PostID) 
            }
            console.log(doubleTapped)
            setDoubleTapped(true) 
        })
        .onEnd(() => {
            if (selectedPost) {
                LikePost(user.uid, selectedPost.PostID, selectedChannelID, postOwner) 
            }
            
        })
        .onFinalize(() => {
            
            
        }).runOnJS(true)
 
    useEffect(() => {
        //console.log('selectPostIndex', selectPostIndex)
        if (selectPostIndex >= 0 && doubleTapped == true) {
            console.log('doubleTapped', doubleTapped)
            let trial = channelPosts 
            setDoubleTapped(false)
            //console.log('selectPostIndex', selectPostIndex)
            trial[selectPostIndex].UserLiked = true
            setChannelPosts(trial)
             
            console.log('double tap end', doubleTapped)  
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

        let userCheckedInTime = null

        await firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(docSnapshot => {
                if (docSnapshot.exists) {
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
        if (currSeconds - userCheckedInTime >= 3600) {
            // throw error
            console.log('error')
        }


        let start = new Date();

        function subtractHours(numOfHours, date = new Date()) {
            date.setHours(date.getHours() - numOfHours);

            return date;
        }

        let test = subtractHours(1, start)
        let Posts = []
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
                .collection('Likedby')
                .get();
            
            for (let j = 0; j < likedQuerySnapshot.size; j++) {
                const likedBy = likedQuerySnapshot.docs[j];
                
                if (likedBy.data().UserID == user.uid) {
                    
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
        //console.log(lastPostedTime)
        return lastPostedTime
    }

    async function getData() {
        const data = await ViewChannelFeed(user.uid, selectedChannelID)
        if (data.length % 2 !== 0) {
            formatData(data);
        }
        setChannelPosts(data)
        //console.log(channelPosts)
        const channelNameGet = await getChannelName(selectedChannelID)
        setChannelName(channelNameGet)
        const lastPostedTime = await checkLastPostedTime()
        setLastPostedTime(lastPostedTime)
        setDataLoaded(true)
    }

    function checkIfUserCanPost() {
        // curr time in seconds
        const time = new Date().getTime() / 1000;
        //console.log('current time', time)
        //console.log('lastpostedtime', lastPostedTime)
        if (time - lastPostedTime >= 900) {
            setCanPostAnother(true)
            //console.log('canpostanother true')
        } else {
            setCanPostAnother(false)
            //console.log('canpostanother false')
        }
    }


    useEffect(() => {
        getData()
        //console.log(channelPosts)
        checkIfUserCanPost()
        const interval = setInterval(checkIfUserCanPost, 1000 * 60);
        return () => {
            clearInterval(interval)
        }
    }, [])

    // get notifCount
    useEffect(() => {
        const subscriber = firestore()
            .collection('Notifications')
            .doc(user.uid)
            .onSnapshot(docSnapshot => {
                let notifCount = docSnapshot.data().NotificationCount;
                setNotiCount(notifCount)
            })

        return () => subscriber()
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
                <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {
                        setMessageDisplay(true); navigation.navigate('Map'); setNotifDisplay(true);
                        LeaveChannel(user.uid, selectedChannelID); setChannelPosts()
                    }}>
                        <MIIcon name='arrow-forward-ios' size={scale(30)} color='black' />
                    </Pressable>
                    <View style={{ justifyContent: 'center', height: '100%' }}>
                        <Text style={styles.socialTextWhite30}>
                            SOCIALYSE
                        </Text>
                        <Text style={styles.channelNameInPostFeed}>
                            {channelName}
                        </Text>
                    </View>


                    <View style={styles.notificationContainerPostsFeed}>
                        <Pressable style={styles.notificationButton2} onPress={() => navigation.navigate('notifications')}>
                            <IIcon name='notifications-outline' size={scale(28)} color='white' />
                            <View style={styles.notificationCountContainer}>
                                <Text style={styles.notifCountText}>
                                    {notiCount}
                                </Text>
                            </View>
                        </Pressable>
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
                        if (item.empty === true) {

                            return <View style={styles.blank} /> 
                        }  
                        return (
                            <GestureHandlerRootView>
                                <Pressable onPress={() => { setSelectedPost(item); setPostOwner(item.PostOwner); setSelectedPostIndex(index) }}>
                                    <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
                                        <View style={styles.postContainer}>
                                            <View style={styles.fullPost}>
                                                <View style={{height: '85%'}}>
                                                    <ImageBackground source={{ uri: item.ImageURL }} style={styles.postPhoto}>
                                                        {
                                                            item.UserLiked == true ?
                                                            <Pressable style={{position: 'absolute', bottom: scale(5), left: scale(5)}} onPress={() => {UnlikePost(user.uid, selectedPost.PostID, item.PostOwner); setUnlikePost(true)}}>
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
                                    </GestureDetector>
                                </Pressable>
                            </GestureHandlerRootView>
                        )
                    }}>
                </FlatList>
                <PostModal openPost={openPost} setOpenPost={setOpenPost} selectedChannelID={selectedChannelID} channelPosts={channelPosts} selectPostIndex={selectPostIndex}/>
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

                <Pressable disabled={!canPostAnother} onPress={() => navigation.navigate('MakeAPost', { selectedChannelID: selectedChannelID })}>
                    <View style={[styles.takePhotoButtonPostFeed, { borderColor: canPostAnother ? 'white' : 'grey' }]}>
                        <IIcon name="ios-camera-outline" size={scale(25)} color={canPostAnother ? 'white' : 'grey'} />
                    </View>
                </Pressable>

                <Pressable style={styles.ownPostsButton} onPress={() => { setOwnPost(true) }}>
                    <MCIcon name='account-details' size={scale(25)} color='white' />
                </Pressable>
            </View>

            <OwnPosts ownPost={ownPost} setOwnPost={setOwnPost} selectedChannelID={selectedChannelID}/>

        </SafeAreaView>
    );


}

export default PostsFeed;

/*
                    
*/