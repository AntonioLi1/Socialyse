import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';


function SignUp ({navigation}) {

    const [signUpBlur, setSignUpBlur] = useState(true);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState()
    const [code, setCode] = useState('');

    const [phoneInputCheck, setphoneInputCheck] = useState(false);
    const [nameInputCheck, setNameInputCheck] = useState(false);
    const [usernameInputCheck, setUsernameInputCheck] = useState(false);
    const [passwordInputCheck, setPasswordInputCheck] = useState(false);

    useEffect(() => {
		if (phoneInputCheck === true && nameInputCheck === true && usernameInputCheck === true && passwordInputCheck === true) {
            setSignUpBlur(false);
        }
	}, [phoneNumber, name, username, password])

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        //const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        const confirmation = await auth().verifyPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.');
        }
    }

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
                    onChangeText={(Text)=>{setphoneInputCheck(true); setPhoneNumber(Text)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Name'
                    onChangeText={(Text)=>{setNameInputCheck(true); setName(Text)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Username'
                    onChangeText={(Text)=>{setUsernameInputCheck(true); setUsername(Text)}}
                    />
                    <TextInput
                    style={styles.inputs}
                    placeholder='Password'
                    onChangeText={(Text)=>{setPasswordInputCheck(true); setPassword(Text)}}
                    />
                </View>
                
                
                <Pressable style={[{ backgroundColor: signUpBlur ? '#DCDCDC' : 'white'}, styles.signUpButton]} 
                disabled={signUpBlur}
                onPress={() => {signInWithPhoneNumber(phoneNumber)}}
                >
                    <Text style={{fontSize: 16, fontWeight: '700', color: signUpBlur ? '#999999' : 'black'}}>
                        Sign Up
                    </Text>
                </Pressable>  

                <View style={{marginTop: '5%'}}>
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