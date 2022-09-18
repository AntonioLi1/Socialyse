import { cloneElement } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%',
		zIndex: -1
	},
	messageIconContainer: {
		position: 'absolute',
		marginTop: 685,
		marginLeft: 16,
	},
	messageButton: {
		width: 50,
		height: 50,
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
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	}, 
	profileButtonDM: {
		width: 50,
		height: 50,
		right: 10,
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
		height: 150,
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
		borderTopColor: '#D8D8D8',
		borderTopWidth: 1,
		borderBottomColor: '#D8D8D8',
		borderBottomWidth: 1,
	},
	newConnectionProfile: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'pink',
		height: 90,
		width: 80,
		flexDirection: 'row',
		justifyContent: 'center'  
	},
	messagesContainer: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
	},
	dm: {
		borderBottomColor: '#C8C8C8',
		borderBottomWidth: 1,
		marginLeft: 15,
		marginRight: 15,
	},
	username: {
		fontWeight: 'bold',
		fontSize: 14,
		marginLeft: 100,
		color: 'black',
		marginTop: 30,
	},
	lastMessage: {
		fontSize: 11,
		marginLeft: 100,
		color: '#575757',
		marginBottom: 30
	},
	notificationContainer: {
		position: 'absolute',
		marginTop: 15,
		marginLeft: 320,
		alignItems: 'flex-end'
	},
	notificationButton: {
		width: 50,
		height: 50,
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
		width: 16,
		height: 16, 
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
		width: 50,
		height: 50,
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
		left: 15
	},
	locationModal: {
		backgroundColor: 'white',
		flex: 1,
		marginTop: 520,
		marginBottom: 100,
		marginLeft: 20,
		marginRight: 20,
		height: 300,
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
	locationModalClose: {
		marginLeft: 315,
		marginTop: 5,
		color: 'black',
	},
	checkInButton: {
		height: 30,
		width: 118, 
		marginTop: 40,
		marginLeft: 200,
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
		color: 'black',
		fontSize: 20,
		marginLeft: 130,
		marginTop: -80,
		fontWeight: '500',
	}, 
	notificationButtonMB: {
		width: 50,
		height: 50,
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
	MBBackButton: {
		transform: [{rotateY: '180deg'}],
		position: 'absolute',
		marginLeft: 12,
	},
	MBHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
	},
	locationNameContainerMB: {
		backgroundColor: '#E5E5E5',
		marginLeft: 8,
		height: 40,
		width: 375,
		zIndex: -1,
		justifyContent: 'center',
		alignItems: 'center', 
		borderRadius: 10,
	},
	messageButtonMB: {
		width: 50,
		height: 50,
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
		marginLeft: 20,
		marginTop: 10,
	},
	postButton: {
		width: 50,
		height: 50,
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
		marginRight: 20,
		marginTop: 10,
	},
	MBFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
	},
	MBFeed: {
		marginTop: 15,
		height: '81%',
	},
	post: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
	},
	postUsername: {
		marginLeft: 45,
		marginTop: 5,
		fontWeight: '700',
		color: 'black',
		fontSize: 16,
	},
	postContent: {
		marginLeft: 45,
		fontSize: 14,
		color: 'black',
	},
	postLikeCommentContainer: {
		flexDirection: 'row',
		marginBottom: 5,
		alignItems: 'center'
	},
	postLikeAndCount: {
		marginLeft: 45,
		flexDirection: 'row',
		alignItems: 'center',
	},
	likeCount: {
		marginLeft: 1 ,
	},
	postCommentAndCount: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		left: 150
	},
	commentIcon: {
		position: 'absolute',
		bottom: -7,
	},
	commentCount: {
		marginLeft: 27,
	},
	notifHeader: {
		backgroundColor: '#E5E5E5',
		marginLeft: 8,
		marginRight: 8, 
		marginTop: 15,
		borderRadius: 10,
		marginBottom: 15,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	notifBackButton: {
		transform: [{rotateY: '180deg'}],
		right: 110 
	},
	notif0: {
		borderTopColor: '#C8C8C8',
		borderTopWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	notifMessage: {
		marginLeft: 40, 
		marginTop: 10,
		marginBottom: 10,
		fontSize: 16,
		flexShrink: 1,
		width: 200,
		color: 'black'
		
	},
	notifTime: {
		marginRight: 20, 
		marginTop: 10, 
		marginBottom: 10, 
		fontSize: 16
	},
	notifProfile: {
		height: 60,
		width: 60,
		borderRadius: 100,
		backgroundColor: 'grey',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
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
	profilePageProfile: {
		height: 60,
		width: 60,
		borderRadius: 100,
		backgroundColor: 'grey',
		marginTop: 10,
	},
	UNBEPContainer: {
		marginTop: 10,
	},
	thoughtsContainer: {
		backgroundColor: 'grey',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 10,
		height: 580
	},
	postInputContainer: {
		marginTop: 20,
		borderTopColor: 'black',
		borderTopWidth: 1,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		height: '45%'
	},
	postInnerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	postPostButton: {
		marginRight: 20
	},
	inputRemainingContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	inputRemaining: {
		marginBottom: 10,
		marginRight: 20
	},


})

export default styles;