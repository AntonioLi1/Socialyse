import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry, createContext} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setupURLPolyfill } from 'react-native-url-polyfill'


setupURLPolyfill()
AppRegistry.registerComponent(appName, () => App);

