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

function AddACaption({navigation}) {
    return (
        <View style={styles.MBBackground}>
            <Text>
                add caption
            </Text>
            <Pressable onPress={() => navigation.navigate('SocialyseLoading')}>
                <Text>
                    go to socialyse loading
                </Text>
            </Pressable>

            <View style={{backgroundColor: 'green'}}>
                <Text>
                    <Text style={{color: 'blue'}}>
                        social 
                    </Text>
                    <Text style={{color: 'red', position: 'absolute', right: 4}}>
                        social
                    </Text>
                    
                    <Text>
                        yse
                    </Text>
                </Text>
            </View>
            
        </View>
    )
}

export default AddACaption;