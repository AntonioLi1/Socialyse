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

//import { NavigationContainer } from '@react-navigation/native';

import  MapDisplay  from './src/map';
import Geolocation from 'react-native-geolocation-service';
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

  return (
  <MapDisplay></MapDisplay>
  );
};



export default App;
