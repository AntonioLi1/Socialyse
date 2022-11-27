import database from '@react-native-firebase/database';
import { auth } from '@react-native-firebase/auth';


function SignUp(token, username, name, phoneNumber, password ) {
    // Use a valid email and password to create a new account
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log('Successfully created a new account and signed in!');
    })
    .catch(error => {
        // If the email is already in use, raise an error
        if (error.code == 'auth/email-already-in-use') {
            console.log('This email address is already in use');
        }

        // If the email is invalid, raise an error
        if (error.code == auth/invalid-email) {
            console.log('Please use a valid email address');
        }

        console.error(error);
    });
}

function Login(token, username, password) {
    // If the email and password are both exist and are valid, sign in
    auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('Signed in!');
    })
    .catch(error => {
        // If the is no valid account with the email, raise an error
        if (error.code == 'auth/user-not-found') {
            console.log('There is no user associated with this email address');
        }

        // If the email address is invalid, raise an error
        if (error.code == auth/invalid-email) {
            console.log('Please use a valid email address');
        }

        // If the account associated with the email is disabled/blocked, raise an error
        if (error.code == 'auth/user-disabled') {
            console.log('The account associated with this email address has been disabled');
        }

        // If the password entered is incorrect, raise an error
        if (error.code == 'auth/wrong-password') {
            console.log('The password you have entered is incorrect');
        }

        console.error(error);
    });
}

function LoginWithEmailLink(email) {
    auth().sendSignInLinkToEmail(email).then(() => {
        
    })
}

function VerifyPhoneNumber() {

}

function LoginWithPhoneNumber(token, phoneNumber) {

}

function Logout(token) {
    // Signs the user out of the app
    auth().signOut().then(() => console.log('User signed out!'));
}

// Sends a reset password link if the user wishes to change password
function ResetPassword(token) {
    const auth = getAuth();

    // INCOMPLETE
    // auth.confirmPasswordReset(email).then(() => {
    //     console.log('');
    // })
}

// Sends a reset password link if the user cannot remember password
// Is ONLY USED WHEN USER IS NOT LOGGED IN
function ForgotPassword(token, email) {
    // If a request is raised, sends a password reset link? to the email
    auth().sendPasswordResetEmail(email).then(() => {
        console.log('Password reset email sent');
    })
}

export {
    SignUp,
    Login,
    LoginWithEmailLink,
    VerifyPhoneNumber,
    LoginWithPhoneNumber,
    Logout,
    ResetPassword, 
    ForgotPassword
}