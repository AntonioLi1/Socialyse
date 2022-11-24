import database from '@react-native-firebase/database';

// Function to create a post
function MakeAPost(picURL, caption, username, channelId) {
    // Store all the post information
    const post_info = {
        'caption': caption,
        'image': picURL,
        'time': new Math.round(Date().getTime() / 1000),
        'likes': null,
        'username': username,
        'channelId': channelId,
    }

    // Create a new node to set post information
    const newPostId = database().ref('/posts').push();

    // Set the post information in the new key
    newPostId.set({post_info}).then(() => console.log('Data updated'));
}

// Function to like a post
function LikePost(postId) {
    // Create a reference to the likes in the post
    const reference = database().ref('/posts/' + postId + '/likes');

    // If there are no likes, return 1, otherwise add 1
    return reference.transaction(likes => {
        if (likes == null) return 1;
        return likes + 1;
    })
}

// Function which returns the post if the user created the post
async function ViewOwnPosts(postId, username) {
    const userReference = databse().ref('/posts/' + postId + 'username');

    if (userReference == username) {
        return database().ref('/posts/' + postId);
    }
}

// Function which deletes the post if the user created the post
async function DeletePost(postId, username) {
    const userReference = database().ref('/posts/' + postId + '/username');

    // If the post owner is trying to remove the post,
    if (userReference == username) {
        // Remove the post from the database
        await database().ref('/posts/' + postId).remove();
    }
}

export { MakeAPost, LikePost, ViewOwnPosts, DeletePost }

// const currentTime;
//     const allowedTime = currentTime - 3600;

//     const postReference = database().ref('/posts/' + postId + 'channelId');

//     await 