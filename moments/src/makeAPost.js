import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, ImageBackground, SafeAreaView, Alert } from 'react-native';
import styles from './styles';
import CaptionModal from './captionModal';
import { useNavigation } from '@react-navigation/native';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoggedInContext} from '../App';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { openSettings } from 'react-native-permissions';

async function CreatePost(UserID, Caption, Image, ChannelID, selectedPinId) {

	// store image into storage
	const reference = storage().ref(`/Posts/${UserID}/${Image}`)
	await reference.putFile(Image);
	
	// get downloadedURL from storage
	const downloadedURL = await storage().ref(`/Posts/${UserID}/${Image}`).getDownloadURL();
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
	}); 
	console.log('create to channels posts')
  
	// add doc id to the post
	await firestore()
	.collection('Channels')
	.doc(ChannelID)
	.collection('Posts')
	.doc(docID)
	.update({
		PostID: docID,
	});
	console.log('update to channels posts')

  
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
	console.log('create to users userposts')


	// added 02/01, for storing when a user last posted. Helped checking if 
	// use can post again in the channel
	await firestore()
	.collection('Users')
	.doc(UserID)
	.update({
		LastPosted: messageSendTime,
	})
	console.log('update to user ')

	
	// add post with doc id to UserPostLikes
	await firestore()
	.collection('PostLikes')
	.doc(docID)
	.set({
	  LikeCount: 0,
	  PostOwnerID: UserID

	});
	console.log('create to postlikes')


	// update channels lastActive
	await firestore()
	.collection('Pins')
	.doc(selectedPinId)
	.collection('Channels')
	.doc(ChannelID)
	.update({
		LastActive: messageSendTime
	})
	console.log('update to pin channels')


	// update pins lastActive
	await firestore()
	.collection('Pins')
	.doc(selectedPinId) 
	.update({
		LastActive: messageSendTime
	})
	console.log('update to pins lastactive')

}

async function JoinChannel(UserID, ChannelID, PinID) {

	// if user is stil part of old channel, reduce old channel users count
	let usersOldChannel = null
	await firestore()
	.collection('Users')
	.doc(UserID)
	.get()
	.then(docSnapshot => {
		let data = docSnapshot.data()
		if (data.CurrentChannel !== 0) {
			usersOldChannel = data.CurrentChannel
		}
	})
	console.log('read from users')

	// if user is part of old channel
	if (usersOldChannel !== null) {
		//find channel's parent pin
		let parentPinID = ''
		await firestore()
		.collection('Channels')
		.doc(usersOldChannel)
		.get()
		.then(docSnapshot => {
			let data = docSnapshot.data()
			parentPinID = data.PinID
		})
		console.log('joinchannel read from channels')
		// decrease users count
		let oldUserCount = null
		await firestore()
		.collection('Pins')
		.doc(parentPinID)
		.collection('Channels')
		.doc(usersOldChannel)
		.get()
		.then(docSnapshot => {
			let data = docSnapshot.data()
			oldUserCount = data.ActiveUsers
		})
		console.log('joinchannel read from pins channels')

		oldUserCount = oldUserCount - 1
		// update
		await firestore()
		.collection('Pins')
		.doc(parentPinID)
		.collection('Channels')
		.doc(usersOldChannel)
		.update({
			ActiveUsers: oldUserCount
		})
		console.log('joinchannel update pins channels')

	}

	const messageSendTime = new Date();

	await firestore()
	.collection('Users')
	.doc(UserID)
	.update({
		ChannelJoined: messageSendTime,
	  	CurrentChannel: ChannelID
	});
	console.log('joinchannel update to users')

  
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
	console.log('joinchannel read from pins channels')

	activeUserCount += 1;
  
	await firestore()
	.collection('Pins')
	.doc(PinID)
	.collection('Channels')
	.doc(ChannelID)
	.update({
	  ActiveUsers: activeUserCount
	});
	console.log('joinchannel update to pins channels')

}


function MakeAPost() {

	const navigation = useNavigation();

	const devices = useCameraDevices()
	const deviceBack = devices.back;
	const deviceFront = devices.front;

    const {setMessageDisplay, setNotifDisplay, user, selectedPinId, selectedChannelId} = useContext(LoggedInContext);
	const [cameraPermission, setCameraPermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const [takePhotoButton, setTakePhotoButton] = useState(true);
	const [backCamera, setbackCamera] = useState(true);
	const [caption, setCaption] = useState('');
	const [addedCaption, setAddedCaption] = useState(false);
	const [captionModal, setCaptionModal] = useState(false);
	const [showFooter, setShowFooter] = useState(true)
	const cameraref = useRef();

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
	}, [imageURL]);

	const getCameraPermission = useCallback(async () => {
		const permission = await Camera.requestCameraPermission()
		if (permission === 'denied') {
			Alert.alert(
				'Permission required',
				'You need to enable your camera to take a photo!',
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
		}
	}, []) 

	const callback = ()=>{
        navigation.navigate('PostsFeed')
	};

	async function JoinAndPost(UserID, Caption, Image, selectedChannelId) {
		try {
			await JoinChannel(UserID, selectedChannelId, selectedPinId)
			await CreatePost(UserID, Caption, Image, selectedChannelId, selectedPinId)
			callback();
		} catch (error) {
			console.log('idiot', error)
		}
	}

	useEffect(() => {
		setTakePhotoButton(true)
	}, [])
	
	return (
		<SafeAreaView style={styles.MBBackground}>
			<View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
				<Text style={styles.takeAPhotoText}>
					{/* TAKE A PHOTO TO {'\n'}
				
					SOCIALYSE */}
					Take a photo to 
					{'\n'}
					Socialyse!
					
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
						setShowFooter={setShowFooter}/>

							
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
					null
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
				<Pressable onPress={() => {navigation.navigate('SocialyseLoading'); JoinAndPost(user.uid, caption, imageURL, selectedChannelId); 
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

