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
]

function DmDisplay({navigation}) {
	return (
		<View style={{height: '100%', width: '100%'}}>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={40} color='black'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={32} color='black'/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={{color: 'black', marginTop: 15, marginLeft: 10}}>
					NEW CONNECTIONS
				</Text> 

				<ScrollView horizontal>
					{dms.map((dm)=>
						<Pressable key={dm.id}>
							<View style={styles.newConnectionProfile}>
								<Text style={{marginTop: '90%'}}>
									{dm.username}
								</Text>
							</View>
						</Pressable> 
						)		
					}
				</ScrollView>
			</View>

			<View style={styles.messagesContainer}>
				<Text style={{color: 'black', marginLeft: '3%', paddingBottom: '2%'}}>
					MESSAGES
				</Text>
			</View>

			<View style={{flex: 1}}>
				<ScrollView>
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
			
		</View>
	)
}

export default DmDisplay;
