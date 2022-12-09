import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect}from 'react';
import {GettingStartedContext} from './App'

// STYLES
import styles from './src/styles';

// SUPABASE
import supabase from "./supabase";

// ICONS
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'

const notifs = [
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'brandon',
		key: 1
	},
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'catherine',
		key: 2
	},
]


const App2 = () => {
	const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);

	const [notifData, setnotifData] = useState(null)
	
	const fetchData = async (table = 'testChannel') => {

		let {error, data} = await supabase
		.from(table)
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

	}, [])


	const init = async () =>
	{
		const result = await fetchData()

		console.log (result)
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

				<ScrollView>
					{notifs.map((notif) =>
						{
						return (
							// <View style={styles.notif1}>
							// 	<Text style={styles.notifMessage}> 
							// 		<Text style={{fontWeight: 'bold'}}>{/*notif.notifFrom*/} </Text>
							// 		{notif.msg}
							// 	</Text>
							// 	<View style={styles.notifProfile}/>
							// 	<Text style={styles.msg}>
							// 	{notif.sentAgo}
							// 	</Text> 
							// </View>
							<View style={styles.notif1}>
								<Text style={styles.notifMessage}>
									{notif.notifMessage}
								</Text>
							</View>
							)		

					})}
				</ScrollView>
			</View>	
		</SafeAreaView>
  )
}

export default App2

