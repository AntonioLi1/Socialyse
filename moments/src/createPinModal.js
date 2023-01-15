import React, { useState, useEffect, useContext } from 'react';
import { View, Modal, Text, Pressable, TouchableNativeFeedbackBase, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
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
    const [showErrorMessage, setShowErrorMessage] = useState(false)
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
        const currTime = new Date(); 
        const userLocation = `${userLatitude},${userLongitude}`
        //console.log('geopoint', geopoint)

        let start = new Date();

        function subtractHours(numOfHours, date = new Date()) {
            date.setHours(date.getHours() - numOfHours);

            return date;
        }

        let test = subtractHours(24, start)

        const API_KEY = "AIzaSyA1T4rNRR2NoCUglLkTZOtdCExn392_mZE"
        // check if there is another pin within 25m
        // await firestore()
        // .collection('Pins')
        // .where('LastActive', '>', test)
        // .get()
        // .then(async (querySnapshot) => {
        //     //console.log('querySnapshot.docs', querySnapshot.docs)
        //     for (const snapshot of querySnapshot.docs) {
        //         let data = snapshot.data()
        //         const pinLocation = `${data.Location.latitude},${data.Location.longitude}`
        //         // console.log('pinlocations', pinLocation)
        //         // console.log('userlocation', userLocation)
        //         const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=walking&origins=${userLocation}&destinations=${pinLocation}&key=${API_KEY}`
        //         await fetch(url)
        //         .then((response) => response.json())
        //         .then((data) => {
        //             let distance = parseFloat(data.rows[0].elements[0].distance.text.match(/\d+/)[0]);
        //             //console.log('the distance', distance)
        //             let unit = data.rows[0].elements[0].distance.text.match(/[a-zA-Z]+/g)[0];
        //             if (unit == 'km') {
        //                 distance *= 1000
        //                 //console.log('distanceif', distance)
        //             }
        //             if (distance < 25) {
        //                 throw Error("ERRRORRRRR");
        //             }
        //         })
        //     }
        // })

        let docID = ''
        await firestore()
        .collection('Pins')
        .add({
            ChannelCount: 0,
            LastActive: currTime,
            Location: geopoint,
            Name: newPinName,
            PinID: '',
            PinPic: null
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
		GetmyLocation();
		setDataLoaded(true)
	}

    useEffect(() => {
        getData()
    }, [])

    if (dataLoaded === false) return null;

    async function createPinPress() {
        try {
            await CreatePin(newPinName, longitude, latitude)
            setCreatePinModalDisplay(false)
            setMultipleModalDisplay(true)
        } catch (err){
            console.log('error createpinhehe', err)
            setShowErrorMessage(true)
            setTimeout(() => {
				setShowErrorMessage(false)
			}, 1000)
        }
    }

    return (
        <Modal visible={createPinModalDisplay} transparent={true}>
            
            <View style={styles.createChannelModelFullScreen}>
                
                <View style={styles.createPinModal}>
                    <View style={styles.locationNameActiveAndJoinButtonContainer}>
                        
                        {
                            showErrorMessage ?
                                <Text style={{color: 'red', marginTop: '5%', textAlign: 'center'}}>
                                    There is a pin nearby, please join that one!
                                </Text>
                            :
                            <TextInput style={styles.createPinModalPlaceholder} placeholderTextColor='#585858' placeholder="New pin name..." autoFocus={true}
                            onChangeText={(text) => setNewPinName(text)} multiline={false} maxLength={20}
                            />
                        }
                        

                        <Pressable style={styles.createPinModalButton} disabled={showErrorMessage}
                            onPress={() => {createPinPress()}}
                        >
                            <Text style={[styles.createChannelText, {color: showErrorMessage ? 'grey' : 'white'}]}>Create</Text>				
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