import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable, FlatList, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GettingStartedContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import PostModal from './postModal';


const data = [{caption: 'john', key: 1}, {caption: 'non', key: 2}, {caption: 'egf', key: 3}, {caption: 'egf', key: 4}, {caption: 'egf', key: 5} ]



function OwnPosts({ownPost, setOwnPost}) {
    
    return (
        <Modal visible={ownPost} transparent={true}>
            <View style={styles.ownPostModal}>
                <FlatList
                contentContainerStyle={{width: '100%'}}
                horizontal
                data={data} 
                
                renderItem={({item, index}) => {
                    return(
                        <View style={{backgroundColor: 'blue', width: '100%'}}>
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
*/