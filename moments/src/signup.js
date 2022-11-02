import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

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


function SignUp ({navigation}) {

    const [signUpBlur, setSignUpBlur] = useState(true);
    const [email, setEmail] = useState(false);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);

    useEffect(() => {
		if (email === true && name === true && username === true && password === true) {
            setSignUpBlur(false);
        }
	}, [email, name, username, password])
    
    return (
        <SafeAreaView style={styles.signUpScreen}>
            <View style={styles.signUpScreenSocialyse}>
                <Text style={styles.signUpSocialTextYellow}>
                    SOCIALYSE
                </Text>
                <Text style={styles.signUpSocialTextGradient}>
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
                onChangeText={()=>{setEmail(true)}}
                />
                <TextInput
                style={styles.inputs}
                placeholder='Name'
                onChangeText={()=>{setName(true)}}
                />
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
            
            
            <Pressable style={[{ backgroundColor: signUpBlur ? '#DCDCDC' : 'white'}, styles.signUpButton]} 
            disabled={signUpBlur}
            onPress={() => {navigation.navigate('UploadDP')}}>
                <Text style={{fontSize: 16, fontWeight: '700', color: signUpBlur ? '#999999' : 'black'}}>
                    Sign Up
                </Text>
            </Pressable>
           
            
            
        </SafeAreaView>
    )
}

export default SignUp;
