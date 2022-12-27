import React, { useEffect, useState, useContext } from 'react';
import { View,  Text, Pressable, Image, ImageBackground  } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { LoggedInContext } from '../App'
import firestore from '@react-native-firebase/firestore';

async function ViewFriendProfile(UserID, FriendID) {
    let dataRet = {
        Username: '',
        ProfilePic: '',
    };
    await firestore()
    .collection('Friends')
    .doc(UserID)
    .collection('FriendsWith')
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
    console.log(dataRet)
    return dataRet
}

function ViewOtherProfile({route, navigation}) {

    const {FriendID} = route.params;
    //console.log(route)
    const [otherUserData, setOtherUserData] = useState()
    const [gotData, setGotData] = useState(false);


    async function getData() {
        console.log('useruid',user.uid)
        console.log('friendid',FriendID)

        const data = await ViewFriendProfile(user.uid, FriendID)
        setOtherUserData(data)
        setGotData(true)
        //console.log('otherUserData.ProfilePic', otherUserData.ProfilePic)
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
                    {/* <Text style={styles.profilePageUsername}>
                        dababy_leshgo
                    </Text> */}
                </View>
            </View>
            <Pressable style={styles.otherProfileBackButton} onPress={() => navigation.goBack()}>
				<MIIcon name='arrow-forward-ios' size={scale(30)} color='white'/>
			</Pressable>
        </View>
    )
}

export default ViewOtherProfile;