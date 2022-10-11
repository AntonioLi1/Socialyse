import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GettingStartedContext} from '../App';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const GradientText = (props) => {
	return (
	  <MaskedView maskElement={<Text {...props} />}>
		<LinearGradient
		  colors={["#AD00FF", "#00FFA3"]}
		  start={{ x: 0, y: 0.35 }}
		  end={{ x: 0, y: 0.7 }}
		>
		  <Text {...props} style={[props.style, { opacity: 0.3 }]} />
		</LinearGradient>
	  </MaskedView>
	);
};



function PostsFeed ({navigation}) {
    const {messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay} = useContext(GettingStartedContext);
    
    return (
        <View style={styles.MBBackground}>
            <View style={styles.postsFeedHeader}>
                <Pressable style={styles.postsFeedHeaderBackButton} onPress={() => {setMessageDisplay(true); navigation.navigate('Map'); setNotifDisplay(true) }}>
                    <MIIcon name='arrow-forward-ios' size={32} color='white'/>
                </Pressable>
                
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.socialTextYellow}>
                        SOCIALYSE
                    </Text>
                    <GradientText style={styles.socialTextGradient}>
                        SOCIALYSE
                    </GradientText>
                </View>

                <View style={styles.notificationContainerPostsFeed}>
					<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
						<IIcon name='notifications-outline' size={32} color='white' />
					</Pressable>
					<View style={styles.notificationCountContainer}>
						<Text style={{ fontSize: 10, color: 'black' }}>
							5
						</Text>
					</View>
				</View>
            </View>
            <View style={{flex: 6, width: '100%'}}>
                <View style={{height: '10%', backgroundColor: 'green', marginTop: '10%'}}/>
                <View style={{height: '10%', backgroundColor: 'green', marginTop: '10%'}}/>
                <View style={{height: '10%', backgroundColor: 'green', marginTop: '10%'}}/>
                <View style={{height: '10%', backgroundColor: 'green', marginTop: '10%'}}/>
                <View style={{height: '10%', backgroundColor: 'green', marginTop: '10%'}}/>
                

               
            </View>
            <View style={styles.postsFeedFooter}>
                <Pressable style={styles.messageButtonPostsFeed} onPress={() => navigation.navigate('Dms')}>
                    <IIcon style={styles.messageIcon} name='ios-chatbubbles-outline' size={33} />
                </Pressable>
            </View>
        </View>
    );
    
    
}

export default PostsFeed;