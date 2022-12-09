import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, TextInput } from 'react-native'
import React, {useContext, useState, useEffect}from 'react';
import {GettingStartedContext} from '../App'

// STYLES
import styles from './styles';

// SUPABASE
import supabase from "../supabase";

// ICONS
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';


const NotificationDisplay = () => {
	const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);

	const [notifData, setnotifData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [input, setInput] = useState('')
	
	const fetchData = async () => {

		setLoading(true);

		let {error, data} = await supabase
		.from('testChannel')
		.select()
		
		setLoading(false);

		if(error) 
		{
			console.log('gg', error.message)
			return false
		}
		
		if(data) {
			
			return data
		}
	}

	useEffect(() => {

		// INITIALIZE
		
		init ()
		
		console.log(notifData)
	}, [])


	const init = async () =>
	{
		
		const result = await fetchData()
		//setLoading(true);
		setnotifData(result)
		console.log("result", result)
	}

	//if (loading) return null;

	// pushing data
	const pushItem = async (parameter, param2) => {
		const { data, error } = await supabase
		.from('testChannel')
		.insert([
			{ name: parameter, lastname: param2},
		])
		if(error) 
		{
			console.log('gg', error.message)
			return false
		}
		
		if(data) {
			return data
		}
	}

	// deleting data
	const deleteItem = async() => {
		const { data, error } = await supabase
		.from('testChannel')
		.delete()
		.eq('id', 4)
	}

	// update data
	const updateData = async() => {
		const { data, error } = await supabase
		.from('testChannel')
		.update({ name: "testies" })
		.eq('id', '2')
	}

	return (
		<SafeAreaView style={styles.notifFullScreen}>   
			<View style={styles.notifHeader}>
				<View style={styles.notifInnerHeaderContainer}>
					<Pressable style={styles.notifBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
						<MIIcon name='arrow-forward-ios' size={26} color='black'/>
					</Pressable>
					<Text style={styles.notificationText}>
						Notifications
					</Text>
				</View>
				
			</View>

			<View style={styles.notificationsList}>

			<Pressable onPress={() => {updateData()}}>
				<Text style={styles.captionDone}>
					Done
				</Text>
			</Pressable>

				
			</View>	
		</SafeAreaView>
	)
}

export default NotificationDisplay

