import React from 'react';
import DmDisplay  from './dms';
import MapDisplay from './map';
import OwnProfile  from './ownProfile';
import NotificationDisplay from './notifications';
import MakeAPost from './makeAPost';
import Posting from './posting';
import ActiveNow from './activeNow';
import PostsFeed from './postsFeed';
import HappySocialysing from './happySocialysing';
import Dm from './dm';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


function Navigator() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="Map"component={MapDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dms" component={DmDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dm" component={Dm}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="profile" component={OwnProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="notifications" component={NotificationDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="MakeAPost" component={MakeAPost}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="SocialyseLoading" component={HappySocialysing}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="PostsFeed" component={PostsFeed}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;

