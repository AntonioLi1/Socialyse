import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import { scale } from 'react-native-size-matters';
import { LoggedInContext } from '../App';
import firestore from '@react-native-firebase/firestore';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';


async function openPostLikeCheck(PostID, selectedChannelID, userUId) {
    let postIsLiked = false

    await firestore()
    .collection('Channels')
    .doc(selectedChannelID)
    .collection('Posts')
    .doc(PostID)
    .collection('LikedBy')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if (snapshot.data().LikerID == userUId) {
                postIsLiked = true
            }
        })
    })

    return postIsLiked
}

async function UnlikePost(UserID, selectedChannelID, PostID, PostOwner) {
    
    let PostLikeCount = 0;
  
    // get the like count on the post
    await firestore()
    .collection('PostLikes')
    .doc(PostID)
    .get()
    .then (docSnapshot => {
        if(docSnapshot.exists) {
            PostLikeCount = docSnapshot.data().LikeCount;
        }
    });
    // decrease like count by 1 and update
    PostLikeCount = PostLikeCount - 1;
    
    await firestore()
    .collection('PostLikes')
    .doc(PostID)
    .update({
      LikeCount: PostLikeCount
    });
  
    // remove post owner from list of users liked by auth user
    await firestore()
    .collection('PeopleLiked')
    .doc(UserID)
    .collection('Users')
    .doc(PostOwner)
    .delete();

    await firestore()
    .collection('Channels')
    .doc(selectedChannelID)
    .collection('Posts')
    .doc(PostID)
    .collection('LikedBy')
    .doc(UserID)
    .delete()
}

async function LikePost(UserID, PostID, selectedChannelID, postOwner) {

    // check if its userid's post
    if (UserID === postOwner) {
        return;
    }

    let alreadyLikedPost = false
    //check if user already liked the post
    await firestore()
    .collection('UserLikedPosts')
    .doc(UserID)
    .collection('Posts')
    .doc(PostID)
    .get()
    .then( docSnapshot => {
        if (docSnapshot.exists) {
            alreadyLikedPost = true;
        }
    })
    //console.log('1')

    if (alreadyLikedPost === true) {

    } else {

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
    //console.log('2')


    // add 1 to the like count and update
    PostLikeCount += 1;

    await firestore()
    .collection('PostLikes')
    .doc(PostID)
    .update({
        LikeCount: PostLikeCount
    });
    //console.log('3')


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
    //console.log('4')


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
        //console.log('5')

    }
    else {
        await firestore()
        .collection('PeopleLiked')
        .doc(UserID)
        .collection('Users')
        .doc(postOwner)
        .update({
            TimeLiked: time,
            UserID: postOwner
        });
        //console.log('6')

    }

    // check if user has already liked the post
    let userLikedPost = false
    await firestore()
    .collection('Channels')
    .doc(selectedChannelID)
    .collection('Posts')
    .doc(PostID)
    .collection('LikedBy')
    .doc(UserID)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            userLikedPost = true
        }
    })
    //console.log('7')


    // user has not liked the post
    if (userLikedPost == false) {
        // add user to the posts likedby collection
        await firestore()
        .collection('Channels')
        .doc(selectedChannelID)
        .collection('Posts')
        .doc(PostID)
        .collection('LikedBy')
        .doc(UserID)
        .set({
            LikerID: UserID,
            PostOwner: postOwner
        })
        //console.log('8')


        await firestore()
        .collection('UserLikedPosts')
        .doc(UserID)
        .collection('Posts')
        .doc(PostID)
        .set({
            Channel: selectedChannelID,
            PostID: PostID,
            TimeLiked: time,
            UserID: UserID
        })
        //console.log('9')


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
        //console.log('10')


        postLikedCount += 1
        if (postsLikedCountExists == true) {
            await firestore()
            .collection('UserLikedPosts')
            .doc(UserID)
            .update({
                PostsLikedCount: postLikedCount
            }) 
            //console.log('11')

        } 
    } 

    // check if it is match, if so, create notif for match and add to new friends
    // if not, add to postowner notifications
    let userLikedPostOwner = false
    let postOwnerLikedUser = false

    await firestore()
    .collection('PeopleLiked')
    .doc(UserID)
    .collection('Users')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(docSnapshot => {
            if (docSnapshot.data().UserID == postOwner) {
                userLikedPostOwner = true
            }
        })
    })

    await firestore()
    .collection('PeopleLiked')
    .doc(postOwner)
    .collection('Users')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(docSnapshot => {
            if (docSnapshot.data().UserID == UserID) {
                postOwnerLikedUser = true
            }
        })
    }) 

    // check if users are already friends
    let alreadyFriendsCheck = false
    await firestore()
    .collection('Friends')
    .doc(UserID)
    .collection('FriendsWith')
    .doc(postOwner)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            alreadyFriendsCheck = true
        }
    })
    // match
    if (userLikedPostOwner == true && postOwnerLikedUser == true && alreadyFriendsCheck == false) {

        // new friends for UserID
        await firestore()
        .collection('Friends')
        .doc(UserID)
        .collection('FriendsWith')
        .doc(postOwner)
        .set({
            Messaged: false,
            UserID: UserID,
            FriendID: postOwner
        })
        // add to unopenedmesagescount for UserID
        let msgCountUserID = 0
        await firestore()
        .collection('Messages')
        .doc(UserID)
        .get()
        .then(docSnapshot => {
            msgCountUserID = docSnapshot.data().UnopenedMessages
        })

        msgCountUserID = msgCountUserID + 1
        await firestore()
        .collection('Messages')
        .doc(UserID)
        .update({
            UnopenedMessages: msgCountUserID
        })
        
        // add friend count for userid
        let UserIDFriendCount = 0
        await firestore()
        .collection('Friends')
        .doc(UserID)
        .get()
        .then(docSnapshot => {
            UserIDFriendCount = docSnapshot.data().FriendCount
        })
        UserIDFriendCount = UserIDFriendCount + 1
        await firestore()
        .collection('Friends')
        .doc(UserID)
        .update({
            UserID: UserID,
            FriendCount: UserIDFriendCount
        })
        
        // new friends for postOwner
        await firestore()
        .collection('Friends')
        .doc(postOwner)
        .collection('FriendsWith')
        .doc(UserID)
        .set({
            Messaged: false,
            UserID: postOwner,
            FriendID: UserID
        })

        // add to unopenedmesagescount for postOwner
        let msgCountPostOwner = 0
        await firestore()
        .collection('Messages')
        .doc(postOwner)
        .get()
        .then(docSnapshot => {
            msgCountPostOwner = docSnapshot.data().UnopenedMessages
        })

        msgCountPostOwner = msgCountPostOwner + 1
        await firestore()
        .collection('Messages')
        .doc(postOwner)
        .update({
            UnopenedMessages: msgCountPostOwner
        })

        // add friend count for postOwner
        let postOwnerFriendCount = 0
        await firestore()
        .collection('Friends')
        .doc(postOwner)
        .get()
        .then(docSnapshot => {
            postOwnerFriendCount = docSnapshot.data().FriendCount
        })

        postOwnerFriendCount = postOwnerFriendCount + 1
        await firestore()
        .collection('Friends')
        .doc(postOwner)
        .update({
            UserID: postOwner,
            FriendCount: postOwnerFriendCount
        })
    }
}
}

function PostModal ({openPost, setOpenPost, selectedChannelID, selectPostIndex}) {

    const {selectedPost, user, channelPosts, setJustUnliked} = useContext(LoggedInContext)
    const [postIsLiked, setPostIsLiked] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [unliked, setUnliked] = useState(false)
    const [justLiked, setJustLiked] = useState(false)
    const [postOwner, setPostOwner] = useState()

    //console.log('channelid', selectedChannelID)
    //console.log('channelposts', channelPosts)
    //console.log('selectedpostindex', selectPostIndex)

    async function getData() {
        let data;
        if (selectedPost) {
            data = await openPostLikeCheck(selectedPost.PostID, selectedChannelID, user.uid)
            setDataLoaded(true)
        }
        setPostIsLiked(data)
    }

    useEffect(() => {
        getData()
    }, [openPost])

    useEffect(() => {
        if (justLiked == true) {
            //console.log('justLiked', justLiked)
            setPostIsLiked(true)
            setJustLiked(false)
            channelPosts[selectPostIndex].UserLiked = true
            //console.log('double tap end', justLiked)
        } 
    }, [justLiked])

    useEffect(() => {
        if (unliked == true) {
            channelPosts[selectPostIndex].UserLiked = false
            setJustUnliked(true)
        }
    }, [unliked])

    if (selectedPost == null && dataLoaded == false) {
        return null
    }

    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
    })
    .onEnd(() => {
        if (postOwner !== user.uid) {
            setJustLiked(true)
            LikePost(user.uid, selectedPost.PostID, selectedChannelID, postOwner) 
        }
        
    })
    .runOnJS(true)

    return (
        <Modal visible={openPost} transparent={true}>
            <GestureHandlerRootView>
                <View style={styles.postModalFullScreen}>
                    <View style={styles.ownPostModal2}>
                        <Pressable onPress={() => {setPostOwner(selectedPost.PostOwner)}}>
                            <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
                                <View style={styles.somewthing2}>
                                    <ImageBackground source={{uri: selectedPost.ImageURL}} style={styles.postModalPostPlaceholder}>
                                        <IIcon style={{ marginLeft: '2%', marginTop: '2%', position: 'absolute'}} name="ios-close-outline" size={scale(29)} color='white'
                                        onPress={() => {setOpenPost(false); setPostIsLiked(false); setDataLoaded(false)} }/>
                                            
                                    </ImageBackground>
                                

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', }}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                            
                                            {
                                                postIsLiked == true ?
                                                <Pressable onPress={() => {setPostIsLiked(false); UnlikePost(user.uid, selectedChannelID, selectedPost.PostID, selectedPost.PostOwner);
                                                setJustUnliked(true)}}>
                                                    <IIcon name='ios-heart' color='red' size={scale(14)}/>
                                                </Pressable>
                                                :
                                                null
                                            }
                                            <Text style={styles.postModalCaption}>
                                                {selectedPost.Caption}
                                                
                                            </Text>
                                        </View>         
                                    </View>
                                </View> 
                            </GestureDetector> 
                        </Pressable>
                    </View>
                </View>   
            </GestureHandlerRootView>
        </Modal>
        
    )
    
}

export default PostModal;
