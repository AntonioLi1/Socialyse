import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


function DmDisplay({navigation}) {
	return (
		<View>
			<View style={styles.profileIconContainer}>
				<Pressable style={styles.profileButton} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</Pressable>	

				<MCIcon name='message-text-outline' size={40} color='red'/>
				
				<Pressable style={styles.dmBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={32} color='black'/>
				</Pressable>
			</View>
			
		</View>
	)
}

export default DmDisplay;
