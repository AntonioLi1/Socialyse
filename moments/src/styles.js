import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%'
	},
	messageIconContainer: {
		position: 'absolute',
		bottom: '8%',
		left: '6%',
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
		position: 'absolute',
		top: '8%',
		left: '6%'
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
	notificationContainer: {
		position: 'absolute',
		top: '8%',
		right: '6%'
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
	mapPinContaner: {
		position: 'absolute',
		bottom: '8%',
		right: '6%'
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
	}


})

export default styles;