import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import styles from './styles';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function PostThread ({navigation}) {
    const config = {
		velocityThreshold: 0.3,
		directionalOffsetThreshold: 80
	};

	return (
	<GestureRecognizer
	onSwipeRight={() => navigation.goBack()}
	config={config}> 
		<View style={styles.fullScreen}>
            <View style={styles.MBHeader}>
				<View style={styles.headerInnerContainer}>
					<Pressable style={styles.MBBackButton} onPress={() => navigation.goBack()}>
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

            <View style={styles.threadParentPost}>
                <Text style={styles.threadParentUsername}>
                    USERNAME
                </Text>
                <Text style={styles.threadPostContent}>
                    content
                </Text>
                <View style={styles.threadParentpostLikeCommentContainer}>
                    <View style={styles.postLikeAndCount}>
                        <ADIcon name='like2' size={25} />
                        <Text style={styles.likeCount}>
                        5 
                        </Text>
                    </View>
                    <View style={styles.postCommentAndCount}>		
                        <MCIcon style={styles.commentIcon} name='message-text-outline' size={25}/>
                        <Text style={styles.commentCount}>
                        12
                        </Text>
                    </View>
				</View>
            </View>
        </View>
	</GestureRecognizer>
	)	
}

export default PostThread;