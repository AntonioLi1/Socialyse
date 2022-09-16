import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%',
	},
	messageIconContainer: {
		position: 'absolute',
		bottom: '5%',
		left: '8%',
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
	profileIconContainer: {
		marginTop: '5%',
		marginLeft: '5%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}, 
	profileButton: {
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
	notificationContainerMap: {
		position: 'absolute',
	},
	notificationButton: {
		marginTop: 15,
		marginLeft: 320,
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
		marginRight: '7%'
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
		position: 'absolute',
		width: 50,
		height: 50,
		marginLeft: 320,
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
	
})

export default styles;