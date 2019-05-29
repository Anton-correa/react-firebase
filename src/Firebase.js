import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyASpRaXV-_W3wj92sgWdspSeYxUKpWLlgs",
    authDomain: "react-spas-28726.firebaseapp.com",
    databaseURL: "https://react-spas-28726.firebaseio.com",
    projectId: "react-spas-28726",
    storageBucket: "react-spas-28726.appspot.com",
    messagingSenderId: "950034550974"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

export default firebase;