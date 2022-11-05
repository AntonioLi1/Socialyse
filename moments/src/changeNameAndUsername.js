import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

function ChangeNameAndUsername () {
    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.ChangeNameAndUsernameHeader}>
                <Text style={{color: 'white', fontSize: RFValue(14), fontWeight: '400'}}>
                    Cancel
                </Text>

                <Text style={{color: 'white', fontSize: RFValue(16), fontWeight: '900'}}>
                    Edit profile
                </Text>

                <Text style={{color: 'white', fontSize: RFValue(14), fontWeight: '800'}}>
                    Done
                </Text>
            </View>
            <View style={styles.ChangeNameAndUsernameBody}>
                <View style={styles.ChangeNameAndUsernameDPContainer}>
                    <View style={styles.ChangeNameAndUsernameDP}/>
                </View>
                <View style={styles.ChangeNameAndUsernameBodyInput}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text>
                                Name
                            </Text>
                        </View>
                        
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder='Name'
                        placeholderTextColor="white"
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '20%'}}>
                            <Text>
                                Username
                            </Text>
                        </View>
                        <TextInput
                        style={styles.inputsEditProfile}
                        placeholder='Username'
                        placeholderTextColor="white"
                        />
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ChangeNameAndUsername;