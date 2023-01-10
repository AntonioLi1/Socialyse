import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { getPathFromState, useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
const {GeoPoint} = firestore

function CreatePinModal({createPinModalDisplay, setCreatePinModalDisplay, multipleModalDisplay, setMultipleModalDisplay}) {

    const navigation = useNavigation();
    //const [pinName, setPinName] = useState('')
    const [dataLoaded, setDataLoaded] = useState(false)
    const [longitude, setLongitude] = useState(0)
	const [latitude, setLatitude] = useState(0)
    const [newPinName, setNewPinName] = useState('')
    const [showNewPinModal, setShowNewPinModal] = useState(false)
    const [showNewPinModalCreateChannel, setShowNewPinModalCreateChannel] = useState(false)

    const {selectedPinId, setSelectedPinId, user} = useContext(LoggedInContext)


    const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

    async function CreatePin(newPinName, userLongitude, userLatitude) {
        // create pin under Pins


        const geopoint = new GeoPoint(userLatitude, userLongitude)

        //console.log('geopoint', geopoint)

        let docID = ''
        await firestore()
        .collection('Pins')
        .add({
            ChannelCount: 0,
            Location: geopoint,
            Name: newPinName,
            PinID: '',
        })
        .then(function (docRef) {
            docID = docRef.id
        })
    
        await firestore()
        .collection('Pins')
        .doc(docID)
        .update({
            PinID: docID
        })

        setSelectedPinId(docID)
    
    
    }

    async function getData() {
		//const data = await ViewPinChannelsMultiple(selectedPinId)
		//setChannels(data)
		GetmyLocation();
		setDataLoaded(true)
	}

    useEffect(() => {
        getData()
    }, [])

    if (dataLoaded === false) return null;

    // if (showNewPinModal == true && showNewPinModalCreateChannel == false) {
    //     return (

    //     )
    // }




    return (
        <Modal visible={createPinModalDisplay} transparent={true}>
            
            <View style={styles.createChannelModelFullScreen}>
                
                <View style={styles.createPinModal}>
                    <View style={styles.locationNameActiveAndJoinButtonContainer}>
                        <TextInput style={styles.createPinModalPlaceholder} placeholderTextColor='#585858' placeholder="New pin name..." autoFocus={true}
                        onChangeText={(text) => setNewPinName(text)} multiline={false} maxLength={20}
                        />

                        <Pressable style={styles.createPinModalButton} 
                            onPress={() => {CreatePin(newPinName, longitude, latitude); 
                            setCreatePinModalDisplay(false)}}
                        >
                            <Text style={styles.createChannelText}>Create</Text>				
                        </Pressable>
                    </View>
                    
                    <IIcon style={styles.createPinModalClose} name='close-outline' size={scale(30)}
                    onPress={() => {setCreatePinModalDisplay(false)}}/> 
                </View>	
                    
            </View>
            
                
        </Modal>
    )
}

export default CreatePinModal;