import React, { useEffect, useState } from 'react';
import { View,  Text, Pressable,  } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function ViewOtherProfile({navigation}) {
    return (
        <View style={styles.profileScreen}>
            <View style={styles.profilePageProfile}>
                   
		    </View>   
            <View style={styles.profilePageUsernameAndNameContainer}>
                <Text style={styles.profilePageName}>
                    Dababy
                </Text>
                <Text style={styles.profilePageUsername}>
                    dababy_leshgo
                </Text>
		    </View>
            <Pressable style={styles.otherProfileBackButton} onPress={() => navigation.goBack()}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>
        </View>
    )
}

export default ViewOtherProfile;