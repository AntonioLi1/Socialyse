import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Pressable, TextInput, SafeAreaView, ImageBackground, Image } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Fontisto';
import { GettingStartedContext } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

function ChooseFromCameraRoll ({navigation}) {

    const [imageURL, setImageURL] = useState(null);
    const { dpURL, setDpURL } = useContext(GettingStartedContext);


    function PickImage() {
        ImagePicker.openPicker({
            width: screenWidth * 0.9,
            height: screenHeight * 0.55,
            cropping: true,

        }).then(image => {
            console.log("full image",image);
            //setImageURL(image.path)
            setDpURL(image.path)
        });
    }

    //setDpURL(imageURL);

    console.log("this is image url path", imageURL)
    
    return (
        <SafeAreaView style={styles.takePhotoforDPBackground}>
            <View style={styles.chooseFromCameraRollHeader}>
                <Pressable style={styles.CFCRBackButton} onPress={() => navigation.goBack()}>
					<MIIcon name='arrow-forward-ios' size={30} color='white'/>
				</Pressable>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                    Camera Roll
                </Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'white', marginRight: '3%'}}>
                        Done
                    </Text>
                </Pressable>
                
            </View>
            <View style={styles.CFCRPhoto}>
                <Image style={styles.justTakenPhoto} source={{uri:'file://' + dpURL}}/> 
            </View>
            <Pressable style={styles.openCameraRollButton} onPress={() => PickImage()}>
                <Text style={styles.openCameraRollText}>
                    Open Camera Roll
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ChooseFromCameraRoll;

//navigation.navigate('Dms')