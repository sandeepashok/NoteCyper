import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, serverTimestamp, addDoc, where, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCPvoKOfDnvkAWV1iCUkv7cxzbGnNsgeUE",
    authDomain: "notes-app-b06d8.firebaseapp.com",
    databaseURL: "https://notes-app-b06d8-default-rtdb.firebaseio.com",
    projectId: "notes-app-b06d8",
    storageBucket: "notes-app-b06d8.appspot.com",
    messagingSenderId: "899928627443",
    appId: "1:899928627443:web:7a0518696d6a3ef4bf7f86"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore, query, orderBy, serverTimestamp, addDoc, where, onSnapshot, doc, setDoc, deleteDoc, collection, GoogleAuthProvider, signInWithPopup }