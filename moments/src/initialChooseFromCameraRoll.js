import React, { useContext,useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, Image, Alert } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { LoggedInContext } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions';


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const displayPhotoKey = '@app:displayPhoto'

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

async function UploadProfilePic(ProfilePicDownloadedURL, uid) {

    // update
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

function InitialChooseFromCameraRoll ({navigation}) {

    const { dpURL, setDpURL, user } = useContext(LoggedInContext);

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

    async function uploadImage() {
        const pathToFile = dpURL;
        // uploads file
        await reference.putFile(pathToFile);
        // assign DPURL to context state
        const downloadedURL = await storage().ref(`/ProfilePics/${user.uid}`).getDownloadURL();
        setDpURL(downloadedURL)

        await setInitialDP ()

        await UploadProfilePic(downloadedURL, user.uid)
    }

    async function checkPermissions() {
        await getCameraRollPermission()
    }
    
    useEffect(() => {
        checkPermissions()
    }, [])
    
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