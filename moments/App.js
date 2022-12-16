import 'react-native-gesture-handler';
import React, {createContext, useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Button } from 'react-native';
import {LoggedOutNavigator, LoggedInNavigator} from './src/navigator';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Login from './src/login';
import ForgotPassword from './src/forgotPassword';
import supabase from "./supabase";


export const GettingStartedContext = createContext({
	messageDisplay: true,
	setMessageDisplay: (value) => {},
	notifDisplay: true,
	setNotifDisplay: (value) => {},
	editProfileModal: false,
	setEditProfileModal: (value) => {},
	dpURL: '',
	setDpURL: (value) => {},
	user: null,
	setUser: (value) => {}
});

function App () {
  
 
  	const [messageDisplay, setMessageDisplay] = useState(true);
	const [notifDisplay, setNotifDisplay] = useState(true);
  	const [editProfileModal, setEditProfileModal] = useState(false);
	const [dpURL, setDpURL] = useState('');
	const [user, setUser] = useState();

	/////////////////////////////////////////////
	// FIREBASE
	const [initializing, setInitializing] = useState(true);
	

	//Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	
	//if user is not signed in
	//console.log(user)
	if (!user) {
		//console.log(user)
		return (
			<LoggedOutNavigator></LoggedOutNavigator>
		);
	}

	//check current user info
	const currUser = auth().currentUser;
	currUser.providerData.forEach((userInfo) => {
		//console.log('User info for provider: ', userInfo);
	});

	return (
		<GettingStartedContext.Provider value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, editProfileModal, setEditProfileModal, dpURL, setDpURL, user, setUser}}>
			<LoggedInNavigator></LoggedInNavigator>
		</GettingStartedContext.Provider>
		
	);

	
};

export default App;


///////////////////////////////////////////////////////////////

	// const [initializing, setInitializing] = useState(true);
	// const [user, setUser] = useState();

	// useEffect(() => {
	// 	//console.log('here')
	// 	supabase.auth.onAuthStateChange( async (event, session) => {
	// 		if (event == 'SIGNED_IN') {
	// 			//console.log('sign in')
	// 			setUser(true)
	// 			if (initializing) setInitializing(false);
	// 		} else {
	// 			//console.log('sign out')
	// 			setUser(null)
	// 			if (initializing) setInitializing(false);
	// 		}
	// 	})
	// })


	// //if (initializing) return null;

	// //console.log(user)

	// if (!user) {
	// 	return (
	// 		<LoggedOutNavigator></LoggedOutNavigator>
	// 	);
	// }

	// return (
	// 	<GettingStartedContext.Provider value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, editProfileModal, setEditProfileModal, dpURL, setDpURL}}>
	// 		<LoggedInNavigator></LoggedInNavigator>
	// 	</GettingStartedContext.Provider>
		
	// );