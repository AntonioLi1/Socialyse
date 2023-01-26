import 'react-native-gesture-handler';
import React, {createContext, useState, useEffect, useContext} from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Button } from 'react-native';
import {LoggedOutNavigator, LoggedInNavigator} from './src/navigator';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Login from './src/login';
import firestore from '@react-native-firebase/firestore';




export const LoggedInContext = createContext({
	messageDisplay: true,
	setMessageDisplay: (value) => {},
	notifDisplay: true,
	setNotifDisplay: (value) => {},
	editProfileModal: false,
	setEditProfileModal: (value) => {},
	dpURL: '',
	setDpURL: (value) => {},
	user: null,
	setUser: (value) => {},
	selectedPinId: '',
	setSelectedPinId: (value) => {},
	selectedPost: null,
	setSelectedPost: (value) => {},
	channelPosts: null,
	setChannelPosts: (value) => {},
	justUnliked: null,
	setJustUnliked: (value) => {},
	selectedChannelId: null,
	setSelectedChannelId: (value) => {}
	
});

export const LoggedOutContext = createContext({
	signUpName: '',
	setSignUpName: (value) => {},
	signUpUsername: '',
	setSignUpUsername: (value) => {},
	signUpPhoneNumber: '',
	setSignUpPhoneNumber: (value) => {},
	signUpDoB: null,
	setSignUpDoB: (value) => {}
});

function App () {
 
  	const [messageDisplay, setMessageDisplay] = useState(true);
	const [notifDisplay, setNotifDisplay] = useState(true);
  	const [editProfileModal, setEditProfileModal] = useState(false);
	const [dpURL, setDpURL] = useState();
	const [user, setUser] = useState();
	const [selectedPinId, setSelectedPinId] = useState('')
	const [selectedPost, setSelectedPost] = useState()
	const [channelPosts, setChannelPosts] = useState()
	const [justUnliked, setJustUnliked] = useState(false)
	const [dataAdded, setDataAdded] = useState(false)
	const [selectedChannelId, setSelectedChannelId] = useState()
	const { signUpName, signUpUsername, signUpPhoneNumber, signUpDoB, setSignUpDoB} = useContext(LoggedOutContext)

	

	/////////////////////////////////////////////
	// FIREBASE
	const [initializing, setInitializing] = useState(true);
	
	//console.log('app name2', signUpName)
	//console.log('app username2', signUpUsername)

	async function AddUserToDB (uid, signUpName, signUpUsername, signUpPhoneNumber, signUpDoB) {
		// console.log('app name', signUpName)
		// console.log('app username', signUpUsername)
		// console.log('app phonenumber',phoneNumber)
		await firestore()
		.collection('Users')
		.doc(uid)
		.set({
			Username: signUpUsername, 
            Name: signUpName, 
            ProfilePic: '',
            CurrentChannel: 0,
			ChannelJoined: null,
			LastPosted: null,
			DoB: signUpDoB,
			PhoneNumber: signUpPhoneNumber,
			UserID: uid
		})
		.then(() => {
			console.log('User added!');
		});
		// adding users to friends 
		await firestore()
		.collection('Friends')
		.doc(uid)
		.set({
			FriendCount: 0,
			UserID: uid
		})
		.then(() => {
			console.log('uidofotherperson Added for friends!');
		});
		// adding user to messages
		await firestore()
		.collection('Messages')
		.doc(uid)
		.set({
			UnopenedMessages: 0,
			UserID: uid
		})
		.then(() => {
			console.log('uidofotherperson Added for messages!');
		});
		// adding user to peopleliked
		await firestore()
		.collection('PeopleLiked')
		.doc(uid)
		.set({
			UserID: uid,
		})
		.then(() => {
			console.log('uidofotherperson Added for peopleLiked!');
		});
		//adding user to phoneNumbers
		await firestore()
		.collection('PhoneNumbers')
		.doc(signUpPhoneNumber)
		.set({
			PhoneNumber: signUpPhoneNumber
		})
		.then(() => {
			console.log('uidofotherperson Added for phoneNumber!');
		});
		// adding user to UsernameAndDP
		await firestore()
		.collection('UsernameAndDP')
		.doc(uid)
		.set({
			Username: signUpUsername,
			ProfilePic: '',
			UserID: uid
		})
		// adding user to userlikedposts
		await firestore()
		.collection('UserLikedPosts')
		.doc(uid)
		.set({
			PostsLikedCount: 0,
			UserID: uid
		})
		await firestore()
		.collection('UIDs')
		.doc(uid)
		.set({
			UserID: uid
		})
		await firestore()
		.collection('ChannelCreations')
		.doc(uid)
		.set({
			UserID: uid
		})
		setDataAdded(true) 
    }

	async function EnterApp(uid, signUpName, signUpUsername, signUpPhoneNumber, signUpDoB) {
		console.log('enterapp name',signUpName)
   		console.log('enterapp username',signUpUsername)
		console.log('uid', uid)
		await firestore()
		.collection('UIDs')
		.doc(uid)
		.get()
		.then(async (docSnapshot) => {
			if (!docSnapshot.exists) {
				//console.log(querySnapshot.exists)
				// sign up 
				console.log('signing up')
				AddUserToDB (uid, signUpName, signUpUsername, signUpPhoneNumber, signUpDoB)
			} else {
				setDpURL(docSnapshot.data().ProfilePic)
				await firestore()
				.collection('UsernameAndDP')
				.doc(uid)
				.get()
				.then(docSnapshot => {
					setDpURL(docSnapshot.data().ProfilePic)
					console.log('profilepic set')
				})
				console.log('login')

			}
		}) 
	}
	
	//Handle user state changes
	async function onAuthStateChanged(user) {
		setUser(user);
		setDpURL()
		//console.log("user deets",user)
		// console.log('app name3', signUpName)
		// console.log('app username3', signUpUsername)
		console.log('auth name', signUpName)
		console.log('auth uname', signUpUsername)
		console.log('auth Phone',signUpPhoneNumber)
		if (user) await EnterApp(user.uid, signUpName, signUpUsername, signUpPhoneNumber, signUpDoB);
		
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, [signUpName, signUpUsername, signUpPhoneNumber, signUpDoB]);

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
	// const currUser = auth().currentUser;
	// currUser.providerData.forEach((userInfo) => {
	// 	console.log('User info for provider: ', userInfo);
	// });
	if (dataAdded === true) {
		return (
			<LoggedInContext.Provider 
			value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, 
				editProfileModal, setEditProfileModal, dpURL, setDpURL, 
				user, setUser, selectedPinId, setSelectedPinId, 
				selectedPost, setSelectedPost, channelPosts, setChannelPosts,
				justUnliked, setJustUnliked}}>
				<LoggedInNavigator></LoggedInNavigator>
			</LoggedInContext.Provider>
			
		);
	}

	return (
		<LoggedInContext.Provider 
		value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, 
			editProfileModal, setEditProfileModal, dpURL, setDpURL, 
			user, setUser, selectedPinId, setSelectedPinId, 
			selectedPost, setSelectedPost, channelPosts, setChannelPosts,
			justUnliked, setJustUnliked,
			selectedChannelId, setSelectedChannelId}}>
			<LoggedInNavigator></LoggedInNavigator>
		</LoggedInContext.Provider>
		
	);
	

	
};



const Root = ()=>{
	const [signUpName, setSignUpName] = useState('')
	const [signUpUsername, setSignUpUsername] = useState('')
	const [signUpPhoneNumber, setSignUpPhoneNumber] = useState('')
	const [signUpDoB, setSignUpDoB] = useState(null)
	return(
		<LoggedOutContext.Provider value={{signUpName, setSignUpName, signUpUsername, setSignUpUsername, signUpPhoneNumber, setSignUpPhoneNumber, signUpDoB, setSignUpDoB}}>
			<App/>
		</LoggedOutContext.Provider>
	)
}
export default Root;

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