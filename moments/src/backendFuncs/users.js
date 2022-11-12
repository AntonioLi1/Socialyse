import database from '@react-native-firebase/database';

async function OwnProfileDetails(token) {

	// check token session 
    
    const p = new Promise((resolve)=>{
        database().ref(`/users/${token}`).on('value',snapshot=>{
			//console.log('data is:' + snapshot.val())
            resolve(snapshot.val())
        })
    });
	const data = await p.then();
    
}

async function OtherProfileDetails(token, picURL, otherUsername) {

}

async function Matchmade(token) {

}

export {OwnProfileDetails, OtherProfileDetails, Matchmade}