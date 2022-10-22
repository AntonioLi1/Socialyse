import 'react-native-gesture-handler';
import React, {Context, createContext, useState} from 'react';
import Navigator from './src/navigator';

export const GettingStartedContext = createContext({
  messageDisplay: true,
  setMessageDisplay: (value) => {},
  notifDisplay: true,
  setNotifDisplay: (value) => {},
  editProfileModal: false,
  setEditProfileModal: (value) => {}
});

function App () {
  const [messageDisplay, setMessageDisplay] = useState(true);
	const [notifDisplay, setNotifDisplay] = useState(true);
  const [editProfileModal, setEditProfileModal] = useState(false);

  return (
    <GettingStartedContext.Provider value={{messageDisplay, setMessageDisplay, notifDisplay, setNotifDisplay, editProfileModal, setEditProfileModal}}>
      <Navigator></Navigator>
    </GettingStartedContext.Provider>
    
  );
};

export default App;
