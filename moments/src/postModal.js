import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function PostModal ({openPost, setOpenPost}) {
    return (
        <Modal visible={openPost} transparent={true}>
            <View style={styles.postModalFullScreen}>
                <View style={styles.postModal}>
                    <View style={{backgroundColor: 'blue', flex: 10}}>
                        <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={scale(29)} color='white'
                        onPress={() => {setOpenPost(false)}}
                        />
                    </View>
                    <View style={{justifyContent: 'space-evenly', flex: 1}}>
                        <Text style={styles.postModalCaption}>
                            hello world
                        </Text>
                        <View style={styles.postModalBottomBorder}/>
                    </View>
                </View>
            </View>
                
        </Modal>
    )
    
}

export default PostModal;