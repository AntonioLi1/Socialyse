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
	messageIcon: {
		color: '#333',
		justifyContent: 'center',
	},
	DMHeader: {
		marginTop: screenHeight * 0.015,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	}, 
	profileButtonDM: {
		width: screenWidth * 0.13,
		height: screenHeight * 0.06,
		right: '30%',
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
		height: '20%',
		marginTop: '3%',
		marginLeft: '3%',
		marginRight: '3%',
		borderTopColor: '#D8D8D8',
		borderTopWidth: 1,
		borderBottomColor: '#D8D8D8',
		borderBottomWidth: 1,
		backgroundColor: 'aqua'
	},
	newConnectionProfile: {
		marginTop: screenHeight * 0.01,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'pink',
		height: '80%',
		width: (screenWidth/5),
		flexDirection: 'row',
		justifyContent: 'center'  
	},
	messagesContainer: {
		marginTop: '4%',
		marginLeft: '3%',
		marginRight: '3%',
	},
	dm: {
		borderBottomColor: '#C8C8C8',
		borderBottomWidth: 1,
		marginLeft: '4%',
		marginRight: '4%',
	},
	username: {
		fontWeight: 'bold',
		fontSize: 14,
		marginLeft: '27%',
		color: 'black',
		marginTop: '8%',
	},
	lastMessage: {
		fontSize: 11,
		marginLeft: '27%',
		color: '#575757',
		marginBottom: '8%'
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
	notificationCountContainer: {
		backgroundColor: 'red',
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
		left: '30%'
	},
	locationModal: {
		backgroundColor: '#393939',
		flex: 1,
		marginTop: screenHeight * 0.62,
		marginBottom: screenHeight * 0.09, 
		marginRight: screenWidth * 0.03,
		marginLeft: screenWidth * 0.03,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		alignItems:'center'
	},
	locationModalClose: {
		marginLeft: '90%',
		color: 'white',
	},
	checkInButton: {
		height: '25%',
		width: '33%', 
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
		position: 'absolute',
		bottom: '20%',
		left: '60%'
	},
	checkInText: {
		color: 'white',
	},
	locationNameModal: {
		color: 'white',
		fontSize: 20,
		position: 'absolute',
		top: '20%',
		right: '20%',
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
	postPostButton: {
		marginRight: '5%'
	},
	inputRemainingContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	inputRemaining: {
		marginBottom: '3%',
		marginRight: '5%'
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
		alignItems: 'center'
	},
	profileBackButton: {
		position: 'absolute',
		left: '85%'
	},
	profilePageProfile: {
		height: screenHeight * 0.55,
		width: screenWidth * 0.9,
		borderRadius: 30,
		backgroundColor: 'grey',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	profilePicEdit: {
		marginLeft: '80%',
		marginBottom: '5%'
	},

	profilePageName: {
		marginLeft: '5%',
		fontSize: 30,
		color: 'black',
		fontWeight: 'bold'
	},
	profilePageSettings: {
		marginLeft: '80%',
		marginTop: '10%'
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
		height: screenHeight,
		width: screenWidth,
		backgroundColor: '#6398FF',
		alignItems: 'center'
	},
	takeAPhotoBackButton: {
		transform: [{rotateY: '180deg'}],
		marginTop: screenHeight * 0.67,
		marginRight: screenWidth * 0.8
		 
	},
	takeAPhotoText: {
		fontWeight: '900',
		fontSize: 30,
		color: 'white',
		fontStyle: 'italic',
		marginTop: screenHeight * 0.05 
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
		marginRight: 4,
		
	},
	yseTextWhite: {
		fontSize: 30,
		fontStyle: 'italic',
		fontWeight: '900',
		color: 'white',
		
	}
	

	




})

export default styles;