import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ImageBackground } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import { GettingStartedContext } from '../App'

function ChooseFromCameraRoll ({navigation}) {

    const [imageURL, setImageURL] = useState(null);

    return (
        <SafeAreaView style={styles.takePhotoforDPBackground}>
            <View style={styles.chooseFromCameraRollHeader}>
                <Pressable style={styles.CFCRBackButton} onPress={() => navigation.navigate('Dms')}>
					<MIIcon name='arrow-forward-ios' size={30} color='white'/>
				</Pressable>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                    Camera Roll
                </Text>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white', marginRight: '3%'}}>
                    Done
                </Text>
            </View>
            <View style={styles.CFCRPhoto}>
                <ImageBackground style={styles.justTakenPhoto} source={{uri:'file://' + imageURL}}>
                    
                </ImageBackground>	 
            </View>
            <View style={styles.CFCRMorePhotos}>
                <Text>
                    hello
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default ChooseFromCameraRoll;