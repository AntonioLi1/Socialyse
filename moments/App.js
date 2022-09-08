import 'react-native-gesture-handler';
import React from 'react';

/*import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';*/

//import  MapDisplay  from './src/map';
import Navigator from './src/navigator';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { StyleSheet, View, Image, Button, Text } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
//import MapDisplay from './src/map';
/*
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';*/

function App () {

  /*React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (Platform.OS === 'android') {
        requestPermission()
      } else {
        Geolocation.requestAuthorization()
      }

    }

    return () => {
      return () => { isMounted = false };
    }
  }, [])*/

  /*return (
    <MapDisplay></MapDisplay>
  );*/
  return (
    <Navigator></Navigator>
  );
};

export default App;
