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
    console.log('openpostlikecheck1')

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
    console.log('openpostlikecheck2')


    return postIsLiked
}

async function UnlikePost(UserID, selectedChannelID, PostID, PostOwner) {
    

    let PostLikeCount = 0;
  
    // get the like count on the post
    await firestore()
    .collection('UserPostLikes')
    .doc(UserID)
    .get()
    .then (docSnapshot => {
        if(docSnapshot.exists) {
            PostLikeCount = docSnapshot.data().LikeCount;
            PostLikeCount = PostLikeCount - 1;
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

    await firestore().doc(`Channels/${selectedChannelID}/Posts/${PostID}/Likedby/${UserID}`).delete()

}

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

        // match notif for UserID
        // await firestore()
        // .collection('Notifications')
        // .doc(UserID)
        // .collection('Notifs')
        // .add({
        //     TimeNotified: time,
        //     OtherUid: postOwner
        // })
        // new friends for UserID
        await firestore()
        .collection('Friends')
        .doc(UserID)
        .collection('FriendsWith')
        .add({
            Messaged: false,
            UserID: UserID,
            FriendID: postOwner
        })
        // increment notif count for UserID
        // let userIDNotifCount = 0
        // await firestore()
        // .collection('Notifications')
        // .doc(UserID)
        // .get()
        // .then(docSnapshot => {
        //     userIDNotifCount = docSnapshot.data().NotificationCount
        // })
        // userIDNotifCount += 1
        // await firestore()
        // .collection('Notifications')
        // .doc(UserID)
        // .update({
        //     NotificationCount: userIDNotifCount
        // })

        // match notif for postOwner
        // await firestore()
        // .collection('Notifications')
        // .doc(postOwner)
        // .collection('Notifs')
        // .add({
        //     TimeNotified: time,
        //     OtherUid: UserID
        // })
        // new friends for postOwner
        await firestore()
        .collection('Friends')
        .doc(postOwner)
        .collection('FriendsWith')
        .add({
            Messaged: false,
            UserID: postOwner,
            FriendID: UserID
        })
        // increment notif count for postowner
        // let postOwnerNotifCount = 0
        // await firestore()
        // .collection('Notifications')
        // .doc(postOwner)
        // .get()
        // .then(docSnapshot => {
        //     postOwnerNotifCount = docSnapshot.data().NotificationCount
        // })
        // userIDNotifCount += 1
        // await firestore()
        // .collection('Notifications')
        // .doc(postOwner)
        // .update({
        //     NotificationCount: postOwnerNotifCount
        // })

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
