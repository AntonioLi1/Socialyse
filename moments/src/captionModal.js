import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';


function CaptionModal({captionModal, setCaptionModal, caption, setCaption}) {
    const [inputCount, setInputCount] = useState(0); 
    
    return (
        <Modal visible={captionModal} transparent={true} >
            <View style={styles.captionModal}>
                <View style={styles.captionModalHeader}>
                    <IIcon style={{marginLeft: '2%', }} name="ios-close-outline" size={35} color='black'
                    onPress={() => {setCaptionModal(false); setCaption('add a caption...')}}/>
                    <Pressable onPress={() => {setCaptionModal(false);}}>
                        <Text style={styles.captionDone}>
                            Done
                        </Text>
                    </Pressable>
                        
                </View>
              
                <TextInput style={styles.captionModalPlaceholder} placeholder="caption..." autoFocus={true}
                onChangeText={(text) => {setInputCount(text.length); setCaption(text)}} maxLength={150} multiline={true}
                />

                <Text style={styles.inputRemaining}>
                    {inputCount}/150
                </Text>
                    
                

                    

                
                
            </View>

        </Modal>
    )
    

}

export default CaptionModal;
/*
<View style={styles.inputRemainingAndSendContainer}>
                    <Text style={styles.inputRemaining}>
                        {inputCount}/150
                    </Text>
                    
                </View>
*/