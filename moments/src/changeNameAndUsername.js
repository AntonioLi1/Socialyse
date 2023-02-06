import React, { useContext, useEffect, useState } from 'react';
import { View,  Text, Pressable, SafeAreaView, TextInput, Image, Dimensions, Platform } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'
const screenHeight = Dimensions.get("window").height


async function getUserDetails(UserUID) {
    let obj = {
        FirstNameFirstLetter: '',
        FirstName: '',
        Username: '',
        ProfilePic: ''
    }
    
    await firestore()
    .collection('Users')
    .doc(UserUID)
    .get()
    .then(docSnapshot => {
        let data = docSnapshot.data()
        obj.FirstNameFirstLetter = data.Name[0]
        obj.FirstName = data.Name
        obj.Username = data.Username
        obj.ProfilePic = data.ProfilePic
    })

    return obj
}

async function ChangeName(newName, UserUID) {
    if (newName !== '') {
        await firestore()
        .collection('Users')
        .doc(UserUID)
        .update({
            Name: newName
        })
    }
    
}

async function ChangeUsername(newUsername, UserUID, oldUsername) {
    // check if the username is alreay taken
    if (newUsername !== '') {
        // check username is already taken
        await firestore()
        .collection('Usernames')
        .doc(newUsername)
        .get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                throw Error("infunction error");
            }
        })
        await firestore()
        .collection('Users')
        .doc(UserUID)
        .update({
            Username: newUsername
        })
        await firestore() 
        .collection('UsernameAndDP')
        .doc(UserUID)
        .update({
            Username: newUsername
        })
        // deelte old username
        await firestore()
        .collection('Usernames')
        .doc(oldUsername)
        .delete()
        // add new username
        await firestore()
        .collection('Usernames')
        .doc(newUsername)
        .set({
            Username: newUsername,
            UserID: UserUID
        })
    }
}

function ChangeNameAndUsername ({navigation}) {
    
    const { user } = useContext(LoggedInContext);

    const [inputName, setinputName] = useState('');
    const [inputUsername, setinputUsername] = useState('');
    const [placeholderName, setPlaceholderName] = useState('')
    const [placeholderUsername, setPlaceholderUsername] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [backButtonPressed, setBackButtonPressed] = useState(false)
    const [donePressed, setDonePressed] = useState(false)
    const [oldUsername, setOldUsername] = useState('')

    async function GetData() {
        await getUserDetails(user.uid)
        .then((data) => {
            setUserDetails(data)
            setPlaceholderName(data.FirstName)
            setPlaceholderUsername(data.Username)
            setinputName(data.FirstName)
            setinputUsername(data.Username)
            setOldUsername(data.Username)
            setDataLoaded(true)
        }) 
    }

    useEffect(() => {
        GetData()
    }, [])

    async function updateDetails() {
        try {
            if (placeholderName != inputName) {
                await ChangeName(inputName, user.uid)
                navigation.navigate('profile'); 
            }
            if (placeholderUsername != inputUsername) {
                await ChangeUsername(inputUsername, user.uid, oldUsername)
                navigation.navigate('profile'); 
            }
        } catch {
            setShowErrorMessage(true)
            setTimeout(() => {
				setShowErrorMessage(false)
			}, 1000)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setBackButtonPressed(false)
        }, 100)
    }, [backButtonPressed])

    useEffect(() => {
        setTimeout(() => {
            setDonePressed(false)
        }, 100)
    }, [donePressed])

    if (dataLoaded == false) return null

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.ChangeNameAndUsernameHeader}>

                <Pressable style={styles.changePasswordBackButton} onPress={() => {navigation.goBack(); setBackButtonPressed(true)}}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color={backButtonPressed ? 'grey' : 'white'}/>
				</Pressable>
                    
                <Text style={{color: 'white', fontSize: screenHeight * 0.026, fontWeight: '900', fontFamily: 'Helvetica'}}>
                    Edit profile
                </Text>

                <Pressable 
                onPress={() => {updateDetails(); setDonePressed(true)}}>
                    <Text style={[styles.changePasswordDoneText, {color: donePressed ? 'grey' : 'white'}]}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.ChangeNameAndUsernameBody}>
                <View style={styles.ChangeNameAndUsernameDPContainer}>
                    <Image source={{uri: userDetails.ProfilePic}} style={styles.ChangeNameAndUsernameDP}/>
                </View>
                <View style={styles.ChangeNameAndUsernameBodyInput}>
                    <View style={styles.editProfileNameContainer }>
                        <View style={{width: '30%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500', fontSize: screenHeight * 0.022, fontFamily: 'Helvetica'}}>
                                Name
                            </Text>
                        </View>
                        <View style={styles.editProfileTextInputArea}>
                            <TextInput
                            style={styles.inputsEditProfile}
                            placeholder={placeholderName}
                            placeholderTextColor="#BDBDBD"
                            onChangeText={(text) => {setinputName(text);}}
                            />
                        </View>
                        
                    </View>
                    
                    <View style={styles.editProfileUsernameContainer}>
                        <View style={{width: '30%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500', fontSize: screenHeight * 0.022, fontFamily: 'Helvetica'}}>
                                Username
                            </Text>
                        </View>
                        {
                            showErrorMessage ?
                            <View style={styles.editProfileTextInputArea}>
                                <Text style={{color: 'red', fontFamily: 'Helvetica'}}>
                                    Username is already taken!
                                </Text>
                            </View>
                            :
                            <View style={styles.editProfileTextInputArea}>
                                <TextInput
                                style={styles.inputsEditProfile}
                                placeholder={placeholderUsername}
                                placeholderTextColor="#BDBDBD"
                                onChangeText={(text) => {setinputUsername(text);}}
                                />
                            </View>
                        }
                        
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ChangeNameAndUsername;