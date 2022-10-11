import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const dms = [
	{
		username: 'fwqei',
		lastMessage: 'weih',
		id: '1'
	},
	{
		username: 'wef',
		lastMessage: 'refbh',
		id: '2'
	},
	{
		username: 'qwd',
		lastMessage: 'fytnj',
		id: '3'
	},
	{
		username: 'e5rh',
		lastMessage: 'ersbg',
		id: '4'
	},
	{
		username: 'tyuk',
		lastMessage: 'we',
		id: '5'
	},
	{
		username: 'wfq',
		lastMessage: 'wqwe',
		id: '6'
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		id: '7'
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		id: '8'
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		id: '9'
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		id: '10'
	},
	
]

function DmDisplay({navigation}) {
	return (
		<View style={styles.DMScreen}>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={40} color='white'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={32} color='white'/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={styles.newFriendsText}>
					NEW FRIENDS
				</Text> 

				<ScrollView horizontal>
					{dms.map((dm)=>
						<Pressable key={dm.id}>
							<View style={styles.newConnectionProfile}>
								<View style={styles.newConnectionProfilePic}/>
																
								<Text style={styles.newConnectionUsername}>
									{dm.username}
								</Text>
							</View>
						</Pressable> 
						)		
					}
				</ScrollView>
			</View>

			<Text style={styles.messagesText}>
				MESSAGES
			</Text>
		
			<View style={styles.allDmsContainer}>
				<ScrollView>
					{dms.map((dm) => 
						<Pressable onPress={() => {navigation.navigate('Dm')}}>
							<View style={styles.dm}>
								<View style={styles.messagesProfilePic}>
									
								</View>
								<View style={styles.usernameAndLastMessageContainer}>
									<Text style={styles.username}>
										{dm.username}
									</Text>
									<Text style={styles.lastMessage}>
										{dm.lastMessage}
									</Text>
								</View>
								
							</View>
						</Pressable>
						)
					}
				</ScrollView>	
			</View>
			
		</View>
	)
}

export default DmDisplay;
/*

*/