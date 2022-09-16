import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function DmDisplay({navigation}) {
	return (
		<View>
			<View style={styles.profileIconContainer}>
				<TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('profile')} >
					<IIcon name='person' size={36} color='black'/>
				</TouchableOpacity>	
				<TouchableOpacity style={styles.dmBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={32} color='black'/>
				</TouchableOpacity>
			</View>
			
		</View>
	)
}

export default DmDisplay;
