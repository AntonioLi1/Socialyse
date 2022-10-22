import React, { useEffect, useState, useContext, useRef} from 'react';
import { View, Pressable, Text, FlatList, TextInput, SafeAreaView } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { GettingStartedContext } from '../App'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const data = [
    {
        key: 1,
        message: 'hello jim',
        timeSent: '09:32',
        sentBy: 0
    },
    {
        key: 2,
        message: 'hello jac!qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:33',
        sentBy: 1
    },
    {
        key: 3,
        message: 'hello hello ehllo ehleoefjowejefwejfw',
        timeSent: '09:34',
        sentBy: 0
    },
    {
        key: 4,
        message: 'wegweg',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 5,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 6,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 7,
        message: 'wegweg',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 8,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 9,
        message: 'wegweg',
        timeSent: '09:35',
        sentBy: 0
    },
    {
        key: 10,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 11,
        message: 'wegweg',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 12,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 13,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 0
    },
    {
        key: 14,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 1
    },
    {
        key: 15,
        message: 'qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw',
        timeSent: '09:35',
        sentBy: 0
    },
]

function Dm ({navigation}) {

    const { messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay } = useContext(GettingStartedContext);
    
    return (
        <SafeAreaView style={styles.messagesScreen}>
            <View style={styles.messagesHeader}>
                <Text style={styles.messagesHeaderUsername}>
                    Recipient_UName
                </Text>  
                <Pressable style={styles.messagesBackButton} onPress={() => {setMessageDisplay(true); navigation.goBack(); setNotifDisplay(true) }}>
				    <MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			    </Pressable>     
            </View>

            <View style={styles.messagesBody}>
                <FlatList
                data={data.reverse()}
                inverted={true}
                
                renderItem={({item, index}) => {
                    if (item.sentBy === 0) {
                        if (index > 0) {
                            if (data[index - 1].sentBy === 0) {
                                return (

                                    <View style={styles.messageLeftContainer}>
                                        <Text style={styles.messageText}>
                                            {item.message}
                                        </Text>
                                        <Text style={styles.messageTime}>
                                            {item.timeSent}
                                        </Text>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={styles.messageLeftContainer}>
                                        <Text style={styles.messageText}>
                                            {item.message}
                                        </Text>
                                        <Text style={styles.messageTime}>
                                            {item.timeSent}
                                        </Text>
                                    </View>
                                )
                            }
                        } else if (index === 0) {
                            return (
                                <View style={styles.messageLeftContainer}>
                                    <Text style={styles.messageText}>
                                        {item.message}
                                    </Text>
                                    <Text style={styles.messageTime}>
                                        {item.timeSent}
                                    </Text>
                                </View>
                            )
                        }

                    } else {
                        return (
                            <View style={styles.messageRightContainer}>
                                <Text style={styles.messageText}>
                                    {item.message}
                                </Text>
                                <Text style={styles.messageTime}>
                                    {item.timeSent}
                                </Text>
                            </View>
                        )
                    }
                }}
                > 
                </FlatList>
            </View>

            <View style={styles.messagesFooter}>
                <TextInput
                style={styles.messageInput}
                placeholder='Send a message'
                />
                <IIcon name="ios-send" size={scale(23)} color='white'/>
            </View>
        </SafeAreaView>
            
    )
}
export default Dm;
/*
                    <View style={styles.messageLeftContainer}>
                        <Text style={styles.messages}>
                            hello jim!
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                        
                    
                    <View style={styles.messageRightContainer}>
                        <Text style={{color: 'white'}}>
                            hello jac!qwduiwefhewfujefwhiewufhewiufhwiufewhifuewifeuwfiw
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                        
                    <View style={styles.messageLeftContainer}>
                        <Text style={{color: 'white', }}>
                            hello hello hello hello hello hello hello hello hello hello hello 
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>
                    <View style={styles.messageRightContainer}>
                        <Text style={{color: 'white', }}>
                            hello hello hello
                        </Text>
                        <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>
                            09:32
                        </Text>
                    </View>

*/
