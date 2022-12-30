import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';

function CreateChannelModel({multipleModalDisplay, setMultipleModalDisplay, createChannelModel, setCreateChannelModel}) {

    return (
        <Modal visible={createChannelModel} transparent={true}>
			<View style={styles.locationModal}>
				<View style={styles.locationImagePlaceholderSingle}/>
			
				<View style={styles.locationNameActiveAndJoinButtonContainer}>
					<Text style={styles.locationNameModal}>
						lol
					</Text> 
					<View style={styles.locationModalActiveDotContainer}>
						<Text style={styles.locationModalActive}>
							baited people active
							
						</Text>
						<IIcon style={styles.locationModalDot} name='person' size={scale(14)} color='black'/>
					</View>
					

					<Pressable style={[{ backgroundColor: 'white' }, styles.checkInButton ]} 
					>
						<Text style={styles.checkedInText}>Leave</Text>				
					</Pressable>
				</View>
				
				<IIcon style={styles.locationModalClose} name='close-outline' size={scale(30)}
				onPress={() => {setCreateChannelModel(false); setMultipleModalDisplay(true);}}/> 
			</View>	
		</Modal>
    )
}

export default CreateChannelModel;