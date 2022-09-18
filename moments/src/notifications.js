import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
//import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
//import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//import ADIcon from 'react-native-vector-icons/AntDesign'
import styles from './styles';

const notifs = [
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'brandon'
	},
	{
		notifMessage: 'commented “Haha was thinking the same thing” ',
		notifType: 0,
		sentAgo: '2m',
		notifFrom: 'jacko'
	},
	{
		notifMessage: 'liked your post',
		notifType: 0,
		sentAgo: '3m',
		notifFrom: 'miranda'
	},
	{
		notifMessage: 'commented “I wonder when the main act will come on”',
		notifType: 0,
		sentAgo: '4w',
		notifFrom: 'jimmeh'
	},
	{
		notifMessage: 'friended you back',
		notifType: 1,
		sentAgo: '2d',
		notifFrom: 'catherine'
	},
]

function NotificationDisplay({navigation}) {
	return (
		<View>   
			<View style={styles.notifHeader}>
				<Pressable style={styles.notifBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={28} color='black'/>
				</Pressable>
				<Text style={{color: 'black', fontSize: 20}}>
					Notifications
				</Text>
			</View>

			<ScrollView>
				{notifs.map((notif) =>
					{if (notif.notifType === 1) {
						return (
							<View style={styles.notif1}>
								<Text style={styles.notifMessage}> 
									<Text style={{fontWeight: 'bold'}}>{notif.notifFrom} </Text>
									{notif.notifMessage}
								</Text>
							<View style={styles.notifProfile}></View>
								<Text style={styles.notifTime}>
								{notif.sentAgo}
								</Text> 
							</View>)
						
					} else {
						return (
							<View style={styles.notif0}>
								<Text style={styles.notifMessage}> 
									<Text style={{fontWeight: 'bold'}}>{notif.notifFrom} </Text>
									{notif.notifMessage}
								</Text>
								<Text style={styles.notifTime}>
									{notif.sentAgo}
								</Text>
							</View>
						)
					}
				})}
			</ScrollView>

			

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