import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function SendFeedbackModal({sendFeedbackModal, setSendFeedbackModal}) {
    const [inputCount, setInputCount] = useState(0); 
    const [input, setInput] = useState(null);
    const [feedbackInput, setFeedbackInput] = useState();

    //console.log(sendFeedbackModal)

    return (
        <Modal visible={sendFeedbackModal} transparent={true} >
            <View style={styles.sendFeedbackModalFullScreen}>
                <View style={styles.sendFeedbackModal}>
                    <View style={styles.captionModalHeader}>
                        <IIcon style={{marginLeft: '2%', marginTop: '2%' }} name="ios-close-outline" size={scale(32)} color='black'
                        onPress={() => {setSendFeedbackModal(false);}}/>
                        <Pressable onPress={() => {setSendFeedbackModal(false); setFeedbackInput(input);}}>
                            <Text style={styles.captionDone}>
                                Done
                            </Text>
                        </Pressable>
                            
                    </View>
                
                    <TextInput style={styles.captionModalPlaceholder} placeholder="suggest a location for a new pin..." autoFocus={true}
                    onChangeText={(text) => {setInputCount(text.length); setInput(text)}} maxLength={150} multiline={true}
                    />

                    <Text style={styles.inputRemaining}>
                        {inputCount}/150
                    </Text>  
                </View>
            </View>
                

        </Modal>
    )
    

}

export default SendFeedbackModal;
/*
<View style={styles.inputRemainingAndSendContainer}>
                    <Text style={styles.inputRemaining}>
                        {inputCount}/150
                    </Text>
                    
                </View>
*/