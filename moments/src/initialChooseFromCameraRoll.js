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
import { utils } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const displayPhotoKey = '@app:displayPhoto'



async function UploadProfilePic(ProfilePicDownloadedURL, uid) {

    let profilePicExists = false
    await firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then (docSnapshot => {
        if (docSnapshot.exists) {
            profilePicExists = true
        }
    })
    // update
    if (profilePicExists === true) {
        await firestore()
        .collection('Users')
        .doc(uid)
        .update({
            ProfilePic: ProfilePicDownloadedURL
        })
    } else {
        await firestore()
        .collection('Users')
        .doc(uid)
        .set({
            ProfilePic: ProfilePicDownloadedURL
        })
    }
}

function InitialChooseFromCameraRoll ({navigation}) {

    const { dpURL, setDpURL, user, setUser } = useContext(LoggedInContext);

    

    const reference = storage().ref(`/ProfilePics/${user.uid}`)

    function PickImage() {
        ImagePicker.openPicker({
            width: screenWidth * 0.9,
            height: screenHeight * 0.55,
            cropping: true,

        }).then(image => {
            setDpURL(image.path)
        });
    }

    async function setInitialDP () {
        // upload to firestore and context state
        
        await AsyncStorage.setItem(displayPhotoKey, 'true')
        navigation.navigate('Map')
    }

    //console.log("dpURL", dpURL)

    async function uploadImage() {
        const pathToFile = dpURL;
        // uploads file
        await reference.putFile(pathToFile);
        //console.log(user.uid)
        // assign DPURL to context state
        const downloadedURL = await storage().ref(`/ProfilePics/${user.uid}`).getDownloadURL();
        setDpURL(downloadedURL)

        await setInitialDP ()

        await UploadProfilePic(downloadedURL, user.uid)
    }
    
    return (
        <SafeAreaView style={styles.takePhotoforDPBackground}>
            <View style={styles.chooseFromCameraRollHeader}>
                <Pressable style={styles.CFCRBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={30} color='white'/>
				</Pressable>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                    Camera Roll
                </Text>
                <Pressable onPress={() => {uploadImage()}}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'white', marginRight: '3%'}}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.CFCRPhoto}>
                <Image style={styles.justTakenPhoto} source={{uri: 'file://' + dpURL}}/> 
            </View>
            <Pressable style={styles.openCameraRollButton} onPress={() => PickImage()}>
                <Text style={styles.openCameraRollText}>
                    Open Camera Roll
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default InitialChooseFromCameraRoll;

//navigation.navigate('Dms')          