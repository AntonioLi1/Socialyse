import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { LoggedInContext } from '../App';
import firestore from '@react-native-firebase/firestore';
import { TapGestureHandler, Gesture, GestureDetector, GestureHandlerRootView, Directions } from 'react-native-gesture-handler';


async function openPostLikeCheck(PostID, selectedChannelID, userUId) {
    let postIsLiked = false

    await firestore()
    .collection('Channels')
    .doc(selectedChannelID)
    .collection('Posts')
    .doc(PostID)
    .collection('Likedby')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if (snapshot.data().UserID == userUId) {
                //console.log('useruid to match',snapshot.data().UserID)
                postIsLiked = true
            }
        })
    })
    return postIsLiked
}

async function UnlikePost(UserID, selectedChannelID, PostID, PostOwner) {
    

    await firestore().doc(`Channels/${selectedChannelID}/Posts/${PostID}/Likedby/${UserID}`).delete()
    
    let PostLikeCount = 0;
  
    // get the like count on the post
    await firestore()
    .collection('UserPostLikes')
    .doc(PostID)
    .get()
    .then (docSnapshot => {
        if(docSnapshot.exists) {
          PostLikeCount = docSnapshot.data().LikeCount;
        }
    });
    
    // decrease like count by 1 and update
    PostLikeCount -= 1;
  
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

function PostModal ({openPost, setOpenPost, selectedChannelID, selectPostIndex}) {

    const {selectedPost, user, channelPosts, setChannelPosts, setJustUnliked} = useContext(LoggedInContext)
    const [postIsLiked, setPostIsLiked] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [unliked, setUnliked] = useState(false)
    const [justLiked, setJustLiked] = useState(false)
    const [postOwner, setPostOwner] = useState()

    async function getData() {
        //console.log('getdata selectedPost', selectedPost)
        let data;
        if (selectedPost) {
            data = await openPostLikeCheck(selectedPost.PostID, selectedChannelID, user.uid)
            setDataLoaded(true)
        }
        
        //console.log('data',data)
        setPostIsLiked(data)
        //setDataLoaded(true)
    }

    useEffect(() => {
        getData()
    }, [openPost])

    useEffect(() => {
        //console.log('selectPostIndex', selectPostIndex)
        if (justLiked == true) {
            console.log('justLiked', justLiked)
            // let trial = channelPosts
            // setJustLiked(false)
            // //console.log('selectPostIndex', selectPostIndex)
            // trial[selectPostIndex].UserLiked = true
            //setChannelPosts(trial)
            setPostIsLiked(true)
            setJustLiked(false)
            channelPosts[selectPostIndex].UserLiked = true
            console.log('double tap end', justLiked)
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
        console.log('hellos')
    })
    .onEnd(() => {
        console.log('hello2')
        setJustLiked(true)
        LikePost(user.uid, selectedPost.PostID, selectedChannelID, postOwner) 
    })
    .runOnJS(true)

    //console.log('openPost', openPost)

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