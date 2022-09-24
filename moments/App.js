import 'react-native-gesture-handler';
import React, {Context, createContext, useState} from 'react';
import Navigator from './src/navigator';

export const GettingStartedContext = createContext({
  messageDisplay: true,
  setMessageDisplay: (value) => {},
  notifDisplay: true,
  setNotifDisplay: (value) => {},
});

function App () {
  const [messageDisplay, setMessageDisplay] = useState(true);
	const [notifDisplay, setNotifDisplay] = useState(true);

  return (
    <GettingStartedContext.Provider value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay}}>
      <Navigator></Navigator>
    </GettingStartedContext.Provider>
    
  );
};

export default App;
