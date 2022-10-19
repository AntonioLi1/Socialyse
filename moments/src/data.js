import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, push, update, get, query, limitToLast, orderByChild, equalTo } from "firebase/database";
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
const dbRef = ref(getDatabase());
get(child(dbRef, 'channels/test3/posts')).then((snapshot)=> {
    if (snapshot.exists()) {
      console.log(snapshot.orderByChild("caption").equalTo("banton"));
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }), {
    onlyOnce: true
  };



// logging in a user

// Function to create a new user with basic information
function create_user(email, name, username) {
  const db = getDatabase();

  const user_info = {
    "email": email,
    "name": name, 
    "username": username
  }

  // Get a key for a new user.
  const new_user_key = push(child(ref(db), 'users')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + new_user_key] = user_info;

  return update(ref(db), updates);
}

//
function create_posts(caption, image, time, username, channel_name) {
  const db = getDatabase();

  const post_info = {
    "caption": caption,
    "image": image,
    "time": time,
    "username": username
  }

  // Get a key for a new post.
  const new_post_key = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/channels/" + channel_name + "/posts/" + new_post_key] = post_info;

  return update(ref(db), updates);
}

// Functions to update specific user information
function update_user_info(user_id, email, name, username) {
  const db = getDatabase();

  update(ref(db, "/users/" + user_id), {
    "email": email,
    "name": name, 
    "username": username
  });
}

// Add channel_id later?
// function list_posts(channel_name) {
//   const db = getDatabase();

//   const posts_by_time = query(ref(db, "channels/" + channel_name + "/posts/"), orderByKey("time"));


//   console.log(posts_by_time);

// }

// list_posts("test3")
