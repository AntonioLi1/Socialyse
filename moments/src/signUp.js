import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ActivityIndicator, Keyboard, Dimensions, Linking } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { scale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DatePicker from 'react-native-date-picker'
import {LoggedOutContext} from '../App'
import moment from 'moment';
const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width


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

async function CheckUsernameTaken(signUpUsername) {
    await firestore()
    .collection('Usernames')
    .doc(signUpUsername)
    .get()
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            throw new UsernameError("username taken error")

        }
    })
}

function SignUp ({navigation}) {

    const [signUpBlur, setSignUpBlur] = useState(true);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [date, setDate] = useState(new Date());
    const [signUpPressed, setSignUpPressed] = useState(false)
    const [confirmButtonPressed, setConfirmButtonPressed] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const [phoneInputCheck, setphoneInputCheck] = useState(false);
    const [nameInputCheck, setNameInputCheck] = useState(false);
    const [usernameInputCheck, setUsernameInputCheck] = useState(false);
    const [showPhoneNumberErrorMessage, setShowPhoneNumberErrorMessage] = useState(false)
    const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false)
    const [invalidPhoneNumberError, setInvalidPhoneNumberError] = useState(false)
    const [open, setOpen] = useState(false) 
    const [dateIsSet, setDateIsSet] = useState(false)
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState(false)

    //const {user, setUser} = useContext(LoggedInContext);
    const {signUpName, setSignUpName, signUpUsername, setSignUpUsername, signUpPhoneNumber, setSignUpPhoneNumber, setSignUpDoB} = useContext(LoggedOutContext)


    useEffect(() => {
		if (phoneInputCheck === true && nameInputCheck === true && usernameInputCheck === true && dateIsSet === true) {
            setSignUpBlur(false);
        }
	}, [signUpPhoneNumber, signUpName, signUpUsername, dateIsSet])


    // FIREBASE
    // Handle the button press
    async function signInWithPhoneNumber(signUpPhoneNumber) {
        const newNumber = '+61' + signUpPhoneNumber.substring(1);
        //console.log('newnumer', newNumber)
        const confirmation = await auth().signInWithPhoneNumber(newNumber);
        setConfirm(confirmation);
    }

    async function SignUpPress() {
        try {
            setShowLoading(true)
            await checkPhoneNumberExists(signUpPhoneNumber)
            await CheckUsernameTaken(signUpUsername)
            await signInWithPhoneNumber(signUpPhoneNumber)
            
        } catch (error){
            if (error.name === "PhoneNumberError") {
                setShowLoading(false)
                setShowPhoneNumberErrorMessage(true)
            }
            else if (error.name === "UsernameError") {
                setShowLoading(false)
                setShowUsernameErrorMessage(true)
            } else {
                console.log(error)
                setShowLoading(false)
                setInvalidPhoneNumberError(true)
            }
            setTimeout(() => {
				setShowPhoneNumberErrorMessage(false)
                setShowUsernameErrorMessage(false)
                setInvalidPhoneNumberError(false)
			}, 1500)

        }
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            setConfirmCodeErrorMessage(true)
            setCode('')
            setTimeout(() => {
                setConfirmCodeErrorMessage(false)
            }, 1500)
        }  
    }

    

    useEffect(() => {
        setTimeout(() => {
            setSignUpPressed(false)
        }, 80)
    }, [signUpPressed])

    useEffect(() => {
        setTimeout(() => {
            setConfirmButtonPressed(false)
        }, 80)
    }, [confirmButtonPressed])

    async function PrivacyPolicy() {
        const URL = 'https://app.termly.io/document/privacy-policy/1774d57e-5112-4182-824b-740c958d85e8'
        const supported = await Linking.canOpenURL(URL)
        if (supported) {
            await Linking.openURL(URL)
        } else {
            //console.log('gg didnt wokr')
        }
    }

    async function EULA() {
        const URL = 'https://app.termly.io/document/eula/8248d241-36ed-42a2-bd10-fd394c0701f5'
        const supported = await Linking.canOpenURL(URL)
        if (supported) {
            await Linking.openURL(URL)
        } else {
            //console.log('gg didnt wokr')
        }
    }
    
    /////////////////////////////////////////

    //console.log(signUpBlur)
    if (!confirm) {
        return (
            <SafeAreaView style={styles.signUpScreen}>
                <View style={styles.signUpScreenSocialyse}>
                    <Text style={styles.signUpSocialTextYellow}>
                        Socialyse
                    </Text>
                    <Text style={styles.signUpMsg}>
                        Sign up to see what's happening around you.
                    </Text>
                </View>

                <View style={styles.signUpInputContainerSignUp}>
                    <View style={styles.signUpInputs}>
                    {
                        showPhoneNumberErrorMessage ?
                        <Text style={{color: '#FF0000', marginTop: '1%', fontFamily: 'Helvetica', fontSize: screenHeight * 0.018, textAlign: 'center'}}>
                            Phone Number taken. Please log in instead!
                        </Text>
                        :
                        <TextInput
                        style={styles.signUpTextInput}
                        placeholderTextColor='#BDBDBD'
                        placeholder='Phone number'
                        keyboardType='number-pad'
                        onChangeText={(Text)=>{setphoneInputCheck(true); setSignUpPhoneNumber(Text)}}
                        />
                    }
                        
                    </View>
                    <View style={styles.signUpInputs}>
                        <TextInput
                        style={styles.signUpTextInput}
                        placeholderTextColor='#BDBDBD'
                        placeholder='Name'
                        onChangeText={(Text)=>{setNameInputCheck(true); setSignUpName(Text)}}
                        />
                    </View>
                    <View style={styles.signUpInputs}>
                        {
                            showUsernameErrorMessage ?
                            <Text style={{color: '#FF0000', marginTop: '1%', fontFamily: 'Helvetica', fontSize: screenHeight * 0.018, textAlign: 'center'}}>
                            Username taken. Please try another one!
                            </Text>
                            :
                            <TextInput
                            style={styles.signUpTextInput}
                            placeholderTextColor='#BDBDBD'
                            placeholder='Username'
                            onChangeText={(Text)=>{setUsernameInputCheck(true); setSignUpUsername(Text)}}
                            />
                        }
                        
                    </View>
                        
                    
                    <Pressable style={[styles.signUpInputs, {justifyContent: 'center'}]} onPress={() => {setOpen(true)}}>
                        {
                            dateIsSet ?
                            <Text style={{marginLeft: '3%', fontSize: screenHeight * 0.02, fontFamily: 'Helvetica'}}>{moment(date).format('DD/MM/YYYY')}</Text>
                            :
                            <Text style={{color: '#BDBDBD', marginLeft: '3%',fontSize: screenHeight * 0.02, fontFamily: 'Helvetica'}}>Date of birth</Text>
                        }
                    </Pressable>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setDateIsSet(true)
                        setSignUpDoB(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
                </View>
               
                
                
                <Pressable style={[{ backgroundColor: signUpBlur ? '#DCDCDC' : signUpPressed ? 'grey' :'white'}, styles.signUpButton]} 
                disabled={signUpBlur}
                onPress={() => {SignUpPress(); setSignUpPressed(true); Keyboard.dismiss()}}
                >
                    {
                        invalidPhoneNumberError ?
                        <Text style={{color: '#FF0000', marginTop: '1%', fontFamily: 'Helvetica'}}>
                        Invalid phone number!
                        </Text>
                        :
                        <Text style={{fontSize: 16, fontWeight: '700', color: signUpBlur ? '#999999' : 'black', fontSize: screenHeight * 0.022, fontFamily: 'Helvetica'}}>
                            Sign Up
                        </Text>
                    }
                </Pressable> 

                
                
                
                        
                <View style={{flexDirection: 'column', marginTop: screenHeight * 0.67, width: screenWidth, alignItems: 'center', position: 'absolute'}}>
                    <Text style={{maxWidth: '50%', fontSize: screenHeight * 0.016, fontWeight: '300', textAlign: 'center'}}>
                        By signing up, you agree to our 
                        <Text style={{fontSize: screenHeight * 0.016, fontWeight: '600', fontFamily: 'Helvetica'}} onPress={() => {PrivacyPolicy()}}>
                        {' '}EULA{' '}
                        </Text>
                        and 
                        <Text style={{fontSize: screenHeight * 0.016, fontWeight: '600', fontFamily: 'Helvetica'}}  onPress={() => {EULA()}}>
                        {' '}Privacy Policy
                        </Text>
                        .
                    </Text>
                    <View style={styles.HaveAccountLogin}>
                        <Text style={{color: 'black', textAlign: 'center', fontSize: screenHeight * 0.022, fontFamily: 'Helvetica', fontWeight: '400'}}>
                            Have an account? 
                        </Text>
                        <Pressable onPress={() => {navigation.navigate('Login')}}>
                            <Text style={{fontWeight: '900', color: 'black', alignSelf: 'center', fontSize: screenHeight * 0.024, fontFamily: 'Helvetica'}}> 
                                Login.
                            </Text>
                        </Pressable>
                        {
                            showLoading ?
                            <ActivityIndicator size='small' style={{marginTop: '10%'}} color='white'/>
                            :
                            null
                        }
                    </View>
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
                
                <Pressable onPress={() => {confirmCode(); setConfirmButtonPressed(true)}} style={[styles.confirmCodeButton, {backgroundColor: confirmButtonPressed ? '#6076A1' : '#96B9FE'}]}>
                    <Text style={styles.confirmCodeText}>
                        Confirm code
                    </Text>
                </Pressable>
                {
                    confirmCodeErrorMessage ?
                    <Text style={{color: '#FF0000', marginTop: '1%', fontFamily: 'Helvetica', position: 'absolute', marginTop: screenHeight * 0.4}}>
                        Incorrect Code!
                    </Text>
                    :
                    null
                }
            </View>
        </SafeAreaView>
    )     
}

export default SignUp;