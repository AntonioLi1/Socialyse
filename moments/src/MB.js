import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IIcon from 'react-native-vector-icons/Ionicons'
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign'

const posts = [
	{
		postContent: "hello 1",
		username: 'john',
		likeCount: 5,
		commentCount: 2,
	},
	{
		postContent: "hello 2",
		username: 'jim',
		likeCount: 532,
		commentCount: 22,
	},
	{
		postContent: "hello 3",
		username: 'rtjh',
		likeCount: 15,
		commentCount: 422,
	},
	{
		postContent: "hello 4",
		username: 'rytnj',
		likeCount: 523,
		commentCount: 243,
	},
	{
		postContent: "hello 5",
		username: 'serg',
		likeCount: 65,
		commentCount: 223,
	},
	{
		postContent: "hello 6",
		username: 'qwe',
		likeCount: 52,
		commentCount: 23,
	},
	{
		postContent: "hello 7",
		username: 'rtyjn',
		likeCount: 56,
		commentCount: 20,
	},
	{
		postContent: "hello 8",
		username: 'efw',
		likeCount: 55,
		commentCount: 22,
	},
	{
		postContent: "hello 9",
		username: 'tyj',
		likeCount: 53,
		commentCount: 2,
	},
	{
		postContent: "hello 10",
		username: 'ew4rty',
		likeCount: 7,
		commentCount: 56,
	},
];

function MicroBlog({navigation}) {
	return (
		<View>
			<View style={styles.MBHeader}>
				<Pressable style={styles.MBBackButton} onPress={() => navigation.navigate('Map')}>
					<MIIcon name='arrow-forward-ios' size={28} color='black'/>
				</Pressable>

				<View style={styles.locationNameContainerMB}>
					<Text style={{color: 'black', fontSize: 20}}>
						UNSW Roundhouse
					</Text>
				</View> 

				<View style={styles.notificationContainer}>
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

			<ScrollView style={styles.MBFeed}>
				{posts.map((post) =>
					<Pressable>
						<View style={styles.post}>	
							<Text style={styles.postUsername}>
								{post.username}
							</Text>
							<Text style={styles.postContent}>
								{post.postContent}
							</Text>
							<View style={styles.postLikeCommentContainer}>
								<View style={styles.postLikeAndCount}>
									<ADIcon name='like2' size={25} />
									<Text style={styles.likeCount}>
									{post.likeCount}
									</Text>
								</View>
								<View style={styles.postCommentAndCount}>
									<IIcon style={styles.commentIcon} name='chatbox-outline' size={25} />
									<Text style={styles.commentCount}>
									{post.commentCount}
									</Text>
								</View>
							</View>
						</View>
					</Pressable>
					)
				}
			</ScrollView>

		
			<View style={styles.MBFooter}>
				<View>
					<TouchableOpacity style={styles.messageButtonMB} onPress={() => navigation.navigate('Dms')}>
						<MCIcon style={styles.messageIcon} name='message-text-outline' size={33}/>
					</TouchableOpacity>				
				</View>

				<View>
					<Pressable style={styles.postButton}>
						<MCIcon style={styles.messageIcon} name='thought-bubble-outline' size={33}/>
					</Pressable>
				</View>
				
			</View>


		</View>
	)  
}

export default MicroBlog;
/*
<ScrollView style={styles.MBFeed}>
				<Pressable>
					<View style={styles.post}>	
						<Text style={styles.postUsername}>
							username
						</Text>
						<Text style={styles.postContent}>
							post content
						</Text>
						<View style={styles.postLikeCommentContainer}>
							<ADIcon style={styles.postLike} name='like2' size={25}/>
							<IIcon style={styles.postComment} name='chatbox-outline' size={25}/>
						</View>
					</View>
				</Pressable>
</ScrollView>


<View style={styles.notificationContainer}>
	<Pressable style={styles.notificationButton} onPress={() => navigation.navigate('notifications')}>
		<IIcon name='notifications-outline' size={32} color='black'/>
	</Pressable>
	<View style={styles.notificationCountContainer}>
		<Text style={{fontSize:10, color: 'white'}}>
			5
		</Text>
	</View>
</View>

*/