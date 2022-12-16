import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

function ChangeNameAndUsername ({navigation}) {
    
    let placeholderName = 'Antonio'
    let placeholderUsername = 'myUsernaefme'

    const [inputName, setinputName] = useState(placeholderName);
    const [inputUsername, setinputUsername] = useState(placeholderUsername);
    const [doneEnabled, setDoneEnabled] = useState(false);

    if (placeholderName !== inputName && placeholderUsername !== inputUsername) {
        setDoneEnabled(true)
    }
    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.ChangeNameAndUsernameHeader}>

                <Pressable style={styles.changePasswordBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
				</Pressable>
                    
                <Text style={{color: 'white', fontSize: RFValue(16), fontWeight: '900'}}>
                    Edit profile
                </Text>

                <Pressable 
                disabled={!doneEnabled}
                onPress={() => {navigation.navigate('profile'); ChangePasswordBackend('-NGdf8tGoycJVbcW4Nt7', actualNewPassword);}}>
                    <Text style={[styles.changePasswordDoneText, {color: doneEnabled ? 'white' : '#706E6E'}]}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.ChangeNameAndUsernameBody}>
                <View style={styles.ChangeNameAndUsernameDPContainer}>
                    <View style={styles.ChangeNameAndUsernameDP}/>
                </View>
                <View style={styles.ChangeNameAndUsernameBodyInput}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500'}}>
                                Name
                            </Text>
                        </View>
                        
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder={placeholderName}
                        placeholderTextColor="white"
                        onChangeText={(text) => {setinputName(text)}}
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text style={{marginLeft: '5%', color: 'white', fontWeight: '500'}}>
                                Username
                            </Text>
                        </View>
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder={placeholderUsername}
                        placeholderTextColor="white"
                        onChangeText={(text) => {setinputUsername(text)}}
                        />
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ChangeNameAndUsername;