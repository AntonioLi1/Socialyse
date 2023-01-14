import React, { useEffect, useState, useCallback } from 'react';
import DmDisplay  from './dms';
import MapDisplay from './map';
import OwnProfile  from './ownProfile';
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
import ForgotPassword from './forgotPassword';
import Settings from './settings';
import ChangePassword from './changePassword';
import ChangeNameAndUsername from './changeNameAndUsername';
import VerifyPhoneNumber from './verifyPhoneNumber';
import SendFeedbackModal from './sendFeedbackModal';
import InitialCreateDP from './initialCreateDP';
import InitialChooseFromCameraRoll from './initialChooseFromCameraRoll';
import InitialTakePhotoForDP from './initialTakeAPhoto';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const displayPhotoKey = '@app:displayPhoto'


function LoggedInNavigator() {
	const [initialScreenName, setInitialScreenName] = useState('')
	const [loading, setLoading] = useState(false)

	async function checkOnboard() {
		const displayPhoto = await AsyncStorage.getItem(displayPhotoKey)
		//console.log('displayPhoto',displayPhoto)
		if (displayPhoto === null) {
			//console.log('in here')
			setInitialScreenName('InitialCreateDP')
			setLoading(true)
		} else {
			setInitialScreenName('Map')
			setLoading(true)
		}
	}

	useEffect(() => {
		checkOnboard()
	}, [])

	const Stack = createStackNavigator();
	
	if (loading == false) return null

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreenName}>
				
				<Stack.Screen options={{headerShown: false}} name="Map"component={MapDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="InitialCreateDP"component={InitialCreateDP}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="InitialChooseFromCameraRoll"component={InitialChooseFromCameraRoll}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="InitialTakePhotoForDP"component={InitialTakePhotoForDP}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dms" component={DmDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="OtherProfile" component={ViewOtherProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dm" component={Dm}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="profile" component={OwnProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Settings" component={Settings}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="SendFeedbackModal" component={SendFeedbackModal}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChangeNameAndUsername" component={ChangeNameAndUsername}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChangePassword" component={ChangePassword}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="notifications" component={NotificationDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="MakeAPost" component={MakeAPost}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="SocialyseLoading" component={HappySocialysing}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="PostsFeed" component={PostsFeed}></Stack.Screen>				
				<Stack.Screen options={{headerShown: false}} name="TakePhotoForDP" component={TakePhotoForDP}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChooseFromCameraRoll" component={ChooseFromCameraRoll}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function LoggedOutNavigator() {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="loginAndSignup" component={LoginAndSignup}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Login" component={Login}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="VerifyPhoneNumber" component={VerifyPhoneNumber}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>	
	)	
}

export {LoggedOutNavigator, LoggedInNavigator}

