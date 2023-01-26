import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { scale, ScaledSheet } from 'react-native-size-matters';

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
		//position: 'absolute',
		// marginTop: screenHeight * 0.88,
		// marginRight: screenWidth * 0.82,
		// left: '15@s',
		// bottom: '40@s',
		//alignSelf: 'flex-end'
		//bottom: screenHeight * 0.06,
		//left: screenWidth * 0.05,
		//backgroundColor: 'green'
	},
	messageButton: {
		width: '60@s',
		height: '60@s',
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
	messageCountContainerMap: {
		backgroundColor: '#96B9FE',
		width: '30%',
		height: '30%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'flex-end'
	},
	messageCountContainerFeed: {
		backgroundColor: 'white',
		width: '30%',
		height: '30%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'flex-end',
		top: 0
	},
	messageCountContainerFeedNew: {
		backgroundColor: 'black',
		width: '15@s',
		height: '15@s', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'flex-end',
		top: 0
	},
	messageIcon: {
		//color: 'white',
		justifyContent: 'center',
	},
	messageIcon2: {
		color: 'white',
		position: 'absolute'
		//justifyContent: 'center',
		//alignSelf: 'center'
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
		height: screenHeight * 0.18,
		marginTop: screenHeight * 0.015,
		borderTopColor: 'white',
		borderTopWidth: 1,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		width: screenWidth * 0.95,
		//paddingBottom: screenHeight * 0.02
	},
	newFriendsText: {
		color: 'white', 
		marginTop: screenHeight * 0.01, 
		marginLeft: '3%', 
		fontStyle: 'italic', 
		fontWeight: '700',
		//fontSize: RFValue(16)
		fontSize: screenHeight * 0.026,
		fontFamily: 'Helvetica'
	},
	newConnectionProfile: {
		marginTop: screenHeight * 0.01,
		marginLeft: screenHeight * 0.005,
		marginRight: screenHeight * 0.005,
		height: '100%',
		width: (screenWidth/5),
		//justifyContent: 'space-between',
		alignItems: 'center',
		//backgroundColor: 'green'
	},
	newConnectionProfilePic: {
		width: '60@s',
		height: '60@s',
		borderRadius: 100,
		backgroundColor: '#F2F2F2',
		marginTop: screenHeight * 0.005
	},
	newConnectionUsername: {
		color: 'white',
		//fontSize: RFValue(12),
		fontSize: screenHeight * 0.018,

	},
	messagesText: {
		color: 'white', 
		marginTop: screenHeight * 0.01, 
		paddingBottom: screenHeight * 0.005,
		alignSelf: 'flex-start',
		marginLeft: '5.5%',
		fontStyle: 'italic', 
		fontWeight: '700',
		//fontSize: RFValue(16)
		fontSize: screenHeight * 0.026,
		fontFamily: 'Helvetica'


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
		alignItems: 'center',
		//backgroundColor: 'red',
		marginTop: '1%'
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
		//backgroundColor: 'grey'
	},
	username: {
		fontWeight: '800',
		fontSize: screenHeight * 0.022,
		color: 'white',
		fontStyle: 'italic'
	},
	usernameUnread: {
		fontWeight: '800',
		fontSize: screenHeight * 0.024,
		color: 'white',
		fontStyle: 'italic'
	},
	myLastMessage: {
		fontSize: RFValue(9.5),
		color: 'white',
		marginLeft: '5%'
		
	},
	lastMessage: {
		fontSize: screenHeight * 0.015,
		color: '#AAAAAA',
		fontWeight: '500',

	},
	lastMessageUnread: {
		fontSize: screenHeight * 0.016,
		color: 'white',
		fontWeight: '800'
	},
	notificationContainerMap: {
		position: 'absolute',
		alignItems: 'flex-end',
		top: screenHeight * 0.05,
		right: screenWidth * 0.05
	},
	notificationButton: {
		width: '60@s',
		height: '60@s',
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
		backgroundColor: '#96B9FE',
		width: '30%',
		height: '30%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',

	},
	notificationCountContainer: {
		backgroundColor: 'white',
		width: '30%',
		height: '30%', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		alignSelf: 'flex-end'
	},
	notificationCountContainerNew: {
		backgroundColor: 'black',
		width: '15@s',
		height: '15@s', 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		alignSelf: 'flex-end'
	},
	notifCountText: {
		//fontSize: RFValue(9), 
		fontSize: screenHeight * 0.014,
		color: 'black'
	},
	notifCountTextNew: {
		//fontSize: RFValue(8), 
		fontSize: screenHeight * 0.014,
		color: 'white'
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
	createPinButton: {
		width: '60@s',
		height: '60@s',
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
		//position: 'absolute',
		//marginTop: screenHeight * 0.88,
		//bottom: screenHeight * 0.06,
		//right: screenWidth * 0.05
		//marginLeft: screenWidth * 0.82,
		
	},

	dmBackButton: {
		marginRight: '5%'
	},
	locationModal: {
		backgroundColor: '#96B9FE',
		width: screenWidth * 0.96,
		alignSelf: 'center',
		//marginTop: screenHeight,
		borderRadius: 10,
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
		justifyContent: 'space-evenly',
		height: '15%',
		marginTop: screenHeight * 0.5
	},
	createChannelModal: {
		backgroundColor: '#96B9FE',
		width: screenWidth * 0.96,
		alignSelf: 'center',
		borderRadius: 10,
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
		//justifyContent: 'center',
		height: screenHeight * 0.15,
	},
	createChannelModalNoPic: {
		backgroundColor: '#96B9FE',
		width: screenWidth * 0.96,
		alignSelf: 'center',
		borderRadius: 10,
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
		justifyContent: 'center',
		height: '15%',
	},
	locationImagePlaceholderSingle: {
		backgroundColor: 'grey',
		width: '35%',
		height: '80%',
		// height: '80@s',
		// width: '120@s',
		borderRadius: 10,
		position: 'absolute',
		left: '3%'
	},
	locationImagePlaceholderSingleCreateChannel: {
		backgroundColor: 'blue',
		width: '35%',
		height: '100%',
		// height: '80@s',
		// width: '120@s',
		borderRadius: 10,
		marginLeft: '3%'
	},
	locationNameActiveAndJoinButtonContainer: {
		height: '80%',
		//backgroundColor: 'red',
		flexDirection: 'column',
		//justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '60%'
	},
	locationNameActiveAndJoinButtonContainerCreate: {
		height: '100%',
		//backgroundColor: 'red',
		flexDirection: 'column',
		justifyContent: 'center',
		//alignItems: 'center',
		width: '50%'
	},
	locationNameActiveAndJoinButtonContainerCreateNoPic: {
		height: '100%',
		//backgroundColor: 'red',
		flexDirection: 'column',
		justifyContent: 'center',
		//alignItems: 'center',
		width: '50%',
		marginLeft: '3%'
	},
	locationModalClose: {
		color: 'black',
		alignSelf: 'flex-start',
		//position: 'absolute',
		position: 'absolute',
		right: '3%',
		top: '5%'
	},
	locationModalCloseNoPic: {
		color: 'black',
		alignSelf: 'flex-start',
		position: 'absolute',
		right: '3%',
		top: '5%'
	},
	createChannelModalClose: {
		color: 'black',
		position: 'absolute',
		alignSelf: 'flex-start',
		right: '3%'

	},
	createPinModalClose: {
		color: 'black',
		alignSelf: 'flex-start',
		position: 'absolute',
		right: scale(2)
		
	},
	createPinModal: {
		backgroundColor: '#96B9FE',
		width: screenWidth * 0.8,
		alignSelf: 'center',
		//marginTop: screenHeight,
		borderRadius: 10,
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
		justifyContent: 'center',
		height: screenHeight * 0.15,
		//marginBottom: screenHeight * 0.2,
		
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
		marginTop: '5%'
	},
	checkInText: {
		color: 'white',
		fontSize: RFValue(12)
	},
	checkedInText: {
		//color: 'white',
		fontFamily: 'Helvetica',
		fontSize: screenHeight * 0.018,

	},
	createChannelText: {
		color: 'white',
		fontSize: RFValue(12)
	},
	locationNameModal: {
		color: 'black',
		//fontSize: RFValue(18),
		fontSize: screenHeight * 0.028,
		fontWeight: '600',
		//alignSelf: 'flex-start',
		position: 'absolute',
		top: 0,
		fontFamily: 'Helvetica'

	}, 
	locationNameModalCreateChannel: {
		color: 'black',
		fontSize: RFValue(16),
		fontWeight: '600',
		alignSelf: 'center',
		position: 'absolute',
		top: 0,
		fontFamily: 'Helvetica'

	}, 
	locationNameModalNoPic: {
		color: 'black',
		//fontSize: RFValue(18),
		fontSize: screenHeight * 0.028,
		fontWeight: '600',
		alignSelf: 'center',
		position: 'absolute',
		top: '10%',
		fontFamily: 'Helvetica'
	}, 
	locationModalActive: {
		color: 'black', 
		//marginBottom: '3%', 
		fontWeight: '600',
		fontSize: RFValue(13),
		alignSelf: 'center'
		//backgroundColor: 'red'
	},
	locationModalDot: {
		
		alignSelf: 'center',
		// left: scale(90),
		marginLeft: '2%'
	},
	locationModalActiveDotContainer: {
		flexDirection: 'row',
		//backgroundColor: 'pink',
		
		//alignItems: 'flex-start',
		//textAlign: 'center',
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
		height: '80%',
		width: '95%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center', 
		borderRadius: 10,
	},
	notifBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		left: '5%'
		//right: '220%'
	},
	notificationsList: {
		marginTop: screenHeight * 0.015,
		//backgroundColor: 'green',
		flex: 1
		
	},
	notifMessage: {
		marginLeft: '10%', 
		marginTop: '2%',
		marginBottom: '2%',
		fontSize: screenHeight * 0.022,
		width: '50%',
		color: 'white',
		fontFamily: 'Helvetica'
	},
	notifTime: {
		marginRight: '10%', 
		fontSize: screenHeight * 0.018,
		color: 'white',
		fontFamily: 'Helvetica'

	},
	notifProfile: {
		width: '45@s',
		height: '45@s',
		borderRadius: 100,
		//backgroundColor: 'grey',
		//flexDirection: 'row',
		//justifyContent: 'center',
		//alignItems: 'center',
		//marginTop: '3%',
		//marginBottom: '3%',
		position: 'absolute',
		right: '70@s',

	},
	notif1: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '65@s'
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
		fontFamily: 'Helvetica',
		marginRight: '3%',
		//fontSize: RFValue(16),
		fontSize: screenHeight * 0.026,
		fontWeight: '600',
		color: 'black'
	},
	inputRemaining: {
		position: 'absolute',
		bottom: 0,
		alignSelf: 'flex-end',
		marginRight: '5%',
		marginBottom: '2%',
		//fontSize: RFValue(12)
		fontSize: screenHeight * 0.018,
		fontFamily: 'Helvetica'

	},
	profileScreen: {
		height: screenHeight,
		width: screenWidth,
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},
	profilePageFooter: {
		//flex: 1,
		height: screenHeight * 0.25,
		width: screenWidth,
		flexDirection: 'column',
		//backgroundColor: 'red',
		
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
		fontSize: RFValue(14),
		fontWeight: '600',
		fontFamily: 'Helvetica'
	},
	profilePageDPContainer: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		borderRadius: 30,
		marginTop: screenHeight * 0.05,
		justifyContent: 'flex-end',
		alignItems: 'center',
		//backgroundColor: 'green',
		overflow: 'hidden'
	},
	profilePageDP: {
		height: '100%', 
		width: '100%', 
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	profilePicEdit: {
		marginLeft: '80%',
		marginBottom: '5%'
	},
	profilePageName: {
		//fontSize: RFValue(17),
		fontSize: screenHeight * 0.03,
		color: 'white',
		fontWeight: 'bold',
		fontStyle: 'italic',
		//backgroundColor: 'green',
		fontFamily: 'Helvetica'
	},
	profilePageUsername: {
		//fontSize: RFValue(26),
		fontSize: screenHeight * 0.04,
		color: 'white',
		fontWeight: 'bold',
		fontStyle: 'italic',
		//backgroundColor: 'red',
		fontFamily: 'Helvetica'
		
	},
	profilePageSettings: {
		marginTop: '2%',
		marginRight: screenWidth * 0.05
	},
	socialyseCounter: {
		//fontSize: RFValue(17.5), 
		fontSize: screenHeight * 0.03,
		color: '#BAD0FB', 
		fontWeight: '700', 
		fontStyle: 'italic',
		fontFamily: 'Epilogue-Regular',
		//fontFamily: 'Helvetica',
		//backgroundColor: 'grey',
		//height: '100%',
		

	},
	profilePageUsernameNameSettingsContainer: {
		marginTop: screenHeight * 0.03,
		width: screenWidth,
		flexDirection: 'row',
		borderTopColor: '#545454',
		borderTopWidth: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		//backgroundColor: 'red',
		height: screenHeight * 0.1
	},
	usernameAndNameContainer: {
		marginLeft: screenWidth * 0.05,
		//backgroundColor: 'grey',
		flex: 1,
		marginRight: screenWidth * 0.05
	},
	settingsIcon: {
		//position: 'absolute',
		//right: 10,
		marginRight: screenWidth * 0.05,
		alignSelf: 'center'
		//marginRight: screenWidth * 0.05
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
		// position: 'absolute',
		// alignSelf: 'flex-start',
		// marginTop: screenHeight * 0.85,
		// marginLeft: screenWidth * 0.07
	},
	takeAPhotoDPBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		alignSelf: 'flex-start',
		marginTop: screenHeight * 0.85,
		marginLeft: screenWidth * 0.07
	},
	takeAPhotoText: {
		fontWeight: '900',
		//fontSize: RFValue(28),
		fontSize: screenHeight * 0.04,
		color: 'white',
		fontStyle: 'italic',
		marginTop: screenHeight * 0.05, 
		textAlign: 'center',
		fontFamily: 'Helvetica',
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
		//fontSize: RFValue(28),
		fontSize: screenHeight * 0.04,
		//fontStyle: 'italic',
		color: 'white',
		fontWeight: '900',
		fontFamily: 'Epilogue-Regular',
	},
	timeRemaining: {
		fontSize: RFValue(10), 
		color: 'white', 
		position: 'absolute', 
		bottom: '0%'
	},
	postCaption: {
		//fontSize: RFValue(11), 
		fontSize: screenHeight * 0.018,
		marginHorizontal: '2%',
		color: 'black',
		fontFamily: 'Epilogue-Regular',
		marginTop: '2%'

	},
	postModalCaption: {
		color: 'white', 
		//alignSelf: 'flex-start', 
		//fontSize: RFValue(13), 
		fontSize: screenHeight * 0.02,
		marginLeft: '5%',
		flexWrap: 'wrap',
		//marginTop: '3%',
		//backgroundColor: 'grey',

		flex: 1
	},
	postModalCaption2: {
		color: 'white', 
		alignSelf: 'flex-start', 
		fontSize: RFValue(12.5), 
		marginLeft: '5%',
		flexWrap: 'wrap',
		marginTop: '1%'
	},
	socialTextPurple30: {
		fontSize: 30,
		fontStyle: 'italic',
		fontWeight: '900',
		marginRight: 5,
		color: '#AD00FF'
	},
	
	happySocialysingLoadingScreen: {
		height: screenHeight,
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
		marginRight: 4,
		fontFamily: 'Helvetica'
	},
	yourPostTextWhite: {
		fontSize: RFValue(28),
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'white',
		fontWeight: '700',
		fontFamily: 'Helvetica'
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
		borderRadius: 30,
		overflow: 'hidden'
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
		//fontSize: RFValue(16),
		fontSize: screenHeight * 0.026,
		paddingTop: 0,
		paddingBottom: 0,
		color: 'white',
		marginLeft: '1%',
		fontFamily: 'Epilogue-Regular',

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
		// position: 'absolute',
		// marginTop: screenHeight * 0.115,
		// marginLeft: screenWidth * 0.27
	},
	captionModal: {
		height: screenHeight * 0.4,
		width: screenWidth * 0.96,
		backgroundColor: 'white',
		borderRadius: 20,
		alignSelf: 'center',
		marginTop: screenHeight * 0.15,
		
	},
	captionModalPlaceholder: {
		marginLeft: '3%',
		fontSize: screenHeight * 0.022,
		fontFamily: 'Helvetica'

		
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
		paddingVertical: '2%',
		alignItems: 'center',
		//backgroundColor: 'red'
		
	},
	postsFeedHeaderBackButton: {
		transform: [{rotateY: '180deg'}],
		left: '3%',
		position: 'absolute'
	},
	notificationContainerPostsFeed: {
		alignItems: 'flex-end',
		right: '3%',
		position: 'absolute'
	},
	postsFeedFooter: {
		width: '100%',
		flex: 1,
		//flex: 0.8,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopColor: '#383838',
		borderTopWidth: 0.7,
		//backgroundColor: 'green',
		paddingVertical: '2%'

	},
	messageButtonPostsFeed: {
		width: '55@s',
		height: '55@s',
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
		width: '55@s',
		height: '55@s',
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
		height: screenHeight * 0.1,
		width: screenWidth,
		backgroundColor: 'black',
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		//backgroundColor: 'aqua',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: screenHeight * 0.02,
		marginTop: screenHeight * 0.04
		
	},
	messagesHeaderUsername: {
		color: 'white',
		fontSize: screenHeight * 0.022,
		fontWeight: '400',
		//marginLeft: screenWidth * 0.03,
		//marginTop: screenHeight * 0.03
		//backgroundColor: 'green'
	},
	messagesBackButton: {
		//position: 'absolute',
		//alignSelf: 'flex-end',
		//marginRight: screenHeight * 0.02,
		//marginTop: screenHeight * 0.03
	},
	messagesScreen: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'black',
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
		borderTopWidth: 0.5,
		//marginBottom: screenHeight * 0.03
	},
	postContainer: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.45,
		marginTop: '2%',
		flexDirection: 'row',
		justifyContent: 'center',
		//backgroundColor: 'red',

	},
	blank: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.45,
		backgroundColor: 'transparent',
	},
	fullPost: {
		height: '100%', 
		width: '80%',
		justifyContent: 'center',
		//backgroundColor: 'grey',
		


	},
	postPhoto: {
		//backgroundColor: 'red', 
		height: '100%', 
		borderRadius: 10,
		overflow: 'hidden',
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
		flex: 1,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		alignItems: 'center'
	},
	signUpScreenSocialyse: {
		alignItems: 'center',
		marginTop: screenHeight * 0.15,
		//backgroundColor: 'grey'
	},
	signUpInputContainer: {
		width: screenWidth * 0.8,
		marginTop: screenHeight * 0.1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#CACACA',
		height: screenHeight * 0.05,
	}, 
	loginInputContainer: {
		width: screenWidth * 0.8,
		marginTop: screenHeight * 0.03,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#CACACA',
		height: screenHeight * 0.05,
	}, 
	signUpInputContainerSignUp: {
		width: screenWidth,
		marginTop: screenHeight * 0.02,
		alignItems: 'center',
		//backgroundColor: 'green',
		//height: screenHeight * 0.5
	}, 
	signUpInputs: {
		borderWidth: 1,
		borderColor: '#CACACA',
		marginTop: '1%',
		width: screenWidth * 0.8,
		backgroundColor: '#FFFFFF',
		//backgroundColor: 'red',
		borderRadius: 5,
		height: screenHeight * 0.05,
		justifyContent: 'center'

	},
	signUpTextInput: {
		fontFamily: 'Helvetica',
		marginLeft: '3%',
		fontSize: screenHeight * 0.02

	},
	inputs: {
		//marginTop: '1%',
		width: '100%',
		height: '100%',
		marginLeft: '3%',
		fontSize: screenHeight * 0.02
		//backgroundColor: 'red'
	},
	forgotPasswordContainer: {

		width: screenWidth * 0.8,
	},
	signUpSocialTextYellow: {
		//fontSize: RFPercentage(10),
		fontSize: screenHeight * 0.065,
		//fontStyle: 'italic',
		color: 'white',
		fontWeight: '900',
		fontFamily: 'Epilogue-Regular'
	},
	signUpMsg: {
		fontSize: screenHeight * 0.02,
		color: 'white',
		fontWeight: '900',
		fontFamily: 'Helvetica',
		maxWidth: screenWidth * 0.6,
		textAlign: 'center',
		marginTop: screenHeight * 0.01
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
		fontSize: screenHeight * 0.022,
		fontWeight: '600',
		maxWidth: screenWidth * 0.8
	},
	signUpInfoContainer: {
		marginTop: screenHeight * 0.03
	},
	signUpButton: {
		width: screenWidth * 0.8,
		height: screenHeight * 0.05,
		marginTop: screenHeight * 0.01,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: 'white'
	},
	loginButton: {
		
		width: screenWidth * 0.8,
		height: screenHeight * 0.05,
		marginTop: screenHeight * 0.03,
		//backgroundColor: 'white',
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	initialDPBody: {
		alignItems: 'center',
		//backgroundColor: 'red'
	},
	or: {
		marginTop: screenHeight * 0.01,
		fontWeight: '700',
		fontSize: screenHeight * 0.02

	},
	ownPostModal: {
		width: '320@s',
		backgroundColor: 'transparent',
		//backgroundColor: 'green',
		alignSelf: 'center',
		marginTop: '105@s',
		marginBottom: '190@s',
		height: '450@s',
		alignItems: 'center',
		//justifyContent: 'center',
		
	},
	ownPostModal2: {
		width: screenWidth,
		//backgroundColor: 'transparent',
		//backgroundColor: 'green',
		alignSelf: 'center',
		marginTop: '105@s',
		marginBottom: '190@s',
		height: '450@s',
		alignItems: 'center',
		//justifyContent: 'center',
		
	},
	ownPostModalPost: {
		
		height: '100%',
		width: screenWidth * 0.9,
		//alignItems: 'center',

	},
	settingsScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	settingsHeader: {
		flex: 1,
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		//backgroundColor: 'aqua'
	},
	AboutHeader: {
		flex: 1,
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		//backgroundColor: 'aqua'
	},
	settingsBody: {
		
		flex: 10,
		
	},
	settingsBackButton: {
		position: 'absolute',
		left: '6%'
	},
	settingsLogout: {
		backgroundColor: '#464646',
		height: screenHeight * 0.05,
		width: screenWidth * 0.3,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
	},
	settingsProfile: {
		backgroundColor: '#464646',
		height: screenHeight * 0.1,
		width: screenWidth * 0.85,
		borderRadius: 10,
		marginTop: screenHeight * 0.03,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: '5%'
	},
	settingsDeleteProfile: {
		backgroundColor: '#464646',
		height: screenHeight * 0.1,
		width: screenWidth * 0.85,
		borderRadius: 10,
		marginTop: screenHeight * 0.03,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: '5%',

	},
	messageInput: {
		borderWidth: 1,
		borderColor: '#CACACA',
		width: screenWidth * 0.8,
		height: '70%',
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
		//padding: 10,
		paddingHorizontal: '3%',
		fontSize: screenHeight * 0.022,

		//fontSize: RFValue(14),
		//marginBottom: screenHeight * 0.03
		//backgroundColor: 'green'
	},
	messageSendButton: {
		//marginBottom: screenHeight * 0.03
	},
	messageLeftContainer: {
		backgroundColor: '#292929', 
		alignSelf: 'flex-start', 
		borderRadius: 15, 
		padding: '2%',
		marginLeft: '2%', 
		marginTop: '1%',
		marginBottom: '1%',
		maxWidth: '80%',
		minWidth: '8%'
	},
	messageLeftContainerNoSpace: {
		backgroundColor: '#292929', 
		alignSelf: 'flex-start', 
		borderRadius: 15, 
		padding: '2%',
		marginLeft: '2%', 
		//marginTop: '0.5%',
		marginBottom: '0.5%',
		maxWidth: '80%',
		minWidth: '8%'
	},
	messageLeftWithDPContainer: {
		backgroundColor: '#292929', 
		alignSelf: 'flex-start', 
		borderBottomLeftRadius: 5, 
		borderBottomRightRadius: 15, 
		borderTopLeftRadius: 15, 
		borderTopRightRadius: 15, 
		padding: '2%',
		marginLeft: '2%', 
		maxWidth: '80%',
		minWidth: '8%'
	},
	messageOtherDP: {
		height: '25@s', 
		width: '25@s', 
		borderRadius: 30, 
		alignSelf: 'flex-end',
		marginLeft: '2%'
	},
	DMOtherDP: {
		height: '35@s', 
		width: '35@s', 
		borderRadius: 30, 
		//alignSelf: 'flex-end',
		//marginLeft: '2%'
	},
	messageRightContainer: {
		backgroundColor: '#96B9FE', 
		alignSelf: 'flex-end', 
		borderRadius: 15,
		padding: '2%',
		marginRight: '1%', 
		marginBottom: '0.5%',
		maxWidth: '80%',
		minWidth: '8%'
	},
	rightSpeech: {
		backgroundColor: '#96B9FE', 
		//backgroundColor: 'red',
		alignSelf: 'flex-end', 
		borderBottomLeftRadius: 15, 
		borderBottomRightRadius: 5, 
		borderTopLeftRadius: 15, 
		borderTopRightRadius: 15, 
		padding: '2%',
		marginRight: '1%', 
		marginBottom: '2%',
		maxWidth: '80%',
		minWidth: '8%'
	},
	messageText: {
		fontSize: RFValue(16),
		color: 'white',
		fontFamily: 'Helvetica'
	},
	messageTime: {
		fontSize: RFValue(10), 
		alignSelf: 'flex-end'
	},
	otherProfileBackButton: {
		//transform: [{rotateX: '0deg'}],
		// alignSelf: 'flex-start',
		// marginLeft: '5%',
		marginTop: screenHeight * 0.15
	},
	dpEditModalFullScreen: {
		height: screenHeight,
		width: screenWidth * 0.9,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignSelf: 'center',
		flexDirection: 'row',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	postModalFullScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		//backgroundColor: 'pink',
		alignItems: 'center',
	},
	postModalFullScreen2: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		//backgroundColor: 'pink',
		alignSelf: 'center',
	},
	dpEditModal: {
		height: screenHeight * 0.3,
		width: screenWidth * 0.9,
		backgroundColor: 'black',
		alignSelf: 'flex-end',
		//marginTop: screenHeight * 0.7,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		//position: 'absolute',
		//bottom: 20
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
		borderBottomWidth: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
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
		//fontSize: RFValue(14),
		fontSize: screenHeight * 0.022,
		fontFamily: 'Helvetica'
	},
	takePhotoforDPBackground: {
		flex: 1,
		width: screenWidth,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	chooseFromCameraRollHeader: {
		
		height: screenHeight * 0.08, 
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'green'
	},
	CFCRPhoto: {
		height: screenHeight * 0.55, 
		width: screenWidth * 0.9, 
		//marginTop: screenHeight * 0.05,
		//backgroundColor: 'green'
		
	},
	CFCRBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '3%'
	},
	openCameraRollButton: {
		backgroundColor: '#96B9FE',
		height: screenHeight * 0.04,
		width: screenWidth * 0.35,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		marginTop: screenHeight * 0.1
	},
	openCameraRollText: {
		//fontSize: RFValue(12),
		fontSize: screenHeight * 0.018,
		//color: 'white'
	},
	notificationText: {
		color: 'black', 
		//fontSize: RFValue(17.5),
		fontSize: screenHeight * 0.026,
		fontWeight: '500',
		fontFamily: 'Helvetica'
	},
	done: {
		color: 'black', 
		fontWeight: '700', 
		fontSize: RFValue(14)
	},
	settingsText: {
		color: 'white',
		fontWeight: '600',
		//fontSize: RFValue(13),
		fontSize: screenHeight * 0.02,
		fontFamily: 'Helvetica'
	},
	changePasswordBackButton: {
		transform: [{rotateY: '180deg'}],
		marginLeft: '5%'
	},
	changePasswordHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: screenWidth,
		//backgroundColor: 'green',
		//height: screenHeight * 0.08,
		flex: 1,
		borderBottomColor: 'grey',
		borderBottomWidth: 0.8
	},
	changePasswordInputContainer: {
		width: screenWidth,
		alignItems: 'center',
		marginTop: screenHeight * 0.02,
		//flex: 11,
	},
	changePasswordText: {
		color: 'white',
		fontSize: RFValue(16),
		fontWeight: '900'
	},
	changePasswordDoneText: {
		marginRight: '5%',
		fontSize: screenHeight * 0.022,
		//fontSize: RFValue(14)
		fontWeight: '600',
		fontFamily: 'Helvetica'
	},
	ownPostModalPlaceHolder: {
		height: '400@s',
		//width: '320@s',
		width: '100%',
		//backgroundColor: 'aqua'
		overflow: 'hidden',
		borderRadius: 10,
	},
	postModalPostPlaceholder: {
		height: '100%',
		width: '100%',
		overflow: 'hidden',
		borderRadius: 10,
	},
	somewthing: {
		//marginTop: '105@s',
		//backgroundColor: 'grey', 
		width: '320@s',

		height: '500@s'
	},
	ownPostLikeCount: {
		color: 'white',
		//fontSize: RFValue(13)
		fontSize: screenHeight * 0.02,

	},
	somewthing2: {
		//marginTop: '105@s',
		//backgroundColor: 'grey', 
		width: '320@s',
		//width: screenWidth,
		height: '400@s'
	},
	multipleLocationModal: {
		backgroundColor: '#96B9FE',
		width: screenWidth * 0.96,
		height: screenHeight * 0.5,
		alignSelf: 'center',
		bottom: 0,
		position: 'absolute',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		flexDirection: 'column',
	},
	multiLocationModalHeader: {
		//backgroundColor: 'pink', 
		flex: 2.3, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderTopRightRadius: 10, 
		borderTopLeftRadius: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'black'
	},
	multiLocationModalHeaderNoPic: {
		//backgroundColor: 'pink', 
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderTopRightRadius: 10, 
		borderTopLeftRadius: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'black'
	},

	locationImagePlaceholderMulti: {
		backgroundColor: 'grey',
		// width: '35%',
		// height: '80%',
		height: '80@s',
		width: '120@s',
		borderRadius: 10,
		marginTop: '1%',
	},
	multiCheckInText: {
		fontSize: screenHeight * 0.018,
		fontFamily: 'Helvetica'
	},
	multiCheckInButton: {
		height: '70%',
		width: '30%', 
		//alignSelf: 'flex-end',
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
		marginRight: '3%',
		backgroundColor: 'black'
	},
	multiLocationModalChannelContainer: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
		// borderBottomColor: 'black', 
		// borderBottomWidth: 1, 
		paddingHorizontal: '3%', 
		paddingVertical: '1%',
		alignItems: 'center'
	},
	initialPlaceholder: {
		height: '45@s',
		width: '45@s',
		backgroundColor: '#96B9FE',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ChangeNameAndUsernameHeader: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
		//backgroundColor: 'blue', 
		width: '100%',
		flex: 1,
		alignItems: 'center',
		//paddingHorizontal: '5%',
		borderBottomColor: 'grey',
		borderBottomWidth: 0.8
	},
	ChangeNameAndUsernameBody: {
		flex: 11,
		width: screenWidth
	},
	ChangeNameAndUsernameDPContainer: {
		//backgroundColor: 'red', 
		width: '100%', 
		flex: 1, 
		justifyContent: 'center', 
		alignItems:'center',
		borderBottomColor: '#666666',
		borderBottomWidth: 0.7
	},
	ChangeNameAndUsernameDP: {
		height: '100@s',
		width: '100@s',
		//backgroundColor: 'pink',
		borderRadius: 100
	},
	ChangeNameAndUsernameBodyInput: {
		//backgroundColor: 'pink', 
		width: '100%', 
		flex: 3,
		
	},
	inputsEditProfile: {
		// flex: 1,
		color: 'white',
		fontWeight: '500',
		fontSize: screenHeight * 0.022,
		fontFamily: 'Helvetica'

	},
	verifyPhoneNumHeader: {
		height: screenHeight * 0.07,
		//backgroundColor: 'black',
		width: screenWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	verifyPhoneNumBody: {
		flex: 1,
		width: screenWidth,
		alignItems: 'center',
		backgroundColor: 'white'
		//backgroundColor: 'green'
	},
	verifyPhoneNumBodyTextContainer: {
		//backgroundColor: 'grey',
		height: screenHeight * 0.10,
		justifyContent: 'flex-end',
	},
	verifyPhoneNumBodyText: {
		color: 'black', 
		textAlign: 'center', 
		lineHeight: '20@s',
		//fontSize: RFValue(14),
		fontSize: screenHeight * 0.022,
		fontWeight: '500',
		fontFamily: 'Helvetica',

	},
	verifyPhoneNumFooter: {
		height: screenHeight * 0.1,
		width: screenWidth,
		backgroundColor: 'red'
	},
	verifyPhoneNumBackButton: {
		position: 'absolute',
		left: '5%',
	},
	verificationText: {
		color: 'black',
		//fontSize: RFValue(20),
		fontSize: screenHeight * 0.028,
		fontWeight: '700',
		fontFamily: 'Helvetica',

	},
  	OTPIndividualInput: {
  		height: '40@s',
  		width: '40@s',
  		backgroundColor: '#DBDBDB',
  		borderRadius: 100,
  		color: 'black',
  		//fontSize: RFValue(16)
		fontSize: screenHeight * 0.026
  	},
  	OTPContainer: {
  		width: '80%', 
  		height: screenHeight * 0.2,
  		//backgroundColor: 'green'
  	},
  	confirmCodeButton: {
  		//backgroundColor: '#96B9FE', 
  		width: screenWidth * 0.3,
  		alignItems: 'center',
  		justifyContent: 'center',
  		padding: '3%',
  		borderRadius: 30,
  		position: 'absolute',
  		marginTop: screenHeight * 0.4,
  		height: screenHeight * 0.05,
		  fontFamily: 'Helvetica',

  	},
  	verificationBackground: {
  		backgroundColor: 'white',
  		flex: 1,
		width: screenWidth,
		alignItems: 'center',
  	},
  	confirmCodeText: {
  		//fontSize: RFValue(12),
		fontSize: screenHeight * 0.018,
  		color: 'black',
  		fontWeight: '500'
  	},
  	signUpScreen: {
		flex: 1,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		alignItems: 'center'
	},
	sendFeedbackModalFullScreen: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	sendFeedbackModal: {
		height: screenHeight * 0.35,
		width: screenWidth * 0.96,
		backgroundColor: 'white',
		borderRadius: 20,
		alignSelf: 'center',
		marginTop: screenHeight * 0.15,
	},
	forgotPasswordSubmit: {
		height: screenHeight * 0.05,
		width: screenWidth * 0.2,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		marginTop: screenHeight * 0.1
	},
	forgotPasswordSubmitText: {
		fontSize: RFValue(12),
		fontWeight: '700',
		color: 'black'
	},
	forgotPasswordBackToLogin: {
		marginTop: screenHeight * 0.1,
		color: 'black',
		fontWeight: '700'
	},
	otherUserUsernameAndNameContainer: {
		marginLeft: screenWidth * 0.05,
		//backgroundColor: 'green',
		width: screenWidth
	},
	multipleChannelLocationActiverUsers: {
		//fontSize: RFValue(12),
		fontSize: screenHeight * 0.018,
		color: 'black',
		fontFamily: 'Helvetica'

	},
	locationModalFooter: {
		flex: 1, 
		justifyContent: 'space-between', 
		//backgroundColor: 'pink', 
		flexDirection: 'row',
		alignItems: 'center'
	},
	multiCreateChannelButton: {
		height: '70%',
		width: '30%', 
		//alignSelf: 'flex-end',
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
		marginLeft: '3%',
		backgroundColor: 'black'
	},
	createChannelModelFullScreen: {
		height: screenHeight,
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:  'pink'
	},
	newChannelModelPLaceholder: {
		//backgroundColor: 'aqua',
		height: '40%',
		fontWeight: '700',
		textAlign: 'center'
		//marginTop: '10%'
		//alignSelf: 'flex-start'
		
	},
	newChannelModelPLaceholderNoPic: {
		fontWeight: '400',
		textAlign: 'center',
		color: '#585858',
		fontSize: screenHeight * 0.022,
		fontFamily: 'Helvetica'

	},
	createPinModalPlaceholder: {
		//backgroundColor: 'aqua',
		//height: '40%',
		fontWeight: '700',
		fontSize: RFValue(15),
		marginTop: '5%'
		//width: '100%',
	},
	createChannelButton: {
		height: '25%',
		width: '80%', 
		alignSelf: 'center',
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
		backgroundColor: 'black',
		position: 'absolute',
		bottom: '5%'
	},
	createPinModalButton: {
		height: '25%',
		width: '50%', 
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
		backgroundColor: 'black',
		position: 'absolute',
		bottom: 5
	},

	locationNameActiveAndJoinButtonContainer2: {
		height: '80%',
		//backgroundColor: 'red',
		flexDirection: 'column',
		alignItems: 'center',
		width: '45%',
		marginLeft: '30%'
	},
	locationNameActiveAndJoinButtonContainerNoPic: {
		height: '80%',
		//backgroundColor: 'red',
		flexDirection: 'column',
		alignItems: 'center',
		width: '45%',
		//marginLeft: '30%'
	},
	channelNameInPostFeed: {
		position: 'absolute', 
		bottom: 0, 
		alignSelf: 'center',
		//fontSize: RFValue(11),
		fontSize: screenHeight * 0.018,
		color: 'black',
		fontWeight: '600',
		fontFamily: 'Epilogue-Regular',

	},
	notificationButton2: {
		width: '55@s',
		height: '55@s',
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
	takePhotoButtonPostFeed: {
		backgroundColor: 'black',
		width: '60@s',
		height: '60@s',
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		//marginTop: screenHeight * 0.05,
		//borderColor: 'white',
		borderWidth: 2.5
	},
	makeAPostFooter: {
		//ckgroundColor: 'green', 
		flexDirection: 'row', 
		width: screenWidth,
		height: screenHeight * 0.1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: '5%',
		position: 'absolute',
		bottom: '40@s',
	},
	noJoinCreateChannelText: {
		textAlign: 'center',
		alignSelf: 'center',
		color: 'black',
		fontWeight: '700',
		fontSize: screenHeight * 0.022,
		fontFamily: 'Helvetica'


	},
	loadingScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	loadingSocialyseText: {
		marginTop: screenHeight * 0.4,
		fontSize: RFValue(30),
		color: 'black',
		fontWeight: '900',
		fontStyle: 'italic'
	},
	editProfileNameContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		//backgroundColor: 'grey',
		height: '10%'
	},
	editProfileUsernameContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		height: '10%',
		//backgroundColor: 'green'
	},
	editProfileTextInputArea: {
		flex: 1,
		color: 'white',
		borderBottomColor: '#666666',
		borderBottomWidth: 0.7,
		//backgroundColor: 'brown',
		height: '100%',
		justifyContent: 'center'
	},
	HaveAccountLogin: {
		//marginTop: screenHeight * 0.05, 
		//backgroundColor: 'red', 
		//position: 'absolute',
		marginTop: screenHeight * 0.05
	},
	DontHaveAccountSignUp: {
		//marginTop: '5%',
		position: 'absolute',
		marginTop: screenHeight * 0.45
	},
	initialDPFullScreen: {
		height: screenHeight,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		alignItems: 'center'
	},
	chooseADisplayPicText: {
		marginTop: screenHeight * 0.3,
		fontSize: screenHeight * 0.028,
		fontWeight: '900',
		fontStyle: 'italic',
		color: 'black',
		textAlign: 'center'
	},
	initialTakePhotoforDPBackground: {
		flex: 1,
		width: screenWidth,
		backgroundColor: '#96B9FE',
		alignItems: 'center',
	},
	createPinIcon: {
		//color: 'white',
		justifyContent: 'center',
	},
	messageCreatePinButtonContainer: {
		//backgroundColor: 'red', 
		position: 'absolute', 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		width: screenWidth,
		paddingHorizontal: screenWidth * 0.05,
		bottom: screenHeight * 0.03
	},
	checkBoxContainer: {
		height: '10@s',
		width: '10@s'
	}

	


	

	




})
//backgroundColor: 'rgba(0, 0, 0, 0.25)',
export default styles;