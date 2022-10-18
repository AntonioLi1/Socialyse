import React, { useState, useContext } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
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

const GradientText = (props) => {
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
  };

function HappySocialysing({navigation}) {
    return (
        <View style={styles.happySocialysingLoadingScreen}>
            <View style={styles.yourPostTextContainer}>
                <Text style={styles.yourPostTextBlack}>
                    YOUR POST WILL {'\n'}
                    LAST FOR 15 {'\n'}
                    MINUTES. {'\n'} {'\n'}
                </Text>
                <Text style={styles.yourPostTextWhite}>
                    YOUR POST WILL {'\n'}
                    LAST FOR 15 {'\n'}
                    MINUTES. {'\n'} {'\n'}
                </Text>
            </View>
            <View style={{width: '100%', marginBottom: '70%',}}>
                <Text style={{textAlign: 'center' }}>
                    <View style={styles.yourPostTextContainer}>
                        <Text style={styles.yourPostTextBlack}>
                            HAPPY 
                        </Text>
                        <Text style={styles.yourPostTextWhite}>
                            HAPPY 
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.socialTextYellow}>
                                SOCIALYSING
                            </Text>
                            <GradientText style={styles.socialTextGradient}>
                                SOCIALYSING
                            </GradientText>
                        </View>
                    </View>
                </Text>
            </View>
            <View style={{marginBottom: 100}}>
                <Text onPress={() => {navigation.navigate('PostsFeed')}}>
                    go to posts
                </Text>
            </View>
            
        </View>
    )
}

export default HappySocialysing;