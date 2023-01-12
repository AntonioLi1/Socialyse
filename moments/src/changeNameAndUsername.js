import React, { useContext, useEffect, useState } from 'react';
import { View,  Text, Pressable, SafeAreaView, TextInput, Image } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import { LoggedInContext } from '../App'

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
    await firestore()
    .collection('Users')
    .doc(UserUID)
    .update({
        Name: newName
    })
}

async function ChangeUsername(newUsername, UserUID) {
    await firestore()
    .collection('Users')
    .doc(UserUID)
    .update({
        Username: newUsername
    })
}

function ChangeNameAndUsername ({navigation}) {
    
    const { user } = useContext(LoggedInContext);

    const [inputName, setinputName] = useState('');
    const [inputUsername, setinputUsername] = useState('');
    const [placeholderName, setPlaceholderName] = useState('')
    const [placeholderUsername, setPlaceholderUsername] = useState('')

    const [doneEnabled, setDoneEnabled] = useState(false);
    const [userDetails, setUserDetails] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [changedName, setChangedName] = useState(false)
    const [changedUsername, setChangedUsername] = useState(false)

    async function GetData() {
        await getUserDetails(user.uid)
        .then((data) => {
            setUserDetails(data)
            setPlaceholderName(data.FirstName)
            setPlaceholderUsername(data.Username)
            setinputName(data.FirstName)
            setinputUsername(data.Username)
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
                await ChangeUsername(inputUsername, user.uid)
                navigation.navigate('profile'); 
            }
            
        } catch {

        }
    }

    if (dataLoaded == false) return null

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.ChangeNameAndUsernameHeader}>

                <Pressable style={styles.changePasswordBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
                    
                <Text style={{color: 'white', fontSize: RFValue(16), fontWeight: '900'}}>
                    Edit profile
                </Text>

                <Pressable 
                onPress={() => {updateDetails()}}>
                    <Text style={[styles.changePasswordDoneText, {color: 'white'}]}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.ChangeNameAndUsernameBody}>
                <View style={styles.ChangeNameAndUsernameDPContainer}>
                    <Image source={{uri: userDetails.ProfilePic}} style={styles.ChangeNameAndUsernameDP}/>
                </View>
                <View style={styles.ChangeNameAndUsernameBodyInput}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500'}}>
                                Name
                            </Text>
                        </View>
                        
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder={placeholderName}
                        placeholderTextColor="#BDBDBD"
                        onChangeText={(text) => {setinputName(text);}}
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500'}}>
                                Username
                            </Text>
                        </View>
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder={placeholderUsername}
                        placeholderTextColor="#BDBDBD"
                        onChangeText={(text) => {setinputUsername(text);}}
                        />
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ChangeNameAndUsername;