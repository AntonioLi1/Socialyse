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
                <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
                    Settings
                </Text>
                <Pressable style={styles.settingsBackButton} onPress={() => navigation.navigate('profile')}>
                        <MIIcon name='arrow-forward-ios' size={32} color='white'/>
                </Pressable>
            </View>
            <View style={styles.settingsProfile}>
                <Text>
                    Send Feedback!
                </Text>
            </View>
            <View style={styles.settingsProfile}>
                <Text>
                    Contact Us!
                </Text>
            </View>
            <View style={styles.settingsProfile}>
                <Text>
                    
                </Text>
            </View>
            <View style={styles.settingsProfile}>
                <Text>
                    
                </Text>
            </View>
            <View style={styles.settingsLogout}>
                <Text style={{color: 'red', fontSize: 14 }}>
                    Log Out
                </Text>
            </View>
            
        </View>
    )
}

export default Settings;