import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Image, ImageBackground, SafeAreaView, Linking } from 'react-native';
import styles from './styles';
import CaptionModal from './captionModal';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import {LoggedInContext} from '../App';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import PostModal from './postModal';
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';


async function CreatePost(UserID, Caption, Image, ChannelID, selectedPinId) {

	// store image into storage
	const reference = storage().ref(`/Posts/${UserID}/${Image}`)
	await reference.putFile(Image);
	
	// get downloadedURL from storage
	const downloadedURL = await storage().ref(`/Posts/${UserID}/${Image}`).getDownloadURL();
	// console.log('UserID', UserID)    
	// console.log('caption', Caption)
	// console.log('Image',downloadedURL)
	// console.log('channelID', ChannelID)
	let docID = '';
	const messageSendTime = new Date(); 

	await firestore()
	.collection('Channels')
	.doc(ChannelID)
	.collection('Posts')
	.add({
	  Caption: Caption,
	  ImageURL: downloadedURL,
	  PostID: '',
	  PostOwner: UserID,
	  TimeUploaded: messageSendTime, 
	  
	})
	.then(function(docRef) {
	  	docID = docRef.id;
	}); // test to see if it works
  
	// add doc id to the post
	await firestore()
	.collection('Channels')
	.doc(ChannelID)
	.collection('Posts')
	.doc(docID)
	.update({
		PostID: docID,
	});
  
	// add it under users for their own reference
	await firestore()
	.collection('Users')
	.doc(UserID)
	.collection('UserPosts')
	.doc(docID)
	.set({
	  Caption: Caption,
	  ImageURL: downloadedURL,
	  TimeUploaded: messageSendTime, 
	  UserID: UserID,
	  PostID: docID
	});

	// added 02/01, for storing when a user last posted. Helped checking if 
	// use can post again in the channel
	await firestore()
	.collection('Users')
	.doc(UserID)
	.update({
		LastPosted: messageSendTime,
	})
	
	// add post with doc id to UserPostLikes
	await firestore()
	.collection('PostLikes')
	.doc(docID)
	.set({
	  LikeCount: 0
	});

	// update channels lastActive
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.collection('Channels')
	.doc(ChannelID)
	.update({
		LastActive: messageSendTime
	})

	// update pins lastActive
	await firestore()
	.collection('Pins')
	.doc(selectedPinId) 
	.update({
		LastActive: messageSendTime
	})
}

async function JoinChannel(UserID, ChannelID, Longitude, Latitude, PinID) {

	// let ChannelLongitude = 0;
	// let ChannelLatitude = 0;
  
	// await firestore()
	// .collection('Channels')
	// .doc(ChannelID)
	// .get()
	// .then (docSnapshot => {
	// 	if(docSnapshot.exists) {
	// 	  ChannelLongitude = docSnapshot.data().Location.latitude;
	// 	  ChannelLatitude = docSnapshot.data().Location.longitude;
	// 	}
	// })
	// ChannelLongitude =  ChannelLongitude * Math.PI / 180;
	// ChannelLatitude =  ChannelLatitude * Math.PI / 180;
	// Latitude =  Latitude * Math.PI / 180;
	// Longitude =  Longitude * Math.PI / 180;
  
	// // Haversine formula
	// let dlon = Longitude - ChannelLongitude;
	// let dlat = Latitude - ChannelLatitude;
	// let a = Math.pow(Math.sin(dlat / 2), 2)
	// 		+ Math.cos(ChannelLatitude) * Math.cos(Latitude)
	// 		* Math.pow(Math.sin(dlon / 2),2);
		   
	// let c = 2 * Math.asin(Math.sqrt(a));
	// let r = 6371;
  
	// // calculate the result
	// let distance = c * r;
  
	// // Check user is within range
	// distance = distance/1000;
	// if (distance > 50) {
	//   throw error;
	// }

	const messageSendTime = new Date();

	await firestore()
	.collection('Users')
	.doc(UserID)
	.update({
		ChannelJoined: messageSendTime,
	  	CurrentChannel: ChannelID
	});
  
	let activeUserCount = 0;
  
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.doc(ChannelID)
	.get()
	.then(docSnapshot => {
		if(docSnapshot.exists) {
		  activeUserCount = docSnapshot.data().ActiveUsers
		} 
	});
	activeUserCount += 1;
  
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.doc(ChannelID)
	.update({
	  ActiveUsers: activeUserCount
	});
}


function MakeAPost({route}) {

	const navigation = useNavigation();
	const {selectedChannelID} = route.params;

	//console.log(selectedChannelID)

	const devices = useCameraDevices()
	const deviceBack = devices.back;
	const deviceFront = devices.front;

    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, user, selectedPinId, } = useContext(LoggedInContext);
	
	const [cameraPermission, setCameraPermission] = useState();
  	const [microphonePermission, setMicrophonePermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const [takePhotoButton, setTakePhotoButton] = useState(true);
	const [backCamera, setbackCamera] = useState(true);
	const [caption, setCaption] = useState('');
	const [addedCaption, setAddedCaption] = useState(false);
	const [captionModal, setCaptionModal] = useState(false);
	const [showFooter, setShowFooter] = useState(true)
	const cameraref = useRef();

	const [currLatitude, setCurrLatitude] = useState(0)
	const [currLongitude, setCurrLongitude] = useState(0)

	const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setCurrLatitude(info.coords.latitude)
			setCurrLongitude(info.coords.longitude)
		})
	}

	const takePhoto = async () => {
		const photo = await cameraref.current.takeSnapshot({
			quality: 85,
			skipMetadata: true
		})
		console.log('photo', photo)
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
		// Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
		getCameraPermission();
		GetmyLocation()
	}, [imageURL]);

	// const getCameraPermission = async () => {
	// 	try {
	// 		const newCameraPermission = await Camera.requestCameraPermission()
	// 		const newMicrophonePermission = await Camera.requestMicrophonePermission()
			
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	const getCameraPermission = useCallback(async () => {
		const permission = await Camera.requestCameraPermission()
		if (permission === 'denied') await Linking.openSettings()
	}, []) 
	
	// if (cameraPermission == null || microphonePermission == null) {
	// 	// still loading
	// 	return null;
	// }

	const callback = ()=>{
        navigation.navigate('PostsFeed', {selectedChannelID: selectedChannelID})
	};

	async function JoinAndPost(UserID, Caption, Image, ChannelID) {
		try {
			await JoinChannel(UserID, ChannelID, currLongitude, currLatitude, selectedPinId)
			await CreatePost(UserID, Caption, Image, ChannelID, selectedPinId)
			callback();
		} catch (error) {
			console.log('errro', error)
		}
	}

	//console.log('picurl', imageURL)
	
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
								<MCIcon name='camera-retake' style={styles.justTakenPhotoClose} size={scale(25)} color='white'
								onPress={() => {closePhoto(); setCaption('add a caption...')}}
								/>
							</ImageBackground>	 
						</View>
						
						<Pressable onPress={() => {setCaptionModal(true); setShowFooter(false)}}>
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
						<CaptionModal captionModal={captionModal} setCaptionModal={setCaptionModal} caption={caption} setCaption={setCaption} setAddedCaption={setAddedCaption}
						showFooter={showFooter} setShowFooter={setShowFooter}/>

							
					</View>
				:
				 (cameraPermission && deviceFront && deviceBack) ?
				 	(backCamera) ? 
						<View style={styles.cameraContainerMakePost}>
							<Camera
							video={false}
							isActive={true}
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
						<View style={styles.cameraContainerMakePost}>
							<Camera
							video={false}
							isActive
							device={deviceFront}
							style={styles.cameraMakePost}
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
				showFooter ?
				<View style={styles.makeAPostFooter}>
					<Pressable style={styles.takeAPhotoBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
						<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
					</Pressable>
				{imageURL ? 
				<Pressable onPress={() => {navigation.navigate('SocialyseLoading', {selectedChannelID: selectedChannelID}); JoinAndPost(user.uid, caption, imageURL, selectedChannelID); 
				setCaption(''); setAddedCaption(false); setImageURL(null)
				}}>
					<View style={styles.sendPhotoButton}>
						<IIcon name="ios-send" size={scale(28)} color='white'/>
					</View>
				</Pressable>
				:
				null}
				</View> 
				:
				null
			}
			
			

			
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
