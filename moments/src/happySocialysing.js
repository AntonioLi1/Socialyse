import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import {GettingStartedContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

function HappySocialysing({navigation}) {
    return (
        <SafeAreaView style={styles.happySocialysingLoadingScreen}>
            <View style={styles.yourPostTextContainer}>
                <Text style={styles.yourPostTextBlack}>
                    YOUR POST WILL {'\n'}
                    LAST FOR 15 {'\n'}
                    MINUTES. {'\n'} {'\n'}
                </Text>
                
            </View>
            <View style={{width: '100%', marginBottom: '70%',}}>
                <Text style={styles.yourPostTextBlack}>
                    HAPPY {'\n'}
                    <Text style={styles.yourPostTextWhite}>
                        SOCIALYSING!
                    </Text>
                </Text>
            </View>
            <View style={{marginBottom: 100}}>
                <Text onPress={() => {navigation.navigate('PostsFeed')}}>
                    go to posts
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default HappySocialysing;