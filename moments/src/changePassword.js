import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import database from '@react-native-firebase/database';

function ChangePasswordBackend (hash, newPassword) {

    database()
    .ref(`users/${hash}`)
    .update({
        password: newPassword,
    })
    .then(() => console.log('Data updated.'));
}

function ChangePassword({navigation}) {

    const [currentPassword, setCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState(false);
    const [actualNewPassword, setActualNewPassword] = useState('')
    const [colouredDone, setColouredDone] = useState(false);
    // checks if new password is confirmed. true = 'done' button is disabled
    const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(true);

    useEffect(() => {
		if (currentPassword === true && newPassword === true && confirmNewPassword === true) {
            setColouredDone(true);
        }
	}, [currentPassword, newPassword, confirmNewPassword])

    return (
        <SafeAreaView style={styles.signUpScreen}>
            <View style={styles.changePasswordHeader}>
                <Pressable style={styles.changePasswordBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
                <Text style={styles.changePasswordText}>
                    Change Password
                </Text>
                <Pressable 
                disabled={confirmPasswordCheck}
                onPress={() => {navigation.navigate('profile'); ChangePasswordBackend('-NGdf8tGoycJVbcW4Nt7', actualNewPassword);}}>
                    <Text style={[styles.changePasswordDoneText, {color: colouredDone ? 'white' : '#706E6E'}]}>
                        Done
                    </Text>
                </Pressable>
                
			</View>


            <View style={{flex: 11,}}>
                <View style={styles.changePasswordInputContainer}>
                    <TextInput
                    style={styles.inputs}
                    placeholder='Current Password'
                    onChangeText={()=>{setCurrentPassword(true)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='New Password'
                    onChangeText={()=>{setNewPassword(true)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Confirm New Password'
                    onChangeText={(Text)=>{setConfirmNewPassword(true); setActualNewPassword(Text)}}
                    />
                </View>
            </View>
                
            
        </SafeAreaView>
    )
}

export default ChangePassword;