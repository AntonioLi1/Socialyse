import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList, Modal, Dimensions, ImageBackground, TextComponent } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostModal from './postModal';
import { ScrollView } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App';

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
        
        //console.log('likeCountQuerySnapshot', likeCountQuerySnapshot)
        obj.ImageURL = snapshot.data().ImageURL
        obj.Caption = snapshot.data().Caption
        obj.PostID = snapshot.data().PostID
        obj.LikeCount = likeCountQuerySnapshot.data().LikeCount
        ownPostsArray.push(obj)
    }
    //console.log('ownPostsArray',ownPostsArray)
    return ownPostsArray;
}

async function DeletePost(UserID, PostID, selectedChannelID) {

    // Delete from channel posts, user posts and posts liked
    console.log('selectedChannelID', selectedChannelID)
    console.log('PostID',PostID)
    console.log('UserID', UserID)
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

function OwnPosts({ownPost, setOwnPost, selectedChannelID}) { 
    const width = Dimensions.get('window').width

    const [ownPosts, setOwnPosts] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [deletedPost, setDeletePost] = useState(false)
    //const [selectedOwnPostIndex, setSelectedOwnPostIndex] = useState()

    const {user} = useContext(LoggedInContext)

    async function getData() {
        const data = await ViewOwnPosts(user.uid)
        setOwnPosts(data)
        setDataLoaded(true)
    }
 
    useEffect(() => {
        getData()
        //console.log(ownPosts) 
    },[])  

    // useEffect(() => {
    //     setDataLoaded(false)
    //     //console.log('deletedPost', deletedPost)
    //     //console.log('selectedOwnPostIndex', selectedOwnPostIndex)
    //     if (deletedPost == true && selectedOwnPostIndex >= 0) {
    //         let temp = ownPosts;
    //         temp.splice(selectedOwnPostIndex, 1) 
    //         setOwnPosts(temp)
    //         console.log('ownposts new',ownPosts)
    //         setDeletePost(false) 
    //         console.log('deletepost', deletedPost)
    //         setDataLoaded(true)
    //         //setOwnPosts(ownPost.filter(item => ))
    //     }
    // }, [deletedPost])

    // if the ownposts becomes empty, close the modal using useeffect
    useEffect(() => { 
        if (ownPosts) {
            if (ownPosts.length == 0) {
                setOwnPost(false) 
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
                                    
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                                                <IIcon name='ios-heart' color='white' size={scale(14)}
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
                    {/* <View>
                        <View style={styles.ownPostModalPlaceHolder}>
                            <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={scale(32)} color='white'
                            onPress={() => {setOwnPost(false)}}
                            />
                        </View>
                        
                        <Text style={styles.postModalCaption}>
                            hello world
                        </Text>
                    </View> */}
                </View>
            </View>
                
        </Modal> 
    );
    
}

export default OwnPosts;

/*
                    <View style={{backgroundColor: 'blue', flex: 10}}>
                            <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={32} color='white'
                            onPress={() => {setOwnPost(false)}}
                            />
                        </View>
                        <View style={{justifyContent: 'space-evenly', flex: 1, marginTop: '1%'}}>
                            <Text style={{color: 'white', alignSelf: 'flex-start', fontSize: 14, marginLeft: '5%', flexWrap: 'wrap'}}>
                                hello world
                            </Text>
                            <View style={{alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', marginBottom: '1%', marginRight: '3%'}}>
                                <IIcon name='ios-heart' color='white'/>
                                <Text style={{fontSize: 12, color: 'white'}}>
                                    2
                                </Text>
                            </View>
                        <View style={styles.postModalBottomBorder}/>   
                    </View>

                    

                

                
                <ScrollView >
                    {data.map((datas) => {
                        <View style={{backgroundColor: 'grey', width: '100%'}}>
                            <IIcon name="ios-close-outline" size={32} color='white'
                            onPress={() => {setOwnPost(false)}}
                            />
                            <Text>
                                {datas.caption}
                            </Text>

                        </View>
                    })}
                </ScrollView>

                <FlatList
                contentContainerStyle={{width: '100%'}}
                horizontal={true}
                data={data} 
                renderItem={({item, index}) => {
                    return(
                        <View style={{backgroundColor: 'grey', width: '100%'}}>
                            <IIcon name="ios-close-outline" size={32} color='white'
                            onPress={() => {setOwnPost(false)}}
                            />
                            <Text>
                                {item.caption}
                            </Text>

                        </View>
                    );
                }}
                >  
                </FlatList>
*/