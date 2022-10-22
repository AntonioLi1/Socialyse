import React, { useState, useContext } from 'react';
import { View, Modal, Text, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GettingStartedContext } from '../App'


function DPModal () {

    const navigation = useNavigation();
    const { editProfileModal, setEditProfileModal } = useContext(GettingStartedContext);

    return (
        <Modal visible={editProfileModal} transparent={true}>
            <View style={styles.dpEditModalFullScreen}>
                <View style={styles.dpEditModal}>
                    <Pressable onPress={() => {setEditProfileModal(false)}}>
                        <View style={styles.removePhoto}>
                                <Text style={styles.editDPText}>
                                Remove current photo
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {navigation.navigate('TakePhotoForDP')}}>
                        <View style={styles.takePhotoForDP}>
                            <Text style={styles.editDPText}>
                                Take photo
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => {navigation.navigate('ChooseFromCameraRoll')}}>
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