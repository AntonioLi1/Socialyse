import React, { useEffect, useState, useContext, useRef} from 'react';
import { View, Pressable, Text, FlatList, TextInput, SafeAreaView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { GettingStartedContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function ForgotPassword () {
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
                onChangeText={()=>{}}
                />
                <TextInput
                style={styles.inputs}
                placeholder='Password'
                onChangeText={()=>{}}
                />
            </View>
        </SafeAreaView>
    )
};

export default ForgotPassword;