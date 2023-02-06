import React, { useEffect, useState, useContext } from 'react';
import { View, Pressable, Text, SafeAreaView, Dimensions, PermissionsAndroid, Alert, Platform, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles'
import CreatePinModal from './createPinModal';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';
import IIcon from 'react-native-vector-icons/Ionicons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons'
import { scale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import { PERMISSIONS, checkMultiple, openSettings, requestMultiple } from 'react-native-permissions';
import {useAppState} from '@react-native-community/hooks';
const screenHeight = Dimensions.get("window").height


function LocationPermissionModal({havePermissions, showPermissionModal, setShowPermissionModal}) {

    return (
        <Modal visible={showPermissionModal} transparent={true}>
            <View style={styles.locationPermissionModal}>
                <View style={styles.locationPermissionModalMain}>
                    <Text style={{fontSize: screenHeight * 0.026, fontFamily: 'Helvetica', fontWeight: '900', color: 'white'}}>
                        Permission Required {'\n'}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: screenHeight * 0.02, fontFamily: 'Helvetica', fontWeight: '500', color: 'white'}}>
                        Once you turn on location services, you'll be able to interact 
                        with channels and pins in your area :)
                    </Text>
                </View>
                <View style={{flexDirection: 'row', width: '100%', flex: 1}}>
                    
                    <View style={{width: '50%', backgroundColor: '#2E2E2E', borderBottomLeftRadius: 10, justifyContent: 'center', borderTopColor: 'grey', borderTopWidth: 1, borderRightColor: 'grey', borderRightWidth: 1}}>
                        <Pressable onPress={() => {setShowPermissionModal(false)}}>
                            <Text style={{textAlign: 'center', fontSize: screenHeight * 0.023, fontFamily: 'Helvetica', fontWeight: '500', color: '#96B9FE'}}>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                    

                    
                    <View style={{width: '50%', backgroundColor: '#2E2E2E', borderBottomRightRadius: 10, justifyContent: 'center', borderTopColor: 'grey', borderTopWidth: 1}}>
                        <Pressable onPress={() => {openSettings()}}>
                            <Text style={{textAlign: 'center', fontSize: screenHeight * 0.023, fontFamily: 'Helvetica', fontWeight: '500', color: '#96B9FE'}}>
                                Open Settings
                            </Text>
                        </Pressable>
                    </View>
                   
                </View>
                
            </View>
        </Modal>
    )
}

export default LocationPermissionModal;