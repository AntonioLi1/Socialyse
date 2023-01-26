import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';


function CaptionModal({captionModal, setCaptionModal, caption, setCaption, setAddedCaption, setShowFooter}) {
    const [inputCount, setInputCount] = useState(0); 
    const [input, setInput] = useState(null);
    return (
        <Modal visible={captionModal} transparent={true} >
            <View style={styles.captionModal}>
                <View style={styles.captionModalHeader}>
                    <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={scale(32)} color='black'
                    onPress={() => {setCaptionModal(false); setShowFooter(true)}}/>
                    <Pressable onPress={() => {setCaptionModal(false); setCaption(input); setAddedCaption(true); setShowFooter(true)}}>
                        <Text style={styles.captionDone}>
                            Done
                        </Text>
                    </Pressable>
                        
                </View>
              
                <TextInput style={styles.captionModalPlaceholder} defaultValue={caption} placeholder={caption} autoFocus={true}
                onChangeText={(text) => {setInputCount(text.length); setInput(text)}} maxLength={100} multiline={true}
                />

                <Text style={styles.inputRemaining}>
                    {inputCount}/100
                </Text>  
            </View>

        </Modal>
    )
    

}

export default CaptionModal;