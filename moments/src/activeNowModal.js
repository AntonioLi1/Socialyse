import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable, FlatList, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { ScrollView } from 'react-native-gesture-handler';

function ActiveNowModal({openProfile, setOpenProfile}) {
    
    const [addPressed, setAddPressed] = useState(false);

    return(
        <Modal visible={openProfile} transparent={true}>
            <View style={styles.activeNowModal}>
                <IIcon style={styles.activeNowModalClose} name='close-outline' size={30} onPress={()=> setOpenProfile(false)}/>
                <View style={{backgroundColor: 'aqua', height: '60%', width: '100%', position: 'absolute', zIndex: 0}}/>
                
                <Pressable style={styles.addButton} onPress={() => setAddPressed(!addPressed)}>
                    <IIcon name='ios-add-circle' size={50} color={addPressed ? '#3765BD' : '#4681F4'}/>
                </Pressable>
                
                
            </View>

        </Modal>
    )

}

export default ActiveNowModal;