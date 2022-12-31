import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList, Modal, Dimensions, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GettingStartedContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
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

    await firestore()
    .collection('Users')
    .doc(uid)
    .collection('UserPosts')
    .where('TimeUploaded', '>', test )
    .orderBy('TimeUploaded', 'desc')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            let obj = {
                ImageURL: '',
                Caption: '',
            }
            obj.ImageURL = snapshot.data().ImageURL
            obj.Caption = snapshot.data().Caption
            ownPostsArray.push(obj)
        })
    })
    //console.log(ownPostsArray)
    return ownPostsArray;
}

function OwnPosts({ownPost, setOwnPost}) {
    const width = Dimensions.get('window').width

    const [ownPosts, setOwnPosts] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const {user} = useContext(LoggedInContext)

    async function getData() {
        const data = await ViewOwnPosts(user.uid)
        setOwnPosts(data)
        setDataLoaded(true)
    }

    useEffect(() => {
        getData()
    },[])

    if (dataLoaded == false) return null

    //console.log(ownPost)

    return (
        <Modal visible={ownPost} transparent={true}>
            <View style={styles.postModalFullScreen2}>
                <View style={styles.ownPostModal}>                  
                    <FlatList
                        horizontal={true}
                        data={ownPosts}
                        decelerationRate="fast"
                        snapToInterval={width}
                        //snapToAlignment="start"
                        renderItem={({item, index}) => {
                            return(
                                <View style={styles.somewthing}>
                                    <ImageBackground source={{uri: item.ImageURL}} style={styles.ownPostModalPlaceHolder}>
                                        <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={32} color='white'
                                        onPress={() => {setOwnPost(false)}} 
                                        />  
                                    </ImageBackground>
                                    
                                    <Text style={styles.postModalCaption}>
                                        {item.Caption}
                                    </Text>
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