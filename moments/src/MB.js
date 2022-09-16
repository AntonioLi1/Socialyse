import React, { useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';

function MicroBlog({navigation}) {
	return (
		<View>
			<View style={styles.MBHeader}>


				<Pressable style={styles.MBBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={28} color='black'/>
				</Pressable>

				<View style={styles.locationNameContainerMB}>
					<Text style={{color: 'black', fontSize: 20}}>
						UNSW Roundhouse
					</Text>
				</View>

				<Pressable style={styles.notificationButtonMB} onPress={() => navigation.navigate('notifications')}>
					<IIcon name='notifications-outline' size={32} color='black'/>
				</Pressable>
			</View>
		</View>

		




)  
}

export default MicroBlog;
/*



*/