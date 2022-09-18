import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const dms = [
	{
		username: 'fwqei',
		lastMessage: 'weih'
	},
	{
		username: 'wef',
		lastMessage: 'refbh'
	},
	{
		username: 'qwd',
		lastMessage: 'fytnj'
	},
	{
		username: 'e5rh',
		lastMessage: 'ersbg'
	},
	{
		username: 'tyuk',
		lastMessage: 'we'
	},
	{
		username: 'wfq',
		lastMessage: 'wqwe'
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg'
	},
]

function DmDisplay({navigation}) {
	return (
		<View>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</Pressable>	

				<MCIcon style={{top: 3}} name='message-text-outline' size={40} color='black'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={32} color='black'/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={{color: 'black', marginTop: 15, marginLeft: 10}}>
					NEW CONNECTIONS
				</Text> 

				<ScrollView horizontal>
					{dms.map((dm)=>
						<Pressable>
							<View style={styles.newConnectionProfile}>
								<Text style={{marginTop: 70}}>
									{dm.username}
								</Text>
							</View>
						</Pressable> 
						)		
					}
				</ScrollView>
			</View>

			<View style={styles.messagesContainer}>
				<Text style={{color: 'black', marginLeft: 10, paddingBottom: 10}}>
					MESSAGES
				</Text>
			</View>

			
			<ScrollView style={{height: '63%'}}>
				{dms.map((dm) => 
					<Pressable>
						<View style={styles.dm}>
							<Text style={styles.username}>
								{dm.username}
							</Text>
							<Text style={styles.lastMessage}>
								{dm.lastMessage}
							</Text>
						</View>
					</Pressable>
					)
				}
			</ScrollView>	
		</View>
	)
}

export default DmDisplay;
