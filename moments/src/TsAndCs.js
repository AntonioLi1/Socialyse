import React from 'react';
import { View,  Text, Pressable, SafeAreaView, Dimensions, Linking } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'react-native-size-matters';

const screenHeight = Dimensions.get("window").height

function TsAndCs({navigation}) {

    async function PrivacyPolicy() {
        try{
            const URL = 'https://app.termly.io/document/privacy-policy/1774d57e-5112-4182-824b-740c958d85e8'
            const supported = await Linking.canOpenURL(URL)
            if (supported) {
                await Linking.openURL(URL)
            } else {
                //console.log('gg didnt wokr')
            }
        }catch(err){
            //console.log('PrivacyPolicy', err)
        }
        
    }

    async function EULA() {
        try{
            const URL = 'https://app.termly.io/document/eula/8248d241-36ed-42a2-bd10-fd394c0701f5'
            const supported = await Linking.canOpenURL(URL)
            if (supported) {
                await Linking.openURL(URL)
            } else {
                //console.log('gg didnt wokr')
            }
        }catch(err){
            //console.log('EULA', err)
        }
        
    }

    return (
        <SafeAreaView style={styles.settingsScreen}>
            <View style={styles.AboutHeader}>
                <Pressable style={styles.settingsBackButton} onPress={() => {navigation.goBack()}}>
                    <MIIcon name='arrow-back-ios' size={32} color={'white'}/>
                </Pressable>
                <Text style={{color: 'white', fontWeight: '900', fontSize: screenHeight * 0.028, fontFamily: 'Helvetica'}}>
                    About
                </Text>
                
            </View>

            <View style={{flex: 11}}>
                <View style={styles.settingsDeleteProfile}>
                    <Text style={styles.settingsText}>
                        Privacy Policy
                    </Text>
                    <Pressable onPress={() => {PrivacyPolicy()}}>
                        <MIIcon name='arrow-forward-ios' size={scale(25)} color={'white'}/>
                    </Pressable>
                </View>

                <View style={styles.settingsDeleteProfile}>
                    <Text style={styles.settingsText}>
                        EULA
                    </Text>
                    <Pressable onPress={() => {EULA()}}>
                        <MIIcon name='arrow-forward-ios' size={scale(25)} color={'white'}/>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default TsAndCs