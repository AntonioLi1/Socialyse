import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, Image, ImageBackground, SafeAreaView } from 'react-native';
import styles from './styles';
import CaptionModal from './captionModal';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import {GettingStartedContext} from '../App';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';




function MakeAPost({}) {
	const navigation = useNavigation();
	const devices = useCameraDevices()
	const deviceBack = devices.back;
	const deviceFront = devices.front;

    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
	
	const [cameraPermission, setCameraPermission] = useState();
  	const [microphonePermission, setMicrophonePermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const [takePhotoButton, setTakePhotoButton] = useState(true);
	const [backCamera, setbackCamera] = useState(true);
	const [caption, setCaption] = useState('add a caption...');
	const [addedCaption, setAddedCaption] = useState(false);
	const [captionModal, setCaptionModal] = useState(false);
	const cameraref = useRef();

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
		<SafeAreaView style={styles.MBBackground}>
			<View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
				<Text style={styles.takeAPhotoText}>
					TAKE A PHOTO TO {'\n'}
				
					SOCIALYSE
				</Text>
			</View>
			{
				imageURL ? 
					<View>
						<View style={styles.justTakenPhotoContainerMakePost}>
							<ImageBackground style={styles.justTakenPhotoMakePost} source={{uri:'file://' + imageURL}}>
								<FIcon name='close' style={styles.justTakenPhotoClose} size={scale(25)} color='black'
								onPress={() => {closePhoto(); setCaption('add a caption...')}}
								/>
							</ImageBackground>	 
						</View>
						
						<Pressable onPress={() => {setCaptionModal(true)}}>
							{
								addedCaption ? 
									<Text style={styles.addACaptionPlaceHolder}>
									{caption}
									</Text>	
									// add a remove caption button!
									: 
									<Text style={styles.addACaptionPlaceHolder}>
									add a caption...
									</Text>	
							}
						</Pressable>
						<CaptionModal captionModal={captionModal} setCaptionModal={setCaptionModal} caption={caption} setCaption={setCaption} setAddedCaption={setAddedCaption}/>

							
					</View>
				:
				 (cameraPermission && deviceFront && deviceBack) ?
				 	(backCamera) ? 
						<View style={styles.cameraContainerMakePost}>
							<Camera
							video={false}
							isActive
							device={deviceBack}
							style={styles.cameraMakePost}
							ref={cameraref}
							photo={true}
							enableZoomGesture={true}
							/>
							<IIcon name='camera-reverse-sharp' color='white' size={scale(30)} style={styles.reverseCameraButton}
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
							<IIcon name='camera-reverse-sharp' color='white' size={scale(30)} style={styles.reverseCameraButton}
							onPress={() => setbackCamera(true)}/>
						</View>
					: 
					<Text>You must accept camera permission</Text>
			}
			{
				takePhotoButton ? 
				<Pressable onPress={() => takePhotoAndButton() }>
					<View style={styles.takePhotoButton}>
						<IIcon name="ios-camera-outline" size={scale(36)} color='white'/>
					</View>
				</Pressable> 
				:
				null
			}
			{   
				imageURL ? 
				<Pressable onPress={() => navigation.navigate('SocialyseLoading')}>
					<View style={styles.sendPhotoButton}>
						<IIcon name="ios-send" size={scale(28)} color='white'/>
					</View>
				</Pressable>
				:
				null
			}
			
			<Pressable style={styles.takeAPhotoBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>

			
		</SafeAreaView>
	);
}

export default MakeAPost;
/*
<Pressable onPress={() => navigation.navigate('SocialyseLoading')}>
				<Text>
					go to add a loading
				</Text>
			</Pressable>
*/
