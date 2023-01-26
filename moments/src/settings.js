import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, SafeAreaView, Alert, Dimensions } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get("window").height

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

    const [userDetails, setUserDetails] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [backButtonPressed, setBackButtonPressed] = useState(false)
    const [changeNameUsernamePressed, setChangeNameUsernamePressed] = useState(false)
    const [TCsPressed, setTCsPressed] = useState(false)
    const [deleteAccountPressed, setDeleteAccountPressed] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const { user } = useContext(LoggedInContext);

    async function getData() {
        const data = await getUserDetails(user.uid)
        setUserDetails(data)
        setDataLoaded(true)
    }

    useEffect(() => {
        getData()
    }, [])

    // back button
    useEffect(() => {
        setTimeout(() => {
            setBackButtonPressed(false)
        }, 100)
    }, [backButtonPressed])

    // nameUsername button
    useEffect(() => {
        setTimeout(() => {
            setChangeNameUsernamePressed(false)
            setTCsPressed(false)
            setDeleteAccountPressed(false)
        }, 100)
    }, [changeNameUsernamePressed, TCsPressed, deleteAccountPressed])

    function ShowAlert() {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your Socialyse account?',
            [
                {
                    text: 'Delete Account', 
                    onPress: () => {DeleteAccount(user.uid)}
                },
                {
                    text: 'Cancel',
                    onPress: () => {setShowAlert(false)},
                },
              
            ],
            {cancelable: false},
        );
    }

    useEffect(() => {
        if(showAlert === true) {
            ShowAlert()
        }
    }, [showAlert])

    if (dataLoaded == false) return null;

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.settingsHeader}>
                <Pressable style={styles.settingsBackButton} onPress={() => {navigation.navigate('profile'); setBackButtonPressed(true)}}>
                    <MIIcon name='arrow-back-ios' size={32} color={backButtonPressed ? 'grey' : 'white'}/>
                </Pressable>
                <Text style={{color: 'white', fontWeight: '900', fontSize: screenHeight * 0.028, fontFamily: 'Helvetica'}}>
                    Settings
                </Text>
                
            </View>
            <View style={styles.settingsBody}>
                <View style={styles.settingsProfile}>
                    <View style={{flexDirection: 'row', }}>
                        <View style={styles.initialPlaceholder}>    
                            <Text style={{color: 'white', fontSize: screenHeight * 0.028, fontFamily: 'Helvetica'}}>
                                {userDetails.NameFirstLetter}
                            </Text>
                        </View>
                        <View style={{justifyContent: 'center', marginLeft: '3%'}}>
                            <Text style={[styles.settingsText, {marginLeft: '5%', fontFamily: 'Helvetica'}]}>
                                {userDetails.Name} {'\n'}
                                {userDetails.Username}
                            </Text>
                        </View>
                        
                    </View>
                        
                    <Pressable onPress={() => {navigation.navigate('ChangeNameAndUsername'); setChangeNameUsernamePressed(true)}}>
                        <MIIcon name='arrow-forward-ios' size={25} color={changeNameUsernamePressed ? 'grey' : 'white'}/>
                    </Pressable>
                </View>

                <View style={styles.settingsDeleteProfile}>
                    <Text style={styles.settingsText}>
                        About
                    </Text>
                    <Pressable onPress={() => {setTCsPressed(true); navigation.navigate('TsAndCs')}}>
                        <MIIcon name='arrow-forward-ios' size={25} color={TCsPressed ? 'grey' : 'white'}/>
                    </Pressable>
                </View>

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