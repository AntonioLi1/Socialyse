import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import styles from './styles';



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
				<Pressable>
					<View style={styles.notif}>
						<Text style={styles.notifMessage}> 
							hello 
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text>
					</View>
					<View style={styles.notif}>
						<Text style={styles.notifMessage}> 
							hello 
						</Text>
						<Text style={styles.notifTime}>
							2 min
						</Text>
					</View>
				</Pressable>
			</ScrollView>

			

		</View>
	)
}

export default NotificationDisplay;