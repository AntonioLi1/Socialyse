import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, Button} from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';
import { ModalSlideFromBottomIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';



function VerifyPhoneNumber({route, navigation}) {

    const inputRef = useRef();
    
    const confirm = route.params.confirmation
   
    //console.log(confirm)

    //setTimeout(() => inputRef.current.focus(), 100)
    const [code, setCode] = useState('');

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            console.log('yew')
        } catch (error) {
            console.log('Invalid code.');
        }
    }
          
    return (
        <SafeAreaView style={styles.MBBackground}>
            <View style={styles.verifyPhoneNumHeader}>
                <Pressable style={styles.verifyPhoneNumBackButton} onPress={() => {navigation.navigate('Login')}}>
					<MIIcon name='arrow-back-ios' size={scale(24)} color='white'/>
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
                {/* <TextInput
                ref={inputRef}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                maxLength={6}
                >

                </TextInput> */}
                <TextInput onChangeText={text => setCode(text)} />
                <Button title="Confirm Code" onPress={() => confirmCode()} />

                

                
            </View>

            
        </SafeAreaView>
    )
    
}

export default VerifyPhoneNumber;

function PhoneSignIn() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
  
    const [code, setCode] = useState('');
  
    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      alert(JSON.stringify(confirmation))
      //console.log(confirmation)
      setConfirm(confirmation);
    }
  
    async function confirmCode() {
        try {
          await confirm.confirm(code);
          console.log('yew')
        } catch (error) {
          console.log('Invalid code.');
        }
    }
    
    if (!confirm) {
        console.log('not confirmed')
      return (
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+44 7444 555666')}
        />
      );
    }
    console.log('confirmed')
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
}