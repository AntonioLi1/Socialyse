import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView } from 'react-native'
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


const App2 = () => {
	const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);

	const [notifData, setnotifData] = useState(null)
	
	const fetchData = async () => {

		let {error, data} = await supabase
		.from('testChannel')
		.select()
	
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
		setnotifData(result)
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

				<Text>
					
				</Text>

				
			</View>	
		</SafeAreaView>
  )
}

export default App2

