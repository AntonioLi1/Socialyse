import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import { GettingStartedContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';

function TakePhotoForDP ({navigation}) {
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

    const { editProfileModal, setEditProfileModal } = useContext(GettingStartedContext);

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
        <SafeAreaView style={styles.takePhotoforDPBackground}>
            {
				imageURL ? 
					<View>
						<View style={styles.justTakenPhotoContainer}>
							<ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
								<FIcon name='close' style={styles.justTakenPhotoClose} size={scale(25)} color='black'
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
				null
			}
            {
                photoTaken ?
                <View style={{flex: 1}}>
                    <View style={styles.profilePageUsernameAndNameContainer}>
                        <Text style={styles.profilePageName}>
                            Dababy
                        </Text>
                        <Text style={styles.profilePageUsername}>
                            dababy_leshgo
                        </Text>
                    </View> 
                    <View style={{marginTop: '20%', alignItems: 'center'}}>
                        <Pressable onPress={() => {navigation.navigate('profile'); setEditProfileModal(false)}}>
                            <View style={{backgroundColor: '#CFCFCF', paddingVertical: '1%', paddingHorizontal: '3%', borderRadius: 20}}>
                                <Text style={styles.done}>
                                    Done
                                </Text>
                            </View>          
                        </Pressable>
                                            
                    </View>
                </View>
                
                :
                null
            }
			{   
				imageURL ? 
				null
				:
				<Pressable style={styles.takeAPhotoBackButton} onPress={() => {navigation.goBack(); setEditProfileModal(true)}}>
				    <MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			    </Pressable>
			}
			
			
        </SafeAreaView>
    );
}

export default TakePhotoForDP;