import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, Dimensions } from 'react-native';
import styles from './styles';

const screenHeight = Dimensions.get("window").height

function LoginAndSignup ({navigation}) {

    const [loginPressed, setLoginPressed] = useState(false)
    const [signUpPressed, setSignUpPressed] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoginPressed(false)
            setSignUpPressed(false)
        }, 1000)
    }, [loginPressed, signUpPressed])

    return (
        <SafeAreaView style={styles.signUpScreen}>
            <View style={styles.signUpScreenSocialyse}>
                <Text style={styles.signUpSocialTextYellow}>
                    Socialyse
                </Text>
            </View>
            <View style={styles.signUpInfoContainer}>
                <Text style={styles.signUpInfo}>
                    Sign up to see what's happening 
                    {'\n'} around you.
                </Text>
            </View>
            <View style={styles.loginInput}>
                <Pressable style={[styles.loginButton, {backgroundColor: loginPressed ? 'grey' : 'white'}]} onPress={() => {navigation.navigate('Login'); setLoginPressed(true)}}>
                    <Text style={{fontSize: screenHeight * 0.022, fontWeight: '700', color: 'black'}}>
                        Log In
                    </Text>
                </Pressable>
            </View>
            <Text style={styles.or}>
                OR
            </Text>

            <Pressable style={[styles.signUpButton, {backgroundColor: signUpPressed ? 'grey' : 'white'}]} 
            onPress={() => {navigation.navigate('SignUp'); setSignUpPressed(true)}}
            >
                <Text style={{fontSize: screenHeight * 0.022, fontWeight: '700', color: 'black'}}>
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