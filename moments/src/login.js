import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'



function Login({navigation}) {

    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [login, setlogin] = useState(true);

    useEffect(() => {
		if (username === true && password === true) {
            setlogin(false);
        }
	}, [username, password])

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
                placeholder='Username'
                onChangeText={()=>{setUsername(true)}}
                />
                <TextInput
                style={styles.inputs}
                placeholder='Password'
                onChangeText={()=>{setPassword(true)}}
                />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <Pressable onPress={() => {navigation.navigate('ForgotPassword')}}>
                    <Text style={{alignSelf: 'flex-end', color: 'black', fontSize: 12}}>
                        Forgot Password?
                    </Text>
                </Pressable>
            </View>

            <Pressable style={[{ backgroundColor:  'white'}, styles.signUpButton]} 
            onPress={() => {navigation.navigate('Map')}}
            disabled={login}>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                    Log In
                </Text>
            </Pressable>
            <View style={{marginTop: '5%'}}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                    Dont have an account? {'\n'}
                    <Pressable onPress={() => {navigation.goBack()}}>
                        <Text style={{fontWeight: '700', color: 'black'}}> 
                            Sign Up.
                        </Text>
                    </Pressable>
                        
                </Text>
            </View>
        </SafeAreaView>
    )
        
}

export default Login;