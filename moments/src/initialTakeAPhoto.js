import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import { LoggedInContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

function InitialTakePhotoForDP ({navigation}) {
    const devices = useCameraDevices();
	const deviceBack = devices.back;
	const deviceFront = devices.front;

    const [cameraPermission, setCameraPermission] = useState();
  	const [microphonePermission, setMicrophonePermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const [takePhotoButton, setTakePhotoButton] = useState(true);
	const [backCamera, setbackCamera] = useState(true);
    const cameraref = useRef();
    const [photoTaken, setPhotoTaken] = useState(false);

	//const [showFooter, setShowFooter] = useState(false)

    const { editProfileModal, setEditProfileModal, setEditProfileModaldpURL, dpURL, setDpURL, user} = useContext(LoggedInContext);

	const reference = storage().ref(`/ProfilePics/${user.uid}`)

    const displayPhotoKey = '@app:displayPhoto'

    async function setInitialDP () {
        // upload to firestore and context state
        
        await AsyncStorage.setItem(displayPhotoKey, 'true')
        navigation.navigate('Map')
    }

	async function uploadImage() {
        // uploads file to storage
		const pathToFile = imageURL
		// const reference = storage().ref(`/ProfilePics/${user.uid}`)
		await reference.putFile(pathToFile);

        // assign DPURL to context state
        const downloadedURL = await storage().ref(`/ProfilePics/${user.uid}`).getDownloadURL();
        setDpURL(downloadedURL)
        // add to async storage
        await setInitialDP ()

		// upload dp to firestore
        await UploadProfilePic(downloadedURL, user.uid)
    }



    const takePhoto = async () => {
		const photo = await cameraref.current.takeSnapshot({
			quality: 85,
			skipMetadata: true
		})
		setImageURL(photo.path);
	}

	const takePhotoAndButton = () => {
		takePhoto();
		setTakePhotoButton(false);
	}

	const closePhoto = () => {
		setImageURL(null);
		setTakePhotoButton(true);
	}

	useEffect(() => {
		Camera.getCameraPermissionStatus().then(setCameraPermission);
		Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
		getCameraPermission();
	}, []);

	const getCameraPermission = async () => {
		try {
			const newCameraPermission = await Camera.requestCameraPermission()
			const newMicrophonePermission = await Camera.requestMicrophonePermission()
			
		} catch (error) {
			console.log(error)
		}
	}
	
	if (cameraPermission == null || microphonePermission == null) {
		// still loading
		return null;
	}




    return (
        <SafeAreaView style={styles.initialTakePhotoforDPBackground}>
            {
				imageURL ? 
					<View>
						<View style={styles.justTakenPhotoContainer}>
							<ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
								
								<MCIcon name='camera-retake' style={styles.justTakenPhotoClose} size={scale(25)} color='white'
								onPress={() => {closePhoto(); setPhotoTaken(false)}}
								/>
							</ImageBackground>	 
						</View>		
					</View>
				:
				 (cameraPermission && deviceFront && deviceBack) ?
				 	(backCamera) ? 
						<View style={styles.cameraContaner}>
							<Camera
							video={false}
							isActive
							device={deviceBack}
							style={styles.camera}
							ref={cameraref}
							photo={true}
							enableZoomGesture={true}
							/>
							<IIcon name='camera-reverse-sharp' color='white' size={scale(30)} style={styles.reverseCameraButtonForDP}
							onPress={() => setbackCamera(false)}/>
						</View>
						:
						<View style={styles.cameraContaner}>
							<Camera
							video={false}
							isActive
							device={deviceFront}
							style={styles.camera}
							ref={cameraref}
							photo={true}
							enableZoomGesture={true}
							/>
							<IIcon name='camera-reverse-sharp' color='white' size={scale(30)} style={styles.reverseCameraButtonForDP}
							onPress={() => setbackCamera(true)}/>
						</View>
                        
					: 
					<Text>You must accept camera permission</Text>
			}
			{
				takePhotoButton ? 
				<Pressable onPress={() => {takePhotoAndButton(); setPhotoTaken(true) }}>
					<View style={styles.takePhotoButton}>
						<IIcon name="ios-camera-outline" size={scale(36)} color='white'/>
					</View>
				</Pressable> 
				:
				<Pressable onPress={() => {uploadImage()}}>
					<View style={styles.takePhotoButton}>
						<IIcon name="ios-checkmark" size={scale(36)} color='white'/>
					</View>
				</Pressable> 
			}
            

			<Pressable style={styles.takeAPhotoDPBackButton} onPress={() => {navigation.goBack(); setEditProfileModal(false)}}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>
			
			
			
			
        </SafeAreaView>
    );
}

export default InitialTakePhotoForDP;