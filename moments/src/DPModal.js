import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LoggedInContext } from '../App'

function DPModal () {

    const navigation = useNavigation();
    const { editProfileModal, setEditProfileModal } = useContext(LoggedInContext);
    const [takePhotoPressed, setTakePhotoPressed] = useState(false)
    const [chooseFromCameraRollPressed, setChooseFromCameraRollPressed] = useState(false)
    const [cancelPressed, setCancelPressed] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setTakePhotoPressed(false)
            setChooseFromCameraRollPressed(false)
            setCancelPressed(false)
        }, 1000)
    }, [takePhotoPressed, chooseFromCameraRollPressed, cancelPressed])

    return (
        <Modal visible={editProfileModal} transparent={true}>
            <View style={styles.dpEditModalFullScreen}>
                <View style={styles.dpEditModal}>
                    <Pressable onPress={() => {setTakePhotoPressed(true); navigation.navigate('TakePhotoForDP'); setEditProfileModal(false)}}>
                        <View style={[styles.takePhotoForDP, {backgroundColor: takePhotoPressed ? '#212121' : '#464646'}]}>
                            <Text style={styles.editDPText}>
                                Take photo
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {setChooseFromCameraRollPressed(true);navigation.navigate('ChooseFromCameraRoll'); setEditProfileModal(false);}}>
                        <View style={[styles.chooseFromLibrary, {backgroundColor: chooseFromCameraRollPressed ? '#212121' : '#464646'}]}>
                            <Text style={styles.editDPText}>
                                Choose from camera roll
                            </Text>
                        </View>
                    </Pressable>
                        
                    <Pressable onPress={() => {setCancelPressed(true); setEditProfileModal(false)}}>
                        <View style={[styles.cancelDPModal, {backgroundColor: cancelPressed ? '#212121' : '#464646'}]} >
                            <Text style={[styles.editDPText, {color: 'red'}]}>
                                Cancel
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
                
        </Modal>
    )
}

export default DPModal;