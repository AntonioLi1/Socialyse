import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import Modal from "react-native-modal";
import { RFValue } from 'react-native-responsive-fontsize';
const {GeoPoint} = firestore

class PinNameError extends Error {
    constructor(message) {
        super(message)
        this.name = "PinNameError"
    }
}

class PinNearbyError extends Error {
    constructor(message) {
        super(message)
        this.name = "PinNearbyError"
    }
}

function CreatePinModal({createPinModalDisplay, setCreatePinModalDisplay, setMultipleModalDisplay}) {

    const [dataLoaded, setDataLoaded] = useState(false)
    const [longitude, setLongitude] = useState(0)
	const [latitude, setLatitude] = useState(0)
    const [newPinName, setNewPinName] = useState('')
    const [someError, setSomeError] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showPinNameErrorMessage, setShowPinNameErrorMessage] = useState(false)
    const [showUnexpectedErrorMessage, setShowUnexpectedErrorMessage] = useState(false)

    const {setSelectedPinId} = useContext(LoggedInContext)

    const GetmyLocation = async () => {
		await Geolocation.getCurrentPosition(info => {
			setLatitude(info.coords.latitude)
			setLongitude(info.coords.longitude)
		})
	}

    async function CreatePin(newPinName, userLongitude, userLatitude) {
        // create pin under Pins
        // check name of pin isnt empty
        if (newPinName === '') {
            throw new PinNameError('pin name is empty')
        }

        const geopoint = new GeoPoint(userLatitude, userLongitude)
        const currTime = new Date(); 
        const userLocation = `${userLatitude},${userLongitude}`

        let start = new Date();

        function subtractHours(numOfHours, date = new Date()) {
            date.setHours(date.getHours() - numOfHours);

            return date;
        }

        let test = subtractHours(24, start)

        const API_KEY = "AIzaSyA1T4rNRR2NoCUglLkTZOtdCExn392_mZE"
        //check if there is another pin within 25m
        await firestore()
        .collection('Pins')
        .where('LastActive', '>', test)
        .get()
        .then(async (querySnapshot) => {
            for (const snapshot of querySnapshot.docs) {
                let data = snapshot.data()
                const pinLocation = `${data.Location.latitude},${data.Location.longitude}`
                let pinRadius = data.Radius
                const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=walking&origins=${userLocation}&destinations=${pinLocation}&key=${API_KEY}`
                await fetch(url)
                .then((response) => response.json())
                .then((distData) => {
                    let distance = parseFloat(distData.rows[0].elements[0].distance.text.match(/\d+/)[0]);
                    let unit = distData.rows[0].elements[0].distance.text.match(/[a-zA-Z]+/g)[0];
                    if (unit == 'km') {
                        distance *= 1000
                    }
                    if (distance < pinRadius) {
                        throw new PinNearbyError('there is a pin nearby')
                    }
                })
            }
        })

        let docID = ''
        await firestore()
        .collection('Pins')
        .add({
            ChannelCount: 0,
            LastActive: currTime,
            Location: geopoint,
            Name: newPinName,
            PinID: '',
            PinPic: null,
            Verified: false,
            Radius: 80
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
        } catch (error){
            if (error.name === 'PinNameError') {
                setSomeError(true)
                setShowPinNameErrorMessage(true)
                setTimeout(() => {                
				    setShowPinNameErrorMessage(false)
                    setSomeError(false)
			    }, 1000)
            }
            else if (error.name === 'PinNearbyError') {
                setSomeError(true)
                setShowErrorMessage(true)
                setTimeout(() => {
				    setShowErrorMessage(false)
                    setSomeError(false)
			    }, 1000)
            } else {
                setSomeError(true)
                setShowUnexpectedErrorMessage(true)
                setTimeout(() => {
                    setShowUnexpectedErrorMessage(false)
                    setSomeError(false)
                }, 1000 )
            }
        }
    }

    return (

            <Modal isVisible={createPinModalDisplay}>
                <View style={styles.createPinModal}>
                    <View style={styles.locationNameActiveAndJoinButtonContainer}>
                        {
                            someError ?
                                <Text style={{color: 'red', marginTop: '5%', textAlign: 'center', fontSize: RFValue(12)}}>
                                    {showErrorMessage ? "There is a pin nearby, please join that one!" : null}
                                    {showPinNameErrorMessage ? "Give your pin a name!" : null}
                                    {showUnexpectedErrorMessage ? "Unexpected Error. Try again!" : null}
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
            </Modal>
      
    )
}

export default CreatePinModal;