import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, Image } from 'react-native';
import styles from './styles';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'react-native-size-matters';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';

async function ViewFriendProfile(FriendID) {
    let dataRet = {
        Username: '',
        ProfilePic: '',
    };
    await firestore()
    .collection('UsernameAndDP')
    .doc(FriendID)
    .get()
    .then(docSnapshot => {
        if(docSnapshot.exists) {
          dataRet.Username = docSnapshot.data().Username;
          dataRet.ProfilePic = docSnapshot.data().ProfilePic;
        } else {
          throw error;
        }
    })
    return dataRet
}

function ViewOtherProfile({route, navigation}) {

    const {FriendID} = route.params;
    const [otherUserData, setOtherUserData] = useState()
    const [gotData, setGotData] = useState(false);


    async function getData() {
        const data = await ViewFriendProfile(user.uid, FriendID)
        setOtherUserData(data)
        setGotData(true)
    }

    useEffect(() => {
        getData()
    },[])

	const { user } = useContext(LoggedInContext);

    if (gotData == false) return null;

    return (
        <View style={styles.profileScreen}>
            <View style={styles.profilePageDPContainer}>
                <Image source={{uri: otherUserData.ProfilePic}} style={{height: '100%', width: '100%'}} />
  
		    </View>   
            <View style={styles.profilePageUsernameNameSettingsContainer}>
                <View style={styles.otherUserUsernameAndNameContainer}>
                    <Text style={styles.profilePageName}>
                        {otherUserData.Username}
                    </Text>
                </View>
            </View>
            <Pressable style={styles.otherProfileBackButton} onPress={() => navigation.goBack()}>
				<MIIcon name='keyboard-arrow-up' size={scale(50)} color='white'/>
			</Pressable>
        </View>
    )
}

export default ViewOtherProfile;