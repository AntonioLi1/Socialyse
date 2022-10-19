import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList } from 'react-native';
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

const GradientText = (props) => {
	return (
	  <MaskedView maskElement={<Text {...props} />}>
		<LinearGradient
		  colors={["#AD00FF", "#00FFA3"]}
		  start={{ x: 0, y: 0.35 }}
		  end={{ x: 0, y: 0.7 }}
		>
		  <Text {...props} style={[props.style, { opacity: 0.3 }]} />
		</LinearGradient>
	  </MaskedView>
	);
};

const data = [{caption: 'john', key: 1}, {caption: 'non', key: 2}, {caption: 'egf', key: 3}, {caption: 'egf', key: 3}, {caption: 'egf', key: 3} ]

const formatData = (data) => {
    data.push({empty: true, key: 'blank'})
    return data;
}

function PostsFeed ({navigation}) {
    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
    const [openPost, setOpenPost] = useState(false);
    const [ownPost, setOwnPost] = useState(false);

    formatData(data);

    

    return (
        <View style={styles.MBBackground}>
            <View style={styles.postsFeedHeader}>
                <View style={{flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {setMessageDisplay(true); navigation.navigate('Map'); setNotifDisplay(true) }}>
                        <MIIcon name='arrow-forward-ios' size={32} color='white'/>
                    </Pressable>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.socialTextYellow}>
                            SOCIALYSE
                        </Text>
                        <GradientText style={styles.socialTextGradient}>
                            SOCIALYSE
                        </GradientText>
                    </View>
                    <View style={styles.notificationContainerPostsFeed}>
                        <Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
                            <IIcon name='notifications-outline' size={32} color='white' />
                        </Pressable>
                        <View style={styles.notificationCountContainer}>
                            <Text style={{ fontSize: 10, color: 'black' }}>
                                6
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: 12, color: 'white', position: 'absolute', bottom: '0%'}}>
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
                                        <Text style={{fontSize: 12, marginHorizontal: '2%'}}>
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
                    <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={33} />
                </Pressable>
                <Pressable style={styles.ownPostsButton} onPress={() => {setOwnPost(true)}}>
                    
                </Pressable>
            </View>
            <OwnPosts ownPost={ownPost} setOwnPost={setOwnPost}/>
        </View>
    );
    
    
}

export default PostsFeed;

/*
                    <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {setMessageDisplay(true); navigation.navigate('Map'); setNotifDisplay(true) }}>
                        <MIIcon name='arrow-forward-ios' size={32} color='white'/>
                    </Pressable>
                    
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.socialTextYellow}>
                            SOCIALYSE
                        </Text>
                        <GradientText style={styles.socialTextGradient}>
                            SOCIALYSE
                        </GradientText>
                    </View>

                    

                    <View style={styles.notificationContainerPostsFeed}>
                        <Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
                            <IIcon name='notifications-outline' size={32} color='white' />
                        </Pressable>
                        <View style={styles.notificationCountContainer}>
                            <Text style={{ fontSize: 10, color: 'black' }}>
                                6
                            </Text>
                        </View>
                    </View>
*/