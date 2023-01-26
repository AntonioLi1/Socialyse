import React, { useEffect, useState,  } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firestore from '@react-native-firebase/firestore';

const screenHeight = Dimensions.get("window").height


async function checkPhoneNumberExists(phoneNumber) {
    // phonenumber excludes area codes
    await firestore()
    .collection('PhoneNumbers')
    .doc(phoneNumber)
    .get()
    .then(docSnapshot => {
        if (!docSnapshot.exists) {
            // logging into non-existent acc
            throw Error;
        } 
    })
}

function Login({navigation}) {

    const [login, setlogin] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState()
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState(false)
    const [loginPressed, setLoginPressed] = useState(false)
    const [confirmButtonPressed, setConfirmButtonPressed] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {

        const newNumber = '+61' + phoneNumber.substring(1);
        try {
            // check if number already exists in DB
            await checkPhoneNumberExists(phoneNumber)
            setShowLoading(true)
            const confirmation = await auth().signInWithPhoneNumber(newNumber);
            setConfirm(confirmation);
        } catch(error) {
            setShowLoading(false)
            setShowErrorMessage(true)
            setTimeout(() => {
				setShowErrorMessage(false)
			}, 1500)
        }
    }

    async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          setConfirmCodeErrorMessage(true)
          setTimeout(() => {
            setConfirmCodeErrorMessage(false)
        }, 1500)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoginPressed(false)
        }, 80)
    }, [loginPressed])

    useEffect(() => {
        setTimeout(() => {
            setConfirmButtonPressed(false)
        }, 80)
    }, [confirmButtonPressed])

    if (!confirm) {
        return (
            <SafeAreaView style={styles.signUpScreen}>
                <View style={styles.signUpScreenSocialyse}>
                    <Text style={styles.signUpSocialTextYellow}>
                        SOCIALYSE
                    </Text>
                </View>
                <View style={styles.loginInputContainer}>
                    <TextInput
                    style={styles.inputs}
                    placeholderTextColor='#BDBDBD'
                    placeholder='Phone Number'
                    keyboardType='number-pad'
                    onChangeText={(Text)=>{setlogin(false); setPhoneNumber(Text)}}
                    />
                </View>
                <Pressable style={[{ backgroundColor: loginPressed ? 'grey' :'white'}, styles.signUpButton]} 
                onPress={() => {signInWithPhoneNumber(phoneNumber); setLoginPressed(true); Keyboard.dismiss()}}
                disabled={login}>
                    {
                    showErrorMessage ?
                    <Text style={{maxWidth: '80%', textAlign: 'center', color: 'red', fontSize: screenHeight * 0.018}}>
                        This phone number does not have an account! Try signing up!
                    </Text>
                    :
                    <Text style={{fontSize: screenHeight * 0.022, fontWeight: '700', color: 'black'}}>
                        Log In
                    </Text>
                    }
                    
                </Pressable>
                
                <View style={styles.DontHaveAccountSignUp}>
                    <Text style={{color: 'black', textAlign: 'center', fontSize: screenHeight * 0.02}}>
                        Don't have an account? 
                    </Text>
                    <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                        <Text style={{fontWeight: '700', color: 'black', alignSelf: 'center', fontSize: screenHeight * 0.02}}> 
                            Sign Up.
                        </Text>
                    </Pressable>
                    {
                        showLoading ?
                        <ActivityIndicator size='small' style={{marginTop: '10%'}} color='white'/>
                        :
                        null
                    }
                </View>
            </SafeAreaView>
        )
    }

    // verify code
    return (
        <SafeAreaView style={styles.verificationBackground}>
            <View style={styles.verifyPhoneNumHeader}>
                <Pressable style={styles.verifyPhoneNumBackButton} onPress={() => {navigation.goBack()}}>
                    <MIIcon name='arrow-back-ios' size={scale(24)} color='black'/>
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
                        {phoneNumber}
                    </Text>
                </View>

                <OTPInputView
                style={styles.OTPContainer}
                pinCount={6}
                codeInputFieldStyle={styles.OTPIndividualInput}
                codeInputHighlightStyle={{backgroundColor: 'white'}}
                onCodeChanged = {(text) => {setCode(text)}}
                autoFocusOnLoad={true}
                /> 
                {
                    confirmCodeErrorMessage ?
                    <Text style={{color: 'red',fontFamily: 'Helvetica'}}>
                        Incorrect Code
                    </Text>
                    :
                    null
                }   
                
                <Pressable onPress={() => {confirmCode(); setConfirmButtonPressed(true)}} 
                style={[styles.confirmCodeButton, {backgroundColor: confirmButtonPressed ? '#6076A1' : '#96B9FE'}]}>
                    <Text style={styles.confirmCodeText}>
                        Confirm code
                    </Text>
                </Pressable>


            </View>
        </SafeAreaView>
    )     
}

export default Login;
