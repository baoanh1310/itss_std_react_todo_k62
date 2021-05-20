import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDxfjLwRE3zFzaNn1Ji7Jb3MBgfvmIXQvU",
    authDomain: "itss-todolist.firebaseapp.com",
    projectId: "itss-todolist",
    storageBucket: "itss-todolist.appspot.com",
    messagingSenderId: "630815441503",
    appId: "1:630815441503:web:3955f36c1f5eedc764d1ea",
    measurementId: "G-C3M17KQ0NJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
export const db_todo = firebase.firestore().collection("todo");
export const db_user = firebase.firestore().collection("user");

export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};
