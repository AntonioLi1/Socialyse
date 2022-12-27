import React, { useContext, useState } from 'react';
import { View, Text, Pressable, Modal, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { LoggedInContext } from '../App';

function PostModal ({openPost, setOpenPost}) {

    const {selectedPost} = useContext(LoggedInContext)

    if (selectedPost == null) {
        return null
    }

    return (
        <Modal visible={openPost} transparent={true}>
            <View style={styles.postModalFullScreen}>
                <View style={styles.ownPostModal2}>
                    <View style={styles.somewthing2}>  
                        <ImageBackground source={{uri: selectedPost.ImageURL}} style={styles.postModalPostPlaceholder}>
                            <IIcon style={{ marginLeft: '2%', marginTop: '2%'}} name="ios-close-outline" size={scale(29)} color='white'
                            onPress={() => {setOpenPost(false)}}/>
                             
                        </ImageBackground>
                        <Text style={styles.postModalCaption}>
                            {selectedPost.Caption}
                        </Text>
                    </View>

                    
                    
                </View>
            </View>
                
        </Modal>
    )
    
}

export default PostModal;