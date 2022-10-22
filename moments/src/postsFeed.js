import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GettingStartedContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import PostModal from './postModal';
import OwnPosts from './ownPostModal';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const data = [{caption: 'john', key: 1}, {caption: 'non', key: 2}, {caption: 'egf', key: 3}, {caption: 'egf', key: 3}, {caption: 'egf', key: 3} ]

const formatData = (data) => {
    data.push({empty: true, key: 'blank'})
    return data;
}

function PostsFeed ({navigation}) {
    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
    const [openPost, setOpenPost] = useState(false);
    const [ownPost, setOwnPost] = useState(false);

    if (data.length % 2 !== 0) {
        formatData(data);
    }
    
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
                            <IIcon name='notifications-outline' size={scale(30)} color='white' />
                        </Pressable>
                        <View style={styles.notificationCountContainer}>
                            <Text style={styles.notifCountText}>
                                6
                            </Text>
                        </View>
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
                data={data} 
                renderItem={({item, index}) => 
				{
                    if (item.empty === true) {
                        
                        return <View style={styles.blank}/>
                    }
					return (
                        <View>
                            <Pressable onPress={() => {setOpenPost(true)}}>
                                <View style={styles.postContainer}>
                                    <View style={styles.fullPost}>
                                        <View style={styles.postPhoto}>

                                        </View>
                                        <Text style={styles.postCaption}>
                                            {item.caption}
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
                    <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={scale(31)} />
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