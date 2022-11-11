import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, ScrollView, SafeAreaView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const dms = [
	{
		username: 'fwqei',
		lastMessage: 'weih',
		key: 1
	},
	{
		username: 'wef',
		lastMessage: 'refbh',
		key: 2
	},
	{
		username: 'qwd',
		lastMessage: 'fytnj',
		key: 3
	},
	{
		username: 'e5rh',
		lastMessage: 'ersbg',
		key: 4
	},
	{
		username: 'tyuk',
		lastMessage: 'we',
		key: 5
	},
	{
		username: 'wfq',
		lastMessage: 'wqwe',
		key: 6
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		key: 7
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		key: 8
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		key: 9
	},
	{
		username: 'tyweuk',
		lastMessage: 'wewerg',
		key: 10
	},
	
]

function DmDisplay({navigation}) {
	return (
		<SafeAreaView style={styles.DMScreen}>
			<View style={styles.DMHeader}>
				<Pressable style={styles.profileButtonDM} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={scale(33)} color='black'/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={scale(37)} color='white'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
			</View>

			<View style={styles.newConnectionsContainer}>
				<Text style={styles.newFriendsText}>
					NEW FRIENDS
				</Text> 

				<ScrollView horizontal>
					{dms.map((dm)=>
						<Pressable key={dm.id} onPress={() => {navigation.navigate('Dm')}}>
							<View style={styles.newConnectionProfile}>
								<Pressable onPress={() => {navigation.navigate('OtherProfile')}}>
									<View style={styles.newConnectionProfilePic}/>
								</Pressable>
									
																
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
								<Pressable onPress={() => {navigation.navigate('OtherProfile')}}>
									<View style={styles.messagesProfilePic}/>
								</Pressable>
									
									
								
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
			
		</SafeAreaView>
	)
}

export default DmDisplay;
/*

*/