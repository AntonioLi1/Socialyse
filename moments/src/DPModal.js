import React, { useContext } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LoggedInContext } from '../App'

function DPModal () {

    const navigation = useNavigation();
    const { editProfileModal, setEditProfileModal } = useContext(LoggedInContext);

    return (
        <Modal visible={editProfileModal} transparent={true}>
            <View style={styles.dpEditModalFullScreen}>
                <View style={styles.dpEditModal}>
                    <Pressable onPress={() => {navigation.navigate('TakePhotoForDP'); setEditProfileModal(false)}}>
                        <View style={styles.takePhotoForDP}>
                            <Text style={styles.editDPText}>
                                Take photo
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {navigation.navigate('ChooseFromCameraRoll'); setEditProfileModal(false);}}>
                        <View style={styles.chooseFromLibrary}>
                            <Text style={styles.editDPText}>
                                Choose from camera roll
                            </Text>
                        </View>
                    </Pressable>
                        
                    <Pressable onPress={() => {setEditProfileModal(false)}}>
                        <View style={styles.cancelDPModal} >
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