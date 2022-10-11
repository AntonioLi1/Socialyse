import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable, FlatList } from 'react-native';
import styles from './styles';
import ActiveNowModal from './captionModal';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { ScrollView } from 'react-native-gesture-handler';

function ActiveNow({navigation}) {

	const [openProfile, setOpenProfile] = useState(false);

    return (
        <View style={styles.fullScreen}>
			<View style={styles.activeNowHeader}>
				<View style={styles.headerInnerContainer}>
					<Pressable style={styles.MBBackButton} onPress={() => navigation.navigate('MB')}>
						<MIIcon name='arrow-forward-ios' size={28} color='black'/>
					</Pressable>
					<Text style={{color: 'black', fontSize: 20}}>
						Active Now
					</Text>
					<View style={styles.notificationContainerMB}>
						<Pressable style={styles.notificationButtonMB} onPress={() => navigation.navigate('notifications')}>
							<IIcon name='notifications-outline' size={32} color='black'/>
						</Pressable>
						<View style={styles.notificationCountContainerMB}>
							<Text style={{fontSize:10, color: 'white'}}>
								5
							</Text>
						</View>
					</View>
				</View> 
			</View>

			<View style={{flex: 1, paddingTop: '2%', marginBottom: '2%'}}>
				<FlatList style={{marginHorizontal: '2%'}} numColumns={2} data={[1,2,3,4,5, 6,7,8,9]} contentContainerStyle={{flexGrow: 1}} renderItem={({item, index}) => 
				{
					return (
						<Pressable onPress={() => {setOpenProfile(true)} }>
							<View style={styles.activeNowProfilePlaceHolder}/>
						</Pressable>
					)
				}}>
				</FlatList>
			</View>
			
			<ActiveNowModal openProfile={openProfile} setOpenProfile={setOpenProfile}/>
					
		</View>
        
    );
}
export default ActiveNow;
/*

*/