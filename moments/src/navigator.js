import React, { useEffect, useState, useContext } from 'react';
import DmDisplay from './dms';
import MapDisplay from './map';
import OwnProfile from './ownProfile';
import NotificationDisplay from './notifications';
import MakeAPost from './makeAPost';
import PostsFeed from './postsFeed';
import HappySocialysing from './happySocialysing';
import Dm from './dm';
import LoginAndSignup from './loginAndSignup';
import SignUp from './signUp';
import Login from './login';
import ViewOtherProfile from './otherProfile';
import TakePhotoForDP from './takePhotoForDP';
import ChooseFromCameraRoll from './chooseFromCameraRoll';
import Settings from './settings';
import ChangeNameAndUsername from './changeNameAndUsername';
import TsAndCs from './TsAndCs';
import InitialCreateDP from './initialCreateDP';
import InitialChooseFromCameraRoll from './initialChooseFromCameraRoll';
import InitialTakePhotoForDP from './initialTakeAPhoto';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App';

const displayPhotoKey = '@app:displayPhoto'


function LoggedInNavigator() {
	const [initialScreenName, setInitialScreenName] = useState('')
	const [loading, setLoading] = useState(false)
	const { user } = useContext(LoggedInContext);


	async function checkOnboard() {
		let DPAlreadyExists = false
		console.log('cehckonbard', user)
		await firestore()
		.collection('UsernameAndDP')
		.doc(user.uid)
		.get()
		.then(docSnapshot => {
			console.log('checkonbard 1')
			if (docSnapshot.exists) {
				DPAlreadyExists = true
			}
		})
		if (DPAlreadyExists === false) {
			const displayPhoto = await AsyncStorage.getItem(displayPhotoKey)
			if (displayPhoto === null) {
				console.log('checkonbard 2')
				setInitialScreenName('InitialCreateDP')
				setLoading(true)
			} else {
				console.log('checkonbard 3')
				setInitialScreenName('Map')
				setLoading(true)
			}
		} else {
			console.log('checkonbard 4')
			setInitialScreenName('Map')
			setLoading(true)
		}

	}

	useEffect(() => {
		checkOnboard()
	}, [])

	const Stack = createStackNavigator();

	if (loading == false) return null

	const RightToLeftCardStyleInterpolator = ({ current, next, layouts }) => {
		const translateX = current.progress.interpolate({
		  inputRange: [0, 1],
		  outputRange: [-layouts.screen.width, 0],
		});
		return {
		  cardStyle: {
			transform: [{ translateX }],
		  },
		};
	  };

	  const TopToBottomCardStyleInterpolator = ({ current, next, layouts }) => {
		const translateY = current.progress.interpolate({
		  inputRange: [0, 1],
		  outputRange: [-layouts.screen.height, 0],
		});
		return {
		  cardStyle: {
			transform: [{ translateY }],
		  },
		};
	  };
	  
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreenName}>

				<Stack.Screen options={{ headerShown: false
				  }} name="Map" component={MapDisplay}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="InitialCreateDP" component={InitialCreateDP}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="InitialChooseFromCameraRoll" component={InitialChooseFromCameraRoll}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="InitialTakePhotoForDP" component={InitialTakePhotoForDP}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false, 
				 cardStyleInterpolator: RightToLeftCardStyleInterpolator,
				}} name="Dms" component={DmDisplay}/>
				<Stack.Screen options={{ headerShown: false,
				cardStyleInterpolator: TopToBottomCardStyleInterpolator
				}} name="OtherProfile" component={ViewOtherProfile}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false,
					cardStyleInterpolator: RightToLeftCardStyleInterpolator,
				}} name="Dm" component={Dm}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false,
				cardStyleInterpolator: TopToBottomCardStyleInterpolator
				}} name="profile" component={OwnProfile}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="TsAndCs" component={TsAndCs}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="ChangeNameAndUsername" component={ChangeNameAndUsername}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false,
					cardStyleInterpolator:TopToBottomCardStyleInterpolator,
				}} name="notifications" component={NotificationDisplay}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="MakeAPost" component={MakeAPost}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="SocialyseLoading" component={HappySocialysing}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="PostsFeed" component={PostsFeed}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="TakePhotoForDP" component={TakePhotoForDP}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="ChooseFromCameraRoll" component={ChooseFromCameraRoll}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function LoggedOutNavigator() {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="loginAndSignup" component={LoginAndSignup}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp}></Stack.Screen>
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export { LoggedOutNavigator, LoggedInNavigator }

