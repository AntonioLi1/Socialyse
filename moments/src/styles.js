import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScaledSheet } from 'react-native-size-matters';


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const styles = ScaledSheet.create({
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
		marginTop: screenHeight * 0.88,
		marginLeft: screenWidth * 0.05
	},
	messageButton: {
		width: '50@s',
		height: '50@s',
		//width: '60@s',
		//height: '60@s',
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
		width: '45@s',
		height: '45@s',
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
		fontSize: RFValue(16)
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
		width: '60@s',
		height: '60@s',
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
		marginTop: screenHeight * 0.015
	},
	newConnectionUsername: {
		color: 'white',
		fontSize: RFValue(12)
	},
	messagesText: {
		color: 'white', 
		marginTop: screenHeight * 0.01, 
		paddingBottom: screenHeight * 0.005,
		alignSelf: 'flex-start',
		marginLeft: '5.5%',
		fontStyle: 'italic', 
		fontWeight: '700',
		fontSize: RFValue(16)
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
		width: '60@s',
		height: '60@s',
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
	},
	usernameAndLastMessageContainer: {
		marginLeft: '5%',
	},
	username: {
		fontWeight: '600',
		fontSize: RFValue(12),
		color: 'white',
		fontStyle: 'italic'
	},
	lastMessage: {
		fontSize: RFValue(9.5),
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
	notificationCountContainerMap: {
		backgroundColor: '#FAFF00',
		width: '35%',
		height: '35%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	notificationCountContainer: {
		backgroundColor: '#FAFF00',
		width: '35%',
		height: '25%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	notifCountText: {
		fontSize: RFValue(9), 
		color: 'black'
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
		backgroundColor: '#96B9FE',
		
		width: screenWidth * 0.96,
		alignSelf: 'center',
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
		color: 'black',
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
		fontSize: RFValue(12)
	},
	checkedInText: {
		color: 'black',
		fontSize: RFValue(12)
	},
	locationNameModal: {
		color: 'black',
		fontSize: RFValue(17.5),
		fontWeight: '500',
	}, 
	locationModalActive: {
		color: 'black', 
		marginBottom: '3%', 
		fontWeight: '600',
		fontSize: RFValue(12)
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
	notifFullScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: '#96B9FE'
	},
	notifHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		height: screenHeight* 0.08,
		
		justifyContent: 'center'
	},
	notifInnerHeaderContainer: {
		backgroundColor: 'white',
		height: '70%',
		width: '95%',
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
		marginTop: screenHeight * 0.015,
		
	},
	notifMessage: {
		marginLeft: '10%', 
		marginTop: '2%',
		marginBottom: '2%',
		fontSize: RFValue(13.5),
		width: '50%',
		color: 'white',
	},
	notifTime: {
		marginRight: '10%', 
		fontSize: RFValue(11),
		color: 'white'
	},
	notifProfile: {
		width: '45@s',
		height: '45@s',
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
		fontSize: RFValue(16),
		fontWeight: '600',
		color: 'black'
	},
	inputRemaining: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'flex-end',
		marginRight: '5%',
		marginBottom: '2%',
		fontSize: RFValue(12)
	},
	profileScreen: {
		height: screenHeight,
		width: screenWidth,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},
	profilePageFooter: {
		flex: 1,
		width: screenWidth,
		flexDirection: 'column',
		
		justifyContent: 'space-between'
	},
	profileBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		left: '5%',
		bottom: screenHeight * 0.05
		//marginTop: screenHeight * 0.05,
		//marginRight: screenWidth * 0.05
	},
	logOutText: {
		color: 'red', 
		fontSize: RFValue(12)
	},
	profilePageProfile: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		borderRadius: 30,
		marginTop: screenHeight * 0.05,
		backgroundColor: 'green',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	profilePicEdit: {
		marginLeft: '80%',
		marginBottom: '5%'
	},
	profilePageName: {
		marginLeft: '5%',
		marginTop: '2%',
		fontSize: RFValue(26),
		color: 'white',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	profilePageUsername: {
		marginLeft: '5%',
		marginTop: '2%',
		fontSize: RFValue(17),
		color: 'white',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	profilePageSettings: {
		marginTop: '2%',
		marginRight: screenWidth * 0.05
	},
	socialyseCounter: {
		fontSize: RFValue(17.5), 
		color: '#BAD0FB', 
		fontWeight: '700', 
		fontStyle: 'italic'
	},
	profilePageUsernameAndNameContainer: {
		marginTop: screenHeight * 0.03,
		width: screenWidth,
		flexDirection: 'column',
		borderTopColor: '#545454',
		borderTopWidth: 1,
		
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
		backgroundColor: '#96B9FE',
		alignItems: 'center',
	},
	takeAPhotoBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		alignSelf: 'flex-start',
		marginTop: screenHeight * 0.85,
		marginLeft: screenWidth * 0.07
		 
	},
	takeAPhotoText: {
		fontWeight: '900',
		fontSize: RFValue(28),
		color: 'white',
		fontStyle: 'italic',
		marginTop: screenHeight * 0.05, 
		textAlign: 'center'
	},
	socialTextWhite20: {
		fontSize: 20,
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '900',
		zIndex: 1,
		position: 'absolute'
	},
	socialTextPurple20: {
		fontSize: 20,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 5,
		color: '#AD00FF'
	},
	socialTextWhite30: {
		fontSize: RFValue(28),
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '900',
	},
	timeRemaining: {
		fontSize: RFValue(10), 
		color: 'white', 
		position: 'absolute', 
		bottom: '0%'
	},
	postCaption: {
		fontSize: RFValue(10.5), 
		marginHorizontal: '2%'
	},
	postModalCaption: {
		color: 'white', 
		alignSelf: 'flex-start', 
		fontSize: RFValue(12.5), 
		marginLeft: '5%', 
		flexWrap: 'wrap'
	},
	socialTextPurple30: {
		fontSize: 30,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 5,
		color: '#AD00FF'
	},
	
	happySocialysingLoadingScreen: {
		height: screenHeight * 0.99,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		
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
		fontSize: RFValue(28),
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'black',
		fontWeight: '700',
		marginRight: 4
	},
	yourPostTextWhite: {
		fontSize: RFValue(28),
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '700',
	},
	cameraContaner: {
		marginTop: screenHeight * 0.05,
		overflow: 'hidden',
		borderRadius: 15
	},
	camera: {
		height: screenHeight * 0.55, 
		width: screenWidth * 0.9, 
	},
	cameraContainerMakePost: {
		marginTop: screenHeight * 0.02,
		overflow: 'hidden',
		borderRadius: 15
	},
	cameraMakePost: {
		height: screenHeight * 0.5, 
		width: screenWidth * 0.9, 
	},
	reverseCameraButton: {
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: '3%',
		right: '3%'
	},
	reverseCameraButtonForDP: {
		position: 'absolute',
		alignSelf: 'flex-end',
		bottom: '3%',
		right: '3%'
	},
	takePhotoButton: {
		backgroundColor: 'black',
		width: '60@s',
		height: '60@s',
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: screenHeight * 0.05,
		borderColor: 'white',
		borderWidth: 2.5
	},
	justTakenPhotoContainer: {
		overflow:'hidden',
		borderRadius: 15,
		marginTop: screenHeight * 0.05,
	},
	justTakenPhoto: {
		height: screenHeight * 0.55, 
		width: screenWidth * 0.9, 
	},
	justTakenPhotoContainerMakePost: {
		overflow:'hidden',
		borderRadius: 15,
		marginTop: screenHeight * 0.02,
	},
	justTakenPhotoMakePost: {
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
		fontSize: RFValue(18),
		paddingTop: 0,
		paddingBottom: 0,
		color: 'white'
	},
	sendPhotoButton: {
		backgroundColor: 'black',
		width: '60@s',
		height: '60@s',
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
		marginTop: screenHeight * 0.15,
		
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
		flex: 1,
		
		alignItems: 'center',
		
	},
	postsFeedHeaderBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '3%'
	},
	notificationContainerPostsFeed: {
		alignItems: 'flex-end',
		marginRight: '3%'
	},
	postsFeedFooter: {
		width: '100%',
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopColor: '#383838',
		borderTopWidth: 0.7

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
	ownPostsButton: {
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
		marginRight: '5%'
		
	},
	messagesHeader: {
		height: screenHeight * 0.07,
		width: screenWidth,
		backgroundColor: 'black',
		justifyContent: 'center',
		borderBottomColor: 'white',
		borderBottomWidth: 1,
	},
	messagesHeaderUsername: {
		color: 'white',
		fontSize: RFValue(17.5),
		fontWeight: '900',
		marginLeft: '2%'
	},
	messagesBackButton: {
		position: 'absolute',
		alignSelf: 'flex-end',
		marginRight: '2%'
	},
	messagesScreen: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	messagesBody: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'black',
		paddingTop: screenHeight * 0.02,
		paddingBottom: screenHeight * 0.01
	},
	messagesFooter: {
		height: screenHeight * 0.07,
		backgroundColor: 'black',
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		borderTopColor: '#B0B0B0',
		borderTopWidth: 0.5
	},
	postContainer: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.45,
		marginTop: '10%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	blank: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.45,
		backgroundColor: 'transparent',
	},
	fullPost: {
		height: '100%', 
		width: '80%', 

	},
	postPhoto: {
		backgroundColor: 'red', 
		height: '85%', 
		borderRadius: 10
	},
	postModal: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		
		alignSelf: 'center',
		marginTop: screenHeight * 0.15,
		justifyContent: 'space-between',
		
		
	},
	postModalBottomBorder: {
		backgroundColor: 'white',
		width: '100%',
		height: '10%',
		alignSelf: 'flex-end',
		borderRadius: 15
	},
	signUpScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		alignItems: 'center'
	},
	signUpScreenSocialyse: {
		
		alignItems: 'center',
		marginTop: screenHeight * 0.15
	},
	signUpInputContainer: {
		width: screenWidth,
		marginTop: screenHeight * 0.01,
		alignItems: 'center',
	}, 
	inputs: {
		borderWidth: 1,
		borderColor: '#CACACA',
		marginTop: '1%',
		width: screenWidth * 0.8,
		backgroundColor: '#FFFFFF',
		borderRadius: 5
	},
	signUpSocialTextYellow: {
		fontSize: 50,
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '900',
		zIndex: 1,
		position: 'absolute'
	},
	signUpSocialTextGradient: {
		fontSize: 50,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 8,
		color: '#AD00FF'
	},
	signUpLogInSocialTextYellow: {
		fontSize: 14,
		fontStyle: 'italic',
		color: '#FAFF00',
		fontWeight: '900',
		zIndex: 1,
		position: 'absolute'
	},
	signUpLogInSocialTextGradient: {
		fontSize: 14,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 3
	},
	signUpInfo: {
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '600'
	},
	signUpInfoContainer: {
		marginTop: screenHeight * 0.02
	},
	signUpButton: {
		width: screenWidth * 0.8,
		height: screenHeight * 0.05,
		marginTop: screenHeight * 0.03,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginButton: {
		
		width: screenWidth * 0.8,
		height: screenHeight * 0.05,
		marginTop: screenHeight * 0.03,
		backgroundColor: 'white',
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	loginInput: {

	},
	or: {
		marginTop: screenHeight * 0.01,
		fontWeight: '700',

	},
	ownPostModal: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		backgroundColor: 'black',
		alignSelf: 'center',
		marginTop: screenHeight * 0.15,
		justifyContent: 'space-between',
	},
	settingsScreen: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	settingsHeader: {
		height: screenHeight * 0.08,
		width: screenWidth,
		
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	settingsBackButton: {
		left: '180%'
	},
	settingsLogout: {
		backgroundColor: '#464646',
		height: screenHeight * 0.05,
		width: screenWidth * 0.3,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: screenHeight * 0.04
	},
	settingsProfile: {
		backgroundColor: '#464646',
		height: screenHeight * 0.12,
		width: screenWidth * 0.85,
		borderRadius: 10,
		marginTop: screenHeight * 0.03
	},
	messageInput: {
		borderWidth: 1,
		borderColor: '#CACACA',
		width: screenWidth * 0.8,
		height: '70%',
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
		padding: 10
	},
	messageLeftContainer: {
		backgroundColor: '#BAD0FB', 
		alignSelf: 'flex-start', 
		borderRadius: 100, 
		paddingHorizontal: '3%', 
		paddingVertical: '0.3%', 
		marginLeft: '1%', 
		marginTop: '1%',
		maxWidth: '80%'
	},
	messageRightContainer: {
		backgroundColor: '#BAD0FB', 
		alignSelf: 'flex-end', 
		borderRadius: 100, 
		paddingHorizontal: '4%', 
		paddingVertical: '0.5%', 
		marginRight: '1%', 
		marginTop: '1%',
		maxWidth: '80%'
	},
	messageText: {
		fontSize: RFValue(12),
		color: 'black'
	},
	messageTime: {
		fontSize: RFValue(10), 
		alignSelf: 'flex-end'
	},
	otherProfileBackButton: {
		transform: [{rotateY: '180deg'}],
		alignSelf: 'flex-start',
		marginLeft: '5%',
		marginTop: '25%'
	},
	dpEditModalFullScreen: {
		height: screenHeight,
		width: screenWidth * 0.9,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignSelf: 'center',
		
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	postModalFullScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignSelf: 'center',
	},
	dpEditModal: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.9,
		backgroundColor: 'black',
		alignSelf: 'center',
		marginTop: screenHeight * 0.67,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	removePhoto: {
		alignItems: 'center',
		borderTopRightRadius: 20,
		backgroundColor: '#464646',
		borderTopLeftRadius: 20,
		height: '50@s',
		width: '100%',
		justifyContent: 'center',
		borderBottomColor: 'grey',
		borderBottomWidth: 1
	},
	takePhotoForDP: {
		alignItems: 'center',
		backgroundColor: '#464646',
		height: '50@s',
		justifyContent: 'center',
		borderBottomColor: 'grey',
		borderBottomWidth: 1
	},
	chooseFromLibrary: {
		alignItems: 'center',
		backgroundColor: '#464646',
		height: '50@s',
		justifyContent: 'center',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	},
	cancelDPModal: {
		alignItems: 'center',
		backgroundColor: '#464646',
		marginTop: '5%',
		justifyContent: 'center',
		height: '50@s',
		width: '100%',
		borderRadius: 20,
		
	},
	editDPText: {
		color: 'white', 
		fontSize: RFValue(14)
	},
	takePhotoforDPBackground: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	chooseFromCameraRollHeader: {
		
		flex: 1,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	CFCRPhoto: {
		flex: 9,
		backgroundColor: 'green'
	},
	CFCRMorePhotos: {
		flex: 6,
		backgroundColor: 'red'
	},
	CFCRBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '3%'
	},
	notificationText: {
		color: 'black', 
		fontSize: RFValue(17.5)
	},
	done: {
		color: 'black', 
		fontWeight: '700', 
		fontSize: RFValue(14)
	}
	


	

	




})

export default styles;