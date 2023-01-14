import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SendFeedbackModal from './sendFeedbackModal';
import { LoggedInContext } from '../App'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const displayPhotoKey = '@app:displayPhoto'


async function getUserDetails(uid) {
    let returnObj = {
        Name: '',
        NameFirstLetter: '',
        Username: ''
    }

    await firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(docSnapshot => {
        let data = docSnapshot.data()
        returnObj.Name = data.Name
        returnObj.Username = data.Username
        returnObj.NameFirstLetter = data.Name.charAt(0)
    })

    return returnObj
}

async function LogOutAsyncStorage () {
    // upload to firestore and context state
    await AsyncStorage.removeItem(displayPhotoKey)
}

function Settings ({navigation}) {

    const [sendFeedbackModal, setSendFeedbackModal] = useState(false);
    const [userDetails, setUserDetails] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const { user } = useContext(LoggedInContext);

    async function getData() {
        const data = await getUserDetails(user.uid)
        setUserDetails(data)
        setDataLoaded(true)
    }

    useEffect(() => {
        getData()
    }, [])

    if (dataLoaded == false) return null;

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
                                    {userDetails.NameFirstLetter}
                                </Text>
                            </View>
                            <Text style={[styles.settingsText, {marginLeft: '5%'}]}>
                            {userDetails.Name} {'\n'}
                            {userDetails.Username}
                            </Text>
                        </View>
                            
                        <Pressable onPress={() => navigation.navigate('profile')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>

                <Pressable onPress={() => {}}>
                    <View style={styles.settingsDeleteProfile}>
                        <Text style={styles.settingsText}>
                            Delete Account
                        </Text>
                        <Pressable onPress={() => navigation.navigate('ChangePassword')}>
                            <MIIcon name='arrow-forward-ios' size={25} color='white'/>
                        </Pressable>
                    </View>
                </Pressable>
                    
            
            </View>
            
            <View style={{flex: 1}}>
                <Pressable onPress={() => { 
                {LogOutAsyncStorage(); auth()
                .signOut()
                .then(() => console.log('User signed out!'));}}}>
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