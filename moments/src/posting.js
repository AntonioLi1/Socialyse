import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
//import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//import ADIcon from 'react-native-vector-icons/AntDesign'

function Posting ({navigation}) {

    const [input, setInput] = useState(0);

    return (
        <View style={styles.fullScreen}>
            <View style={styles.MBHeader}>
				<View style={styles.headerInnerContainer}>
					<Pressable style={styles.MBBackButton} onPress={() => {navigation.goBack(); }}>
						<MIIcon name='arrow-forward-ios' size={28} color='black'/>
					</Pressable>
					<Text style={{color: 'black', fontSize: 20}}>
						UNSW Roundhouse
					</Text>
					<View style={styles.notificationContainerMB}>
						<Pressable style={styles.notificationButtonMB} onPress={() => navigation.navigate('notifications')}>
							<IIcon name='notifications-outline' size={32} color='black'/>
						</Pressable>
						<View style={styles.notificationCountContainer}>
							<Text style={{fontSize:10, color: 'white'}}>
								5
							</Text>
						</View>
					</View>		
				</View> 
			</View>
            <View style={styles.postInputContainer}>
                <View style={styles.postInnerContainer}>
                    <TextInput style={{marginLeft: '5%', fontSize: 18}} placeholder="What's your thought?" 
                    onChangeText={(text) => setInput(text.length)}/>
                    <IIcon style={styles.postPostButton} name='ios-send' size={24} color='#4681F4'
                    onPress={() => navigation.navigate('MB')}/>
                </View>
                <View style={styles.inputRemainingContainer}>
                    <Text style={styles.inputRemaining}>
                        {input}/150
                    </Text>
                </View>

            </View>
        </View>
    )

}

export default Posting;