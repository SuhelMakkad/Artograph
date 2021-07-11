import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5ESgEUn23V7p3WPbGssAV3DH3-7CG2_w",
  authDomain: "artography-cd2d8.firebaseapp.com",
  projectId: "artography-cd2d8",
  storageBucket: "artography-cd2d8.appspot.com",
  messagingSenderId: "412827064621",
  appId: "1:412827064621:web:82dbc52bfa1ff181515ba4",
  measurementId: "G-KRBPDM4LLL",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
