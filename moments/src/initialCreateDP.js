import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, SafeAreaView} from 'react-native';
import styles from './styles';
import { LoggedInContext } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function InitialCreateDP() {
    const navigation = useNavigation()

    const { setDpURL } = useContext(LoggedInContext);
    const [takePhotoPressed, setTakePhotoPressed] = useState(false)
    const [cameraRollPressed, setCameraRollPressed] = useState(false)

    function PickImage() {
        ImagePicker.openPicker({
            width: screenWidth * 0.9,
            height: screenHeight * 0.55,
            cropping: true,

        }).then(image => {
            setDpURL(image.path)
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setTakePhotoPressed(false)
            setCameraRollPressed(false)
        }, 100)
    }, [takePhotoPressed, cameraRollPressed])
    
    return (
        <SafeAreaView style={styles.initialDPFullScreen}>
            <Text style={styles.chooseADisplayPicText}>
                Before we begin... {'\n'} 
                you need a profile pic!
            </Text>

            <View style={styles.initialDPBody}>
                <Pressable style={[styles.loginButton, {backgroundColor: takePhotoPressed ? 'grey' : 'white'}]} 
                onPress={() => {navigation.navigate('InitialTakePhotoForDP'); setTakePhotoPressed(true)}}>
                    <Text style={{fontSize: screenHeight * 0.018, fontWeight: '700', color: 'black'}}>
                        Let me take a photo
                    </Text>
                </Pressable>
                <Text style={styles.or}>
                    OR
                </Text>

                <Pressable style={[styles.signUpButton, {backgroundColor: cameraRollPressed ? 'grey' : 'white'}]} 
                onPress={() => {navigation.navigate('InitialChooseFromCameraRoll'); setCameraRollPressed(true); PickImage()}}>
                    <Text style={{fontSize: screenHeight * 0.018, fontWeight: '700', color: 'black'}}>
                        Choose from camera roll
                    </Text>
                </Pressable>
            </View>

            
        </SafeAreaView>
    )
}

export default InitialCreateDP;