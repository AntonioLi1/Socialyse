import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  'apiKey': "AIzaSyDe5Xjh6H4BDbzDUOhtDie1uq1Sh2hWStA",
  'authDomain': "socialyse-8cf03.firebaseapp.com",
  'projectId': "socialyse-8cf03",
  'storageBucket': "socialyse-8cf03.appspot.com",
  'messagingSenderId': "689363109541",
  'appId': "1:689363109541:web:d4dc3c37616b5478966f4c",
  'measurementId': "G-WFJGJQE2TR",
  'databaseURL': "https://socialyse-8cf03-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// registering a user


// logging in a user

const dbRef = ref(getDatabase());
get(child(dbRef, 'channels/test3/posts')).then((snapshot)=> {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }), {
    onlyOnce: true
  };
  

  