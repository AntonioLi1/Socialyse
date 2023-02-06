import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Pressable, SafeAreaView, ImageBackground, Alert, Text } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoggedInContext } from '../App'
import { scale } from 'react-native-size-matters';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openSettings } from 'react-native-permissions';


async function UploadProfilePic(ProfilePicDownloadedURL, uid) {

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

function InitialTakePhotoForDP ({navigation}) {
    const devices = useCameraDevices();
	const deviceBack = devices.back;
	const deviceFront = devices.front;

    const [cameraPermission, setCameraPermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const [takePhotoButton, setTakePhotoButton] = useState(true);
	const [backCamera, setbackCamera] = useState(true);
	const [cameraDisabled, setCameraDisabled] = useState(false)
    const cameraref = useRef();

    const { setEditProfileModal, setDpURL, user} = useContext(LoggedInContext);

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
		const photo = await cameraref.current.takePhoto({
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
		getCameraPermission();
	}, []);

	const getCameraPermission = async () => {
		try {
			const newCameraPermission = await Camera.requestCameraPermission()
			setCameraPermission(newCameraPermission);
			if (newCameraPermission !== 'authorized') {
				setCameraDisabled(true)
				// pop up alert
				Alert.alert(
					'Permission required',
					'You need to enable your camera to take a photo!',
					[
					  {
						text: 'Cancel',
						//onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					  },
					  {text: 'Open Settings', onPress: () => openSettings()},
					],
					{cancelable: false},
				);
			} else {
				setCameraDisabled(false)
			}
		} catch (error) {
			
		}
	}
	
	if (cameraPermission == null) {
		// still loading
		return (
			<SafeAreaView style={styles.loadingScreen}>
				<Text style={styles.loadingSocialyseText}>
				SOCIALYSE
				</Text>
			</SafeAreaView>
		);
	}

    return (
        <SafeAreaView style={styles.initialTakePhotoforDPBackground}>
            {
				imageURL ? 
					<View>
						<View style={styles.justTakenPhotoContainer}>
							<ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
								
								<MCIcon name='camera-retake' style={styles.justTakenPhotoClose} size={scale(25)} color='white'
								onPress={() => {closePhoto(); }}
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
					null
			}
			{
				takePhotoButton ? 
				<Pressable disabled={cameraDisabled} onPress={() => {takePhotoAndButton(); }}>
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