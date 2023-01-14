import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ImageBackground, Image, Platform } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import { LoggedInContext } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const displayPhotoKey = '@app:displayPhoto'

function InitialCreateDP() {
    const navigation = useNavigation()

    const { dpURL, setDpURL, user, setUser } = useContext(LoggedInContext);

    async function setInitialDP () {
        // upload to firestore and context state
        
        await AsyncStorage.setItem(displayPhotoKey, 'true')
        navigation.navigate('Map')
    }

    function PickImage() {
        ImagePicker.openPicker({
            width: screenWidth * 0.9,
            height: screenHeight * 0.55,
            cropping: true,

        }).then(image => {
            console.log("full image",image);
            setDpURL(image.path)
        });
    }
    
    return (
        <SafeAreaView style={styles.initialDPFullScreen}>
            <Text style={styles.chooseADisplayPicText}>
                Before we begin... {'\n'} 
                you need a profile pic!
            </Text>

            <View style={styles.initialDPBody}>
                <Pressable style={styles.loginButton} onPress={() => {navigation.navigate('InitialTakePhotoForDP')}}>
                    <Text style={{fontSize: RFValue(12), fontWeight: '700', color: 'black'}}>
                        Let me take a mfer uhhhhh Bhoto
                    </Text>
                </Pressable>
                <Text style={styles.or}>
                    OR
                </Text>

                <Pressable style={styles.signUpButton} onPress={() => {navigation.navigate('InitialChooseFromCameraRoll'); PickImage()}}>
                    <Text style={{fontSize: RFValue(12), fontWeight: '700', color: 'black'}}>
                        Choose from camera roll
                    </Text>
                </Pressable>
            </View>

            
        </SafeAreaView>
    )
}

export default InitialCreateDP;