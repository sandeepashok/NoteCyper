import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPvoKOfDnvkAWV1iCUkv7cxzbGnNsgeUE",
    authDomain: "notes-app-b06d8.firebaseapp.com",
    projectId: "notes-app-b06d8",
    storageBucket: "notes-app-b06d8.appspot.com",
    messagingSenderId: "899928627443",
    appId: "1:899928627443:web:7a0518696d6a3ef4bf7f86"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore().collection('notes');

// const timestamp = firebase.firestore.FieldValue.serverTimestamp()


export default db