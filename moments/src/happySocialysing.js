import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from './styles';


function HappySocialysing() {
    
    return (
        <SafeAreaView style={styles.happySocialysingLoadingScreen}>
            <View style={styles.yourPostTextContainer}>
                <Text style={styles.yourPostTextBlack}>
                    YOUR POST WILL {'\n'}
                    LAST FOR 1HR. {'\n'} {'\n'}
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
            <ActivityIndicator size="large" style={{bottom: '30%'}} color='white'/>
        </SafeAreaView>
    )
}

export default HappySocialysing;