import React from 'react';
import DmDisplay  from './dms';
import MapDisplay from './map';
import ProfileDisplay from './profile';
import NotificationDisplay from './notifications';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


function Navigator() {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="Map"component={MapDisplay}></Stack.Screen>
				<Stack.Screen name="Dms" component={DmDisplay}></Stack.Screen>
				<Stack.Screen name="profile" component={ProfileDisplay}></Stack.Screen>
				<Stack.Screen name="notifications" component={NotificationDisplay}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigator;

