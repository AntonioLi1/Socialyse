import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';




function Settings ({navigation}) {
    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.settingsHeader}>
                <Pressable style={styles.settingsBackButton} onPress={() => navigation.navigate('profile')}>
                    <MIIcon name='arrow-back-ios' size={32} color='white'/>
                </Pressable>
                <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>
                    Settings
                </Text>
                
            </View>
            <View style={styles.settingsBody}>
                <Pressable onPress={() => {navigation.navigate('ChangeNameAndUsername')}}>
                    <View style={styles.settingsProfile}>
                        <View style={{flexDirection: 'row', }}>
                            <View style={styles.initialPlaceholder}>    
                                <Text style={{color: 'white', fontSize: RFValue(16)}}>
                                    A
                                </Text>
                            </View>
                            <Text style={[styles.settingsText, {marginLeft: '5%'}]}>
                            Antonio {'\n'}
                            myusername
                            </Text>
                        </View>
                            
                        <Pressable onPress={() => navigation.navigate('profile')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>

                <Pressable onPress={() => {navigation.navigate('ChangePassword')}}>
                    <View style={styles.settingsProfile}>
                        <Text style={styles.settingsText}>
                        Change Password
                        </Text>
                        <Pressable onPress={() => navigation.navigate('profile')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>
                
                <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                    <View style={styles.settingsProfile}>
                        <Text style={styles.settingsText}>
                            Send Us Feedback!
                        </Text>
                        <Pressable onPress={() => navigation.navigate('profile')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>

                <Pressable onPress={() => {navigation.navigate('SignUp'); SignOut();}}>
                    <View style={styles.settingsProfile}>
                        <Text style={styles.settingsText}>
                            Delete Account
                        </Text>
                        <Pressable onPress={() => navigation.navigate('profile')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>
                    
            
            </View>
            
            <View style={{flex: 1}}>
                <Pressable onPress={() => { 
                auth()
                .signOut()
                .then(() => console.log('User signed out!'));}}>
                    <View style={styles.settingsLogout}>
                        <Text style={styles.logOutText}>
                            Log Out
                        </Text>
                    </View>	
                </Pressable>
            </View>
               
                
                
            
        </SafeAreaView>
    )
}

export default Settings;