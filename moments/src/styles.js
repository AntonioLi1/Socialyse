import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

const styles = StyleSheet.create({
	fullScreen: {
		height: screenHeight,
		width: screenWidth,
		
	},
	map: {
		height: screenHeight,
		width: screenWidth,
		elevation: 0,
		zIndex: 0,
	},
	messageIconContainer: {
		position: 'absolute',
		marginTop: screenHeight * 0.79,
		marginLeft: screenWidth * 0.05
	},
	messageButton: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 5,
			},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	messageIcon: {
		color: 'white',
		justifyContent: 'center',
	},
	DMScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: 'black',
		alignItems: 'center'
	},
	DMHeader: {
		marginTop: screenHeight * 0.015,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: screenWidth
	}, 
	profileButtonDM: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		marginLeft: '5%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	newConnectionsContainer: {
		height: screenHeight * 0.2,
		marginTop: screenHeight * 0.015,
		borderTopColor: 'white',
		borderTopWidth: 1,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		width: screenWidth * 0.95
	},
	newFriendsText: {
		color: 'white', 
		marginTop: screenHeight * 0.01, 
		marginLeft: '3%', 
		fontStyle: 'italic', 
		fontWeight: '700',
		fontSize: 16
	},
	newConnectionProfile: {
		marginTop: screenHeight * 0.01,
		marginLeft: screenHeight * 0.005,
		marginRight: screenHeight * 0.005,
		
		height: '80%',
		width: (screenWidth/5),
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	newConnectionProfilePic: {
		width: screenWidth * 0.175,
		height: screenHeight * 0.08,
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
		marginTop: screenHeight * 0.015
	},
	newConnectionUsername: {
		color: 'white'
	},
	messagesText: {
		color: 'white', 
		marginTop: screenHeight * 0.01, 
		paddingBottom: screenHeight * 0.005,
		marginRight: screenWidth * 0.7,
		fontStyle: 'italic', 
		fontWeight: '700',
		fontSize: 16,
	},
	allDmsContainer: {
		flex: 1, 
		width: screenWidth,
		paddingBottom: '5%',
	},
	dm: {
		marginLeft: '4%',
		marginRight: '4%',
		flexDirection: 'row',
		height: screenHeight * 0.1,
		width: screenWidth,
		alignItems: 'center'
	},
	messagesProfilePic: {
		marginLeft: screenHeight * 0.005,
		width: screenWidth * 0.175,
		height: screenHeight * 0.08,
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
	},
	usernameAndLastMessageContainer: {
		marginLeft: '5%',
	},
	username: {
		fontWeight: '600',
		fontSize: 14,
		color: 'white',
		fontStyle: 'italic'
	},
	lastMessage: {
		fontSize: 11,
		color: 'white',
		
	},
	notificationContainerMap: {
		position: 'absolute',
		alignItems: 'flex-end',
		marginLeft: screenWidth * 0.82,
		marginTop: screenHeight * 0.04
	},
	notificationButton: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: 'black',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	notificationCountContainer: {
		backgroundColor: '#FAFF00',
		width: '35%',
		height: '35%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	mapPinContaner: {
		position: 'absolute',
		bottom: '5%',
		right: '8%'
	},
	mapPinButton: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	dmBackButton: {
		marginRight: '5%'
	},
	locationModal: {
		backgroundColor: 'black',
		height: screenHeight * 0.15,
		width: screenWidth * 0.96,
		marginLeft: screenWidth * 0.02,
		marginTop: screenHeight * 0.63,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		alignItems:'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	locationImagePlaceholder: {
		backgroundColor: 'grey',
		width: '35%',
		height: '80%',
		borderRadius: 10,
		
	},
	locationNameActiveAndJoinButtonContainer: {
		
	},
	locationModalClose: {
		color: 'white',
		alignSelf: 'flex-start'
	},
	checkInButton: {
		height: '25%',
		width: '80%', 
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		
	},
	checkInText: {
		color: 'white',
	},
	locationNameModal: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500',
	}, 
	notificationContainerMB: {
		alignItems: 'flex-end',
		marginRight: '2%'
	},
	notificationButtonMB: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#C0C0C0',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 5,
			},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	notificationCountContainerMB: {
		backgroundColor: 'red',
		width: '35%',
		height: '35%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	MBBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '2%'
	},
	MBHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		height: screenHeight* 0.08,
		
	},
	locationNameContainerMB: {
		backgroundColor: '#E5E5E5',
		marginLeft: '2%',
		marginRight: '2%',
		height: '100%',
		width: '95%',
		zIndex: -1,
		justifyContent: 'center',
		alignItems: 'center', 
		borderRadius: 10,
	},
	messageButtonMB: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#C0C0C0',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 3,
		left: '40%'
	},
	postButton: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#C0C0C0',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 3,
		right: '40%'
	},
	MBFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
		height: '10%'
	},
	momentButton: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: '#C0C0C0',
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity:  0.16,
		shadowRadius: 1.51,
		elevation: 2
	},
	momentsBottomArrow: {
		right: 8,
		bottom: 4,
	},
	momentsTopArrow: {
		left: 8,
		top: 4
	},
	MBFeed: {
		marginTop: '3%',
	},
	post: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
	},
	postUsername: {
		marginLeft: screenWidth * 0.12,
		marginTop: '2%',
		fontWeight: '700',
		color: 'black',
		fontSize: 16,
	},
	postContent: {
		marginLeft: '12%',
		fontSize: 14,
		color: 'black',
	},
	postLikeCommentContainer: {
		flexDirection: 'row',
		marginBottom: '3%',
		alignItems: 'center',
		marginLeft: '12%',
	},
	postLikeAndCount: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	likeCount: {
		marginLeft: screenWidth * 0.01,
	},
	postCommentAndCount: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		marginLeft: '28%',
	},
	commentIcon: {
		top: '1.5%'
	},
	commentCount: {
		marginLeft: screenWidth * 0.01 
	},
	notifHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		height: screenHeight* 0.08,
	},
	notifInnerHeaderContainer: {
		backgroundColor: '#E5E5E5',
		marginLeft: '2%',
		marginRight: '2%',
		marginTop: '3%',
		height: '70%',
		width: '95%',
		zIndex: -1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center', 
		borderRadius: 10,
	},
	notifBackButton: {
		transform: [{rotateY: '180deg'}],
		right: '220%'
	},
	notificationsList: {
		marginTop: screenHeight * 0.015
	},
	notif0: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	notifMessage: {
		marginLeft: '10%', 
		marginTop: '2%',
		marginBottom: '2%',
		fontSize: 16,
		width: '50%',
		color: 'black',
	},
	notifTime: {
		marginRight: '10%', 
		fontSize: 16
	},
	notifProfile: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		borderRadius: 100,
		backgroundColor: 'grey',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '3%',
		marginBottom: '3%',
	},
	notif1: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	profileTopContainer: {
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: 'pink',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	postInputContainer: {
		marginTop: screenHeight * 0.02,
		borderTopColor: 'black',
		borderTopWidth: 1,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		height: '30%'
	},
	postInnerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	captionDone: {
		
		marginRight: '3%',
		fontSize: 18,
		fontWeight: '600',
		color: 'black'
	},
	inputRemaining: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'flex-end',
		marginRight: '5%',
		marginBottom: '2%'
	},
	profileScreen: {
		height: screenHeight,
		width: screenWidth,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},
	profilePageHeader: {
		height: screenHeight * 0.08,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	profileBackButton: {
		alignSelf: 'flex-end',
		marginTop: screenHeight * 0.05,
		marginRight: screenWidth * 0.05
	},
	profilePageProfile: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		borderRadius: 30,
		marginTop: screenHeight * 0.05,
		backgroundColor: 'grey',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	profilePicEdit: {
		marginLeft: '80%',
		marginBottom: '5%'
	},

	profilePageUsername: {
		marginLeft: '5%',
		marginTop: '2%',
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	profilePageSettings: {
		marginTop: '2%',
		marginRight: screenWidth * 0.05
	},
	profilePageUsernameAndSettingsContainer: {
		marginTop: screenHeight * 0.03,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: '#545454',
		borderTopWidth: 1 
	},
	activeNowProfilePlaceHolder: {
		height: screenHeight * 0.25,
		width: screenWidth * 0.45,
		backgroundColor: 'grey',
		marginTop: '2%',
		marginHorizontal: '2%'
	},
	activeNowHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		height: screenHeight* 0.08,
	},
	headerInnerContainer: {
		backgroundColor: '#E5E5E5',
		marginLeft: '2%',
		marginRight: '2%',
		marginTop: '3%',
		height: '70%',
		width: '95%',
		zIndex: -1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', 
		borderRadius: 10,
	},
	activeNowModal: {
		backgroundColor: 'white',
		flex: 1,
		marginTop: screenHeight * 0.18,
		marginBottom: screenHeight * 0.2,
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	activeNowModalClose: {
		zIndex: 1,
		color: 'black',
		left: '90%',
		bottom: '90%',
		position: 'absolute'
	},
	addButton: {
		position: 'absolute',
		top: '83%',
	},
	threadParentPost: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		borderTopColor: 'black',
		borderTopWidth: 1,
		marginTop: screenHeight * 0.01,
		paddingVertical: screenHeight * 0.02
	},
	threadParentUsername: {
		marginLeft: screenWidth * 0.12,            
		fontWeight: '700',
		color: 'black',
		fontSize: 20,
	},
	threadPostContent: {
		marginLeft: screenWidth * 0.12,
		fontSize: 18,
		color: 'black',
	},
	threadParentpostLikeCommentContainer: {
		marginTop: screenHeight * 0.01,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: '12%',
	},
	MBBackground: {
		flex: 1,
		width: screenWidth,
		backgroundColor: '#6398FF',
		alignItems: 'center',
	},
	takeAPhotoBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		alignSelf: 'flex-start',
		marginTop: screenHeight * 0.8,
		marginLeft: screenWidth * 0.07
		 
	},
	takeAPhotoText: {
		fontWeight: '900',
		fontSize: 30,
		color: 'white',
		fontStyle: 'italic',
		marginTop: screenHeight * 0.02 
	},
	socialTextYellow: {
		fontSize: 30,
		fontStyle: 'italic',
		color: '#FAFF00',
		fontWeight: '900',
		zIndex: 1,
		position: 'absolute'
	},
	socialTextGradient: {
		fontSize: 30,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 5,
		
	},
	yseTextWhite: {
		fontSize: 30,
		fontStyle: 'italic',
		fontWeight: '900',
		color: 'white',
	},
	happySocialysingLoadingScreen: {
		height: screenHeight * 0.99,
		width: screenWidth,
		backgroundColor: '#6398FF',
		
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	yourPostTextContainer: {
		fontSize: 30,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: screenHeight * 0.2,
		
	},
	yourPostTextBlack: {
		fontSize: 30,
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'black',
		fontWeight: '700',
		marginRight: 4
	},
	yourPostTextWhite: {
		fontSize: 30,
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '700',
		position: 'absolute',
		zIndex: 1,
	},
	cameraContaner: {
		marginTop: screenHeight * 0.02,
		overflow: 'hidden',
		borderRadius: 15
	},
	camera: {
		height: screenHeight * 0.5, 
		width: screenWidth * 0.9, 
	},
	reverseCameraButton: {
		position: 'absolute',
		alignSelf: 'flex-end',
		marginTop: '97%',
		marginRight: '3%'
	},
	takePhotoButton: {
		backgroundColor: 'black',
		width: screenWidth * 0.175,
		height: screenHeight * 0.08,
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: screenHeight * 0.03,
		borderColor: 'white',
		borderWidth: 2.5
	},
	justTakenPhotoContainer: {
		overflow:'hidden',
		borderRadius: 15,
		marginTop: screenHeight * 0.02,
	},
	justTakenPhoto: {
		height: screenHeight * 0.5, 
		width: screenWidth * 0.9, 
	},
	justTakenPhotoClose: {
		alignSelf: 'flex-end', 
		marginRight: '3%',
		marginTop: '3%'
	},
	addACaptionPlaceHolder: {
		fontStyle: 'italic',
		fontSize: 20,
		paddingTop: 0,
		paddingBottom: 0,
		color: 'white'
	},
	sendPhotoButton: {
		backgroundColor: 'black',
		width: screenWidth * 0.175,
		height: screenHeight * 0.08,
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'white',
		borderWidth: 2.5,
		position: 'absolute',
		marginTop: screenHeight * 0.115,
		marginLeft: screenWidth * 0.27
	},
	captionModal: {
		height: screenHeight * 0.28,
		width: screenWidth * 0.96,
		backgroundColor: 'white',
		borderRadius: 20,
		alignSelf: 'center',
		marginTop: screenHeight * 0.13,
		
	},
	captionModalPlaceholder: {
		marginLeft: '3%',
		
	},
	captionModalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	postsFeedHeader: {
		borderBottomColor: '#383838',
		borderBottomWidth: 0.7,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		
	},
	postsFeedHeaderBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '2%' 
	},
	notificationContainerPostsFeed: {
		alignItems: 'flex-end',
		marginBottom: '2%',
		marginTop: '2%',
		marginRight: '2%'
	},
	postsFeedFooter: {
		backgroundColor: 'grey',
		width: '100%',
		flex: 1,
		justifyContent: 'center'
	},
	messageButtonPostsFeed: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: 'black',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		marginLeft: '5%'
	},
	dmHeader: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'grey'
	},
	messagesScreen: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	messagesBody: {
		flex: 11,
		width: screenWidth,
		backgroundColor: 'blue'
	}



	

	




})

export default styles;