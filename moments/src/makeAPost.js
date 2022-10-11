import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, Image, ImageBackground } from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';

const GradientText = (props) => {
	return (
	  <MaskedView maskElement={<Text {...props} />}>
		<LinearGradient
		  colors={["#AD00FF", "#00FFA3"]}
		  start={{ x: 0, y: 0.35 }}
		  end={{ x: 0, y: 0.7 }}
		>
		  <Text {...props} style={[props.style, { opacity: 0.3 }]} />
		</LinearGradient>
	  </MaskedView>
	);
  };


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
		<View style={styles.MBBackground}>
			<Text style={styles.takeAPhotoText}>
				TAKE A PHOTO TO
			</Text>
			<View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
				<View style={{flex: 1, alignItems: 'center'}}>
					<Text style={styles.socialTextYellow}>
						SOCIALYSE
					</Text>
					<GradientText style={styles.socialTextGradient}>
						SOCIALYSE
					</GradientText>
				</View>
			</View>
			{
				imageURL ? 
					<View>
						<View style={styles.justTakenPhotoContainer}>
							<ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
								<FIcon name='close' style={styles.justTakenPhotoClose} size={25} color='black'
								onPress={() => {closePhoto(); setCaption('add a caption...')}}
								/>
							</ImageBackground>	 
						</View>
						
						<Pressable onPress={() => {setCaptionModal(true)}}>
							<Text style={styles.addACaptionPlaceHolder}>
								{caption}
							</Text>	
						</Pressable>
						<CaptionModal captionModal={captionModal} setCaptionModal={setCaptionModal} caption={caption} setCaption={setCaption}>

						</CaptionModal>
							
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
							<IIcon name='camera-reverse-sharp' color='white' size={32} style={styles.reverseCameraButton}
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
							<IIcon name='camera-reverse-sharp' color='white' size={32} style={styles.reverseCameraButton}
							onPress={() => setbackCamera(true)}/>
						</View>
					: 
					<Text>You must accept camera permission</Text>
			}
			{
				takePhotoButton ? 
				<Pressable onPress={() => takePhotoAndButton() }>
					<View style={styles.takePhotoButton}>
						<IIcon name="ios-camera-outline" size={39} color='white'/>
					</View>
				</Pressable> 
				:
				null
			}
			{
				imageURL ? 
				<Pressable onPress={() => navigation.navigate('SocialyseLoading')}>
					<View style={styles.sendPhotoButton}>
						<IIcon name="ios-send" size={30} color='white'/>
					</View>
				</Pressable>
				:
				null
			}
			
			<Pressable style={styles.takeAPhotoBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				<MIIcon name='arrow-forward-ios' size={32} color='white'/>
			</Pressable>

			
		</View>
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
