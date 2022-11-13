import { firebaseConfig } from './data.js';
import database from '@react-native-firebase/database';

// Function to check a user into a channel using the channel id
// To check in a user is required to make a post in the channel
// Everytime a user checks in the number of active users should be updated
function CheckInChannel(channelId, caption, image, username) {
    const db = database();

    const post_info = {
        "caption": caption,
        "image": image,
        "time": firebase.database.ServerValue.TIMESTAMP,
        "username": username
    }
    
    // Push data to the reference for channel posts
    const newChannelRef = db.ref('channels' + channelId + '/posts').push();

    // Print out the generated key
    console.log('Auto generated key: ', newChannelRef.key);

    newChannelRef
        .set({post_info})
        .then(() => console.log('Data updated'));
}

// timer???
// Function to check a user out of a channel using channel if
function CheckOutChannel(token, channelId, timer) {

}

// timer???
async function ViewChannelFeed(token, timer) {

}

// Make a new post in the channel to update the timer 
// and be able to see new posts
function NewChannelPost() {

}

CheckInChannel(1, 'lols', 'lols', 'newperson');

export { CheckInChannel, CheckOutChannel, ViewChannelFeed }