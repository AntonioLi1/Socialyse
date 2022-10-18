import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GettingStartedContext } from '../App'

function Dm ({navigation}) {
    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay } = useContext(GettingStartedContext);

    return (
        <View style={styles.messagesScreen}>
            <View style={styles.messagesHeader}>
                <Text style={styles.messagesHeaderUsername}>
                    Recipient_UName
                </Text>  
                <Pressable style={styles.messagesBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				    <MIIcon name='arrow-forward-ios' size={32} color='white'/>
			    </Pressable>     



            </View>
            <View style={styles.messagesBody}>
                
            </View>
            <View style={styles.messagesFooter}>

            </View>
        </View>
            
    )
}
export default Dm;
