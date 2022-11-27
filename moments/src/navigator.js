import React from 'react';
import DmDisplay  from './dms';
import MapDisplay from './map';
import OwnProfile  from './ownProfile';
import NotificationDisplay from './notifications';
import MakeAPost from './makeAPost';
import PostsFeed from './postsFeed';
import HappySocialysing from './happySocialysing';
import Dm from './dm';
import SignUp from './signup';
import Login from './login';
import ViewOtherProfile from './otherProfile';
import TakePhotoForDP from './takePhotoForDP';
import ChooseFromCameraRoll from './chooseFromCameraRoll';
import ForgotPassword from './forgotPassword';
import Settings from './settings';
import ChangePassword from './changePassword';
import ChangeNameAndUsername from './changeNameAndUsername';
import VerifyPhoneNumber from './verifyPhoneNumber';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


function LoggedInNavigator() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="Map"component={MapDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dms" component={DmDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="OtherProfile" component={ViewOtherProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dm" component={Dm}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="profile" component={OwnProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Settings" component={Settings}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChangeNameAndUsername" component={ChangeNameAndUsername}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChangePassword" component={ChangePassword}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="notifications" component={NotificationDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="MakeAPost" component={MakeAPost}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="SocialyseLoading" component={HappySocialysing}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="PostsFeed" component={PostsFeed}></Stack.Screen>
				{/* <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}></Stack.Screen> */}
				<Stack.Screen options={{headerShown: false}} name="TakePhotoForDP" component={TakePhotoForDP}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ChooseFromCameraRoll" component={ChooseFromCameraRoll}></Stack.Screen>
				{/* <Stack.Screen options={{headerShown: false}} name="Login" component={Login}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}></Stack.Screen> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function LoggedOutNavigator() {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Login" component={Login}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="VerifyPhoneNumber" component={VerifyPhoneNumber}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>	
	)	
}

export {LoggedOutNavigator, LoggedInNavigator}

