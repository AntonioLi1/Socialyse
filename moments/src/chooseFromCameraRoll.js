import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, SafeAreaView, Image, Platform, Alert } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { LoggedInContext } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions';


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

async function UploadProfilePic(ProfilePicDownloadedURL, uid) {

    // update Users and UsernameAndDP
    await firestore()
    .collection('Users')
    .doc(uid)
    .update({
        ProfilePic: ProfilePicDownloadedURL
    })
    await firestore()
    .collection('UsernameAndDP')
    .doc(uid)
    .update({
        ProfilePic: ProfilePicDownloadedURL
    })
}

async function getCameraRollPermission() {
    if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(async (result) => {
            if (result !== 'granted') {
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(res => {
                    Alert.alert(
                        'Permission required',
                        'We need location permission to work this app, Please allow location permission in your settings',
                        [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {text: 'Open Settings', onPress: () => openSettings()},
                        ],
                        {cancelable: false},
                    );
                })
            }
        }) 
    }
}

function ChooseFromCameraRoll ({navigation}) {

    const { setDpURL, user } = useContext(LoggedInContext);
    const [imageURL, setImageURL] = useState()
    const [pressedCameraRoll, setPressedCameraRoll] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPressedCameraRoll(false)
        }, 100)
    }, [pressedCameraRoll])

    const reference = storage().ref(`/ProfilePics/${user.uid}`)

    function PickImage() {
        ImagePicker.openPicker({
            width: screenWidth * 0.9,
            height: screenHeight * 0.55,
            cropping: true,

        }).then(image => {
            setImageURL(image.path)
        });
    }
    async function checkPermissions() {
        await getCameraRollPermission()
    }
    
    useEffect(() => {
        checkPermissions()
    }, [])

    async function uploadImage() {
        const pathToFile = imageURL;
        // uploads file
        await reference.putFile(pathToFile);
        // assign DPURL to context state
        const downloadedURL = await storage().ref(`/ProfilePics/${user.uid}`).getDownloadURL();
        setDpURL(downloadedURL)
        await UploadProfilePic(downloadedURL, user.uid)
    }
    
    return (
        <SafeAreaView style={styles.takePhotoforDPBackground}>
            <View style={styles.chooseFromCameraRollHeader}>
                <Pressable style={styles.CFCRBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={30} color='white'/>
				</Pressable>
                <Text style={{fontSize: screenHeight * 0.024, fontWeight: '700', color: 'white', fontFamily: 'Helvetica'}}>
                    Camera Roll
                </Text>
                <Pressable onPress={() => {uploadImage(); navigation.navigate('profile')}}>
                    <Text style={{fontSize: screenHeight * 0.022, fontWeight: '700', color: 'white', marginRight: '3%', fontFamily: 'Helvetica'}}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.CFCRPhoto}>
                <Image style={styles.justTakenPhoto} source={{uri: 'file://' + imageURL}}/> 
            </View>
            <Pressable style={styles.openCameraRollButton} onPress={() => {PickImage(); setPressedCameraRoll(true)}}>
                <Text style={[styles.openCameraRollText, {color: pressedCameraRoll ? 'grey' : 'white', fontFamily: 'Helvetica'}]}>
                    Open Camera Roll
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ChooseFromCameraRoll;

