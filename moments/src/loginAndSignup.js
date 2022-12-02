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


function LoginAndSignup ({navigation}) {

    const [signUpBlur, setSignUpBlur] = useState(true);
    const [email, setEmail] = useState(false);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState()


    const [phoneInputCheck, setphoneInputCheck] = useState(false);
    const [nameInputCheck, setNameInputCheck] = useState(false);
    const [usernameInputCheck, setUsernameInputCheck] = useState(false);
    const [passwordInputCheck, setPasswordInputCheck] = useState(false);

    useEffect(() => {
		if (passwordInputCheck === true && nameInputCheck === true && usernameInputCheck === true && passwordInputCheck === true) {
            setSignUpBlur(false);
        }
	}, [email, name, username, password])
    
   
    return (
        <SafeAreaView style={styles.signUpScreen}>
            <View style={styles.signUpScreenSocialyse}>
                <Text style={styles.signUpSocialTextYellow}>
                    SOCIALYSE
                </Text>
            </View>
            <View style={styles.signUpInfoContainer}>
                <Text style={styles.signUpInfo}>
                    Sign up to see what's happening 
                    {'\n'} around you
                </Text>
            </View>
            <View style={styles.loginInput}>
                <Pressable style={styles.loginButton} onPress={() => {navigation.navigate('Login')}}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                        Log In
                    </Text>
                </Pressable>
            </View>
            <Text style={styles.or}>
                OR
            </Text>

            <Pressable style={styles.signUpButton} 
            onPress={() => {navigation.navigate('SignUp')}}
            >
                <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                    Sign Up
                </Text>
            </Pressable>
        
            
            
        </SafeAreaView>
    )
    
    
}

export default LoginAndSignup;



















//navigation.navigate('Map');

/*const GradientText = (props) => {
    return (
      <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
          colors={["#AD00FF", "#00FFA3"]}
          start={{ x: 0, y: 0.35 }}
          end={{ x: 0, y: 0.7 }}
        >
          <Text {...props} style={[props.style, { opacity: 0.3 }]} />
        </LinearGradient>
      </MaskedView>
    );
};*/

// function TestPost (name) {

//     const newReference = database().ref('/users').push();

//     console.log(name)

//     console.log('Auto generated key: ', newReference.key);

//     newReference
//     .set({
//         "name": name, 
//     })
//     .then (() => console.log('updated'))
// }

/*
return (
            <SafeAreaView style={styles.signUpScreen}>
                <View style={styles.signUpScreenSocialyse}>
                    <Text style={styles.signUpSocialTextYellow}>
                        SOCIALYSE
                    </Text>
                </View>
                <View style={styles.signUpInfoContainer}>
                    <Text style={styles.signUpInfo}>
                        Sign up to see what's happening 
                        {'\n'} around you
                    </Text>
                </View>
                <View style={styles.loginInput}>
                    <Pressable style={styles.loginButton} onPress={() => {navigation.navigate('Login')}}>
                        <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                            Log In
                        </Text>
                    </Pressable>
                </View>
                <Text style={styles.or}>
                    OR
                </Text>

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
            
                
                
            </SafeAreaView>
        )
*/