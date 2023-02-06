import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, SafeAreaView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get("window").height
import { scale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';


const displayPhotoKey = '@app:displayPhoto'

async function getUserDetails(uid) {
    let returnObj = {
        Name: '',
        NameFirstLetter: '',
        Username: '',
        PhoneNumber: ''
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
            returnObj.PhoneNumber = data.PhoneNumber
        })

    return returnObj
}

async function LogOutAsyncStorage() {
    // upload to firestore and context state
    await AsyncStorage.removeItem(displayPhotoKey)
}

async function DeleteAccount(UserID) {

    let phoneNum = ''
    await firestore()
    .collection('Users')
    .doc(UserID)
    .get()
    .then(docSnapshot => {
        phoneNum = docSnapshot.data().PhoneNumber
    })
        // delete from phonenumbers
    await firestore()
    .collection('PhoneNumbers')
    .doc(phoneNum)
    .delete()
    //console.log('1')


    // //delete from uids
    await firestore()
    .collection('UIDs')
    .doc(UserID)
    .delete()
    //console.log('4')

    //await auth().signOut()

    //console.log('signed out first')

    await LogOutAsyncStorage()
   // console.log('pased asycn')

    const user = auth().currentUser;

    //console.log('user', user)
    await user.delete().then(() => {
        //console.log('deleted');
    }).catch((error) => {
        //console.error('Error deleting user:', error);
    });
}

function Settings({ navigation }) {

    const [userDetails, setUserDetails] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [backButtonPressed, setBackButtonPressed] = useState(false)
    const [changeNameUsernamePressed, setChangeNameUsernamePressed] = useState(false)
    const [TCsPressed, setTCsPressed] = useState(false)
    const [deleteAccountPressed, setDeleteAccountPressed] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [code, setCode] = useState('');
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState(false)
    const [confirmButtonPressed, setConfirmButtonPressed] = useState(false)
    const [confirm, setConfirm] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(false)


    async function signInWithPhoneNumber(phoneNumber) {

        const newNumber = '+61' + phoneNumber.substring(1);
        try {
            //console.log('before')
            const confirmation = await auth().signInWithPhoneNumber(newNumber);
            setLoadingScreen(false)
            //console.log('loading screen', loadingScreen)
            //console.log('confirmation', confirmation)
            setConfirm(confirmation);
        } catch (error) {
        }
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            await DeleteAccount(user.uid)
        } catch (error) {
            setConfirmCodeErrorMessage(true)
            setTimeout(() => {
                setConfirmCodeErrorMessage(false)
            }, 1500)
        }
    }

    async function DeleteAccountSignIn(PhoneNumber) {
        
        try {
            //console.log('here')
            await signInWithPhoneNumber(PhoneNumber)
        } catch {

        }
    }

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
                    onPress: () => {DeleteAccountSignIn(userDetails.PhoneNumber); setLoadingScreen(true) }
                },
                {
                    text: 'Cancel',
                    onPress: () => { setShowAlert(false) },
                },

            ],
            { cancelable: false },
        );
    }

    useEffect(() => {
        if (showAlert === true) {
            ShowAlert()
        }
    }, [showAlert])

    if (dataLoaded == false) {
        return (
            <SafeAreaView style={styles.loadingScreen}>
                <Text style={styles.loadingSocialyseText}>
                    SOCIALYSE
                </Text>
            </SafeAreaView>
        )
    };

    if (loadingScreen === true) {
        return (
            <SafeAreaView style={styles.loadingScreen2}>
                <Text style={styles.loadingSocialyseText2}>
                    SOCIALYSE
                </Text>
                <ActivityIndicator size='small' style={{ marginTop: '10%' }} color='white' />
            </SafeAreaView>
        )
    }

    if (confirm) {
        return (
            <SafeAreaView style={styles.verificationBackground}>
                <View style={styles.verifyPhoneNumHeader}>
                    <Pressable style={styles.verifyPhoneNumBackButton} onPress={() => { navigation.goBack() }}>
                        <MIIcon name='arrow-back-ios' size={scale(24)} color='black' />
                    </Pressable>
                    <Text style={styles.verificationText}>
                        Verification
                    </Text>
                </View>

                <View style={styles.verifyPhoneNumBody}>
                    <View style={styles.verifyPhoneNumBodyTextContainer}>
                        <Text style={styles.verifyPhoneNumBodyText}>
                            Please enter code sent to:
                            {'\n'}
                            {userDetails.PhoneNumber}
                        </Text>
                    </View>

                    <OTPInputView
                        style={styles.OTPContainer}
                        pinCount={6}
                        codeInputFieldStyle={styles.OTPIndividualInput}
                        codeInputHighlightStyle={{ backgroundColor: 'white' }}
                        onCodeChanged={(text) => { setCode(text) }}
                        autoFocusOnLoad={true}
                    />
                    {
                        confirmCodeErrorMessage ?
                            <Text style={{ color: 'red', fontFamily: 'Helvetica' }}>
                                Incorrect Code
                            </Text>
                            :
                            null
                    }

                    <Pressable onPress={() => { confirmCode(); setConfirmButtonPressed(true) }}
                        style={[styles.confirmCodeButton, { backgroundColor: confirmButtonPressed ? '#6076A1' : '#96B9FE' }]}>
                        <Text style={styles.confirmCodeText}>
                            Confirm code
                        </Text>
                    </Pressable>


                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.settingsHeader}>
                <Pressable style={styles.settingsBackButton} onPress={() => { navigation.navigate('profile'); setBackButtonPressed(true) }}>
                    <MIIcon name='arrow-back-ios' size={32} color={backButtonPressed ? 'grey' : 'white'} />
                </Pressable>
                <Text style={{ color: 'white', fontWeight: '900', fontSize: screenHeight * 0.028, fontFamily: 'Helvetica' }}>
                    Settings
                </Text>

            </View>
            <View style={styles.settingsBody}>
                <View style={styles.settingsProfile}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.initialPlaceholder}>
                            <Text style={{ color: 'white', fontSize: screenHeight * 0.028, fontFamily: 'Helvetica' }}>
                                {userDetails.NameFirstLetter}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: '3%' }}>
                            <Text style={[styles.settingsText, { marginLeft: '5%', fontFamily: 'Helvetica' }]}>
                                {userDetails.Name} {'\n'}
                                {userDetails.Username}
                            </Text>
                        </View>

                    </View>

                    <Pressable onPress={() => { navigation.navigate('ChangeNameAndUsername'); setChangeNameUsernamePressed(true) }}>
                        <MIIcon name='arrow-forward-ios' size={25} color={changeNameUsernamePressed ? 'grey' : 'white'} />
                    </Pressable>
                </View>

                <View style={styles.settingsDeleteProfile}>
                    <Text style={styles.settingsText}>
                        About
                    </Text>
                    <Pressable onPress={() => { setTCsPressed(true); navigation.navigate('TsAndCs') }}>
                        <MIIcon name='arrow-forward-ios' size={25} color={TCsPressed ? 'grey' : 'white'} />
                    </Pressable>
                </View>

                <View style={styles.settingsDeleteProfile}>
                    <Text style={styles.settingsText}>
                        Delete Account
                    </Text>
                    <Pressable onPress={() => { ShowAlert() }}>
                        <MIIcon name='arrow-forward-ios' size={25} color={TCsPressed ? 'grey' : 'white'} />
                    </Pressable>
                </View>

            </View>

            <View style={{ flex: 1 }}>
                <Pressable onPress={() => {
                    {
                        LogOutAsyncStorage(); auth()
                            .signOut()
                        //.then(() => console.log('User signed out!'));
                    }
                }}>
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