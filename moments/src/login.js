import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Button } from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {OTP} from 'react-native-otp-form';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import firestore from '@react-native-firebase/firestore';

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

    //const [username, setUsername] = useState(false);
    //const [password, setPassword] = useState(false);
    const [login, setlogin] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState()
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [confirmCodeErrorMessage, setConfirmCodeErrorMessage] = useState(false)

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {

        const newNumber = '+61' + phoneNumber.substring(1);
        try {
            // check if number already exists in DB
            await checkPhoneNumberExists(phoneNumber)

            const confirmation = await auth().signInWithPhoneNumber(newNumber);
            //const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch(error) {
            console.log('errorwdwdww', error)
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
          console.log('Invalid code.');
          setConfirmCodeErrorMessage(true)
          setTimeout(() => {
            setConfirmCodeErrorMessage(false)
        }, 1500)
        }
    }

    //console.log(login)

    if (!confirm) {
        return (
            <SafeAreaView style={styles.signUpScreen}>
                <View style={styles.signUpScreenSocialyse}>
                    <Text style={styles.signUpSocialTextYellow}>
                        SOCIALYSE
                    </Text>
                </View>
                <View style={styles.signUpInputContainer}>
                    <TextInput
                    style={styles.inputs}
                    placeholder='Phone Number'
                    onChangeText={(Text)=>{setlogin(false); setPhoneNumber(Text)}}
                    />
                    {/* <TextInput
                    style={styles.inputs}
                    placeholder='Password'
                    onChangeText={()=>{setPassword(true)}}
                    /> */}
                </View>
                {/* <View style={styles.forgotPasswordContainer}>
                    <Pressable onPress={() => {navigation.navigate('ForgotPassword')}}>
                        <Text style={{alignSelf: 'flex-end', color: 'black', fontSize: 12}}>
                            Forgot Password?
                        </Text>
                    </Pressable>
                </View> */}

                <Pressable style={[{ backgroundColor:  'white'}, styles.signUpButton]} 
                onPress={() => {signInWithPhoneNumber(phoneNumber)}}
                disabled={login}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                        Log In
                    </Text>
                </Pressable>
                {
                    showErrorMessage ?
                    <Text style={{maxWidth: '80%', textAlign: 'center', color: 'red'}}>
                        This phone number does not have an account! Try signing up!
                    </Text>
                    :
                    null
                }
                <View style={styles.DontHaveAccountSignUp}>
                    <Text style={{color: 'black', textAlign: 'center'}}>
                        Don't have an account? {'\n'}
                        <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                            <Text style={{fontWeight: '700', color: 'black'}}> 
                                Sign Up.
                            </Text>
                        </Pressable>
                            
                    </Text>
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
                        0435081321
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
                    <Text style={{color: 'red'}}>
                        Incorrect Code
                    </Text>
                    :
                    null
                }   
                
                <Pressable onPress={() => confirmCode()} style={styles.confirmCodeButton}>
                    <Text style={styles.confirmCodeText}>
                        Confirm code
                    </Text>
                </Pressable>


            </View>
        </SafeAreaView>
    )     
}

export default Login;

//
//signInWithPhoneNumber('+44 7444 555666'); 

    // function signInWithPhoneNumber(phoneNumber) {
    //     return new Promise ((resolve) => {
    //         auth().signInWithPhoneNumber(phoneNumber)
    //         resolve(setConfirm(confirmation))
    //     }) 
    // }

    
    // signInWithPhoneNumber().then(() => {
    //     console.log('here')
    //     navigation.navigate('VerifyPhoneNumber', {confirm})
    // })

    // async function signInWithPhoneNumber(phoneNumber) {
    //     const confirmation = new Promise ((resolve) => {
    //         auth().signInWithPhoneNumber(phoneNumber)
    //         resolve(setConfirm(confirmation))
    //     }) 

    //     await confirmation.then(navigation.navigate('VerifyPhoneNumber', {confirm}))
        
    // }

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     console.log('here')
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     console.log('confirmation: ' + confirmation)
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//       console.log('confirm' + confirm)
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   console.log(confirm)

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+44 7444 555666')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );