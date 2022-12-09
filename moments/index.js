import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setupURLPolyfill } from 'react-native-url-polyfill'

setupURLPolyfill()
AppRegistry.registerComponent(appName, () => App);

/*
SWIPING
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
*/
