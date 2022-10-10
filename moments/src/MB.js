import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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


function MicroBlog({}) {
	const navigation = useNavigation();
	const devices = useCameraDevices()
	const device = devices.back

    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
	
	const [cameraPermission, setCameraPermission] = useState();
  	const [microphonePermission, setMicrophonePermission] = useState();
	const [imageURL, setImageURL] = useState(null);
	const cameraref = useRef();

	const takePhoto = async () => {
		const photo = await cameraref.current.takeSnapshot({
			quality: 85,
			skipMetadata: true
		})
		setImageURL(photo.path);
		
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
	console.log(imageURL);

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
					<ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
						<FIcon name='close' style={styles.justTakenPhotoClose} size={25} color='black'/>
					</ImageBackground>	
				:
				 (cameraPermission && device) ?
				 	<View style={{borderRadius: 100}}>
						<Camera
						video={false}
						isActive
						device={device}
						style={styles.camera}
						ref={cameraref}
						photo={true}
						enableZoomGesture={true}
						/>
					</View>
					: 
					<Text>You must accept camera permission</Text>
			}

			<Pressable onPress={() => takePhoto()}>
				<View style={styles.takePhotoButton}>
					<IIcon name="ios-camera-outline" size={39} color='white'/>
				</View>
			</Pressable>
			

			<Pressable style={styles.takeAPhotoBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				<MIIcon name='arrow-forward-ios' size={32} color='white'/>
			</Pressable>

			<Pressable onPress={() => navigation.navigate('SocialyseLoading')}>
				<Text>
					go to add a loading
				</Text>
			</Pressable>
		</View>
	);
}

export default MicroBlog;

/*
<ScrollView style={styles.MBFeed}>
				<Pressable>
					<View style={styles.post}>	
						<Text style={styles.postUsername}>
							username
						</Text>
						<Text style={styles.postContent}>
							post content
						</Text>
						<View style={styles.postLikeCommentContainer}>
							<ADIcon style={styles.postLike} name='like2' size={25}/>
							<IIcon style={styles.postComment} name='chatbox-outline' size={25}/>
						</View>
					</View>
				</Pressable>
</ScrollView>


<View style={styles.notificationContainer}>
	<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
		<IIcon name='notifications-outline' size={32} color='black'/>
	</Pressable>
	<View style={styles.notificationCountContainer}>
		<Text style={{fontSize:10, color: 'white'}}>
			5
		</Text>
	</View>
</View>

*/

/*
				<View style={{flex: 1, alignItems: 'flex-end'}}>
					<Text style={styles.socialTextYellow}>
						SOCIAL
					</Text>
					<GradientText style={styles.socialTextGradient}>
						SOCIAL
					</GradientText>
				</View>
				<View style={{flex: 1}}>
					<Text style={styles.yseTextWhite}>
						YSE 
					</Text>
					<Text>
						yse
					</Text>
				</View>

				
	
	
	
				
	
	
	
	
	return (
		<View style={{height: '100%', width: '100%'}} >
			<View style={styles.MBHeader}>
				<View style={styles.headerInnerContainer}>
					<Pressable style={styles.MBBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
						<MIIcon name='arrow-forward-ios' size={28} color='black'/>
					</Pressable>
					<Text style={{color: 'black', fontSize: 20}}>
						UNSW Roundhouse
					</Text>
					<View style={styles.notificationContainerMB}>
						<Pressable style={styles.notificationButtonMB} onPress={() => navigation.navigate('notifications')}>
							<IIcon name='notifications-outline' size={32} color='black'/>
						</Pressable>
						<View style={styles.notificationCountContainer}>
							<Text style={{fontSize:10, color: 'white'}}>
								5
							</Text>
						</View>
					</View>		
				</View> 
			</View>

			<ScrollView style={styles.MBFeed}>
				{posts.map((post) =>
					<Pressable key={post.id} onPress={() => navigation.navigate('PostThread')}>
						<View style={styles.post}>	
							<Text style={styles.postUsername}>
								{post.username}
							</Text>
							<Text style={styles.postContent}>
								{post.postContent}
							</Text>
							<View style={styles.postLikeCommentContainer}>
								<View style={styles.postLikeAndCount}>
									<ADIcon name='like2' size={25} />
									<Text style={styles.likeCount}>
									{post.likeCount}
									</Text>
								</View>
								<View style={styles.postCommentAndCount}>		
									<MCIcon style={styles.commentIcon} name='message-text-outline' size={25}/>
									<Text style={styles.commentCount}>
									{post.commentCount}
									</Text>
								</View>
							</View>
						</View>
					</Pressable>
					)
				}
			</ScrollView>

		
			<View style={styles.MBFooter}>
				<View>
					<TouchableOpacity style={styles.messageButtonMB} onPress={() => navigation.navigate('Dms')}>
						<MCIcon style={styles.messageIcon} name='message-text-outline' size={33}/>
					</TouchableOpacity>				
				</View>

				<View>
					<Pressable style={styles.momentButton} onPress={() => navigation.navigate('ActiveNow')}>
						<MCIcon style={styles.momentsTopArrow} name='arrow-bottom-left' size={25} color='#4681F4'/>
						<MCIcon style={styles.momentsBottomArrow} name='arrow-top-right' size={25} color='#4681F4'/>
					</Pressable>
				</View>

				<View>
					<Pressable style={styles.postButton} onPress={() => navigation.navigate('Posting')}>
						<IIcon style={styles.messageIcon} name='chatbox-outline' size={33} />
					</Pressable>
				</View>

				
			</View>


		</View>
	)*/ 