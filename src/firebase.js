import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, serverTimestamp, addDoc, where, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore, query, orderBy, serverTimestamp, addDoc, where, onSnapshot, doc, setDoc, deleteDoc, collection, GoogleAuthProvider, signInWithPopup }