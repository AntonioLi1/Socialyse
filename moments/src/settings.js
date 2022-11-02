import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable,  } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

function Settings ({navigation}) {
    return (
        <View style={styles.settingsScreen}>
            <View style={styles.settingsHeader}>
                <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>
                    Settings
                </Text>
                <Pressable style={styles.settingsBackButton} onPress={() => navigation.navigate('profile')}>
                        <MIIcon name='arrow-forward-ios' size={32} color='white'/>
                </Pressable>
            </View>
            <Pressable onPress={() => {navigation.navigate('ChangePassword')}}>
                <View style={styles.settingsProfile}>
                    <Text style={styles.settingsText}>
                    Change Password
                    </Text>
                </View>
            </Pressable>
            
            <View style={styles.settingsProfile}>
                <Text style={styles.settingsText}>
                    Delete Account
                </Text>
            </View>
            
            <View style={styles.settingsLogout}>
                <Text style={styles.logOutText}>
                    Log Out
                </Text>
			</View>	
            
            
        </View>
    )
}

export default Settings;