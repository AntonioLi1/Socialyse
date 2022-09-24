import React from 'react';
import DmDisplay  from './dms';
import MapDisplay from './map';
import OwnProfile  from './ownProfile';
import NotificationDisplay from './notifications';
import MicroBlog from './MB';
import Posting from './posting';
import ActiveNow from './activeNow';
import PostThread from './postThread';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


function Navigator() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="Map"component={MapDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Dms" component={DmDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="profile" component={OwnProfile}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="notifications" component={NotificationDisplay}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="MB" component={MicroBlog}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="Posting" component={Posting}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="ActiveNow" component={ActiveNow}></Stack.Screen>
				<Stack.Screen options={{headerShown: false}} name="PostThread" component={PostThread}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;

