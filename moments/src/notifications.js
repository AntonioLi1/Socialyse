import React, {useContext}from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
//import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
//import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//import ADIcon from 'react-native-vector-icons/AntDesign'
import styles from './styles';
import {GettingStartedContext} from '../App'

const notifs = [
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'brandon'
	},
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'catherine'
	},
]

function NotificationDisplay({navigation}) {
	const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);

	return (
		<View style={styles.notifFullScreen}>   
			<View style={styles.notifHeader}>
				<View style={styles.notifInnerHeaderContainer}>
					<Pressable style={styles.notifBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
						<MIIcon name='arrow-forward-ios' size={28} color='#6398FF'/>
					</Pressable>
					<Text style={{color: '#6398FF', fontSize: 20}}>
						Notifications
					</Text>
				</View>
				
			</View>

			<View style={styles.notificationsList}>
				<ScrollView>
					{notifs.map((notif) =>
						{
						return (
							<View style={styles.notif1}>
								<Text style={styles.notifMessage}> 
									<Text style={{fontWeight: 'bold'}}>{notif.notifFrom} </Text>
									{notif.notifMessage}
								</Text>
							<View style={styles.notifProfile}/>
							<Text style={styles.notifTime}>
							{notif.sentAgo}
							</Text> 
							</View>)							
					})}
				</ScrollView>
			</View>	
		</View>
	)
}

export default NotificationDisplay;

/*
<Pressable>
					<View style={styles.notif0}>
						<Text style={styles.notifMessage}> 
							hello 
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text>
					</View>
					<View style={styles.notif0}>
						<Text style={styles.notifMessage}> 
							hello there i wnwefuiwefnwefiweofiwohefiweofoiwhfiohawdawdwaddawwd
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text> 
					</View>
					
					<View style={styles.notif1}>
						<Text style={styles.notifMessage}> 
							matched
						</Text>
						<View style={styles.notifProfile}>
							
						</View>
						<Text style={styles.notifTime}>
							2 min
						</Text> 
					</View>
					<View style={styles.notif0}>
						<Text style={styles.notifMessage}> 
							hello 
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text>
					</View>
					<View style={styles.notif0}>
						<Text style={styles.notifMessage}> 
							hello there i wnwefuiwefnwefiweofiwohefiweofoiwhfiohawdawdwaddawwd
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text> 
					</View>
					
					<View style={styles.notif1}>
						<Text style={styles.notifMessage}> 
							matchedqwdqwdwqqdqwdwdwqdwwwqdqqqwdwdqdqwdwqdqwdwqdwqdwqdwqdwqdwqdqwdwqdw
						</Text>
						<View style={styles.notifProfile}>
							
						</View>
						<Text style={styles.notifTime}>
							2 min
						</Text> 
					</View>
						
				</Pressable>
*/