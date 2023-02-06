import React, { useEffect, useState, useContext } from 'react';
import DmDisplay from './dms';
import MapDisplay from './map';
import OwnProfile from './ownProfile';
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
		//console.log('prioer')
		await firestore()
		.collection('UsernameAndDP')
		.doc(user.uid)
		.get()
		.then(docSnapshot => {
			//console.log('9')
			if (docSnapshot.exists) {
				//console.log('90')
				if (docSnapshot.data().ProfilePic !== '') {
					//console.log('900')
					DPAlreadyExists = true
				}
			}
			
		})
		//console.log('after')
		//console.log('after')
		//console.log('checkonboard')
		if (DPAlreadyExists === false) {
			const displayPhoto = await AsyncStorage.getItem(displayPhotoKey)
			if (displayPhoto === null) {
				setInitialScreenName('InitialCreateDP')
				setLoading(true)
			} else {
				setInitialScreenName('Map')
				setLoading(true)
			}
		} else {
			//console.log('dp exist', DPAlreadyExists)

			setInitialScreenName('Map')
			setLoading(true)
		}

	}

	useEffect(() => {
		//console.log('useeffect for checkonboard')
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
				{/* <Stack.Screen options={{ headerShown: false,
					cardStyleInterpolator:TopToBottomCardStyleInterpolator,
				}} name="notifications" component={NotificationDisplay}></Stack.Screen> */}
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

