import 'react-native-gesture-handler';
import React, {Context, createContext, useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Button } from 'react-native';
import {LoggedOutNavigator, LoggedInNavigator} from './src/navigator';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Login from './src/login';
import ForgotPassword from './src/forgotPassword';


export const GettingStartedContext = createContext({
  messageDisplay: true,
  setMessageDisplay: (value) => {},
  notifDisplay: true,
  setNotifDisplay: (value) => {},
  editProfileModal: false,
  setEditProfileModal: (value) => {},

});

function App () {
  
 
  	const [messageDisplay, setMessageDisplay] = useState(true);
	const [notifDisplay, setNotifDisplay] = useState(true);
  	const [editProfileModal, setEditProfileModal] = useState(false);

	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	
	// if user is not signed in
	//console.log(user)
	if (!user) {
		//console.log(user)
		return (
			<LoggedOutNavigator></LoggedOutNavigator>
		);
	}

	// check current user info
	const currUser = auth().currentUser;
	currUser.providerData.forEach((userInfo) => {
		console.log('User info for provider: ', userInfo);
	});

	return (
		<GettingStartedContext.Provider value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, editProfileModal, setEditProfileModal}}>
			<LoggedInNavigator></LoggedInNavigator>
		</GettingStartedContext.Provider>
		
	);
};

export default App;
