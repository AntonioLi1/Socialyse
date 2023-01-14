import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {LoggedOutContext} from '../App'

class PhoneNumberError extends Error {
    constructor(message) {
        super(message)
        this.name = "PhoneNumberError"
    }
}

class UsernameError extends Error {
    constructor(message) {
        super(message)
        this.name = "UsernameError"
    }
}

async function CheckUsernameTaken(signUpUsername) {
    await firestore()
    .collection('Users')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            let data = snapshot.data()
            if (data.Username == signUpUsername) {
                throw new UsernameError("username taken error")
            }
        })
    })
}

async function checkPhoneNumberExists(signUpPhoneNumber) {
    await firestore()
    .collection('PhoneNumbers')
    .doc(signUpPhoneNumber)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            throw new PhoneNumberError('phone number already exists error')
        }
    })
}

function SignUp ({navigation}) {

    const [signUpBlur, setSignUpBlur] = useState(true);
    const [password, setPassword] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const [phoneInputCheck, setphoneInputCheck] = useState(false);
    const [nameInputCheck, setNameInputCheck] = useState(false);
    const [usernameInputCheck, setUsernameInputCheck] = useState(false);
    const [showPhoneNumberErrorMessage, setShowPhoneNumberErrorMessage] = useState(false)
    const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false)
    //const {user, setUser} = useContext(LoggedInContext);
    const {signUpName, setSignUpName, signUpUsername, setSignUpUsername, signUpPhoneNumber, setSignUpPhoneNumber} = useContext(LoggedOutContext)


    useEffect(() => {
		if (phoneInputCheck === true && nameInputCheck === true && usernameInputCheck === true) {
            setSignUpBlur(false);
        }
	}, [signUpPhoneNumber, signUpName, signUpUsername, password])


    // FIREBASE
    // Handle the button press
    async function signInWithPhoneNumber(signUpPhoneNumber) {
        //const newNumber = '+61' + signUpPhoneNumber.substring(1);
        //const confirmation = await auth().signInWithPhoneNumber(newNumber);
        const confirmation = await auth().signInWithPhoneNumber(signUpPhoneNumber);
        setConfirm(confirmation);
    }

    async function SignUpPress() {
        try {
            await checkPhoneNumberExists(signUpPhoneNumber)
            await CheckUsernameTaken(signUpUsername)
            await signInWithPhoneNumber(signUpPhoneNumber)
        } catch (error){
            console.log('error', error)
            if (error.name === "PhoneNumberError") {
                setShowPhoneNumberErrorMessage(true)
            }
            if (error.name === "UsernameError") {
                setShowUsernameErrorMessage(true)
            }
            setTimeout(() => {
				setShowPhoneNumberErrorMessage(false)
                setShowUsernameErrorMessage(false)
			}, 1500)

        }
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.', error);
        }  
    }
    /////////////////////////////////////////

    //console.log(signUpBlur)
    if (!confirm) {
        return (
            <SafeAreaView style={styles.signUpScreen}>
                <View style={styles.signUpScreenSocialyse}>
                    <Text style={styles.signUpSocialTextYellow}>
                        SOCIALYSE
                    </Text>
                </View>

                <View style={styles.signUpInputContainerSignUp}>
                    <TextInput
                    style={styles.inputs}
                    placeholder='Phone number'
                    onChangeText={(Text)=>{setphoneInputCheck(true); setSignUpPhoneNumber(Text)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Name'
                    onChangeText={(Text)=>{setNameInputCheck(true); setSignUpName(Text)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Username'
                    onChangeText={(Text)=>{setUsernameInputCheck(true); setSignUpUsername(Text)}}
                    />
                </View>
                
                
                <Pressable style={[{ backgroundColor: signUpBlur ? '#DCDCDC' : 'white'}, styles.signUpButton]} 
                disabled={signUpBlur}
                onPress={() => {SignUpPress()}}
                >
                    <Text style={{fontSize: 16, fontWeight: '700', color: signUpBlur ? '#999999' : 'black'}}>
                        Sign Up
                    </Text>
                </Pressable>  
                {
                    showPhoneNumberErrorMessage ?
                    <Text style={{color: '#FF0000', marginTop: '1%'}}>
                        Phone Number taken. Please log in instead!
                    </Text>
                    :
                    null
                }
                {
                    showUsernameErrorMessage ?
                    <Text style={{color: '#FF0000', marginTop: '1%'}}>
                    Username taken. Please try another one!
                    </Text>
                    :
                    null
                }
                <View style={styles.HaveAccountLogin}>
                    <Text style={{color: 'black', textAlign: 'center'}}>
                        Have an account? {'\n'}
                        <Pressable onPress={() => {navigation.goBack()}}>
                            <Text style={{fontWeight: '700', color: 'black'}}> 
                               Login.
                            </Text>
                        </Pressable>
                            
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
    
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
                        {signUpPhoneNumber}
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
                
                <Pressable onPress={() => confirmCode()} style={styles.confirmCodeButton}>
                    <Text style={styles.confirmCodeText}>
                        Confirm code
                    </Text>
                </Pressable>


            </View>
        </SafeAreaView>
    )     


}

export default SignUp;